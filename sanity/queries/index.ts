import { Brand } from "@/sanity.types";
import { sanityFetch } from "../lib/live";
import {
	BRANDS_QUERY,
	DEAL_PRODUCTS,
	LATEST_BLOG_QUERY,
	PRODUCT_BY_SLUG,
	BRAND_QUERY,
	MY_ORDERS_QUERY,
	GET_ALL_BLOGS,
} from "./query";

const getCategories = async (quantity?: number) => {
	try {
		const query = quantity
			? `*[_type == 'category'] | order(name asc) [0...$quantity] {
            ...,
            "productCount": count(*[_type == "product" && references(^._id)])
          }`
			: `*[_type == 'category'] | order(name asc) {
            ...,
            "productCount": count(*[_type == "product" && references(^._id)])
          }`;

		const { data } = await sanityFetch({
			query,
			params: quantity ? { quantity } : {},
		});

		return data ?? [];
	} catch (error) {
		console.log("Error fetching categories with product count:", error);
		return [];
	}
};

const getAllBrands = async (): Promise<Brand[]> => {
	try {
		const { data } = await sanityFetch({
			query: BRANDS_QUERY,
		});
		return data ?? [];
	} catch (error) {
		console.log("error", error);
		return [];
	}
};

const getAllBlogs = async (quantity: number) => {
	try {
		const { data } = await sanityFetch({
			query: GET_ALL_BLOGS,
			params: { quantity },
		});
		return data ?? [];
	} catch (error) {
		console.log("error", error);
		return [];
	}
};

const getLatestBlogs = async () => {
	try {
		const { data } = await sanityFetch({ query: LATEST_BLOG_QUERY });
		return data ?? [];
	} catch (error) {
		console.log("error", error);
		return [];
	}
};

const getDealProducts = async () => {
	try {
		const { data } = await sanityFetch({ query: DEAL_PRODUCTS });
		return data ?? [];
	} catch (error) {
		console.log("error", error);
		return [];
	}
};

const getProductDetails = async ({ slug }: { slug: string }) => {
	try {
		const product = await sanityFetch({
			query: PRODUCT_BY_SLUG,
			params: {
				slug,
			},
		});
		return product?.data || null;
	} catch (error) {
		console.log("error", error);
		return null;
	}
};
const getBrands = async (slug: string) => {
	try {
		const product = await sanityFetch({
			query: BRAND_QUERY,
			params: {
				slug,
			},
		});
		return product?.data || null;
	} catch (error) {
		console.log("error", error);
		return [];
	}
};
const getOrders = async (userId: string) => {
	try {
		const orders = await sanityFetch({
			query: MY_ORDERS_QUERY,
			params: {
				userId,
			},
		});
		return orders?.data || null;
	} catch (error) {
		console.log("error", error);
		return [];
	}
};

export {
	getCategories,
	getAllBrands,
	getLatestBlogs,
	getDealProducts,
	getProductDetails,
	getBrands,
	getOrders,
	getAllBlogs,
};
