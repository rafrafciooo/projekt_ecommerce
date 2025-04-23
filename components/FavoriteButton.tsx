import { Product } from "@/sanity.types";
import { HeartIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const FavoriteButton = ({
	showProduct = false,
	product,
}: {
	showProduct?: boolean;
	product?: Product | null | undefined;
}) => {
	return (
		<>
			{!showProduct ? (
				<Link href='/ulubione' className='group relative'>
					<HeartIcon className='w-5 h-5 hover:text-shop-light-green hoverEffect' />
					<span className='absolute -top-1 -right-1 bg-shop-dark-green text-white rounded-full h-3.5 w-3.5 text-xs font-semibold flex items-center justify-center'>
						0
					</span>
				</Link>
			) : (
				
					<button className='group relative border border-shop-light-green/30 p-1 rounded-md hoverEffect hover:bg-shop-light-green mt-4'>
						<HeartIcon className='text-shop-light-green/80  group-hover:scale-105 hoverEffect group-hover:text-white mt-.5 w-5 h-5 ' />
					
					</button>
				
			)}
		</>
	);
};

export default FavoriteButton;
