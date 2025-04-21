import { HeartIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const FavoriteIcon = () => {
	return (
		<Link href='/ulubione' className='group relative'>
			<HeartIcon className='w-5 h-5 hover:text-shop-light-green hoverEffect' />
			<span className='absolute -top-1 -right-1 bg-shop-dark-green text-white rounded-full h-3.5 w-3.5 text-xs font-semibold flex items-center justify-center'>
				0
			</span>
		</Link>
	);
};

export default FavoriteIcon;
