import { useContext, useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";

//internal import
import DrawerButton from "@/components/form/button/DrawerButton";
import { SidebarContext } from "@/context/SidebarContext";
import RoleServices from "@/services/RoleServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useForm } from "react-hook-form";
import InputAreaField from "../form/fields/InputAreaField";
import DrawerHeader from "../newComponents/DrawerHeader";

const RoleDrawer = ({ id, data }) => {
	const { t } = useTranslation();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [resData, setResData] = useState({});
	const { closeDrawer, setIsUpdate, isDrawerOpen } = useContext(SidebarContext);

	// useEffect(() => {
	// 	CategoryServices.getAllCategoriesForOptions(id).then((data) => {
	// 		setParentCategories(data);
	// 	});
	// }, []);

	const defaultValues = {
		name: null,
		description: null,
	};

	const {
		control,
		register,
		handleSubmit,
		setValue,
		clearErrors,
		reset,
		formState: { errors },
	} = useForm({ defaultValues });

	const onSubmit = async (data) => {
		try {
			setIsSubmitting(true);

			const roleData = {
				...data,
			};

			if (id) {
				const res = await RoleServices.updateRole(id, roleData);
				setIsUpdate(true);
				setIsSubmitting(false);
				notifySuccess(res.message);
				closeDrawer();
				reset();
			} else {
				const res = await RoleServices.addRole(roleData);
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
		if (id && isDrawerOpen) {
			(async () => {
				try {
					const res = await RoleServices.getRoleById(id);
					if (res) {
						setResData(res);
						setValue("name", res.name);
						setValue("description", res.description);
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
				updateTitle={t("Update Role")}
				updateDescription={""}
				addTitle={t("Add Role")}
				addDescription={""}
			/>

			<Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-customGray-700 dark:text-customGray-200">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
						<InputAreaField
							label={t("Name")}
							required={true}
							register={register}
							inputLabel="name"
							inputName="name"
							inputType="text"
							inputPlaceholder={t("Enter role name")}
							errorName={errors.name}
						/>
						<InputAreaField
							label={t("Description")}
							required={false}
							register={register}
							inputLabel="description"
							inputName="description"
							inputType="text"
							inputPlaceholder={t("Enter role description")}
							errorName={errors.description}
						/>
					</div>

					<DrawerButton id={id} title="Role" isSubmitting={isSubmitting} />
				</form>
			</Scrollbars>
		</>
	);
};

export default RoleDrawer;
