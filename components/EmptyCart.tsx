import React from "react";

import { SubText, SubTitle } from "./ui/text";
import Container from "./Container";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "motion/react";

interface EmptyCartProps {
	type: "cart" | "wishlist";
}

const EmptyCart = ({ type }: EmptyCartProps) => {
	const isCart = type === "cart"; // Sprawdzamy, czy to koszyk
	const imageSrc = isCart
		? "/images/emptycart.png"
		: "/images/emptywishlist.png";
	const title = isCart
		? "Wygląda na to, że koszyk jest pusty"
		: "Twoja lista jest pusta";
	const description = isCart
		? "Dodaj produkty do koszyka, żeby je zobaczyć i przejść do podsumowania"
		: "Zapisz swoje ulubione produkty, aby łatwiej do nich wrócić w przyszłości";
	return (
		<Container>
			<div className='flex flex-col items-center justify-center py-12 md:py-32'>
				<div className='flex flex-col items-center justify-center bg-white rounded-md p-8 md:p-10 shadow-lg w-full sm:w-[90%] md:w-[60%] lg:w-[40%] space-y-6'>
					<motion.div
						animate={{
							scale: [0.9, 1, 1, 0.9, 1],
							rotate: [0, 5, -5, 0],
						}}
						transition={{
							duration: 5,
							ease: "easeInOut",
							times: [0, 0.2, 0.5, 0.8, 1],
							repeat: Infinity,
							repeatDelay: 1,
						}}
					>
						<Image
							src={imageSrc}
							alt={isCart ? "emptyCart" : "emptyWishlist"}
							width={200}
							height={200}
						/>
					</motion.div>
					<SubTitle className='text-2xl text-center'>{title}</SubTitle>
					<SubText className='text-center md:text-base'>{description}</SubText>

					<Link href='/sklep' className='w-full'>
						<Button className='ctaBtn w-full'>Przejdź do sklepu</Button>
					</Link>
				</div>
			</div>
		</Container>
	);
};

export default EmptyCart;
