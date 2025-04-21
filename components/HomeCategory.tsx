import React from "react";
import { Title } from "./ui/text";
import { Separator } from "./ui/separator";
import { Category } from "@/sanity.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

const HomeCategory = ({ categories }: { categories: Category[] }) => {
	return (
		<div className='my-10 md:my-20'>
			<Title className='text-xl mb-3'>Popularne kategorie</Title>
			<Separator />
			<div className='mt-5 grid grid-cols-2 md:grid-cols-3 gap-5'>
				{categories?.map(category => (
					<Link
						key={category?._id}
						href={`/kategoria/${category?.slug?.current}`}
					>
						<div className='p-5 bg-shop-light-bg flex items-center gap-3 group rounded-lg border border-transparent hover:border-shop-light-green hoverEffect '>
							{category?.image && (
								<div className='overflow-hidden w-20 h-20 group-hover:scale-105 hoverEffect'>
									<Image
										src={urlFor(category?.image).url()}
										alt='categoryImage'
										width={500}
										height={500}
										className='w-full h-full hoverEffect'
									/>
								</div>
							)}
							<div className='space-y-2'>
								<h3 className='text-base font-semibold'>{category?.title}</h3>
								<p className='text-xs'>
									<span className='font-bold text-shop-dark-green'>{`(${category?.productCount})`}</span>{" "}
									dostepne przedmioty
								</p>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default HomeCategory;
