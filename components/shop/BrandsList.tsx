import { BRANDS_QUERYResult } from '@/sanity.types';
import React from 'react'
import { Title } from '../ui/text';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

interface Props {
    brands: BRANDS_QUERYResult;
    selectedBrand?: string | null;
    setSelectedBrand: React.Dispatch<React.SetStateAction<string | null>>;
}

const BrandsList = ({ brands, selectedBrand, setSelectedBrand }: Props) => {
    return (
		<div className='w-full bg-shop-light-bg/50 p-5'>
			<Title className='text-base font-bold mb-3'>Według Marki:</Title>
			<RadioGroup
				value={selectedBrand || ""}
				onValueChange={setSelectedBrand}
                className="mt-2"
			>
				{brands?.map(brand => (
					<div
						key={brand?._id}
						className='flex items-center space-x-2'
						onClick={() =>
							setSelectedBrand(brand?.slug?.current as string)

                            
						}
					>
						<RadioGroupItem
							value={brand?.slug!.current as string}
							id={brand?.slug!.current}
							className='rounded-sm'
						/>
						<Label
							htmlFor={brand?.slug!.current}
							className={`${selectedBrand === brand?.slug?.current ? "font-bold text-shop-light-green" : "font-normal"} cursor-pointer`}
						>
							{brand?.title}
						</Label>
					</div>
				))}
                {selectedBrand && <button 
                onClick={() => setSelectedBrand(null)}
                className='text-shop-dark-green/80 underline text-sm text-left font-medium hover:text-shop-dark-green hoverEffect'
                >Zresetuj zaznaczone</button>}
			</RadioGroup>
		</div>
	);
}

export default BrandsList