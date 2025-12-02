"use client";
import authBgLayout from "@/app/assets/themes/kidsTheme/loginBg.png";
import { useStore } from "@/app/providers/StoreProvider";
import { useForm } from "react-hook-form";
import BaseImage from "../../BaseComponents/BaseImage";

const AuthLayout = ({ children, heading }) => {
	const store = useStore();
	const logo = store.content.footer.logo;

	return (
		<main className="w-full min-h-screen flex items-center gap-20">
			<section
				className="flex-1 w-full min-h-screen bg-center bg-cover bg-no-repeat"
				style={{
					backgroundImage: `url('${authBgLayout.src}')`,
				}}>
				<div className="section-layout container-layout">
					<BaseImage src={logo} className="w-80 object-contain mx-auto" />
				</div>
			</section>
			<section className="flex-1 w-full">
				<div className="container-layout section-layout">{children}</div>
			</section>
		</main>
	);
};

export default AuthLayout;
