"use client";

import Container from "@/components/Container";
import {
	Card,
	CardHeader,
	CardContent,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import useStore from "@/store";

const SuccessPage = () => {
	const { user } = useUser();
	const { resetCart } = useStore();
	const searchParams = useSearchParams();
	const session_id = searchParams.get("session_id");
	const orderNumber = searchParams.get("orderNumber");

	useEffect(() => {
		if (session_id) resetCart();
	}, [session_id, resetCart]);

	return (
		<Container>
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='flex justify-center items-center min-h-[80vh]'
			>
				<Card className='w-full max-w-md p-6 rounded-2xl shadow-xl bg-gradient-to-br from-shop-light-green/10 via-white to-shop-light-green/40'>
					<CardHeader className='text-center space-y-2'>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
							className='flex justify-center mb-4'
						>
							<div className='w-20 h-20 rounded-full bg-shop-light-green flex items-center justify-center shadow-md'>
								<CheckCircle className='text-white w-12 h-12' />
							</div>
						</motion.div>
						<CardTitle className='text-2xl font-bold text-green-700'>
							Dziękujemy za zamówienie!
						</CardTitle>
						<CardDescription className='text-gray-600 text-sm leading-relaxed'>
							Twoja płatność została pomyślnie przetworzona.
							<br /> Na adres{" "}
							<span className='font-semibold'>
								{user?.emailAddresses[0]?.emailAddress}{" "}
							</span>
							<br /> jest wysłany mail z potwierdzeniem zamówienia.
						</CardDescription>
					</CardHeader>

					<CardContent className='mt-6 text-center'>
						<div className='text-sm text-gray-500'>
							Zamówienie nr:{" "}
							<span className='font-semibold'>
								{orderNumber || "Brak numeru"}
							</span>
						</div>

						<div className='flex flex-col justify-center items-center gap-2 lg:flex-row'>
							<Link href='/'>
								<Button className='ctaBtn w-full'>Wróć na stronę główną</Button>
							</Link>
							<Link href='/zamowienia'>
								<Button
									variant={"outline"}
									className='rounded-full mt-4 px-5 py-2  hoverEffect'
								>
									Sprawdź swoje zamówienia
								</Button>
							</Link>
						</div>
					</CardContent>
				</Card>
			</motion.div>
		</Container>
	);
};

export default SuccessPage;
