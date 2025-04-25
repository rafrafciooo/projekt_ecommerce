import Container from "@/components/Container";
import { SubText, Title } from "@/components/ui/text";
import React from "react";

const SingleBlogPage = async ({
	params,
}: {
	params: Promise<{ slug: string }>;
}) => {
	const { slug } = await params;
	return (<Container>
<Title>Single Blog Page</Title>
<SubText>{slug}</SubText>
	</Container>)
};

export default SingleBlogPage;
