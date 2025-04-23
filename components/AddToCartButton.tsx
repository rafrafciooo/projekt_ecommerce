import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import { HeartIcon } from "lucide-react";
import React from "react";

const AddToCartButton = ({
	product,
	className,
}: {
	product: Product;
	className?: string;
}) => {
	return (
		<div className={cn("absolute top-2 right-2 z-10 hoverEffect", className)}>
			<button
				className={`p-1.5 rounded-full hover:bg-red-600 hover:text-white hoverEffect bg-[#f1f3f8] text-black`}
			>
				<HeartIcon size={18} />
				
			</button>
		</div>
	);
};

export default AddToCartButton;
