import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";

//internal import

import CheckBox from "@/components/form/others/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ShowHideButton from "@/components/table/ShowHideButton";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const ParentCategoryTable = ({
	data,
	toggleDrawerData,
	isCheck,
	setIsCheck,
	useParamId,
}) => {
	const { title, serviceId, handleModalOpen, handleUpdate } = toggleDrawerData;
	const { showSelectedLanguageTranslation } = useUtilsFunction();

	const handleClick = (e) => {
		const { id, checked } = e.target;
		setIsCheck([...isCheck, parseInt(id)]);
		if (!checked) {
			setIsCheck(isCheck.filter((item) => item !== parseInt(id)));
		}
	};

	return (
		<>
			{isCheck?.length < 1 && (
				<DeleteModal useParamId={useParamId} id={serviceId} title={title} />
			)}

			<TableBody>
				{data?.map((parentCategory) => (
					<TableRow key={parentCategory.id}>
						<TableCell>
							<CheckBox
								type="checkbox"
								name="parentCategory"
								id={parseInt(parentCategory.id)}
								handleClick={handleClick}
								isChecked={isCheck?.includes(parseInt(parentCategory.id))}
							/>
						</TableCell>

						<TableCell className="font-semibold uppercase text-xs">
							{parentCategory?.id}
						</TableCell>
						<TableCell>
							{parentCategory?.icon ? (
								<Avatar
									className="hidden mr-3 md:block bg-customGray-50 p-1"
									src={
										import.meta.env.VITE_APP_CLOUDINARY_URL +
										parentCategory?.medium.url
									}
									alt={showSelectedLanguageTranslation(
										parentCategory?.translations,
										"title",
									)}
								/>
							) : (
								<Avatar
									src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
									alt="product"
									className="hidden p-1 mr-2 md:block bg-customGray-50 shadow-none"
								/>
							)}
						</TableCell>
						<TableCell className="text-sm">
							{showSelectedLanguageTranslation(
								parentCategory?.translations,
								"title",
							)}
						</TableCell>
						<TableCell className="text-sm">
							{showSelectedLanguageTranslation(
								parentCategory?.translations,
								"description",
							)}
						</TableCell>

						<TableCell className="text-center">
							<ShowHideButton
								id={parentCategory.id}
								parentCategory
								status={parentCategory.status}
							/>
						</TableCell>
						<TableCell>
							<EditDeleteButton
								id={parentCategory?.id}
								parent={parentCategory}
								isCheck={isCheck}
								children={parentCategory?.children}
								handleUpdate={handleUpdate}
								handleModalOpen={handleModalOpen}
								title={showSelectedLanguageTranslation(parentCategory?.title)}
							/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</>
	);
};

export default ParentCategoryTable;
