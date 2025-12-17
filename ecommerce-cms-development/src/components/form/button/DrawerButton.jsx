import React, { useContext } from "react";
import { Button } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

//internal import
import { SidebarContext } from "@/context/SidebarContext";
import spinnerLoadingImage from "@/assets/img/spinner.gif";

const DrawerButton = ({ id, title, isSubmitting, zIndex = "z-10" }) => {
	const { t } = useTranslation();
	const { toggleDrawer, isDrawerOpen } = useContext(SidebarContext);
	return (
		<>
			<div
				className={`fixed/ ${zIndex} bottom-0 w-full right-0 py-4 lg:py-8 px-6 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex bg-customGray-50 border-t border-customGray-100 dark:border-customGray-700 dark:bg-customGray-800 dark:text-customGray-300`}
				style={{ right: !isDrawerOpen && -50 }}>
				<div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
					<Button
						onClick={toggleDrawer}
						className="h-12 bg-customWhite w-full text-customRed-500 hover:bg-customRed-50 hover:border-customRed-100 hover:text-customRed-600 dark:bg-customGray-700 dark:border-customGray-700 dark:text-customGray-500 dark:hover:bg-customGray-800 dark:hover:text-customRed-700"
						layout="outline">
						{t("CancelBtn")}
					</Button>
				</div>

				<div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
					{isSubmitting ? (
						<Button disabled={true} type="button" className="w-full h-12">
							<img
								src={spinnerLoadingImage}
								alt="Loading"
								width={20}
								height={10}
							/>{" "}
							<span className="font-serif ml-2 font-light">Processing</span>
						</Button>
					) : (
						<Button type="submit" className="w-full h-12">
							{id ? (
								<span>
									{t("UpdateBtn")} {title}
								</span>
							) : (
								<span>Add {t(title)}</span>
							)}
						</Button>
					)}
				</div>
			</div>
		</>
	);
};

export default DrawerButton;
