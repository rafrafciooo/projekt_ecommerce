import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons";

export const categoryType = defineType({
	name: "category",
	title: "Kategoria",
	type: "document",
	icon: TagIcon,
	fields: [
		defineField({
			name: "title",
			title: "Nazwa kategorii",
			type: "string",
			validation: Rule => Rule.required().error("To pole jest wymagane."),
		}),
		defineField({
			name: "slug",
			title: "Adres URL",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
			validation: Rule => Rule.required().error("To pole jest wymagane."),
		}),
		defineField({
			name: "description",
			title: "Opis",
			type: "text",
		}),
		defineField({
			name: "range",
			title: "Cena od",
			type: "number",
			description: "Cena od",
		}),
		defineField({
			name: "featured",
			title: "Wyróżnione",
			type: "boolean",
			initialValue: false,
		}),
		defineField({
			name: "image",
			title: "Obrazek kategorii",
			type: "image",
			options: {
				hotspot: true,
			},
		}),
		// Dodanie pola 'productCount'
		defineField({
			name: "productCount",
			title: "Liczba produktów",
			type: "number",
			description: "Ilość produktów w kategorii",
			initialValue: 0, // Opcjonalnie możesz ustawić domyślną wartość
		}),
	],
	preview: {
		select: {
			title: "title",
			subtitle: "description",
			media: "image",
		},
	},
});
