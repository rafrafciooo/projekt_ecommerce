"use client";

import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import React, { useState } from "react";
import { TableBody, TableCell, TableRow } from "./ui/table";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";
import { format } from "date-fns";
import { X } from "lucide-react";
import OrderDetails from "./OrderDetails";
import toast from "react-hot-toast";

const OrdersComponent = ({ orders }: { orders: MY_ORDERS_QUERYResult }) => {
	const [selectedOrder, setSelectedOrder] = useState<
		MY_ORDERS_QUERYResult[number] | null
	>(null);
	const handleSelectedOrder = (order: MY_ORDERS_QUERYResult[number]) => {
		setSelectedOrder(order);
	};

	const handleDelete = () => {
		toast.error("To jest tylko demo, nie ma mozliwosci usuniecia zamówienia");
	};

	return (
		<>
			<TableBody>
				<TooltipProvider>
					{orders?.map(order => (
						<Tooltip key={order?.orderNumber}>
							<TooltipTrigger asChild>
								<TableRow
									onClick={() => handleSelectedOrder(order)}
									className='cursor-pointer hover:bg-shop-light-bg hoverEffect'
								>
									<TableCell className='font-medium w-[100px]'>
										{order.orderNumber?.slice(-10) ?? "0000000000"}
									</TableCell>
									<TableCell className=''>
										{order.orderDate &&
											format(new Date(order.orderDate), "dd-MM-yyyy")}
									</TableCell>
									<TableCell className='hidden md:table-cell'>
										{order.email}
									</TableCell>
									<TableCell>{order.customerName}</TableCell>
									<TableCell className='font-semibold'>
										{order.totalPrice?.toFixed(2)} zł
									</TableCell>
									<TableCell className='hidden md:table-cell'>
										{order?.status && (
											<span
												className={`px-2 py-1 rounded-full text-xs font-semibold ${
													order.status === "paid"
														? "bg-green-100 text-green-800"
														: "bg-red-500 text-red-100"
												}`}
											>
												{order.status === "paid" && "Zapłacono"}
											</span>
										)}
									</TableCell>
									<TableCell className='hidden md:table-cell'>
										{order?.invoice && (
											<p>
												{order?.invoice ? order?.invoice?.number : "000000"}
											</p>
										)}
									</TableCell>
									<TableCell
										onClick={e => {
											e.stopPropagation();
											handleDelete();
										}}
										className='flex items-center justify-center group'
									>
										<X
											size={20}
											className='group-hover:text-shop-light-green'
										/>
									</TableCell>
								</TableRow>
							</TooltipTrigger>
							<TooltipContent>
								<p>Kliknij by zobaczyc szczegóły zamówienia</p>
							</TooltipContent>
						</Tooltip>
					))}
				</TooltipProvider>
			</TableBody>
			<OrderDetails
				order={selectedOrder}
				isOpen={!!selectedOrder}
				onClose={() => setSelectedOrder(null)}
			/>
		</>
	);
};

export default OrdersComponent;
