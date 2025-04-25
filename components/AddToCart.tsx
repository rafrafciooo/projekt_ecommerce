"use client";
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import React from "react";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import useStore from "@/store";
import toast from "react-hot-toast";
import PriceFormat from "./PriceFormat";

const AddToCart = ({
	product,
	className,
}: {
	product: Product;
	className?: string;
}) => {
	const { addItem, getItemCount } = useStore();
	const itemCount = getItemCount(product?._id);

	const isOutOfStock = product?.stock === 0;
	const handleAddToCart = () => {
		if ((product?.stock as number) > itemCount) {
			addItem(product);
			toast.success(`Produkt został dodany do koszyka!`, {
				duration: 2000,
			});
		} else {
			toast.error(`Brak większej ilości produktów!`, {
				duration: 2000,
			});
		}
		// wariant z nazwa albo po prostu produkt
		// toast.success(`${product?.name?.substring(0,12)}... został dodany do koszyka !`, {
		//	duration: 2000,
		// dodać "zobacz koszyk" na toast
	};

	return (
		<>
			{itemCount ? (
				<div className='text-sm w-full '>
					<div>
						<span className='text-xs font-semibold'>quantity</span>
						buttons
					</div>
					<div className='flex items-center justify-between  border-t pt-1'>
						<span className='text-xs font-semibold'>subtotal</span>
						<PriceFormat
						className="text-sm"
							amount={product?.price ? product?.price * itemCount : 0}
						/>
					</div>
				</div>
			) : (
				<Button
					onClick={handleAddToCart}
					disabled={isOutOfStock}
					className={cn("ctaBtn hoverEffect", className)}
				>
					<ShoppingBag />
					{isOutOfStock ? "Brak w magazynie" : "Dodaj do koszyka"}
				</Button>
			)}
		</>
	);
};

export default AddToCart;
