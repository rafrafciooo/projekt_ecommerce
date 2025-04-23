import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Logo = ({
	className,
	spanClass,
}: {
	className?: string;
	spanClass?: string;
}) => {
	return (
		<Link href='/' className='inline-flex'>
			<h2
				className={cn(
					"text-2xl text-shop-dark-green font-black tracking-wider cursor-pointer uppercase hover:text-shop-light-green hoverEffect group font-sans",
					className
				)}
			>
				Twoje
				<span
					className={cn(
						"group-hover:text-shop-dark-green text-shop-light-green hoverEffect",
						spanClass
					)}
				>
					Logo
				</span>
			</h2>
		</Link>
	);
};

export default Logo;
