import BrandCategory from "@/components/BrandCategory";
import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import HomeCategory from "@/components/HomeCategory";
import LatestPostBlog from "@/components/LatestPostBlog";
import ProductGrid from "@/components/ProductGrid";
import { getCategories } from "@/sanity/queries";
import React from "react";

const Home = async () => {
	const categories = await getCategories(6);

	return (
		<Container>
			<HomeBanner />
			<ProductGrid />
			<HomeCategory categories={categories} />
			<BrandCategory />
			<LatestPostBlog />
		</Container>
	);
};

export default Home;
