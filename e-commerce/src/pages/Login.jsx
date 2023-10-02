import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: #c9f1ff;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Wrapper = styled.div`
	width: 40%;
	padding: 20px 15px;
	background-color: white;
	border-radius: 10px;
	${mobile({ width: "75%" })}
`;
const Title = styled.h1`
	font-size: 40px;
	padding: 20px 20px;
	font-weight: 400;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const Input = styled.input`
	flex: 1;
	font-size: 20px;
	min-width: 40%;
	margin: 20px 20px 0px 20px;
	padding: 20px 5px;
	border: none;
	border-bottom: 1px lightgrey solid;
	&:focus {
		outline: none;
		border-bottom: 2px black solid;
		margin: 20px 10px 0px 20px;
	}
`;

const Button = styled.button`
	width: 60%;
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
	padding: 15px 20px;
	background-color: #007aa2;
	border-radius: 5px;
	color: white;
	cursor: pointer;
	margin-top: 30px;
	font-size: 17px;
`;

const Linkk = styled.a`
	font-size: 17px;
	padding: 10px 20px;
	cursor: pointer;
	color: black;
	text-decoration: none;
	margin-top: 5px;
`;

const Contain = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

const Error = styled.span`
	color: red;
`;

const Login = () => {
	const history = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const { isFetching, error } = useSelector((state) => state.user);

	const handleClick = async (e) => {
		e.preventDefault();
		await login(dispatch, { email, password });
		console.log(JSON.parse(localStorage.getItem("profile")));
		if (JSON.parse(localStorage.getItem("profile"))) {
			history("/");
		}
	};
	return (
		<Container>
			<Wrapper>
				<Title>SIGN IN</Title>
				<Form>
					<Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
					<Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
					<Contain>
						<Button onClick={handleClick} disabled={isFetching}>
							LOGIN
						</Button>
						{error && <Error>Something went wrong..</Error>}
						<Linkk onClick={() => history("/register")}> CREATE A NEW ACCOUNT</Linkk>
					</Contain>
				</Form>
			</Wrapper>
		</Container>
	);
};

export default Login;
