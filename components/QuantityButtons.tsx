import { Product } from "@/sanity.types";
import useStore from "@/store";
import React from "react";
import { Button } from "./ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface Props {
	product: Product;
	className?: string;
}

const QuantityButtons = ({ product, className }: Props) => {
	const { addItem, removeItem, getItemCount } = useStore();
	const itemCount = getItemCount(product?._id);
	const isOutOfStock = product?.stock === 0;

	const handleRemoveProduct = () => {
		removeItem(product?._id);
		if (itemCount > 1) {
			toast.success(`Liczba produktów zmniejszona w koszyku!`);
		} else {
			toast.success(`Produkt został usunięty z koszyka!`);
		}
	};
	const handleAddProduct = () => {
		if ((product?.stock as number) > itemCount) {
			addItem(product);
			toast.success(`Produkt został dodany do koszyka!`);
		} else {
			toast.error(`Więcej niż ${product?.stock} na ten moment nie posiadamy`);
		}
	};

	return (
		<div className={cn("flex items-center gap-1 pb-1 text-base", className)}>
			<Button
				variant={"outline"}
				size={"icon"}
				disabled={itemCount === 0 || isOutOfStock}
				className='hoverEffect w-6 h-6 hover:bg-shop-light-green/50'
				onClick={handleRemoveProduct}
			>
				<MinusIcon />
			</Button>
			<span className='px-2 text-sm'>{itemCount}</span>
			<Button
				variant={"outline"}
				size={"icon"}
				disabled={isOutOfStock}
				className='hoverEffect w-6 h-6 hover:bg-shop-light-green/50 '
				onClick={handleAddProduct}
			>
				<PlusIcon />
			</Button>
		</div>
	);
};

export default QuantityButtons;
