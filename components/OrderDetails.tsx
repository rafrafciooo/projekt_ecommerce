import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import PriceFormat from "./PriceFormat";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

interface OrderDetailsProps {
	order: MY_ORDERS_QUERYResult[number] | null;
	isOpen: boolean;
	onClose: () => void;
}

const OrderDetails = ({ order, isOpen, onClose }: OrderDetailsProps) => {
	if (!order) return null;
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='!max-w-3xl max-h-[90vh] overflow-y-scroll'>
				<DialogHeader>
					<DialogTitle className='text-lg'>
						Szczegóły zamówienia: <br />
						<span className='text-sm font-thin italic'>
							{order.orderNumber}
						</span>
					</DialogTitle>
				</DialogHeader>
				<div className='mt-4'>
					<p>
						<strong>Kupiec:</strong> {order.customerName}
					</p>
					<p>
						<strong>Email:</strong> {order.email}
					</p>
					<p>
						<strong>Data:</strong>{" "}
						{order.orderDate && new Date(order.orderDate).toLocaleDateString()}
					</p>
					<p>
						<strong>Status:</strong>{" "}
						<span className='capitalize text-green-600 font-medium'>
							{order.status === "paid" && "Zapłacono"}
						</span>
					</p>
					<p>
						<strong>Numer Faktury:</strong> {order?.invoice?.number}
					</p>
					{order?.invoice && (
						<Button className='bg-transparent border text-darkColor/80 mt-2 hover:text-darkColor hover:border-darkColor hover:bg-darkColor/10 hoverEffect '>
							{order?.invoice?.hosted_invoice_url && (
								<Link href={order?.invoice?.hosted_invoice_url} target='_blank'>
									Pobierz fakturę
								</Link>
							)}
						</Button>
					)}
				</div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Produkt</TableHead>
							<TableHead>Ilość</TableHead>
							<TableHead>Cena</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{order.products?.map((product, index) => {
							const price = product?.product?.price || 0;
							const discount = product?.product?.discount || 0;
							const discountedPrice = price - (price * discount) / 100;

							return (
								<TableRow key={index}>
									<TableCell className='flex items-center gap-2'>
										{product?.product?.images && (
											<Image
												src={urlFor(product?.product?.images[0]).url()}
												alt='productImage'
												width={50}
												height={50}
												className='border rounded-sm'
											/>
										)}
										{product?.product?.name}
									</TableCell>
									<TableCell>{product?.quantity}</TableCell>
									<TableCell>
										{discount > 0 ? (
											<div className='flex flex-col'>
												<span className='line-through text-gray-500 text-sm'>
													{price.toLocaleString("pl-PL", {
														style: "currency",
														currency: "PLN",
													})}
												</span>
												<span className='text-black font-medium'>
													{discountedPrice.toLocaleString("pl-PL", {
														style: "currency",
														currency: "PLN",
													})}
												</span>
											</div>
										) : (
											<span className='text-black font-medium'>
												{price.toLocaleString("pl-PL", {
													style: "currency",
													currency: "PLN",
												})}
											</span>
										)}
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
				<div className='mt-4 text-right flex items-center justify-end'>
					<div className='w-52 flex flex-col gap-1'>
						{(order?.amountDiscount ?? 0) > 0 && (
							<>
								<div className='w-full flex items-center justify-between'>
									<strong>Cena przed zniżką:</strong>
									<PriceFormat
										amount={
											(order.totalPrice ?? 0) + (order.amountDiscount ?? 0)
										}
										className='text-black'
									/>
								</div>
								<div className='w-full flex items-center justify-between'>
									<strong>Zniżka:</strong>
									<PriceFormat
										amount={order.amountDiscount ?? 0}
										className='text-black'
									/>
								</div>
							</>
						)}
						<div className='w-full flex items-center justify-between'>
							<strong>Do zapłaty:</strong>
							<PriceFormat
								amount={order.totalPrice ?? 0}
								className='text-black font-bold'
							/>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default OrderDetails;
