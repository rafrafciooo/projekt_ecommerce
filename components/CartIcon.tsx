"use client";

import useStore from "@/store";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

const CartIcon = () => {
	const { items } = useStore();
	return (
		<Link href='/koszyk' className='group relative'>
			<ShoppingBag className='w-5 h-5 hover:text-shop-light-green hoverEffect' />
			<span className='absolute -top-1 -right-1 bg-shop-dark-green text-white rounded-full h-3.5 w-3.5 text-xs font-semibold flex items-center justify-center'>
				{items?.length ? items?.length : 0}
			</span>
		</Link>
	);
};

export default CartIcon;
