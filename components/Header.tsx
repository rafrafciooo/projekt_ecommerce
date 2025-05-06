import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import Navbar from "./Navbar";

import CartIcon from "./CartIcon";

import SignIn from "./SignIn";
import MobileNav from "./MobileNav";
import { auth, currentUser } from "@clerk/nextjs/server";

import { ClerkLoaded } from "@clerk/nextjs";
import { SignedIn, UserButton } from "@clerk/nextjs";
import FavoriteButton from "./FavoriteButton";
import Link from "next/link";
import { LogsIcon } from "lucide-react";
import { getOrders } from "@/sanity/queries";
import SearchBar from "./SearchBar";

const Header = async () => {
	const user = await currentUser();
	const { userId } = await auth();
	let orders = null;
	if (userId) {
		orders = await getOrders(userId);
	}

	return (
		<header className='py-4 sticky top-0 z-50 backdrop-blur-md'>
			<Container className='flex items-center justify-between text-lightColor'>
				<div className='w-auto md:w-1/3 flex items-center gap-4 justify-start md:gap-0'>
					<MobileNav />
					<Logo />
				</div>
				<Navbar />
				<div className='w-auto md:w-1/3 flex items-center gap-4 justify-end'>
					<SearchBar />
					<CartIcon />
					<FavoriteButton />

					<div className='hidden md:inline-flex gap-5 items-center'>
						<Link
							href='/zamowienia'
							className='relative group hover:text-shop-dark-green hoverEffect'
						>
							<LogsIcon />
							<span className='absolute -top-1 -right-1 bg-shop-dark-green text-white rounded-full h-3.5 w-3.5 text-xs font-semibold flex items-center justify-center'>
								{orders?.length ? orders?.length : 0}
							</span>
						</Link>

						<ClerkLoaded>
							<SignedIn>
								<UserButton />
							</SignedIn>
							{!user && <SignIn />}
						</ClerkLoaded>
					</div>
				</div>
			</Container>
		</header>
	);
};

export default Header;
