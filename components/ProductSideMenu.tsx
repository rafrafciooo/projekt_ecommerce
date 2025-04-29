"use client";
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import useStore from "@/store";
import { HeartIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductSideMenu = ({
	product,
	className,
}: {
	product: Product;
	className?: string;
}) => {
	const { addToFavorite, favoriteProduct } = useStore();
	const [existingProduct, setExistingProduct] = useState<Product | null>(null);

	useEffect(() => {
		const availableProduct = favoriteProduct?.find(
			item => item._id === product._id
		);
		setExistingProduct(availableProduct || null);
	}, [product, favoriteProduct]);

	const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
		e.preventDefault();
		if (product?._id) {
			addToFavorite(product).then(() => {
				toast.success(
					existingProduct
						? "Produkt usuniety z ulubionych"
						: "Produkt dodany do ulubionych"
				);
			});
		}
	};
	return (
		<div className={cn("absolute top-2 right-2 z-10 hoverEffect", className)}>
			{/* Zmieniamy button na div */}
			<div
				onClick={handleFavorite}
				className={`p-1.5 rounded-full hover:bg-red-600 hover:text-white hoverEffect text-black ${
					existingProduct ? "bg-red-600 text-white" : "bg-[#eeeff3]"
				}`}
			>
				<HeartIcon size={18} />
			</div>
		</div>
	);
};

export default ProductSideMenu;
