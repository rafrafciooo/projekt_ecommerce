import PriceFormat from "./PriceFormat";

interface Props {
	price: number;
	discount?: number 
	className?: string;
}

const PricingView = ({ price, discount}: Props) => {
	return (
		<div className='flex items-center gap-2'>
		<PriceFormat
		amount={
			discount ? price - (discount * price) / 100 : price
		}
		className='text-shop-dark-green'
	/>
			{price && discount && (
				<PriceFormat
					amount={price}
					className='line-through text-xs font-normal text-lightColor'
				/>
			)}
		</div>
	);
};

export default PricingView;
