import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";

//internal import

import CategoryDrawer from "@/components/category/CategoryDrawer";
import MainDrawer from "@/components/drawer/MainDrawer";
import CheckBox from "@/components/form/others/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ShowHideButton from "@/components/table/ShowHideButton";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const CategoryTable = ({ data, lang, isCheck, setIsCheck, useParamId }) => {
	const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
	const { showingTranslateValue } = useUtilsFunction();

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

			<MainDrawer>
				<CategoryDrawer id={serviceId} data={data} lang={lang} />
			</MainDrawer>

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
									src={category?.icon}
									alt={showingTranslateValue(category?.title)}
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
							{showingTranslateValue(category?.title)}
						</TableCell>
						<TableCell className="text-sm">
							{showingTranslateValue(category?.description)}
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
								title={showingTranslateValue(category?.name)}
							/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</>
	);
};

export default CategoryTable;
