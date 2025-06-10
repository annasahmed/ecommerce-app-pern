import ImageDark from "@/assets/img/login-office-dark.jpeg";
import ImageLight from "@/assets/img/login-office.jpeg";
import PrimaryButtonWithLoader from "@/components/button/PrimaryButtonWithLoader";
import InputField from "@/components/form/InputField";
import { useTranslation } from "react-i18next";
import { ImFacebook, ImGoogle } from "react-icons/im";
import useLoginApis from "./useLoginApis";
import { Link } from "react-router";

const Login = () => {
	const { t } = useTranslation();

	const { loading, login, register, handleSubmit, errors } = useLoginApis();

	return (
		<div className="flex items-center min-h-screen p-6 bg-customGray-50 dark:bg-customGray-900">
			<div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-customWhite rounded-lg shadow-xl dark:bg-customGray-800">
				<div className="flex flex-col overflow-y-auto md:flex-row">
					<div className="h-32 md:h-auto md:w-1/2">
						<img
							aria-hidden="true"
							className="object-cover w-full h-full dark:hidden"
							src={ImageLight}
							alt="Office"
						/>
						<img
							aria-hidden="true"
							className="hidden object-cover w-full h-full dark:block"
							src={ImageDark}
							alt="Office"
						/>
					</div>
					<main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
						<div className="w-full">
							<h1 className="mb-6 text-2xl font-semibold font-['Open_Sans']/ text-customGray-700 dark:text-customGray-200">
								Login
							</h1>
							<form onSubmit={handleSubmit(login)}>
								<InputField
									required={true}
									register={register}
									defaultValue="admin@example.com"
									label="Email"
									name="email"
									type="email"
									autoComplete="username"
									placeholder="john@doe.com"
									errorName={errors.email}
								/>
								<div className="mt-6"></div>
								<InputField
									required={true}
									register={register}
									defaultValue="12345678a"
									label="Password"
									name="password"
									type="password"
									autocomplete="current-password"
									placeholder="***************"
									errorName={errors.password}
								/>

								{/* {loading ? (
									<CMButton
										disabled={loading}
										type="submit"
										className={`bg-customTeal-600 rounded-md mt-4 h-12 w-full`}
										to="/dashboard"
									/>
								) : (
									<Button
										disabled={loading}
										type="submit"
										className="mt-4 h-12 w-full"
										to="/dashboard">
										{t("LoginTitle")}
									</Button>
								)} */}
								<PrimaryButtonWithLoader
									disabled={loading}
									type="submit"
									className="mt-4 h-12 w-full"
									to="/dashboard"
									text={t("LoginTitle")}
								/>
								<hr className="my-10" />
								<button
									disabled
									className="text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-customGray-700 bg-customGray-100 shadow-sm my-2 md:px-2 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-customWhite hover:bg-customBlue-600 h-11 md:h-12 w-full mr-2">
									<ImFacebook className="w-4 h-4 mr-2" />{" "}
									<span className="ml-2"> {t("LoginWithFacebook")} </span>
								</button>
								<button
									disabled
									className="text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-customGray-700 bg-customGray-100 shadow-sm my-2  md:px-2 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-customWhite hover:bg-customRed-500 h-11 md:h-12 w-full">
									<ImGoogle className="w-4 h-4 mr-2" />{" "}
									<span className="ml-2">{t("LoginWithGoogle")}</span>
								</button>
							</form>

							<p className="mt-4">
								<Link
									className="text-sm font-medium text-customTeal-500 dark:text-customTeal-400 hover:underline"
									to="/forgot-password">
									{t("ForgotPassword")}
								</Link>
							</p>
							<p className="mt-1">
								<Link
									className="text-sm font-medium text-customTeal-500 dark:text-customTeal-400 hover:underline"
									to="/signup">
									{t("CreateAccountTitle")}
								</Link>
							</p>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default Login;
