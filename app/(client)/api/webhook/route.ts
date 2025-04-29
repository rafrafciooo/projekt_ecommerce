import { Metadata } from "@/actions/createCheckoutSession";
import { stripe } from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";

import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
	const body = await req.text();
	const headerList = await headers();
	const sig = headerList.get("stripe-signature");

	if (!sig) {
		return NextResponse.json({ error: "no signature" }, { status: 400 });
	}
	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

	if (!webhookSecret) {
		return NextResponse.json({ error: "no secret WEBHOOK" }, { status: 400 });
	}
	let event: Stripe.Event;
	try {
		event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
	} catch (error) {
		console.log(error);
		return NextResponse.json({ error: `błąd: ${error}` }, { status: 400 });
	}

	if (event.type === "checkout.session.completed") {
		const session = event.data.object as Stripe.Checkout.Session;
		const invoice = session.invoice
			? await stripe.invoices.retrieve(session.invoice as string)
			: null;
		try {
			await createOrderInSanity(session, invoice);
		} catch (error) {
			console.log("error", error);
			return NextResponse.json(
				{ error: `błąd order: ${error}` },
				{ status: 400 }
			);
		}
	}
	return NextResponse.json({ ok: true }, { status: 200 });
}

async function createOrderInSanity(
	session: Stripe.Checkout.Session,
	invoice: Stripe.Invoice | null
) {
	const {
		id,
		amount_total,
		currency,
		metadata,
		payment_intent,
		total_details,
	} = session;
	const { orderNumber, customerName, customerEmail, clerkUserId, addresses } =
		metadata as unknown as Metadata & { addresses: string };
	const parsedAddress = addresses ? JSON.parse(addresses) : null;

	const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
		id,
		{ expand: ["data.price.product"] }
	);

	// referencje sanity do produktów i przygotowanie aktualizacji zapasow
	const sanityProducts = [];
	const stockUpdates = [];
	for (const item of lineItemsWithProduct.data) {
		const productId = (item.price?.product as Stripe.Product)?.metadata?.id;
		const quantity = item?.quantity || 0;

		if (!productId) continue;

		sanityProducts.push({
			_key: crypto.randomUUID(),
			product: {
				_type: "reference",
				_ref: productId,
			},
			quantity,
		});
		stockUpdates.push({ productId, quantity });
	}

	//  zamowienie w sanity
	const order = await backendClient.create({
		_type: "order",
		orderNumber,
		stripeCheckoutSessionId: id,
		stripePaymentIntentId: payment_intent,
		customerName,
		stripeCustomerId: customerEmail,
		clerkUserId: clerkUserId,
		email: customerEmail,
		currency,
		amountDiscount: total_details?.amount_discount
			? total_details.amount_discount / 100 // Przekształcenie zniżki na jednostki waluty
			: 0,
		products: sanityProducts,
		totalPrice:
			amount_total && total_details?.amount_discount
				? (amount_total - (total_details.amount_discount || 0)) / 100
				: (amount_total ?? 0) / 100, // Jeśli amount_total jest null/undefined, używa 0
		status: "paid",
		orderDate: new Date().toISOString(),
		invoice: invoice
			? {
					id: invoice.id,
					number: invoice.number,
					hosted_invoice_url: invoice.hosted_invoice_url,
				}
			: null,
		address: parsedAddress
			? {
					state: parsedAddress.state,
					zip: parsedAddress.zip,
					city: parsedAddress.city,
					address: parsedAddress.address,
					name: parsedAddress.name,
				}
			: null,
	});
	//aktualizacja magazynu

	await updateStock(stockUpdates);
	return order;
}
async function updateStock(
	stockUpdates: { productId: string; quantity: number }[]
) {
	for (const { productId, quantity } of stockUpdates) {
		try {
			// biezace zapasy
			const product = await backendClient.getDocument(productId);
			if (!product || typeof product.stock !== "number") {
				console.log(`Produkt ${productId} nie istnieje`);
				continue;
			}
			const newStock = Math.max(product.stock - quantity, 0);

			// aktualizacja zapasow w sanity
			await backendClient.patch(productId).set({ stock: newStock }).commit();
		} catch (error) {
			console.log(`Bład aktualizacji zapasow produktu ${productId}`, error);
		}
	}
}
