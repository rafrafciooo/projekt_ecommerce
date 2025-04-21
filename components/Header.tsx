import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import FavoriteIcon from "./FavoriteIcon";
import SignIn from "./SignIn";
import MobileNav from "./MobileNav";
import { currentUser } from "@clerk/nextjs/server";

import { ClerkLoaded } from "@clerk/nextjs";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Header = async () => {
	const user = await currentUser();

	return (
		<header className='py-4 sticky top-0 z-50 backdrop-blur-md'>
			<Container className='flex items-center justify-between text-lightColor'>
				<div className='w-auto md:w-1/3 flex items-center gap-4 justify-start md:gap-0'>
					<MobileNav />
					<Logo />
				</div>
				<Navbar />
				<div className='w-auto md:w-1/3 flex items-center gap-4 justify-end-safe'>
					<SearchBar />
					<CartIcon />
					<FavoriteIcon />
					<div className=''>
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
