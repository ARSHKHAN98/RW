import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import Room from "@mui/icons-material/Room";
import Phone from "@mui/icons-material/Phone";
import MailOutline from "@mui/icons-material/EmailOutlined";
import { mobile } from "../responsive";

const Container = styled.div`
	display: flex;
	${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
	margin: 20px 0px;
`;

const SocialContainer = styled.div`
	display: flex;
`;

const SocialIcon = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	color: white;
	background-color: #${(props) => props.color};
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 20px;
`;

const Center = styled.div`
	flex: 1;
	padding: 20px;
	${mobile({ display: "none" })}
`;

const Title = styled.h3`
	margin-bottom: 30px;
`;

const Right = styled.div`
	flex: 1;
	padding: 20px;
`;

const ContactItem = styled.div`
	margin-bottom: 20px;
	display: flex;
	align-items: center;
`;

const Payment = styled.img`
	width: 50%;
`;

const Footer = () => {
	return (
		<Container>
			<Left>
				<Logo>SHOP SHOP</Logo>
				<Desc>This is the ultimate destination for fashion and lifestyle, being host to a wide array of merchandise including clothing, accessories and more. It is time to redefine your style statement with our treasure-trove of trendy items. Our online store brings you the latest in designer products.</Desc>
				<SocialContainer>
					<SocialIcon color="3B5999">
						<FacebookIcon />
					</SocialIcon>
					<SocialIcon color="E4405F">
						<InstagramIcon />
					</SocialIcon>
					<SocialIcon color="55ACEE">
						<TwitterIcon />
					</SocialIcon>
					<SocialIcon color="E60023">
						<PinterestIcon />
					</SocialIcon>
				</SocialContainer>
			</Left>
			<Center></Center>
			<Right>
				<Title>Contact</Title>
				<ContactItem>
					<Room style={{ marginRight: "10px" }} /> Buildings Alyssa, Outer Ring Road, Bengaluru
				</ContactItem>
				<ContactItem>
					<Phone style={{ marginRight: "10px" }} /> +1 234 56 78
				</ContactItem>
				<ContactItem>
					<MailOutline style={{ marginRight: "10px" }} /> shopshop@gmail.com
				</ContactItem>
				<Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
			</Right>
		</Container>
	);
};

export default Footer;
