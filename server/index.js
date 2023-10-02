import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import productRoute from "./routes/product.js";
import cartRoute from "./routes/cart.js";
import orderRoute from "./routes/order.js";
import stripeRoute from "./routes/stripe.js";
import bodyParser from "body-parser";
import nodemailerRoute from "./routes/nodemailer.js";
import cors from "cors";

const app = express();
dotenv.config();

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("success"))
	.catch((err) => {
		console.log(err);
	});
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Credentials", true);
	next();
});
app.use(
	cors({
		origin: "http://localhost:3000",
	})
);
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api", nodemailerRoute);

app.listen(process.env.PORT_NO || 4000, () => {
	console.log("hiiii");
});
