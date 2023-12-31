import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
	const authHeader = req.headers.token;
	if (authHeader) {
		const token = authHeader.split(" ")[1];
		jwt.verify(token, "test", (err, user) => {
			if (err) res.status(403).json("Token is not valid!");
			req.user = user;
			next(); //to continue the code after this was called
		});
	} else {
		return res.status(401).json("You are not authenticated!");
	}
};

export const verifyTokenAndAuthorization = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.id === req.params.id || req.user.isAdmin) {
			next();
		} else {
			res.status(403).json("You are not allowed to do that!");
		}
	});
};

export const verifyTokenAndAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.isAdmin) {
			next();
		} else {
			res.status(403).json("You are not allowed to do that!");
		}
	});
};
