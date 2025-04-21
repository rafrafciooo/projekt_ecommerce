import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
	name: "product",
	title: "Produkty",
	type: "document",
	icon: TrolleyIcon,
	fields: [
		defineField({
			name: "name",
			title: "Nazwa produktu",
			type: "string",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug (adres URL)",
			type: "slug",
			options: {
				source: "name",
				maxLength: 96,
			},
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "images",
			title: "Zdjęcia produktu",
			type: "array",
			of: [{ type: "image", options: { hotspot: true } }],
		}),
		defineField({
			name: "description",
			title: "Opis",
			type: "string",
		}),
		defineField({
			name: "price",
			title: "Cena",
			type: "number",
			validation: Rule => Rule.required().min(0),
		}),
		defineField({
			name: "discount",
			title: "Rabat % (0-100)",
			type: "number",
			validation: Rule => Rule.required().min(0),
		}),
		defineField({
			name: "categories",
			title: "Kategorie",
			type: "array",
			of: [{ type: "reference", to: { type: "category" } }],
		}),
		defineField({
			name: "stock",
			title: "Stan magazynowy",
			type: "number",
			validation: Rule => Rule.min(0),
		}),
		defineField({
			name: "brand",
			title: "Marka",
			type: "reference",
			to: { type: "brand" },
		}),
		defineField({
			name: "status",
			title: "Status produktu",
			type: "string",
			options: {
				list: [
					{ title: "Nowość", value: "new" },
					{ title: "Popularny", value: "hot" },
					{ title: "Wyprzedaż", value: "sale" },
				],
			},
		}),
		defineField({
			name: "variant",
			title: "Typ produktu",
			type: "string",
			options: {
				list: [
					{ title: "Gadżety", value: "gadzety" },
					{ title: "AGD", value: "agd" },
					{ title: "Lodówki", value: "lodowki" },
					{ title: "Inne", value: "inne" },
				],
			},
		}),
		defineField({
			name: "isFeatured",
			title: "Polecany produkt",
			type: "boolean",
			description: "Włącz/wyłącz oznaczenie jako polecany",
			initialValue: false,
		}),
	],
	preview: {
		select: {
			title: "name",
			media: "images",
			subtitle: "price",
		},
		prepare(selection) {
			const { title, subtitle, media } = selection;
			const image = media && media[0];
			return {
				title,
				subtitle: `Cena: ${subtitle} zł`,
				media: image,
			};
		},
	},
});
