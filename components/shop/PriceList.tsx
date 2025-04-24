import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Title } from "../ui/text";

interface Props {
	selectedPrice?: string | null;
	setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
}

const priceArray = [
	{ title: "do 100zł", value: "0-100" },
	{ title: "100zł - 200zł", value: "0-200" },
	{ title: "200zł - 300zł", value: "200-300" },
	{ title: "300zł - 400zł", value: "300-400" },
	{ title: "500zł i więcej", value: "500-10000" },
];

const PriceList = ({ selectedPrice, setSelectedPrice }: Props) => {
	return (
		<div className='w-full bg-shop-light-bg/50 p-5'>
			<Title className='text-base font-bold mb-3'>Według ceny:</Title>
			<RadioGroup className='mt-2' value={selectedPrice || ""}>
				{priceArray?.map((price, index) => (
					<div
						key={index}
						onClick={() => setSelectedPrice(price?.value)}
						className='flex items-center space-x-2'
					>
						<RadioGroupItem
							value={price?.value}
							id={price?.value}
							className='rounded-sm'
						/>
						<Label
							htmlFor={price?.value}
							className={`${selectedPrice === price?.value ? "font-bold text-shop-light-green" : "font-normal"} cursor-pointer`}
						>
							{price?.title}
						</Label>
					</div>
				))}

				{selectedPrice && (
					<button
						onClick={() => setSelectedPrice(null)}
						className='text-shop-dark-green/80 underline text-sm text-left font-medium hover:text-shop-dark-green hoverEffect'
					>
						Zresetuj zaznaczone
					</button>
				)}
			</RadioGroup>
		</div>
	);
};

export default PriceList;
