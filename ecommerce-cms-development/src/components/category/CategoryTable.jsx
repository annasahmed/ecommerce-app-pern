import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";

//internal import

import CheckBox from "@/components/form/others/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ShowHideButton from "@/components/table/ShowHideButton";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const CategoryTable = ({
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
				{data?.map((category) => (
					<TableRow key={category.id}>
						<TableCell>
							<CheckBox
								type="checkbox"
								name="category"
								id={parseInt(category.id)}
								handleClick={handleClick}
								isChecked={isCheck?.includes(parseInt(category.id))}
							/>
						</TableCell>

						<TableCell className="font-semibold uppercase text-xs">
							{category?.id}
						</TableCell>
						<TableCell>
							{category?.icon ? (
								<Avatar
									className="hidden mr-3 md:block bg-customGray-50 p-1"
									src={
										import.meta.env.VITE_APP_CLOUDINARY_URL +
										category?.medium.url
									}
									alt={showSelectedLanguageTranslation(category?.title)}
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
							{showSelectedLanguageTranslation(category?.translations, "title")}
						</TableCell>
						<TableCell className="text-sm">
							{showSelectedLanguageTranslation(
								category?.translations,
								"description",
							)}
						</TableCell>

						<TableCell className="text-center">
							<ShowHideButton
								id={category.id}
								category
								status={category.status}
							/>
						</TableCell>
						<TableCell>
							<EditDeleteButton
								id={category?.id}
								parent={category}
								isCheck={isCheck}
								children={category?.children}
								handleUpdate={handleUpdate}
								handleModalOpen={handleModalOpen}
								title={showSelectedLanguageTranslation(category?.title)}
							/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</>
	);
};

export default CategoryTable;
