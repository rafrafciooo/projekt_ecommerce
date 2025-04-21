"use client";
import { AlignLeft } from "lucide-react";
import React, { useState } from "react";
import SideMenu from "./SideMenu";

const MobileNav = () => {
	const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

	return (
		<>
			<button onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}>
				<AlignLeft className='hover:text-darkColor hoverEffect md:hidden cursor-pointer ' />
			</button>

		

			<SideMenu
				isOpen={isSideMenuOpen}
				onClose={() => setIsSideMenuOpen(false)}
			/>
		</>
	);
};

export default MobileNav;
