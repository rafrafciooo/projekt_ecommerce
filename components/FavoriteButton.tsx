"use client";
import { Product } from "@/sanity.types";
import useStore from "@/store";
import { HeartIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const FavoriteButton = ({
	showProduct = false,
	product,
}: {
	showProduct?: boolean;
	product?: Product | null | undefined;
}) => {
	const { favoriteProduct, addToFavorite } = useStore();
	const [existingProduct, setExistingProduct] = useState<Product | null>(null);

	useEffect(() => {
		const availableProduct = favoriteProduct?.find(
			item => item._id === product?._id
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
		<>
			{!showProduct ? (
				<Link href='/ulubione' className='group relative'>
					<HeartIcon className='w-5 h-5 hover:text-shop-light-green hoverEffect' />
					<span className='absolute -top-1 -right-1 bg-shop-dark-green text-white rounded-full h-3.5 w-3.5 text-xs font-semibold flex items-center justify-center'>
						{favoriteProduct?.length ? favoriteProduct?.length : 0}
					</span>
				</Link>
			) : (
				<button
					onClick={handleFavorite}
					className={`group relative p-1 rounded-md border hoverEffect hover:bg-shop-light-green mt-4 `}
				>
					{existingProduct ? (
						<HeartIcon
							fill='#3b9c3c'
							className={`text-shop-light-green/80 group-hover:scale-105 hoverEffect group-hover:text-white mt-.5 w-5 h-5 `}
						/>
					) : (
						<HeartIcon
							className={`text-shop-light-green/80 group-hover:scale-105 hoverEffect group-hover:text-white mt-.5 w-5 h-5`}
						/>
					)}
				</button>
			)}
		</>
	);
};

export default FavoriteButton;
