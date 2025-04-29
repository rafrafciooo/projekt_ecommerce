"use server";

import { stripe } from "@/lib/stripe";
import { Address } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { CartItem } from "@/store";
import Stripe from "stripe";

export interface Metadata {
	orderNumber: string;
	customerName: string;
	customerEmail: string;
	clerkUserId?: string;
	addresses?: Address | null;
}

export interface GroupedCardItems {
	product: CartItem["product"];
	quantity: number;
}

export async function createCheckoutSession(
	items: GroupedCardItems[],
	metadata: Metadata
) {
	try {
		// Pobranie istniejącego klienta lub utworzenie nowego
		const customers = await stripe.customers.list({
			email: metadata.customerEmail,
			limit: 1,
		});
		const customerId = customers?.data?.length > 0 ? customers.data[0].id : "";

		// Przygotowanie pozycji koszyka z uwzględnieniem zniżki
		const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
			items.map(item => {
				const grossPrice  = item.product.price  ?? 0;  // 750
				const discountPct = item.product.discount ?? 0;  // 8
				const netPrice    = grossPrice * (1 - discountPct/100); // 690

				return {
					price_data: {
						currency: "PLN",
						product_data: {
							name: item.product.name || "Nieznany produkt",
							description: item.product.description,
							metadata: { id: item.product._id },
							images:
								item.product.images && item.product.images.length > 0
									? [urlFor(item.product.images[0]).url()]
									: undefined,
						},
						unit_amount: Math.round(netPrice * 100), // przekładamy na grosze
					},
					quantity: item.quantity,
				};
			});

		// Payload sesji
		const sessionPayload: Stripe.Checkout.SessionCreateParams = {
			metadata: {
				orderNumber: metadata.orderNumber,
				customerName: metadata.customerName,
				customerEmail: metadata.customerEmail,
				clerkUserId: metadata.clerkUserId || "",
				addresses: JSON.stringify(metadata.addresses),
			
			},
			mode: "payment",
			allow_promotion_codes: true,
			payment_method_types: ["card"],
			invoice_creation: { enabled: true },
			success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/sukces?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
			cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/koszyk`,
			line_items,
		};

		if (customerId) {
			sessionPayload.customer = customerId;
		} else {
			sessionPayload.customer_email = metadata.customerEmail;
		}

		const session = await stripe.checkout.sessions.create(sessionPayload);
		return session.url;
	} catch (error) {
		console.log("error", error);
		throw error;
	}
}
