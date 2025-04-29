"use client";

import useStore from "@/store";
import { useState } from "react";
import Container from "./Container";
import EmptyCart from "./EmptyCart";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

import { Button } from "./ui/button";

import AddToCart from "./AddToCart";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import Link from "next/link";
import PricingView from "./PricingView";
import { Product } from "@/sanity.types";

const WishList = () => {
	const [visibleProducts, setVisibleProducts] = useState(5);
	const { favoriteProduct, removeFromFavorite, resetFavorite } = useStore();
	const loadMore = () =>
		setVisibleProducts(prev => Math.min(prev + 5, favoriteProduct.length));

	const handleResetFavorite = () => {
		const confirmed = window.confirm(
			"Are you sure you want to remove all products from wishlist?"
		);
		if (confirmed) {
			resetFavorite();
			toast.success("All products removed from wishlist");
		}
	};

	return (
		<Container className='py-8'>
			{favoriteProduct.length > 0 ? (
				<>
					{/* Desktop and Tablet View */}
					<div className='hidden sm:block overflow-x-auto'>
						<table className='w-full border-collapse'>
							<thead className='border-b'>
								<tr className='bg-amazonLight/10 rounded-md'>
									<th className='p-2 text-left bg-shop-light-bg  border-r'>
										Zdjęcie
									</th>
									<th className='p-2 text-left hidden md:table-cell bg-shop-light-bg  border-r'>
										Kateogira
									</th>
									<th className='p-2 text-left hidden md:table-cell bg-shop-light-bg  border-r'>
										Typ
									</th>
									<th className='p-2 text-left hidden md:table-cell bg-shop-light-bg  border-r'>
										Status
									</th>
									<th className='p-2 text-left bg-shop-light-bg  border-r'>
										Cena
									</th>
									<th className='p-2 text-center md:text-left bg-shop-light-bg  border-r'>
										Akcje
									</th>
								</tr>
							</thead>
							<tbody>
								{favoriteProduct
									?.slice(0, visibleProducts)
									.map((product: Product) => (
										<tr key={product._id} className='border-b'>
											<td className='py-4 flex items-center gap-2'>
												<X
													onClick={() => {
														removeFromFavorite(product._id);
														toast.success("Produkt usuniety z ulubionych");
													}}
													size={18}
													className='hover:text-shop-orange hoverEffect cursor-pointer'
												/>
												{product?.images && (
													<Link
														href={{
															pathname: `/product/${product?.slug?.current}`,
															query: { id: product?._id },
														}}
														className='border rounded-md group hidden sm:inline-flex'
													>
														<Image
															src={urlFor(product.images[0]).url()}
															alt='productImage'
															width={80}
															height={80}
															className={`rounded-md group-hover:scale-105 hoverEffect h-20 w-20 object-contain ${product?.stock === 0 ? "opacity-50" : ""}`}
														/>
													</Link>
												)}
												<p className='line-clamp-1'>{product?.name}</p>
											</td>
											<td className='p-2 capitalize hidden md:table-cell'>
												{product?.categories && (
													<p className='uppercase line-clamp-1 text-xs font-medium'>
														{product.categories.map(cat => cat).join(", ")}
													</p>
												)}
											</td>
											<td className='p-2 capitalize hidden md:table-cell'>
												{product?.variant}
											</td>

											<td
												className={`p-2 w-24 ${
													(product?.stock as number) > 0
														? "text-green-600"
														: "text-red-600"
												} font-medium text-sm hidden md:table-cell`}
											>
												{(product?.stock as number) > 0
													? "W magazynie"
													: "Brak w magazynie"}
											</td>
											<td className='p-2'>
												<PricingView
													price={product?.price as number}
													discount={product?.discount}
												/>
											</td>
											<td className='p-2'>
												<AddToCart product={product} className='w-full' />
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
					<div className='md:hidden space-y-4'>
						{favoriteProduct
							?.slice(0, visibleProducts)
							.map((product: Product) => (
								<div
									key={product._id}
									className='bg-white rounded-lg shadow-sm p-4 border'
								>
									<div className='flex justify-between items-start mb-3'>
										<Link
											href={{
												pathname: `/product/${product?.slug?.current}`,
												query: { id: product?._id },
											}}
											className='flex-1'
										>
											<h3 className='font-medium line-clamp-2'>
												{product?.name}
											</h3>
										</Link>
										<button
											onClick={() => {
												removeFromFavorite(product._id);
												toast.success("Product removed from wishlist");
											}}
											className='ml-2'
										>
											<X
												size={18}
												className='text-gray-500 hover:text-shop-orange hoverEffect'
											/>
										</button>
									</div>

									<div className='flex items-center gap-3 mb-3'>
										{product?.images && (
											<Link
												href={{
													pathname: `/product/${product?.slug?.current}`,
													query: { id: product?._id },
												}}
												className='border rounded-md flex-shrink-0'
											>
												<Image
													src={urlFor(product.images[0]).url()}
													alt='productImage'
													width={70}
													height={70}
													className={`rounded-md h-[70px] w-[70px] object-contain ${
														product?.stock === 0 ? "opacity-50" : ""
													}`}
												/>
											</Link>
										)}
										<div className='flex-1'>
											{product?.categories && (
												<p className='uppercase text-xs text-gray-500 mb-1'>
													{product.categories.map(cat => cat).join(", ")}
												</p>
											)}
											<p className='text-sm text-gray-600 mb-1'>
												Type:{" "}
												<span className='capitalize'>
													{product?.variant || "N/A"}
												</span>
											</p>
											<p
												className={`text-xs font-medium ${
													(product?.stock as number) > 0
														? "text-green-600"
														: "text-red-600"
												}`}
											>
												{(product?.stock as number) > 0
													? "W magazynie"
													: "Brak w magazynie"}
											</p>
										</div>
									</div>

									<div className='flex justify-between items-center gap-4'>
										<div className='font-medium'>
											<PricingView
												price={product?.price as number}
												discount={product?.discount}
											/>
										</div>
										<AddToCart product={product} className='w-auto' />
									</div>
								</div>
							))}
					</div>

					<div className='mt-8 flex flex-wrap  gap-4'>
						{visibleProducts < favoriteProduct.length && (
							<Button onClick={loadMore} variant='outline' size='sm'>
								Załaduj więcej{" "}
								{visibleProducts < favoriteProduct.length &&
									`(${favoriteProduct.length - visibleProducts})`}
							</Button>
						)}
						{visibleProducts > 6 && (
							<Button
								onClick={() => setVisibleProducts(5)}
								variant='outline'
								size='sm'
							>
								Schowaj ({visibleProducts - 5}) produkty
							</Button>
						)}
						{favoriteProduct.length > 0 && (
							<Button
								variant='destructive'
								size='sm'
								onClick={handleResetFavorite}
								className='text-white'
							>
								Usuń wszystko{" "}
								{favoriteProduct.length > 0 && `(${favoriteProduct.length})`}
							</Button>
						)}
					</div>
				</>
			) : (
				<EmptyCart type='wishlist' />
			)}
		</Container>
	);
};

export default WishList;
