import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";

import { SubText, SubTitle } from "./ui/text";
import { CategoriesData, QuickLinks } from "@/constants/data";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Footer = () => {
	return (
		<footer className='border-t'>
			<Container>
				<FooterTop />
				<div className='py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
					<div className='space-y-4'>
						<Logo />
						<SubText>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod
							illum delectus saepe error quam veritatis obcaecati tempore
							provident nam dolorum.
						</SubText>

						<SocialMedia
							className='text-darkColor/50'
							iconClassName='border-darkColor/50 hover:border-shop-dark-green hover:text-shop-light-green'
							tooltipClassName='bg-lightColor/50 text-white'
						/>
					</div>
					<div className=''>
						<SubTitle>Linki</SubTitle>

						<ul className='space-y-2 mt-4'>
							{QuickLinks.map(item => (
								<li key={item?.name}>
									<Link
										href={item?.href}
										className='text-sm hover:text-shop-light-green hoverEffect'
									>
										{item?.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className=''>
						<SubTitle>Kategorie</SubTitle>

						<ul className='space-y-2 mt-4'>
							{CategoriesData.map(item => (
								<li key={item?.title}>
									<Link
										href={`/kategorie/${item?.href}`}
										className='text-sm hover:text-shop-light-green hoverEffect'
									>
										{item?.title}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className='space-y-4'>
						<SubTitle>Newsletter</SubTitle>

						<SubText className=''>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos amet
							consectetur adipisicing elit.
						</SubText>
						<form className='space-y-3'>
							<Input placeholder='demo@demo.pl' type='email' required />

							<Button className='ctaBtn hoverEffect w-full !mt-0'>
								<Link href='/sklep'>Zapisz się</Link>
							</Button>
						</form>
					</div>
				</div>
				<div className='py-6 border-t text-center text-sm text-gray-500'>
					<SubText>
						&copy; {new Date().getFullYear()} All rights reserved by{" "}
						<Link
							href='https://www.cookieweb.pl'
							target='_blank'
							rel='noopener noreferrer'
							className='group hover:text-orange-500 hoverEffect'
						>
							Cookie
							<span className='text-orange-500 group-hover:text-black hoverEffect'>
								Web
							</span>
						</Link>
					</SubText>
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
