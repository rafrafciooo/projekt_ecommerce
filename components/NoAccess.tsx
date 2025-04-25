import React from "react";
import Logo from "./Logo";
import { Button } from "./ui/button";
import Container from "./Container";
import { SubText, SubTitle } from "./ui/text";

const NoAccess = () => {
	return (
		<Container>
			<div className='flex flex-col items-center justify-center h-screen'>
				<div className='flex flex-col items-center justify-center bg-white rounded-md p-8 md:p-10 shadow-lg w-full sm:w-[90%] md:w-[60%] lg:w-[40%]'>
					<Logo />
					<SubTitle className='mt-4 text-2xl'>Witaj ponownie</SubTitle>
					<SubText className='text-center md:text-base'>
						Zaloguj się, aby kontynuować.
						<br /> I nie stracić swoich ulubionych produktów
					</SubText>
					<div className='mt-4 flex flex-col gap-4 w-full'>
						<Button className='ctaBtn w-full'>Zaloguj</Button>
						<p className='text-center text-gray-400 text-xs'>
							nie masz konta?
						</p>
					</div>
					<Button variant={"outline"} className='w-full rounded-full mt-4'>
						Zarejestruj
					</Button>
				</div>
			</div>
		</Container>
	);
};

export default NoAccess;
