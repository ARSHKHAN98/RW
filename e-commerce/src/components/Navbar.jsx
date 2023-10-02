import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../requestMethod";
import { useLocation } from "react-router";

const Container = styled.div`
	height: 60px;
	${mobile({ height: "50px" })}
	background-color: white;
	width: 100%;
	margin-bottom: 10px;
	margin-top: 5px;
`;
const Wrapper = styled.div`
	padding: 10px 20px;
	display: flex;
	justify-content: space-between;
	${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
	flex: 1; //to divide space equally
	display: flex;
	align-items: center;
`;

const Language = styled.span`
	font-size: 14 px;
	cursor: pointer;
	${mobile({ display: "none" })}
`;

const Center = styled.div`
	flex: 1;
	text-align: center;
`;

const Logo = styled.h1`
	font-weight: bold;
	${mobile({ fontSize: "16px" })};
	cursor: pointer;
`;

const Right = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
	font-size: 14px;
	cursor: pointer;
	margin-left: 25px;
	${mobile({ fontSize: "12px", marginLeft: "10px" })};
	color: black;
`;

const Navbar = () => {
	const [user, setUser] = useState("");
	const location = useLocation();
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("profile"));
		setUser(user);
	}, []);
	const history = useNavigate();

	const [quantity, setQuantity] = useState(0);
	const getQuantity = async () => {
		const products = (await publicRequest.get("/cart")).data;
		products.filter((product) => product.userid === user._id);
		setQuantity(products.length);
	};
	if (user) getQuantity();
	const handleLogout = (e) => {
		setUser("");
		localStorage.clear();
		history("/");
		setQuantity("");
	};

	const path = location.pathname.split("/")[1];

	return (
		<Container>
			<Wrapper>
				<Left>
					<Language></Language>
				</Left>
				<Center>
					<Logo
						onClick={() => {
							history("/");
						}}
					>
						SHOP SHOP
					</Logo>
				</Center>
				<Right>
					{!user && (
						<MenuItem
							onClick={() => {
								history("/register");
							}}
						>
							REGISTER
						</MenuItem>
					)}
					<Link to="/cart">
						<MenuItem>
							{user && (
								<Badge badgeContent={quantity} color="primary">
									<ShoppingCartOutlinedIcon />
								</Badge>
							)}
						</MenuItem>
					</Link>
					{!user ? (
						<MenuItem
							onClick={() => {
								history("/login");
							}}
						>
							SIGN IN
						</MenuItem>
					) : (
						<MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
					)}
				</Right>
			</Wrapper>
		</Container>
	);
};

export default Navbar;
