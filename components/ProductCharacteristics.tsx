import { Product } from "@/sanity.types";
import { getBrands } from "@/sanity/queries";
import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./ui/accordion";
import { SubText } from "./ui/text";

const ProductCharacteristics = async ({
	product,
}: {
	product: Product | null | undefined;
}) => {
	const brand = await getBrands(product?.slug?.current as string);

	return (
	<>
			<Accordion type='single' collapsible>
				<AccordionItem value='item-1'>
					<AccordionTrigger>
						<strong>
							<span className='font-light'> Informacje ogólne:</span>{" "}
							{product?.name}
						</strong>
						{}
					</AccordionTrigger>
					<AccordionContent className='space-y-3'>
						<SubText className='font-semibold'>
							Marka: {brand && <span className='font-thin'>{brand?.brand}</span>}
						</SubText>
						<SubText className='font-semibold'>
							Opis: <span className='font-thin'>{product?.description}</span>
						</SubText>
						<SubText className='font-semibold'>
							Dostępność:{" "}
							<span className='font-thin'>
								{product?.stock ? "Produkt dostępny" : "Produkt niedostępny"}
							</span>
						</SubText>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		
	</>
	);
};

export default ProductCharacteristics;
