"use client";
import { NavBarItems } from "@/constants/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = ({ className }: { className?: string }) => {
	const pathname = usePathname();
	return (
		<nav
			className={cn(
				"hidden md:inline-flex gap-4 w-1/3 items-center justify-center text-sm capitalize text-lightColor",
				className
			)}
		>
			{NavBarItems.map(item => (
				<Link
					key={item.name}
					href={item.href}
					className={`hover:text-shop-light-green hoverEffect relative group ${
						pathname === item.href && "text-shop-light-green"
					}`}
				>
					{item.name}
					<span
						className={`absolute bottom-[1px] left-1/2 bg-shop-light-green w-0 h-0.5 group-hover:w-1/2 hoverEffect  	${
							pathname === item.href && "w-1/2"
						}`}
					/>
					<span
						className={`absolute bottom-[1px] right-1/2 bg-shop-light-green w-0 h-0.5 group-hover:w-1/2 hoverEffect  	${
							pathname === item.href && "w-1/2"
						}`}
					/>
				</Link>
			))}
		</nav>
	);
};

export default Navbar;
