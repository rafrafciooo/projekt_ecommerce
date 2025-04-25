"use client";
import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { BadgePercent, Flame, Star } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import { Title } from "./ui/text";
import PricingView from "./PricingView";
import AddToCart from "./AddToCart";

import ProductSideMenu from "./ProductSideMenu";

const ProductCard = ({ product }: { product: Product }) => {
	return (
		<div className='text-sm border-[1px] rounded-xl border-shop-dark-green/20 bg-white group overflow-hidden'>
			<div className='relative group overflow-hidden bg-shop-light-bg'>
				{product?.images?.length && (
					<Link href={`/produkty/${product?.slug?.current}`}>
						<Image
							src={urlFor(product?.images[0]).url()}
							alt={product?.name || "zdjęcie produktu"}
							loading='lazy'
							width={700}
							height={700}
							className={`w-full h-64 object-contain overflow-hidden transition-transform bg-shop-light-bg hoverEffect ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
						/>
					</Link>
				)}
				<ProductSideMenu product={product} />
				{product.status === "sale" && (
					<p
						className='absolute top-2 left-2 z-10 text-md border p-1 rounded-full
                    group-hover:text-shop-light-green group-hover:border-shop-light-green hoverEffect'
					>
						<BadgePercent size={20} fill='#3b9c3c' stroke='#fdfdfd' />
					</p>
				)}
				{product.status === "hot" && (
					<Link
						href={`/hot-deal`}
						className='absolute top-2 left-2 z-10 text-md border p-1 rounded-full
                     group-hover:text-orange-500 group-hover:border-orange-500 hoverEffect'
					>
						<Flame
							size={18}
							fill='#fb6c08'
							className='text-orange-500/50 group-hover:text-orange-500'
						/>
					</Link>
				)}
				{product.status === "new" && (
					<p
						className='absolute top-2 left-2 z-10 text-sm border p-1 rounded-full
                    group-hover:text-shop-light-green group-hover:border-shop-light-green hoverEffect'
					>
						Nowość
					</p>
				)}
			</div>

			<div className='p-4 space-y-2'>
				{product?.categories?.length && (
					<p className='text-xs line-clamp-1 text-gray-500/30 capitalize'>
						{product?.categories?.map(category => category).join(", ")}
					</p>
				)}
				<Title className='text-sm'>{product?.name}</Title>
				<div className='flex items-center gap-2'>
					<div className='flex items-center gap-.5'>
						{[...Array(5)].map((_, index) => (
							<Star
								key={index}
								className={
									index < 4 ? "text-shop-light-green" : "text-gray-300"
								}
								fill={index < 4 ? "currentColor" : "none"}
								size={12}
							/>
						))}
					</div>
					<p className='text-xs tracking-wide'>5 gwiazdek</p>
				</div>
				<div className='flex items-center gap-1'>
					<p className='font-semibold text-xs'>W magazynie:</p>
					<p
						className={` ${product?.stock === 0 ? "text-red-500 text-xs" : "text-shop-light-green/80 font-semibold"}`}
					>
						{(product?.stock as number) > 0 ? product?.stock : "Brak"}
					</p>
				</div>
				<PricingView
					price={product?.price ?? 0}
					discount={product?.discount ?? 0}
					className='text-sm'
				/>
				<AddToCart product={product} className='ctaBtn' />
			</div>
		</div>
	);
};

export default ProductCard;
