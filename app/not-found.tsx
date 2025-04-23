import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
	return (
		<div className='bg-gray-100 min-h-screen flex flex-col items-center justify-center px-4'>
			<div className='max-w-md w-full text-center space-y-6'>
				<Logo className='w-40 mx-auto' />

				<h1 className='text-3xl font-bold text-gray-800'>
					Nie znaleziono strony
				</h1>
				<p className='text-gray-600 text-sm'>
					Strona, którą próbujesz otworzyć, nie istnieje lub została
					przeniesiona.
				</p>

				<div className='space-y-4'>
					<Link
						href='/'
						className='block w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition'
					>
						Strona główna
					</Link>
					<Link
						href='/pomoc'
						className='block w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition'
					>
						Pomoc
					</Link>
				</div>

				<p className='text-sm text-gray-500'>
					Masz pytania?{" "}
					<Link href='/kontakt' className='text-blue-600 hover:underline'>
						Skontaktuj się z nami
					</Link>
				</p>
			</div>
		</div>
	);
}
