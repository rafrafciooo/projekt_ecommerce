import "./globals.css";
const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='pl'>
			<body className='antialiased font-poppins flex flex-col min-h-screen'>
				{children}
			</body>
		</html>
	);
};

export default RootLayout;
