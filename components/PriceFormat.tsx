import { cn } from "@/lib/utils";
import React from "react";

const PriceFormat = ({
	amount,
	className,
	discount = 0,
}: {
	amount: number;
	className?: string;
	discount?: number;
}) => {
	const discountedPrice = amount - (amount * discount) / 100;

	const formattedPrice = discountedPrice.toLocaleString("pl-PL", {
		style: "currency",
		currency: "PLN",
		maximumFractionDigits: 2,
	});

	return (
		<span
			className={cn("text-lg font-bold flex gap-2 items-center", className)}
		>
			{formattedPrice}
		</span>
	);
};

export default PriceFormat;
