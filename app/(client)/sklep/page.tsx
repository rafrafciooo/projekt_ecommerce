import Shop from "@/components/Shop";
import { getAllBrands, getCategories } from "@/sanity/queries";
import React from "react";

const ShopPage = async () => {
	const categories = await getCategories();
	const brands = await getAllBrands();
	return	(
	<Shop categories={categories} brands={brands} />
)
};

export default ShopPage;
