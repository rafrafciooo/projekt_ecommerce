"use client";
import {
	internalGroqTypeReferenceTo,
	SanityImageCrop,
	SanityImageHotspot,
} from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
	images?: Array<{
		asset?: {
			_ref: string;
			_type: "reference";
			_weak?: boolean;
			[internalGroqTypeReferenceTo]?: "sanity.imageAsset";
		};
		hotspot?: SanityImageHotspot;
		crop?: SanityImageCrop;
		_type: "image";
		_key: string;
	}>;
	isStock?: number;
	name?: string;
}

const ImageView = ({ images = [], isStock, name }: Props) => {
	const [active, setActive] = useState(images[0]);

	return (
		<div className=' w-full md:w-1/2 space-y-2 md:space-y-4 '>
			<AnimatePresence mode='wait'>
				<motion.div
					key={active?._key}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
					className='w-full max-h-[550px] min-h-[450px] overflow-hidden border border-darkColor/10 rounded-lg group'
				>
					<Image
						src={urlFor(active).url()}
						width={500}
						height={500}
						alt={`Zdjęcie produktu: ${name}`}
						priority
						className={`w-full h-96 max-h-[550px] object-contain group-hover:scale-105 hoverEffect rounded-lg ${isStock === 0 ? "opacity-50 " : ""}`}
					/>
				</motion.div>
			</AnimatePresence>
			<div className='grid grid-cols-6 gap-2 h-20 lg:h-24'>
				{images?.map(image => (
					<button
						key={image._key}
						onClick={() => setActive(image)}
						className={`border rounded-md overflow-hidden hover:scale-95 ${active?._key === image._key ? "border-shop-light-green opacity-100" : "opacity-60"}`}
					>
						<Image
							src={urlFor(image).url()}
							width={100}
							height={100}
							alt={`Thumbnail ${image._key}`}
							className='w-full h-auto object-contain '
						/>
					</button>
				))}
			</div>
		
		</div>
	);
};

export default ImageView;

{
}
