"use client";
import React from "react";
import { Button } from "./ui/button";
import { SignInButton } from "@clerk/nextjs";

const SignIn = () => {
	return (
		<SignInButton mode='modal'>
			<Button
				className='font-semibold text-lightColor cursor-pointer'
				variant='ghost'
			>
				Zaloguj
			</Button>
		</SignInButton>
	);
};

export default SignIn;
