import { Category } from "@/sanity.types";

import React from "react";
import { Title } from "../ui/text";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface Props {
	categories: Category[];
	selectedCategory?: string | null;
	setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const CategoryList = ({
	categories,
	selectedCategory,
	setSelectedCategory,
}: Props) => {
	return (
		<div className='w-full bg-shop-light-bg/50 p-5'>
			<Title className='text-base font-bold mb-3'>Kategorie:</Title>
			<RadioGroup
				value={selectedCategory || ""}
				onValueChange={setSelectedCategory}
				className='mt-2'
			>
				{categories?.map(category => (
					<div
						key={category?._id}
						className='flex items-center space-x-2'
						onClick={() =>
							setSelectedCategory(category?.slug?.current as string)
						}
					>
						<RadioGroupItem
							value={category?.slug!.current as string}
							id={category?.slug!.current}
							className='rounded-sm'
						/>
						<Label
							htmlFor={category?.slug!.current}
							className={`${selectedCategory === category?.slug?.current ? "font-bold text-shop-light-green" : "font-normal"} cursor-pointer`}
						>
							{category?.title}
						</Label>
					</div>
				))}
				{selectedCategory && (
					<button
						onClick={() => setSelectedCategory(null)}
						className='text-shop-dark-green/80 underline text-sm text-left font-medium hover:text-shop-dark-green hoverEffect'
					>
						Zresetuj zaznaczone
					</button>
				)}
			</RadioGroup>
		</div>
	);
};

export default CategoryList;
