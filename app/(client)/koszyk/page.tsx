"use client";

import {
	createCheckoutSession,
	Metadata,
} from "@/actions/createCheckoutSession";
import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";

import NoAccess from "@/components/NoAccess";
import PriceFormat from "@/components/PriceFormat";

import ProductSideMenu from "@/components/ProductSideMenu";
import QuantityButtons from "@/components/QuantityButtons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

import { Title } from "@/components/ui/text";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Address } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import useStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";

import { CreditCard, Loader2, ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartPage = () => {
	const {
		deleteCartProduct,
		getTotalPrice,
		getItemCount,
		getSubTotalPrice,
		resetCart,
	} = useStore();
	const groupedItems = useStore(state => state.getGroupedItems());
	const { isSignedIn } = useAuth();
	// const [isClient, setIsClient] = useState(false);
	const [loading, setLoading] = useState(false);
	const { user } = useUser();
	const [addresses, setAddresses] = useState<Address[] | null>(null);
	const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

	useEffect(() => {
		fetchAdresses();
	}, []);
	const fetchAdresses = async () => {
		setLoading(true);
		try {
			const query = `*[_type=="address"] | order(publishedAt desc)`;
			const data = await client.fetch(query);
			setAddresses(data);

			const defaultAddress = data.find((addr: Address) => addr.default);
			if (defaultAddress) {
				setSelectedAddress(defaultAddress);
			} else if (data.length > 0) {
				setSelectedAddress(data[0]);
			}
		} catch (error) {
			console.log("błąd ladowania adresów", error);
		} finally {
			setLoading(false);
		}
	};
	const handleResetCart = () => {
		const confirmed = window.confirm(
			"Jesteś pewien, że chcesz usunąć wszystkie produkty z koszyka?"
		);
		if (confirmed) {
			resetCart();
			toast.success("Koszyk został zresetowany.");
		}
	};

	const handleCheckout = async () => {
		setLoading(true);
		try {
			const customerEmail = user?.emailAddresses[0]?.emailAddress ?? "Unknown";

			const metadata: Metadata = {
				orderNumber: crypto.randomUUID(),
				customerName: user?.firstName ?? "Unknown",
				customerEmail: customerEmail,
				clerkUserId: user?.id,
				addresses: selectedAddress,
			};

			const checkoutUrl = await createCheckoutSession(groupedItems, metadata);

			if (checkoutUrl) {
				window.location.href = checkoutUrl;
			}
		} catch (error) {
			console.log("Błąd w checkout", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='bg-gray-100 pb-52 md:pb-10'>
			{isSignedIn ? (
				<Container>
					{groupedItems.length > 0 ? (
						<>
							<div className='flex flex-row items-center gap-2 py-5'>
								<ShoppingBag className='text-shop-dark-green' />
								<Title>Twój koszyk</Title>
							</div>
							<div className='grid lg:grid-cols-3 md:gap-8'>
								<div className='lg:col-span-2 rounded-md'>
									<div className='border bg-shop-light-bg rounded-md'>
										{groupedItems?.map(({ product }) => {
											const itemCount = getItemCount(product?._id);
											return (
												<div
													key={product?._id}
													className='border-b p-2 last:border-0 flex items-center justify-between gap-5'
												>
													<div className='flex flex-1 items-start gap-2 h-36 md:h-44'>
														{product?.images && (
															<Link
																href={`/produkty/${product?.slug?.current}`}
																className='border rounded-sm overflow-hidden group'
															>
																<Image
																	src={urlFor(product?.images[0]).url()}
																	alt={product?.name as string}
																	width={500}
																	height={500}
																	loading='lazy'
																	className='w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 hoverEffect'
																/>
															</Link>
														)}
														<div className='h-full flex flex-1 flex-col justify-between py-1'>
															<div className='flex flex-col gap-1 md:gap-2'>
																<h2 className='font-semibold line-clamp-1'>
																	{product?.name}
																</h2>
																<p>
																	Status:{" "}
																	<span className='font-semibold capitalize'>
																		{product?.status}
																	</span>
																</p>
																<p>
																	Kategoria:{" "}
																	<span className='font-semibold capitalize'>
																		{product?.variant}
																	</span>
																</p>
															</div>
															<div className='flex items-center gap-2'>
																<TooltipProvider>
																	<Tooltip>
																		<TooltipTrigger>
																			<ProductSideMenu
																				product={product}
																				className='relative top-0 right-0'
																			/>
																		</TooltipTrigger>
																		<TooltipContent>
																			Dodaj do ulubionych
																		</TooltipContent>
																	</Tooltip>
																	<Tooltip>
																		<TooltipTrigger>
																			<Trash
																				size={18}
																				onClick={() => {
																					deleteCartProduct(product?._id);
																					toast.success(
																						"Produkt usunięty z koszyka"
																					);
																				}}
																				className='cursor-pointer mb-1  hover:text-red-500 hoverEffect'
																			/>
																		</TooltipTrigger>
																		<TooltipContent className='bg-red-500'>
																			Usuń z koszyka
																		</TooltipContent>
																	</Tooltip>
																</TooltipProvider>
															</div>
														</div>
													</div>
													<div className='flex flex-col items-start justify-between h-36 md:h-46'>
														<PriceFormat
															amount={(product?.price as number) * itemCount}
															className='font-extralight italic'
														/>

														<QuantityButtons product={product} />
													</div>
												</div>
											);
										})}
										<div className='flex justify-end p-5'>
											{" "}
											<Button variant='destructive' onClick={handleResetCart}>
												Usuń koszyk
											</Button>
										</div>
									</div>
								</div>
								<div className=''>
									<div className='lg:col-span-1 border bg-shop-light-bg rounded-md'>
										<div className='hidden md:inline-block w-full bg-shop-light-bg p-6 rounded-md'>
											<h3 className='font-semibold mb-4'>Podsumowanie:</h3>
											<div className='space-y-4'>
												<div className='flex justify-between items-center'>
													<span>Kwota:</span>
													<PriceFormat amount={getSubTotalPrice()} />
												</div>
												<div className='flex justify-between items-center'>
													<span>Zniżka:</span>
													<PriceFormat
														amount={getSubTotalPrice() - getTotalPrice()}
													/>
												</div>
												<Separator />
												<div className='flex justify-between items-center font-semibold'>
													<span>Cena Końcowa:</span>
													<PriceFormat amount={getTotalPrice()} />
												</div>
												<Button
													className='ctaBtn w-full  hoverEffect flex items-center justify-center'
													disabled={loading}
													onClick={handleCheckout}
												>
													<span className=''>
														{loading ? "Ładowanie" : "Zapłać online"}
													</span>

													{loading ? (
														<Loader2 className='h-5 w-5 animate-spin' />
													) : (
														<CreditCard className='h-48 w-56' />
													)}
												</Button>
											</div>
										</div>
									</div>
									<>
										{addresses && (
											<Card className='bg-shop-light-bg rounded-md mt-5'>
												<CardHeader>
													<CardTitle>Adres dostawy</CardTitle>
												</CardHeader>
												<CardContent>
													<RadioGroup
														value={selectedAddress?._id.toString()}
														onValueChange={value => {
															const found = addresses.find(
																addr => addr._id.toString() === value
															);
															if (found) setSelectedAddress(found);
														}}
													>
														{addresses.map(address => (
															<div
																key={address._id}
																onClick={() => setSelectedAddress(address)}
																className={`flex items-center space-x-2 mb-4 cursor-pointer ${
																	selectedAddress?._id === address._id
																		? "text-shop-light-green"
																		: ""
																}`}
															>
																<RadioGroupItem
																	value={address._id.toString()}
																/>
																<Label
																	htmlFor={`address-${address._id}`}
																	className='grid gap-1 flex-1'
																>
																	<span className='font-semibold'>
																		{address.name}
																	</span>

																	<span className='text-sm '>
																		ul. {address.address}, {address.city},
																		{address.state}, {address.zip}
																	</span>
																</Label>
															</div>
														))}
													</RadioGroup>
													<Button
														variant={"outline"}
														className='bg-white/40 hover:bg-white w-full mt-4 hoverEffect'
													>
														Nowy adres dostawy
													</Button>
												</CardContent>
											</Card>
										)}
									</>
								</div>
								{/* podsumowanie mobilka */}
								<div className='md:hidden fixed bottom-0 left-0 w-full  pt-2 z-[999]'>
									<div className='border bg-shop-light-bg p-4 rounded-md mx-4 '>
										<h2>podsumiowanie mobilka</h2>
										<div className='space-y-4'>
											<div className='flex justify-between items-center'>
												<span>Kwota:</span>
												<PriceFormat amount={getSubTotalPrice()} />
											</div>
											<div className='flex justify-between items-center'>
												<span>Zniżka:</span>
												<PriceFormat
													amount={getSubTotalPrice() - getTotalPrice()}
												/>
											</div>
											<Separator />
											<div className='flex justify-between items-center font-semibold'>
												<span>Cena Końcowa:</span>
												<PriceFormat amount={getTotalPrice()} />
											</div>
											<Button
												className='ctaBtn w-full hoverEffect flex items-center justify-center'
												disabled={loading}
												onClick={handleCheckout}
											>
												<span className=''>
													{loading ? "Ładowanie" : "Zapłać online"}
												</span>

												{loading ? (
													<Loader2 className='h-5 w-5 animate-spin' />
												) : (
													<CreditCard className='h-5 w-5' />
												)}
											</Button>
										</div>
									</div>
								</div>
							</div>
						</>
					) : (
						<EmptyCart type='cart' />
					)}
				</Container>
			) : (
				<NoAccess />
			)}
		</div>
	);
};

export default CartPage;
