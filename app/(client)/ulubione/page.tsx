import NoAccess from "@/components/NoAccess";
import WishList from "@/components/WishList";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const WishListPage = async () => {
	const user = await currentUser();
	return (
		<>
			{user ? (
				<WishList />
			) : (
				<NoAccess details='Zaloguj się aby kontynuować i sprawdzić listę ulubionych produktów' />
			)}
		</>
	);
};

export default WishListPage;
