import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
	return (
		<div className=' flex items-center justify-center p-20 gap-2 h-full bg-shop-light-bg'>
			<Loader2 className='animate-spin w-10 h-10 text-shop-light-green' />
			<p>Ładowanie produktów</p>
		</div>
	);
};

export default Loader;
