import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const brandType = defineType({
	name: "brand",
	title: "Marka",
	type: "document",
	icon: TagIcon,
	fields: [
		defineField({
			name: "title",
			type: "string",
		}),
		defineField({
			name: "slug",
			type: "slug",
			options: {
				source: "title",
			},
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "description",
			type: "text",
		}),
		defineField({
			name: "image",
			title: "Zdjęcie marki",
			type: "image",
			options: {
				hotspot: true,
			},
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
