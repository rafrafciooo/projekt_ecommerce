"use client";
import { BRANDS_QUERYResult, Category, Product } from "@/sanity.types";
import React, { useEffect, useState } from "react";
import { Title } from "./ui/text";
import Container from "./Container";
import CategoryList from "./shop/CategoryList";
import BrandsList from "./shop/BrandsList";
import PriceList from "./shop/PriceList";
import { useSearchParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import Loader from "./Loader";

import ProductCard from "./ProductCard";
import NoProduct from "./NoProduct";

interface Props {
	categories: Category[];
	brands: BRANDS_QUERYResult;
}

const Shop = ({ categories, brands }: Props) => {
	const searchParams = useSearchParams();
	const brandsParams = searchParams?.get("brand");
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [selectedBrand, setSelectedBrand] = useState<string | null>(
		brandsParams || null
	);
	const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

	const fetchProducts = async () => {
		setLoading(true);
		try {
			let minPrice = 0;
			let maxPrice = 10000;
			if (selectedPrice) {
				const [min, max] = selectedPrice.split("-").map(Number);
				minPrice = min;
				maxPrice = max;
			}
			const query = `*[_type == 'product'
&& (!defined($selectedCategory) || references(*[_type == 
"category" && slug.current == $selectedCategory]._id))
&& (!defined($selectedBrand) || references(*[_type == 
"brand" && slug.current == $selectedBrand]._id))
&& price >= $minPrice && price <= $maxPrice
        ] | order(name asc) {
        ..., "categories":categories[]->title 
        }
`;
			const data = await client.fetch(
				query,
				{
					selectedCategory,
					selectedBrand,
					minPrice,
					maxPrice,
				},
				{ next: { revalidate: 0 } }
			);
			setProducts(data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, [selectedCategory, selectedBrand, selectedPrice]);

	return (
		<div className='border-t'>
			<Container className='mt-5'>
				<div className='sticky top-0 z-10 mb-5 '>
					<div className='flex items-center justify-between'>
						<Title>Wybierz co cię interesuje</Title>
						{(selectedBrand !== null ||
							selectedCategory !== null ||
							selectedPrice !== null) && (
							<button
								onClick={() => {
									setSelectedBrand(null);
									setSelectedCategory(null);
									setSelectedPrice(null);
								}}
								className='text-shop-dark-green/80 underline text-sm mt-2 font-medium hover:text-shop-dark-green hoverEffect'
							>
								Zresetuj Filtry
							</button>
						)}
					</div>
				</div>
				<div className='flex flex-col md:flex-row gap-5 border-t border-t-shop-dark-green/30'>
					<div className='md:sticky md:top-20 md:self-start md:overflow-y-auto  md:min-w-64 pb-5 scrollbarThin  md:border-r border-r-shop-dark-green/30 md:h-[calc(100vh-160px)] '>
						<CategoryList
							categories={categories}
							selectedCategory={selectedCategory}
							setSelectedCategory={setSelectedCategory}
						/>
						<BrandsList
							brands={brands}
							selectedBrand={selectedBrand}
							setSelectedBrand={setSelectedBrand}
						/>
						<PriceList
							selectedPrice={selectedPrice}
							setSelectedPrice={setSelectedPrice}
						/>
					</div>
					<div className='flex-1 pt-5'>
						<div className='h-[calc(100vh-160px)] overflow-y-auto pr-2 scrollbarThin'>
							{loading ? (
								<Loader />
							) : products.length > 0 ? (
								<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
									{products.map(product => (
										<ProductCard key={product._id} product={product} />
									))}
								</div>
							) : (
								<NoProduct />
							)}
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Shop;
