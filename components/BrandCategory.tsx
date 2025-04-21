import React from "react";
import { Title } from "./ui/text";
import Link from "next/link";
import { getAllBrands } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Truck, RotateCw, ShieldCheck, CreditCard } from "lucide-react";

const deliveryData = [
	{
		title: "Wysyłka",
		text: "Wysyłka do całego kraju, w ciągu 24 godzin od płatności.",
		icon: <Truck size={45} />,
	},
	{
		title: "Zwroty",
		text: "Zwroty w ciągu 14 dni od płatności.",
		icon: <RotateCw size={45} />,
	},
	{
		title: "Bezpieczne zakupy",
		text: "Twoje dane są szyfrowane i w pełni bezpieczne.",
		icon: <ShieldCheck size={45} />,
	},
	{
		title: "Szybkie płatności",
		text: "Obsługujemy BLIK, PayU, przelewy i karty.",
		icon: <CreditCard size={45} />,
	},
];

const BrandCategory = async () => {
	const brands = await getAllBrands();
	return (
		<div className='my-10 md:mb-20 rounded-md bg-gray-100 '>
			<div className='flex justify-between items-center p-5'>
				<Title className='text-xl'>Wyszukaj po markach</Title>
				<Link
					href='/sklep'
					className='border border-shop-light-green/30 py-2 px-6 rounded-full hover:bg-shop-light-green hover:text-white hoverEffect '
				>
					DO ZMIANY RWD!!!!!!!
				</Link>
			</div>
			<div className='flex justify-center '>
				<div className=' grid grid-cols-2 md:grid-cols-4  gap-3 '>
					{brands?.map(brand => (
						<Link
							key={brand?._id}
							href={`/marka/${brand?.slug?.current}`}
							className='bg-white w-34 h-24 flex items-center justify-center rounded-md overflow-hidden hover:shadow-lg shadow-shop-light-green/10 hoverEffect'
						>
							<div className=''>
								{brand?.image && (
									<Image
										src={urlFor(brand?.image).url()}
										alt='categoryImage'
										width={500}
										height={500}
										className='w-32 h-20 object-contain'
									/>
								)}
							</div>
						</Link>
					))}
				</div>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-10 gap-4 p-2 py-5'>
				{deliveryData?.map((item, index) => (
					<div
						key={index}
						className='flex items-center gap-5 group hover:text-shop-light-green hoverEffect p-5 hover:bg-gray-50 rounded-md'
					>
						<span className='inline-flex scale-100 group-hover:scale-90 hoverEffect'>
							{" "}
							{item.icon}
						</span>
						<div className='text-sm'>
							<p className='font-semibold text-darkColor/80'>{item.title}</p>
							<p className='text-sm text-lightColor'>{item.text}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default BrandCategory;
