"use client";
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import React from "react";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";

const AddToCart = ({
	product,
	className,
}: {
	product: Product;
	className?: string;
}) => {
	const isOutOfStock = product?.stock === 0;
const handleAddToCart = () => {
    console.log("add to cart")
}



	return (
		<Button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className={cn("ctaBtn hoverEffect", className)}>
			<ShoppingBag />
			{isOutOfStock ? "Brak w magazynie" : "Dodaj do koszyka"}
		</Button>
	);
};

export default AddToCart;
