import { publicRequest } from "../requestMethod";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";

export const login = async (dispatch, user) => {
	dispatch(loginStart());
	try {
		const res = await publicRequest.post("/auth/login", user, { withCredentials: true });
		dispatch(loginSuccess(res.data));
	} catch (error) {
		dispatch(loginFailure());
	}
};
export const register = async (dispatch, user) => {
	dispatch(loginStart());
	try {
		const res = await publicRequest.post("/auth/register", user, { withCredentials: true });
		dispatch(loginSuccess(res.data));
	} catch (error) {
		console.log(error);
		dispatch(loginFailure());
	}
};
