import "./globals.css";
import { Toaster } from "react-hot-toast";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='pl'>
			<body className='antialiased font-poppins flex flex-col min-h-screen'>
				{children}
				<Toaster
					position='bottom-right'
					toastOptions={{
						style: {
							background: "#333",
							color: "#fff",
						},
					}}
				/>
			</body>
		</html>
	);
};

export default RootLayout;
