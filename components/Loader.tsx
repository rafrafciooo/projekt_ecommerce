import { Loader2 } from "lucide-react";
import React from "react";

interface LoaderProps {
	text?: string;
}

const Loader = ({ text = "Ładowanie..." }: LoaderProps) => {
	return (
		<div className='flex items-center justify-center p-20 gap-2 h-full bg-shop-light-bg'>
			<Loader2 className='animate-spin w-10 h-10 text-shop-light-green' />
			<p>{text}</p>
		</div>
	);
};

export default Loader;
