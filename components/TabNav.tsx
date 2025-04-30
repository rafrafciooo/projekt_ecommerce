import { productType } from "@/constants/data";
import Link from "next/link";
import React from "react";

interface TabNavProps {
	selectedTab: string;
	onTabSelect: (tab: string) => void;
}

const TabNav = ({ selectedTab, onTabSelect }: TabNavProps) => {
	return (
		<div className='flex justify-center md:justify-between items-center flex-wrap gap-2'>
			<div className='flex items-center gap-1 md:gap-3 text-sm'>
				{productType.map((item, index) => (
					<button
						onClick={() => onTabSelect(item.value)}
						key={index}
						className={`border border-shop-light-green/30 px-6 py-2 rounded-full hover:bg-shop-light-green hover:text-white hoverEffect ${selectedTab === item.value ? "bg-shop-light-green text-white" : "bg-shop-light-green/10"}`}
					>
						{item.title}
					</button>
				))}
			</div>
			<div className='flex justify-center items-center'>
				<Link
					href='/sklep'
					className='border border-shop-light-green/30 py-2 px-6 rounded-full hover:bg-shop-light-green hover:text-white hoverEffect '
				>
					Zobacz wszystko
				</Link>
			</div>
		</div>
	);
};

export default TabNav;
