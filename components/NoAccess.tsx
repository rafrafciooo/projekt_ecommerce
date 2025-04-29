import React from "react";
import Logo from "./Logo";
import { Button } from "./ui/button";
import Container from "./Container";
import { SubText, SubTitle } from "./ui/text";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

const NoAccess = ({ details }: { details?: string }) => {
	return (
		<Container>
			<div className='flex flex-col items-center justify-center py-12 md:py-32'>
				<div className='flex flex-col items-center justify-center bg-white rounded-md p-8 md:p-10 shadow-lg w-full sm:w-[90%] md:w-[60%] lg:w-[40%] space-y-6'>
					<Logo />
					<SubTitle className='text-2xl'>Witaj ponownie</SubTitle>
					<SubText className='text-center md:text-base'>
						{details
							? details
							: "Zaloguj się, aby kontynuować. I nie strać swoich ulubionych produktów"}
					</SubText>
					<div className='flex flex-col w-full gap-4'>
						<SignInButton mode='modal'>
							<Button className='ctaBtn w-full'>Zaloguj</Button>
						</SignInButton>
					</div>
					<div className='flex items-center justify-center w-full gap-2 text-sm'>
						<p className='text-gray-400'>Nie masz konta?</p>
						<SignUpButton mode='modal'>
							<span className='text-primary underline cursor-pointer'>
								Zarejestruj
							</span>
						</SignUpButton>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default NoAccess;
