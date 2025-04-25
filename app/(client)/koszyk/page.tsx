"use client";

import Container from "@/components/Container";
import NoAccess from "@/components/NoAccess";
import useStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";

import { useState } from "react";

const CartPage = () => {
	const {
		deleteCartProduct,
		getTotalPrice,
		getItemCount,
		getSubTotalPrice,
		resetCart,
	} = useStore();

	const [isClient, setIsClient] = useState(false);
	const [loading, setLoading] = useState(false);
	const groupedItems = useStore(state => state.getGroupedItems());
	const { isSignedIn } = useAuth();
	const { user } = useUser();
	// const [address, setAddress] = useState<ADDRESS_QUERRYResult | null>(null);
	const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

	return (
		<div className='bg-gray-100 pb-52 md:pb-10'>
			{!isSignedIn ? (
				<Container>
					<p>zalogowany</p>
				</Container>
			) : (
				<NoAccess />
			)}
		</div>
	);
};

export default CartPage;
