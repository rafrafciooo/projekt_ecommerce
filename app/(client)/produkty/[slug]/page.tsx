import AddToCart from "@/components/AddToCart";

import Container from "@/components/Container";
import FavoriteButton from "@/components/FavoriteButton";

import ImageView from "@/components/ImageView";
import PricingView from "@/components/PricingView";
import ProductCharacteristics from "@/components/ProductCharacteristics";
import { SubText, Title } from "@/components/ui/text";
import { Product } from "@/sanity.types";

import { getProductDetails } from "@/sanity/queries";
import {
	CornerDownLeft,
	HeartCrackIcon,
	LucideCalendar,
	PackagePlus,
	ShieldXIcon,
	StarIcon,
	Truck,
} from "lucide-react";

import React from "react";

const data = [
	{
		title: "Lorem",

		icon: <HeartCrackIcon size={30} />,
	},
	{
		title: "Lorem2",

		icon: <PackagePlus size={30} />,
	},
	{
		title: "Lorem3 ",

		icon: <ShieldXIcon size={30} />,
	},
	{
		title: "lorem4",

		icon: <LucideCalendar size={30} />,
	},
];

const SingleProductPage = async ({ params }: { params: { slug: string } }) => {
	const { slug } = await params;
	const productDetails = await getProductDetails({ slug });

	if (!productDetails || productDetails.price === undefined) {
		throw new Error("Nieprawidłowy produkt lub brak ceny.");
	}

	return (
		<Container>
			<div className='flex flex-col md:flex-row gap-10 pt-10 pb-5'>
				{productDetails?.images && (
					<ImageView
						images={productDetails?.images}
						isStock={productDetails?.stock}
					/>
				)}

				<div className='w-full md:w-1/2 flex flex-col gap-6'>
					<div className='space-y-2 '>
						<Title>{productDetails?.name}</Title>
						<SubText>{productDetails?.description}</SubText>
						<div className='flex items-center gap-1 text-xs'>
							{[...Array(5)].map((_, i) => (
								<StarIcon
									key={i}
									size={12}
									className='text-shop-light-green'
									fill='currentColor'
								/>
							))}
							<p className='font-semibold'>{`(10)`}</p>
						</div>
					</div>
					<div className='space-y-2 border-t border-b border-gray-200 py-4'>
						<PricingView
							price={productDetails.price}
							discount={productDetails?.discount}
						/>
						<p
							className={`text-sm px-6 py-1 inline-block text-center ${productDetails?.stock === 0 ? "bg-red-100 text-red-600" : "bg-green-100 "}`}
						>
							{(productDetails?.stock as number) > 0
								? "W magazynie"
								: "Brak w magazynie"}
						</p>
						<div className='flex items-center  gap-3 '>
							<AddToCart
								product={productDetails as Product}
								className='w-[90%]'
							/>
							<FavoriteButton
								product={productDetails as Product}
								showProduct={true}
							/>
						</div>
					</div>
					<ProductCharacteristics product={productDetails as Product} />
					{/* udostepnij, zadaj pytanie itp */}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 p-2 py-5'>
						{data?.map((item, index) => (
							<div
								key={index}
								className='flex items-center gap-5 group hover:text-shop-light-green hoverEffect p-5 hover:bg-gray-50 rounded-md'
							>
								<span className='inline-flex scale-100 group-hover:scale-90 hoverEffect'>
									{" "}
									{item.icon}
								</span>
								<div className='text-sm'>
									<p className='font-semibold text-darkColor/80'>
										{item.title}
									</p>
								</div>
							</div>
						))}
					</div>
					{/* dostawa zwroty */}
					<div className='flex flex-col'>
						<div className='border border-tech_light_color/25 border-b-0 p-3 flex items-center gap-2.5'>
							<Truck size={30} className='text-tech_orange' />
							<div>
								<p className='text-base font-semibold text-black'>Dostawa</p>
								<p className='text-sm text-gray-500 underline underline-offset-2'>
									Wprowadź kod pocztowy, aby sprawdzić dostępność.
								</p>
							</div>
						</div>
						<div className='border border-tech_light_color/25 p-3 flex items-center gap-2.5'>
							<CornerDownLeft size={30} className='text-tech_orange' />
							<div>
								<p className='text-base font-semibold text-black'>Zwroty</p>
								<p className='text-sm text-gray-500 '>
									Darmowe zwroty w ciągu 14 dni od płatności
									<span className='underline underline-offset-2'>Details</span>
								</p>
							</div>
						</div>
					</div>
					{/* tabsy specyfikacja, opinie i inne tkaie */}
				</div>
			</div>
			{/* tabsy specyfikacja, opinie i inne tkaie */}
			<div className='bg-amber-200 w-full h-52'>
				tu cos bedzie pozniej w tabach
			</div>
		</Container>
	);
};

export default SingleProductPage;
