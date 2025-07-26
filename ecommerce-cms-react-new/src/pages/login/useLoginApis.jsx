import AuthServices from "@/services/AuthServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import Cookies from "js-cookie";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const useLoginApis = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const login = async ({ email, password }) => {
		setLoading(true);
		const cookieTimeOut = 0.5;

		const res = await AuthServices.login({ email, password });
		try {
			if (res) {
				notifySuccess("Login Success!");
				// dispatch({ type: "USER_LOGIN", payload: res.user });
				Cookies.set("adminInfo", JSON.stringify(res.user), {
					expires: cookieTimeOut,
					sameSite: "None",
					secure: true,
				});
				navigate("/dashboard", { replace: true });
			}
		} catch (err) {
			notifyError(err?.response?.data?.message || err?.message);
		} finally {
			setLoading(false);
		}
	};
	return {
		login,
		register,
		handleSubmit,
		errors,
		loading,
	};
};

export default useLoginApis;
