import { cn } from "@/lib/utils";

const Title = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<h2
			className={cn(

				"relative text-2xl tracking-wide font-bold text-shop-dark-green font-sans text-wrap ",
				className
			)}
		>
			{children}
		</h2>
	);
};
const SubTitle = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<h3 className={cn("font-sans font-semibold text-gray-900 ", className)}>
			{children}
		</h3>
	);
};

const SubText = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return <p className={cn("text-sm text-gray-600", className)}>{children}</p>;
};

export { Title, SubText, SubTitle };
