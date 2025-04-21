import { UserIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const authorType = defineType({
	name: "author",
	title: "Autor",
	type: "document",
	icon: UserIcon,
	fields: [
		defineField({
			name: "name",
			type: "string",
		}),
		defineField({
			name: "slug",
			type: "slug",
			options: {
				source: "name",
			},
		}),
		defineField({
			name: "image",
			type: "image",
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: "bio",
			type: "array",
			of: [
				defineArrayMember({
					type: "block",
					styles: [{ title: "Normalny", value: "normal" }],
					lists: [],
				}),
			],
		}),
	],
	preview: {
		select: {
			title: "name",
			media: "image",
		},
	},
});
