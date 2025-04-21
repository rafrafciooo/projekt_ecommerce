import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderType = defineType({
	name: "order",
	title: "Zamówienie",
	type: "document",
	icon: BasketIcon,
	fields: [
		defineField({
			name: "orderNumber",
			title: "Numer zamówienia",
			type: "string",
			validation: Rule => Rule.required(),
		}),
		{
			name: "invoice",
			type: "object",
			fields: [
				{ name: "id", type: "string" },
				{ name: "number", type: "string" },
				{ name: "hosted_invoice_url", type: "url" },
			],
		},
		defineField({
			name: "stripeCheckoutSessionId",
			title: "ID sesji Stripe Checkout",
			type: "string",
		}),
		defineField({
			name: "stripeCustomerId",
			title: "ID klienta Stripe",
			type: "string",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "clerkUserId",
			title: "ID użytkownika sklepu",
			type: "string",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "customerName",
			title: "Imię klienta",
			type: "string",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "email",
			title: "E-mail klienta",
			type: "string",
			validation: Rule => Rule.required().email(),
		}),
		defineField({
			name: "stripePaymentIntentId",
			title: "ID płatności Stripe",
			type: "string",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "products",
			title: "Produkty",
			type: "array",
			of: [
				defineArrayMember({
					type: "object",
					fields: [
						defineField({
							name: "product",
							title: "Produkt zakupiony",
							type: "reference",
							to: [{ type: "product" }],
						}),
						defineField({
							name: "quantity",
							title: "Ilość zakupiona",
							type: "number",
						}),
					],
					preview: {
						select: {
							product: "product.name",
							quantity: "quantity",
							image: "product.image",
							price: "product.price",
							currency: "product.currency",
						},
						prepare(select) {
							return {
								title: `${select.product} x ${select.quantity}`,
								subtitle: `${select.price * select.quantity} PLN`,
								media: select.image,
							};
						},
					},
				}),
			],
		}),
		defineField({
			name: "totalPrice",
			title: "Cena całkowita",
			type: "number",
			validation: Rule => Rule.required().min(0),
		}),
		defineField({
			name: "currency",
			title: "Waluta",
			type: "string",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "amountDiscount",
			title: "Zniżka kwotowa",
			type: "number",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "address",
			title: "Adres dostawy",
			type: "object",
			fields: [
				defineField({ name: "state", title: "Województwo", type: "string" }),
				defineField({ name: "zip", title: "Kod pocztowy", type: "string" }),
				defineField({ name: "city", title: "Miasto", type: "string" }),
				defineField({ name: "address", title: "Adres", type: "string" }),
				defineField({ name: "name", title: "Imię", type: "string" }),
			],
		}),
		defineField({
			name: "status",
			title: "Status zamówienia",
			type: "string",
			options: {
				list: [
					{ title: "Oczekujące", value: "pending" },
					{ title: "W przetwarzaniu", value: "processing" },
					{ title: "Opłacone", value: "paid" },
					{ title: "Wysłane", value: "shipped" },
					{ title: "W drodze", value: "out_for_delivery" },
					{ title: "Dostarczone", value: "delivered" },
					{ title: "Anulowane", value: "cancelled" },
				],
			},
		}),
		defineField({
			name: "orderDate",
			title: "Data zamówienia",
			type: "datetime",
			validation: Rule => Rule.required(),
		}),
	],
	preview: {
		select: {
			name: "customerName",
			amount: "totalPrice",
			currency: "currency",
			orderId: "orderNumber",
			email: "email",
		},
		prepare(select) {
			const orderIdSnippet = `${select.orderId.slice(0, 5)}...${select.orderId.slice(-5)}`;
			return {
				title: `${select.name} (${orderIdSnippet})`,
				subtitle: `${select.amount} ${select.currency}, ${select.email}`,
				media: BasketIcon,
			};
		},
	},
});
