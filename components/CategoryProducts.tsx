"use client";
import { Category, Product } from "@/sanity.types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { client } from "@/sanity/lib/client";

import { AnimatePresence, motion } from "motion/react";
import { Loader } from "lucide-react";
import NoProduct from "./NoProduct";
import ProductCard from "./ProductCard";

const CategoryProducts = ({
	categories,
	slug,
}: {
	categories: Category[];
	slug: string;
}) => {
	const [currentSlug, setCurrentSlug] = useState(slug);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	function handleCategoryChange(newSlug: string) {
		if (newSlug === currentSlug) return;
		setCurrentSlug(newSlug);
		router.push(`/kategoria/${newSlug}`, { scroll: false });
	}

	const fetchProducts = async ({ categorySlug }: { categorySlug: string }) => {
		setLoading(true);
		try {
			const query = `*[_type == 'product' && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name desc){
        ...,"categories":categories[]->title
        }`;

			const data = await client.fetch(query, { categorySlug: categorySlug });
			setProducts(data);
		} catch (error) {
			console.log("Błąd pobierania produktów", error);
			setProducts([]);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchProducts({ categorySlug: currentSlug });
	}, [router]);

	return (
		<div className=' py-5 flex flex-col md:flex-row items-start gap-4'>
			<div className=' flex gap-2 flex-col'>
				{categories.map(category => (
					<Button
						onClick={() => {
							handleCategoryChange(category?.slug?.current as string);
						}}
						key={category._id}
						className={`bg-transparent border-0 text-dark border-b-0 font-semibold hoverEffect rounded-lg hover:bg-shop-orange/60 ${category?.slug?.current === currentSlug ? "bg-shop-orange text-white" : ""}`}
					>
						<p className='flex-1 text-left font-light'>{category.title}</p>
					</Button>
				))}
			</div>
			<div className='flex-1 '>
				{loading ? (
					<div className='flex flex-col items-center justify-center gap-4 min-h-80 space-y-4 text-center bg-gray-50 rounded-lg w-full'>
						<div className='flex items-center space-x-2 '>
							<Loader className='w-10 h-10 animate-spin text-shop-orange' />
							<p className='text-lg font-semibold'>Ładowanie produktów</p>
						</div>
					</div>
				) : products.length > 0 ? (
					<div className='grid grid-cols-2 md:grid-cols-3 gap-3 lg:grid-cols-5'>
						{products?.map((product: Product) => (
							<AnimatePresence key={product._id}>
								<motion.div>
									<ProductCard product={product} />
								</motion.div>
							</AnimatePresence>
						))}
					</div>
				) : (
					<NoProduct selectedTab={currentSlug} className='mt-0 w-full' />
				)}
			</div>
		</div>
	);
};

export default CategoryProducts;
