import { cn } from "@/lib/utils";
import React from "react";

const PriceFormat = ({
	amount,
	className,
}: {
	amount: number;
	className?: string;
}) => {
	const formattedPrice = Number(amount).toLocaleString("us-US", {
		style: "currency",
		currency: "PLN",

		maximumFractionDigits: 2,
	});

	return (
		<span className={cn("text-lg font-bold", className)}>{formattedPrice}</span>
	);
};

export default PriceFormat;
