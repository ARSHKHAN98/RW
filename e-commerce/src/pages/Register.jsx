import styled from "styled-components";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../redux/apiCalls";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

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
	font-size: 17px;
	min-width: 40%;
	margin: 20px 20px 0px 20px;
	padding: 17px 5px;
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

const Register = () => {
	const history = useNavigate();
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [err, setErr] = useState("");

	const dispatch = useDispatch();
	const { isFetching, error } = useSelector((state) => state.user);

	const handleClick = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) setErr(true);
		else {
			await register(dispatch, {
				firstname: firstName,
				lastname: lastName,
				email,
				password,
			});
			if (JSON.parse(localStorage.getItem("profile"))) {
				history("/");
			}
		}
	};
	return (
		<Container>
			<Wrapper>
				<Title>CREATE AN ACCOUNT</Title>
				<Form>
					<Input placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
					<Input placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
					<Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
					<Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
					<Input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
					<Contain>
						<Button onClick={handleClick} disabled={isFetching}>
							CREATE
						</Button>
						<Linkk onClick={() => history("/login")}>ALREADY HAVE AN ACCOUNT?</Linkk>
						{(error || err) && <Error>Something went wrong..</Error>}
					</Contain>
				</Form>
			</Wrapper>
		</Container>
	);
};

export default Register;
