import React from "react";
import { Title } from "./ui/text";

import { getLatestBlogs } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { Calendar, Smile } from "lucide-react";
import dayjs from "dayjs";

const LatestPostBlog = async () => {
	const blogs = await getLatestBlogs();

	return (
		<div className='mb-10 md:mb-20'>
			<Title className='mb-5'>
				Ostatnie posty
				{/* <span className='absolute left-0 -bottom-1 bg-lightColor/20 inline-block w-10 h-[1px] group-hover:bg-shop-dark-green hoverEffect' /> MOZE COSD TAKIEGO?*/}
			</Title>
			{!blogs || blogs.length === 0 ? (
				<div className='flex flex-row items-center justify-center space-x-2'>
					<p className='text-gray-600 text-center'>Wkrótce pojawią się wpisy</p>
					<Smile />
				</div>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-5'>
					{blogs?.map(blog => (
						<div key={blog?._id} className='overflow-hidden rounded-lg'>
							{blog?.mainImage && (
								<Link href={`/blog/${blog?.slug?.current}`}>
									<Image
										src={urlFor(blog?.mainImage).url()}
										alt={blog?.title || "Obrazek z bloga"}
										width={500}
										height={500}
										className='w-full max-h-40 object-cover'
									/>
								</Link>
							)}
							<div className='bg-shop-light-bg p-5 overflow-hidden rounded-lg'>
								<div className='text-xs flex items-center gap-5 '>
									<div className='flex items-center relative group cursor-pointer'>
										{blog?.blogcategories?.map((item, index) => (
											<p key={index} className=' font-semibold tracking-wide'>
												{item?.title}
											</p>
										))}
										<span className='absolute left-0 -bottom-1 bg-lightColor/20 inline-block w-full h-[1px] group-hover:bg-shop-dark-green hoverEffect' />
									</div>
									<p className='flex items-center gap-1 relative group cursor-pointer'>
										<Calendar size={15} />
										{dayjs(blog?.publishedAt).format("DD-MM-YYYY")}
										<span className='absolute left-0 -bottom-1 bg-lightColor/20 inline-block w-full h-[1px] group-hover:bg-shop-dark-green hoverEffect' />
									</p>
								</div>
								<Link
									href={`/blog/${blog?.slug?.current}`}
									className=' block hover:text-shop-light-green hoverEffect mt-5 font-semibold'
								>
									{blog?.title}
								</Link>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default LatestPostBlog;
