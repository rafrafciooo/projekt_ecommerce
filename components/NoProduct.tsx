"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

const NoProduct = ({
	selectedTab,
	className,
}: {
	selectedTab?: string;
	className?: string;
}) => {
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
				<h2 className='text-2xl font-bold text-gray-800'>Brak produktów</h2>
			</motion.div>

			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2, duration: 0.5 }}
				className='text-gray-600'
			>
				Przepraszamy, ale nie znaleziono produktów spełniających kryteria dla
				kategorii{" "}
				<span className='text-base font-semibold text-shop-light-green'>
					{selectedTab}
				</span>
				.
			</motion.p>

			<motion.div
				animate={{ scale: [1, 1.1, 1] }}
				transition={{ repeat: Infinity, duration: 1.5 }}
				className='flex items-center space-x-2 text-tech_orange'
			>
				<Loader2 className='w-5 h-5 animate-spin' />
				<span>Wkrótce uzupełnimy zapasy</span>
			</motion.div>
		</div>
	);
};

export default NoProduct;
