import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: process.env.SENDER_EMAIL,
		pass: process.env.SENDER_EMAIL_PASSWORD,
	},
});

const router = express.Router();

router.post("/send-email", (req, res) => {
	const { text } = req.body;

	const mailOptions = {
		from: process.env.SENDER_EMAIL,
		to: process.env.RECIEVER_EMAIL,
		subject: "New Query from Your Website",
		text: text,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
			res.status(500).send("Error sending the email");
		} else {
			console.log("Email sent: " + info.response);
			res.status(200).send("Email sent successfully");
		}
	});
});

export default router;
