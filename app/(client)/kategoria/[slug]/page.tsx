import CategoryProducts from "@/components/CategoryProducts";
import Container from "@/components/Container";
import { Title } from "@/components/ui/text";
import { getCategories } from "@/sanity/queries";
import React from "react";

const CategoryPage = async ({
	params,
	
}: {
	params: Promise<{ slug: string }>;
}) => {
	const categories = await getCategories();
	const { slug } = await params;
	return (
		<div className='py-10 bg-deal-bg'>
			<Container>
				<Title>
					Produkty z kategorii:
					<span className="text-shop-light-green uppercase">{slug && slug}</span>
				</Title>
				<CategoryProducts categories={categories} slug={slug} />
			</Container>
		</div>
	);
};

export default CategoryPage;
