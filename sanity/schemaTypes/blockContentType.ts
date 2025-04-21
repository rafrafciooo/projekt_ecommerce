import { defineType, defineArrayMember } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const blockContentType = defineType({
	title: "Treść bloga",
	name: "blockContent",
	type: "array",
	of: [
		defineArrayMember({
			type: "block",
			styles: [
				{ title: "Normalny", value: "normal" },
				{ title: "Nagłówek 1", value: "h1" },
				{ title: "Nagłówek 2", value: "h2" },
				{ title: "Nagłówek 3", value: "h3" },
				{ title: "Nagłówek 4", value: "h4" },
				{ title: "Cytat", value: "blockquote" },
			],
			lists: [{ title: "Lista punktowana", value: "bullet" }],
			marks: {
				decorators: [
					{ title: "Pogrubienie", value: "strong" },
					{ title: "Kursywa", value: "em" },
				],
				annotations: [
					{
						title: "URL",
						name: "link",
						type: "object",
						fields: [
							{
								title: "URL",
								name: "href",
								type: "url",
							},
						],
					},
				],
			},
		}),

		defineArrayMember({
			type: "image",
			icon: ImageIcon,
			options: { hotspot: true },
			fields: [
				{
					name: "alt",
					type: "string",
					title: "Tekst alternatywny",
				},
			],
		}),
	],
});
