"use client";

import React, { FC } from "react";
import Logo from "./Logo";
import { X } from "lucide-react";
import { NavBarItems } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialMedia from "./SocialMedia";
import { useOutsideClick } from "@/hooks";
import {
	ClerkLoaded,
	SignedIn,
	SignedOut,
	UserButton,
	useUser,
} from "@clerk/nextjs";
import SignIn from "./SignIn";

interface SideMenuProps {
	isOpen: boolean;
	onClose: () => void;
}

const SideMenu: FC<SideMenuProps> = ({ isOpen, onClose }) => {
	const pathname = usePathname();
	const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);


	return (
		<div
			className={`fixed inset-y-0 h-screen left-0 z-50 w-full shadow-xl ${
				isOpen ? "translate-x-0" : "-translate-x-full"
			} hoverEffect`}
		>
			<div
				className='min-w-72 max-w-96 h-screen bg-white p-10 border-r flex flex-col gap-6'
				ref={sidebarRef}
			>
				<div className='flex items-center justify-between gap-5'>
					<Logo />

					<button className='hover:text-shop-light-green'>
						<X onClick={onClose} />
					</button>
				</div>

				<div className='flex flex-col space-y-6 font-semibold tracking-wide'>
					{NavBarItems.map(item => (
						<Link
							key={item.name}
							href={item.href}
							onClick={onClose}
							className={`hover:text-shop-light-green hoverEffect ${
								pathname === item.href && "text-shop-light-green"
							}`}
						>
							{item.name}
						</Link>
					))}
				</div>

				<ClerkLoaded>
					{/* Tylko po załadowaniu Clereka */}
					<div className='flex gap-4 items-center'>
						<p>Moje konto: cos z ty mzrobic</p>
						<SignedIn>
							<UserButton />
						</SignedIn>
						<SignedOut>
						<SignIn />
						</SignedOut>
					</div>
					<SocialMedia />
				</ClerkLoaded>
			</div>
		</div>
	);
};

export default SideMenu;
