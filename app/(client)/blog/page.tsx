import Container from "@/components/Container";
import { Title } from "@/components/ui/text";

import { urlFor } from "@/sanity/lib/image";
import { getAllBlogs } from "@/sanity/queries";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import React from "react";

const BlogPage = async () => {
	const blogs = await getAllBlogs(6);

	return (
		<Container>
			<Title className='mt-10'>Wszystkie wpisy</Title>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5 md:my-10'>
				{blogs?.map(blog => (
					<div key={blog._id} className='rounded-md overflow-hidden group'>
						{blog?.mainImage && (
							<Link href={`/blog/${blog?.slug?.current}`}>
								<Image
									src={urlFor(blog.mainImage).url()}
									alt={`Zdjęcie główne do wpisu: ${blog?.title}`}
									width={300}
									height={300}
									className='w-full max-h-70 object-cover'
								/>
							</Link>
						)}
						<div className='bg-gray-100 p-5 rounded-b-md'>
							<div className='text-xs flex items-center gap-5'>
								<div className='flex items-center relative group cursor-pointer'>
									{blog?.blogcategories?.map((item, index) => (
										<p
											key={index}
											className='font-semibold text-shop-dark-green tracking-wider'
										>
											{item?.title}
										</p>
									))}
									<span className='absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-[2px] group-hover:bg-shop-dark-green hover:cursor-pointer hoverEffect' />
								</div>
								<p className='flex items-center gap-1 text-lightColor relative group hover:cursor-pointer hover:text-shop-dark-green hoverEffect'>
									<Calendar size={15} />{" "}
									{dayjs(blog.publishedAt).format("MMMM D, YYYY")}
									<span className='absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-[2px] group-hover:bg-shop-dark-green hoverEffect' />
								</p>
							</div>
							<Link
								href={`/blog/${blog?.slug?.current}`}
								className='text-base font-bold tracking-wide mt-5 line-clamp-2 hover:text-shop-dark-green hoverEffect'
							>
								{blog?.title}
							</Link>
						</div>
					</div>
				))}
			</div>
		</Container>
	);
};

export default BlogPage;
