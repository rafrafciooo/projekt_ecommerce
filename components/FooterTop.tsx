import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import React from "react";

interface ContactItems {
	title: string;
	subtitle: string;
	hours?: string;
	icon: React.ReactNode;
}

const ContactItems: ContactItems[] = [
	{
		title: "Odwiedź nas",
		subtitle: "ul. Demo 1, 00-000 Demo",
		icon: (
			<MapPin className='w-5 h-5 text-gray-600 group-hover:text-primary transition-colors' />
		),
	},
	{
		title: "Zadzwoń",
		subtitle: "123 456 789",
		icon: (
			<Phone className='w-5 h-5 text-gray-600 group-hover:text-primary transition-colors' />
		),
	},
	{
		title: "Napisz do nas",
		subtitle: "demo@demo.pl",
		icon: (
			<MessageCircle className='w-5 h-5 text-gray-600 group-hover:text-primary transition-colors' />
		),
	},
	{
		title: "Godziny otwarcia",
		subtitle: "Poniedziałek - Piątek",
		hours: "9:00 - 18:00",
		icon: (
			<Clock className='w-5 h-5 text-gray-600 group-hover:text-primary transition-colors' />
		),
	},
];

const FooterTop = () => {
	return (
		<div className='grid grid-cols-2 lg:grid-cols-4 gap-5 border-b '>
			{ContactItems.map((item, index) => (
				<div
					key={index}
					className='flex flex-col items-center justify-center gap-3 group hover:bg-gray-50 p-4 transition-colors hoverEffect rounded-3xl text-center'
				>
					{item.icon}
					<div className=''>
						<p className='font-semibold text-gray-600 group-hover:text-darkColor'>
							{item.title}
						</p>
						<p className='text-sm text-gray-600 mt-1 group-hover:text-gray-800 '>
							{item.subtitle}
						</p>
						{item.hours && (
							<p className='text-sm text-gray-600 mt-1 group-hover:text-gray-800 '>
								{item.hours}
							</p>
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export default FooterTop;
