import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Query from "../components/Query";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethod";

const Container = styled.div``;

const Wrapper = styled.div`
	padding: 50px;
	min-height: 70vh;
	display: flex;
	${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	/* margin: 100px; */
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
	max-height: 700px;
	max-width: 550px;
	object-fit: contain;
`;

const InfoContainer = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	padding: 50px;
	flex-direction: column;
	${mobile({ padding: "10px" })}
`;
const Brand = styled.h1`
	font-weight: 400;
	font-size: 40px;
`;
const Title = styled.h1`
	font-weight: 200;
	font-size: 25px;
	color: gray;
`;

const Desc = styled.p`
	margin: 20px 0px;
	font-size: 18px;
`;

const Price = styled.span`
	font-weight: 100;
	font-size: 30px;
`;

const FilterContainer = styled.div`
	width: 50%;
	margin: 30px 0px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	${mobile({ width: "100%" })}
`;

const Filter = styled.div`
	display: flex;
	align-items: center;
`;

const FilterTitle = styled.span`
	font-size: 20px;
	font-weight: 400;
`;

const FilterColor = styled.div`
	margin-left: 5px;
	padding: 5px;
	color: gray;
`;

const FilterSize = styled.div`
	margin-left: 5px;
	padding: 5px;
	color: gray;
`;

const AddContainer = styled.div`
	width: 50%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	${mobile({ width: "100%" })}
`;

const Button = styled.button`
	padding: 15px;
	border: 2px solid teal;
	background-color: white;
	cursor: pointer;
	font-weight: 500;
	&:hover {
		background-color: #f8f4f4;
	}
`;

const Product = () => {
	const user = JSON.parse(localStorage.getItem("profile"));
	const location = useLocation();
	const id = location.pathname.split("/")[2];
	const [product, setProduct] = useState({});

	useEffect(() => {
		const getProduct = async () => {
			try {
				const res = await publicRequest.get("/products/find/" + id, { withCredentials: true });
				setProduct(res.data);
			} catch (e) {
				console.log(e);
			}
		};
		getProduct();
	}, []);

	const handleClickCart = async () => {
		try {
			const userid = user._id;
			const productid = product._id;
			const check = userid + productid;
			await publicRequest.post(
				"/cart",
				{
					userid,
					productid,
					check,
				},
				{ withCredentials: true }
			);
		} catch (error) {
			console.log(error);
		}
	};

	const handleClickWishlist = async () => {
		try {
			const userid = user._id;
			const productid = product._id;
			const check = userid + productid;
			const img = product.img;
			await publicRequest.post(
				"/user/wishlist",
				{
					userid,
					productid,
					check,
					img,
				},
				{ withCredentials: true }
			);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<Navbar />
			<Wrapper>
				<ImgContainer>
					<Image src={product.img} />
				</ImgContainer>
				<InfoContainer>
					<Brand>Suede Classic XXI Men's Sneakers</Brand>
					<Title>Puma</Title>

					<Desc>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero odit a consequatur iste quod dolorum eligendi porro dolore nostrum ullam, eveniet distinctio deleniti tenetur vel, doloribus cum voluptas voluptates nobis!</Desc>
					<Price>₹{product.price}</Price>
					<FilterContainer>
						<Filter>
							<FilterTitle>Color</FilterTitle>
							<FilterColor>{product.color}</FilterColor>
						</Filter>
						<Filter>
							<FilterTitle>Size</FilterTitle>
							<FilterSize> {product.size}</FilterSize>
						</Filter>
					</FilterContainer>
					<AddContainer>
						<Button onClick={handleClickCart}>ADD TO CART</Button>
						<Button onClick={handleClickWishlist}>ADD TO WISHLIST</Button>
					</AddContainer>
				</InfoContainer>
			</Wrapper>
			<Query />
			<Footer />
		</Container>
	);
};

export default Product;
