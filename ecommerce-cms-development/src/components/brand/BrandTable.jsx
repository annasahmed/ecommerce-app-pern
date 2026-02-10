import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";

//internal import

import CheckBox from "@/components/form/others/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ShowHideButton from "@/components/table/ShowHideButton";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const BrandTable = ({
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
				{data?.map((brand) => (
					<TableRow key={brand.id}>
						{/* <TableCell>
							<CheckBox
								type="checkbox"
								name="brand"
								id={parseInt(brand.id)}
								handleClick={handleClick}
								isChecked={isCheck?.includes(parseInt(brand.id))}
							/>
						</TableCell> */}
						<TableCell className="font-semibold uppercase text-xs">
							{brand?.id}
						</TableCell>
						<TableCell>
							{brand?.logo ? (
								<Avatar
									size="large"
									className="hidden mr-3/ md:block bg-customGray-50 p-1"
									src={
										import.meta.env.VITE_APP_CLOUDINARY_URL + brand?.logo?.url
									}
									alt={showSelectedLanguageTranslation(brand?.title)}
								/>
							) : (
								<Avatar
									size="large"
									src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
									alt="product"
									className="hidden p-1 mr-2 md:block bg-customGray-50 shadow-none"
								/>
							)}
						</TableCell>

						<TableCell className="text-sm">
							{showSelectedLanguageTranslation(brand?.translations, "title")}
						</TableCell>
						{/* <TableCell className="text-sm">
							{showSelectedLanguageTranslation(
								brand?.translations,
								"description",
							)}
						</TableCell> */}

						<TableCell className="text-center">
							<ShowHideButton
								id={brand.id}
								brand
								status={brand.show_on_homepage}
								isShowOnHomepage={true}
							/>
						</TableCell>
						<TableCell className="text-center">
							<ShowHideButton id={brand.id} brand status={brand.status} />
						</TableCell>
						<TableCell>
							<EditDeleteButton
								id={brand?.id}
								parent={brand}
								isCheck={isCheck}
								children={brand?.children}
								handleUpdate={handleUpdate}
								handleModalOpen={handleModalOpen}
								title={showSelectedLanguageTranslation(
									brand?.translations,
									"title",
								)}
							/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</>
	);
};

export default BrandTable;
