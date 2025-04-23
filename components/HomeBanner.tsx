import React from "react";
import { Title } from "./ui/text";
import Link from "next/link";

import Image from "next/image";

const HomeBanner = () => {
	return (
		<div className='relative py-16 md:py-0 bg-shop-light-pink rounded-lg px-10 lg:px-24 flex items-center justify-between'>
			<div className='space-y-5'>
				<Title className='mb-3'>
			Miejsce na twoje hasło reklamowe i promocje
				</Title>
				
					<Link href='/sklep' className="ctaBtn">Zobacz sklep</Link>
				
			</div>
			<div className='relative'>
				<Image
					src='/images/banner/banner.png'
					alt='banner'
					width={1200}
					height={1200}
					className='hidden md:inline-flex w-full h-[200px]'
				/>
			</div>
		</div>
	);
};

export default HomeBanner;
