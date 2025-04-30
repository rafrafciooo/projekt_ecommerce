import { defineQuery } from "next-sanity";

const BRANDS_QUERY = defineQuery(`*[_type == "brand"] | order(name asc)`);

const GET_ALL_BLOGS =
	defineQuery(`*[_type == "blog"] | order(publishedAt desc)[0..$quantity] {
	...,
	blogcategories[]->{
	  title,
}
	}`);

const LATEST_BLOG_QUERY =
	defineQuery(`*[_type == "blog" && isLatest == true] | order(name asc){
    ...,
    blogcategories[]->{
      title,
}
    }`);

const DEAL_PRODUCTS =
	defineQuery(`*[_type == "product" && status == 'hot'] | order(name asc){
    ...,"categories":categories[]->title}
    
    `);

const PRODUCT_BY_SLUG =
	defineQuery(`*[_type == "product" && slug.current == $slug] | order(name asc) [0]
  `);

const BRAND_QUERY = defineQuery(`
	*[_type == "product" && slug.current == $slug][0]{
	  "brand": brand->title
	}
  `);

const MY_ORDERS_QUERY =
	defineQuery(`*[_type == "order" && clerkUserId == $userId] | order(orderData desc){
	..., products[]{
		...,product->
	}}`);

export {
	BRANDS_QUERY,
	LATEST_BLOG_QUERY,
	DEAL_PRODUCTS,
	PRODUCT_BY_SLUG,
	BRAND_QUERY,
	MY_ORDERS_QUERY,
	GET_ALL_BLOGS,
};
