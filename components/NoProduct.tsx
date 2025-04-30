"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { FileX, Loader2 } from "lucide-react";

import Link from "next/link";

type NoProductProps = {
	type?: "orders" | "default";
	selectedTab?: string;
	className?: string;
};

const NoProduct = ({
	type = "default",
	selectedTab,
	className,
}: NoProductProps) => {
	const isOrders = type === "orders";

	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10",
				className
			)}
		>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				{isOrders && <FileX className='h-20 w-20 text-gray-400 mb-4 mx-auto' />}
				<h2 className='text-2xl font-bold text-gray-800'>
					{isOrders ? "Brak zamówień" : "Brak produktów"}
				</h2>
			</motion.div>

			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2, duration: 0.5 }}
				className='text-gray-600'
			>
				{isOrders ? (
					"Nie złożyłeś jeszcze żadnego zamówienia."
				) : (
					<>
						Przepraszamy, ale nie znaleziono produktów spełniających kryteria
						dla{" "}
						<span className='text-base font-semibold text-shop-light-green'>
							{selectedTab}
						</span>
						.
					</>
				)}
			</motion.p>

			{!isOrders && (
				<motion.div
					animate={{ scale: [1, 1.1, 1] }}
					transition={{ repeat: Infinity, duration: 1.5 }}
					className='flex items-center space-x-2 text-tech_orange'
				>
					<Loader2 className='w-5 h-5 animate-spin' />
					<span>Wkrótce uzupełnimy zapasy</span>
				</motion.div>
			)}
			{isOrders && (
				<Link href={"/sklep"} className='ctaBtn !w-1/3'>
					Przejdź do sklepu
				</Link>
			)}
		</div>
	);
};

export default NoProduct;
