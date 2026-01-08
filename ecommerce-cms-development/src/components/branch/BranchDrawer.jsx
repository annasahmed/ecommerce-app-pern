import { useContext, useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";

//internal import
import DrawerButton from "@/components/form/button/DrawerButton";
import InputArea from "@/components/form/input/InputArea";
import Error from "@/components/form/others/Error";
import LabelArea from "@/components/form/selectOption/LabelArea";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import { SidebarContext } from "@/context/SidebarContext";
import useTranslationValue from "@/hooks/useTranslationValue";
import BranchServices from "@/services/BranchServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useForm } from "react-hook-form";
import DrawerHeader from "../newComponents/DrawerHeader";

const BranchDrawer = ({ id, data }) => {
	const { t } = useTranslation();
	const [status, setStatus] = useState(true);
	const [isMainBranch, setIsMainBranch] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [resData, setResData] = useState({});
	const { closeDrawer, setIsUpdate } = useContext(SidebarContext);

	const {
		register,
		handleSubmit,
		setValue,
		clearErrors,
		reset,
		formState: { errors },
	} = useForm();

	const { handlerTextTranslateHandler } = useTranslationValue();

	const onSubmit = async (data) => {
		const { name, address, country } = data;

		try {
			setIsSubmitting(true);
			const nameTranslates = await handlerTextTranslateHandler(
				name,
				"en",
				resData?.name,
			);
			const addressTranslates = await handlerTextTranslateHandler(
				address,
				"en",
				resData?.address,
			);
			const countryTranslates = await handlerTextTranslateHandler(
				country,
				"en",
				resData?.country,
			);

			const cleanedData = Object.fromEntries(
				Object.entries(data).filter(([_, value]) => value !== ""),
			);

			const branchData = {
				...cleanedData,
				name: {
					...nameTranslates,
					["en"]: name,
				},
				address: {
					...addressTranslates,
					["en"]: address,
				},
				country: {
					...countryTranslates,
					...(country && { ["en"]: country }),
				},
				isMainBranch,
				status,
			};

			if (id) {
				const res = await BranchServices.updateBranch(id, branchData);
				setIsUpdate(true);
				setIsSubmitting(false);
				notifySuccess(res.message);
				closeDrawer();
				reset();
			} else {
				const res = await BranchServices.addBranch(branchData);
				setIsUpdate(true);
				setIsSubmitting(false);
				notifySuccess(res.message);
				closeDrawer();
				reset();
			}
		} catch (err) {
			setIsSubmitting(false);
			notifyError(err ? err?.response?.data?.message : err?.message);
		}
	};

	useEffect(() => {
		if (id) {
			(async () => {
				try {
					const res = await BranchServices.getBranchById(id);
					if (res) {
						setResData(res);
						setValue("name", res.name["en"]);
						setValue("address", res.address["en"]);
						setValue("country", res.country && res.country["en"]);
						setValue("code", res.code);
						setValue("phone", res.phone);
						setValue("email", res.email);
						setValue("latitude", res.latitude);
						setValue("longitude", res.longitude);
						setIsMainBranch(res.is_main_branch || false);
						setStatus(res.status || false);
					}
				} catch (err) {
					notifyError(err ? err.response?.data?.message : err.message);
				}
			})();
		} else {
			reset();
		}
	}, [id, setValue, clearErrors, data]);

	return (
		<>
			<DrawerHeader
				id={id}
				register={register}
				updateTitle={t("UpdateBranch")}
				updateDescription={t("UpdateBranchDescription")}
				addTitle={t("AddBranchTitle")}
				addDescription={t("AddBranchDescription")}
			/>

			<Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-customGray-700 dark:text-customGray-200">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
						<div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
							<LabelArea label={t("Name")} required={true} />
							<div className="col-span-8 sm:col-span-4">
								<InputArea
									required={true}
									register={register}
									label="name"
									name="name"
									type="text"
									placeholder={t("BranchNamePlaceholder")}
								/>
								<Error errorName={errors.name} />
							</div>
						</div>
						<div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
							<LabelArea label={t("Code")} />
							<div className="col-span-8 sm:col-span-4">
								<InputArea
									required={false}
									register={register}
									label="code"
									name="code"
									type="text"
									placeholder={t("BranchCodePlaceholder")}
								/>
								<Error errorName={errors.code} />
							</div>
						</div>
						<div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
							<LabelArea label={t("Address")} required={true} />
							<div className="col-span-8 sm:col-span-4">
								<InputArea
									required={true}
									register={register}
									label="address"
									name="address"
									type="text"
									placeholder={t("BranchAddressPlaceholder")}
								/>
								<Error errorName={errors.address} />
							</div>
						</div>
						<div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
							<LabelArea label={t("Country")} />
							<div className="col-span-8 sm:col-span-4">
								<InputArea
									required={false}
									register={register}
									label="country"
									name="country"
									type="text"
									placeholder={t("BranchCountryPlaceholder")}
								/>
								<Error errorName={errors.country} />
							</div>
						</div>
						<div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
							<LabelArea label={t("Phone")} />
							<div className="col-span-8 sm:col-span-4">
								<InputArea
									required={false}
									register={register}
									label="phone"
									name="phone"
									type="text"
									placeholder={t("BranchPhonePlaceholder")}
								/>
								<Error errorName={errors.phone} />
							</div>
						</div>
						<div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
							<LabelArea label={t("Email")} required={true} />
							<div className="col-span-8 sm:col-span-4">
								<InputArea
									required={true}
									register={register}
									label="email"
									name="email"
									type="email"
									placeholder={t("BranchEmailPlaceholder")}
								/>
								<Error errorName={errors.email} />
							</div>
						</div>
						<div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
							<LabelArea label={t("Latitude")} required={true} />
							<div className="col-span-8 sm:col-span-4">
								<InputArea
									required={true}
									register={register}
									label="latitude"
									name="latitude"
									type="number"
									placeholder={t("BranchLatitudePlaceholder")}
								/>
								<Error errorName={errors.latitude} />
							</div>
						</div>
						<div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
							<LabelArea label={t("Longitude")} required={true} />
							<div className="col-span-8 sm:col-span-4">
								<InputArea
									required={true}
									register={register}
									label="longitude"
									name="longitude"
									type="number"
									placeholder={t("BranchLongitudePlaceholder")}
								/>
								<Error errorName={errors.longitude} />
							</div>
						</div>

						<div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
							<LabelArea label={t("MainBranch")} />
							<div className="col-span-8 sm:col-span-4">
								<SwitchToggle
									handleProcess={setIsMainBranch}
									processOption={isMainBranch}
								/>
							</div>
						</div>
						<div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
							<LabelArea label={t("Status")} />
							<div className="col-span-8 sm:col-span-4">
								<SwitchToggle
									handleProcess={setStatus}
									processOption={status}
								/>
							</div>
						</div>
					</div>

					<DrawerButton id={id} title="Branch" isSubmitting={isSubmitting} />
				</form>
			</Scrollbars>
		</>
	);
};

export default BranchDrawer;
