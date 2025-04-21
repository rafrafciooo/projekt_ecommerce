export const NavBarItems = [
	{
		name: "Główna",
		href: "/",
	},
	{
		name: "Sklep",
		href: "/sklep",
	},
	{
		name: "Blog",
		href: "/blog",
	},
	{
		name: "Hot Deals",
		href: "/hot-deals",
	},
] as const;

export const QuickLinks = [
	{
		name: "O nas",
		href: "/o-nas",
	},
	{
		name: "Kontakt",
		href: "/kontakt",
	},
	{
		name: "Regulamin",
		href: "/regulamin",
	},
	{
		name: "Polityka prywatnosci",
		href: "/polityka-prywatnosci",
	},
	{
		name: "FAQ",
		href: "/faq",
	},
	{
		name: "Pomoc",
		href: "/pomoc",
	},
] as const;
export const CategoriesData = [
	{ title: "Telefony", href: "telefony" },
	{ title: "Sprzęt AGD", href: "sprzet-agd" },
	{ title: "Smartfony", href: "smartfony" },
	{ title: "Lodówki", href: "lodowki" },
	{ title: "Pralki", href: "pralki" },
	{ title: "Sprzęt kuchenny", href: "sprzet-kuchenny" },
	{ title: "Gadżety", href: "gadzety" },
] as const;

export const productType = [
	{ title: "Gadżety", value: "gadzety" },
	{ title: "AGD", value: "agd" },
	{ title: "Lodówki", value: "lodowki" },
	{ title: "Inne", value: "inne" },
] as const;
