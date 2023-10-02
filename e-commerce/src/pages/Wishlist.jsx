import { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Query from "../components/Query";
import { publicRequest } from "../requestMethod";
import Product from "../components/Product";

const Container = styled.div`
	padding: 20px;
	display: inline-flex;
	flex-direction: row;
	justify-content: space-between;
	flex-wrap: wrap;
`;

const Wishlist = () => {
	const userid = JSON.parse(localStorage.getItem("profile"))._id;
	const [allProducts, setAllProducts] = useState([]);

	useEffect(() => {
		const func = async () => {
			const products = await publicRequest.get("/user/wishlist", { withCredentials: true });
			setAllProducts(products.data.filter((product) => product.userid === userid));
		};
		func();
	}, []);

	const deleteProduct = async (id) => {
		const checkk = userid + id;
		await publicRequest.delete(`/products/wishlist/${checkk}`, { withCredentials: true });

		setAllProducts(allProducts.filter((product) => product.check !== checkk));
	};

	return (
		<div>
			<Navbar />
			<Container>
				{allProducts.map((item) => (
					<Product item={item} key={item.productid} func={deleteProduct} />
				))}
			</Container>
			{/* <Query /> */}
			<Footer />
		</div>
	);
};

export default Wishlist;
