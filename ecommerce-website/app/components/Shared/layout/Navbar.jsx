import { storeSettingsSportsTheme } from "@/app/data/storeSettingsSportsTheme";
import { Search, ShoppingCart, UserRound } from "lucide-react";
import BaseLink from "../../BaseComponents/BaseLink";
import Logo from "../Logo";

const Navbar = () => {
	return (
		<>
			<header className="text-dark bg-header w-full py-2 text-center font-bold">
				<BaseLink
					href={storeSettingsSportsTheme.content.header.link}
					className="container-layout">
					{storeSettingsSportsTheme.content.header.text}
				</BaseLink>
			</header>
			<nav className=" py-5 shadow-sm sticky top-0 bg-light z-100">
				<section className="flex justify-between items-center container-layout">
					<Logo
						src={storeSettingsSportsTheme.content.logo}
						className={`w-24 h-auto object-contain`}
					/>
					<ul className="flex-1 flex items-center justify-center gap-10">
						{storeSettingsSportsTheme.content.nav.map((item, index) => (
							<li key={index} className="p4 font-medium">
								{item.text}
							</li>
						))}
					</ul>
					<div className="flex items-center gap-5">
						<Search />
						<ShoppingCart />
						<UserRound />
					</div>
				</section>
			</nav>
		</>
	);
};

export default Navbar;
