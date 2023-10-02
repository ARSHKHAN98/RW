import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import { mobile } from "../responsive";
import { useState } from "react";
import { publicRequest } from "../requestMethod";

const Container = styled.div`
	height: 60vh;
	background-color: #d7ebf5;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin: 20px 0;
`;
const Title = styled.h1`
	font-size: 70px;
	margin-bottom: 20px;
`;

const Description = styled.div`
	font-size: 24px;
	font-weight: 300;
	margin-bottom: 20px;
	${mobile({ textAlign: "center" })}
`;

const InputContainer = styled.div`
	width: 50%;
	height: 7%;
	background-color: white;
	display: flex;
	justify-content: space-between;
	border-radius: 3px;
	${mobile({ width: "80%" })}
`;

const Input = styled.input`
	flex: 8;
	padding-left: 20px;
	font-size: 16px;
	border: none;
	&:focus {
		outline: none;
		border: 1px lightgrey solid;
	}
`;

const Button = styled.button`
	flex: 1;
	border: none;
	background-color: teal;
	color: white;
	cursor: pointer;
`;

const Query = () => {
	const [text, setText] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await publicRequest.post("/send-email", { text }, { withCredentials: true });
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<Container>
			<Title></Title>
			<Description>Please email your queries to us for prompt assistance.</Description>
			<InputContainer>
				<Input placeholder="" onChange={(e) => setText(e.target.value)} />
				<Button onClick={handleSubmit}>
					<SendIcon />
				</Button>
			</InputContainer>
		</Container>
	);
};

export default Query;
