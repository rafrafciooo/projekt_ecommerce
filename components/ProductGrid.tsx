"use client";
import React, { useEffect, useState } from "react";
import TabNav from "./TabNav";
import { productType } from "@/constants/data";
import { client } from "@/sanity/lib/client";

import { Loader } from "lucide-react";
import NoProduct from "./NoProduct";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import { Product } from "@/sanity.types";

const ProductGrid = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);
	const [selectedTab, setSelectedTab] = useState<string>(
		productType[0]?.value || ""
	);

	const query = `*[_type == 'product' && variant == $variant] | order(name desc){
 ... , "categories" :categories[]->title
}`;

	const params = { variant: selectedTab.toLowerCase() };

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await client.fetch(query, params);
				setProducts(response);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [selectedTab]);
	return (
		<div className="py-10">
			<TabNav selectedTab={selectedTab} onTabSelect={setSelectedTab} />
			{loading ? (
				<div className='flex flex-col items-center justify-center py-10 min-h-80 gap-4 bg-gray-100 w-full mt-10'>
					<div className='flex items-center gap-2 text-shop-light-green'>
						<Loader className='w-7 h-7 animate-spin' />
						<p> Ładowanie...</p>
					</div>
				</div>
			) : products?.length ? (
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10'>
					{products.map(product => (
						<AnimatePresence key={product?._id}>
							<motion.div
								layout
								initial={{ opacity: 0.2, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2, ease: "easeInOut" }}
							>
								<ProductCard product={product} />
							</motion.div>
						</AnimatePresence>
					))}
				</div>
			) : (
				<NoProduct selectedTab={selectedTab} />
			)}
		</div>
	);
};

export default ProductGrid;
