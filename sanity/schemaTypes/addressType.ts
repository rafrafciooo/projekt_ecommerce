import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const addressType = defineType({
	name: "address",
	title: "Adresy",
	type: "document",
	icon: HomeIcon,
	fields: [
		defineField({
			name: "name",
			title: "Nazwa adresu",
			type: "string",
			description: "Przyjazna nazwa tego adresu (np. Dom, Praca)",
			validation: Rule => Rule.required().max(50),
		}),
		defineField({
			name: "email",
			title: "E-mail użytkownika",
			type: "email",
		}),
		defineField({
			name: "address",
			title: "Ulica",
			type: "string",
			description: "Ulica, w tym numer mieszkania/lokalu",
			validation: Rule => Rule.required().min(5).max(100),
		}),
		defineField({
			name: "city",
			title: "Miasto",
			type: "string",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "state",
			title: "Województwo",
			type: "string",
			description: "województwo",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "zip",
			title: "Kod pocztowy",
			type: "string",
			description: "Format: 12-345",
			validation: Rule =>
				Rule.required()
					.regex(/^\d{2}-\d{3}$/, {
						name: "zipCode",
						invert: false,
					})
					.custom((zip: string | undefined) => {
						if (!zip) {
							return "Kod pocztowy jest wymagany";
						}
						if (!zip.match(/^\d{2}-\d{3}$/)) {
							return "Wprowadź poprawny kod pocztowy (np. 12-345)";
						}
						return true;
					}),
		}),
		defineField({
			name: "default",
			title: "Adres domyślny",
			type: "boolean",
			description: "Czy to jest domyślny adres wysyłki?",
			initialValue: false,
		}),

		defineField({
			name: "createdAt",
			title: "Data utworzenia",
			type: "datetime",
			initialValue: () => new Date().toISOString(),
		}),
	],
	preview: {
		select: {
			title: "name",
			subtitle: "address",
			city: "city",
			state: "state",
			isDefault: "default",
		},
		prepare({ title, subtitle, city, state, isDefault }) {
			return {
				title: `${title} ${isDefault ? "(Domyślny)" : ""}`,
				subtitle: `${subtitle}, ${city}, ${state}`,
			};
		},
	},
});
