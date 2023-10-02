import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
	const { firstname, lastname, email } = req.body;
	const hashedPassord = await bcrypt.hash(req.body.password, 12);
	const newUser = new User({
		firstname,
		lastname,
		email,
		password: hashedPassord,
	});
	try {
		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	} catch (e) {
		res.status(500).json(e);
	}
});

router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });

		if (!user) return res.status(404).json({ message: "User does not exist" });

		const isPasswordCorrect = bcrypt.compare(req.body.password, user.password);
		if (!isPasswordCorrect) return res.status(404).json({ message: "Invalid credentials" });

		jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.TOKEN_SECRET, { expiresIn: "1d" });

		const { password, ...others } = user._doc;
		res.status(200).json({ ...others });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

export default router;
