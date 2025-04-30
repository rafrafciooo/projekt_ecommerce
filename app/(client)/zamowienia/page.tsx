import Container from "@/components/Container";
import NoProduct from "@/components/NoProduct";
import OrdersComponent from "@/components/OrdersComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getOrders } from "@/sanity/queries";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const OrdersPage = async () => {
	const { userId } = await auth();
	if (!userId) {
		return redirect("/");
	}
	const orders = await getOrders(userId);
	return (
		<Container className='py-10'>
			{orders?.length ? (
				<Card className='w-full'>
					<CardHeader>
						<CardTitle>Historia Zamówień</CardTitle>
					</CardHeader>
					<CardContent>
						<ScrollArea>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Numer Zamówienia</TableHead>{" "}
										<TableHead>Data</TableHead>
										<TableHead className='hidden md:table-cell'>
											Email
										</TableHead>
										<TableHead>Zamawiający</TableHead>
										<TableHead>Kwota</TableHead>
										<TableHead className='hidden md:table-cell'>
											Status
										</TableHead>
										<TableHead className='hidden md:table-cell'>
											Numer Faktury
										</TableHead>
										<TableHead className='text-center'>Akcja</TableHead>
									</TableRow>
								</TableHeader>
								<OrdersComponent orders={orders} />
							</Table>
							<ScrollBar orientation='horizontal' />
						</ScrollArea>
					</CardContent>
				</Card>
			) : (
				<NoProduct type='orders' />
			)}
		</Container>
	);
};

export default OrdersPage;
