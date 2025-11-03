import { TableBody, TableCell, TableRow } from "@windmill/react-ui";

//internal import

import CheckBox from "@/components/form/others/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ShowHideButton from "@/components/table/ShowHideButton";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const ProductTable = ({
	data,
	toggleDrawerData,
	isCheck,
	setIsCheck,
	useParamId,
}) => {
	const { title, serviceId, handleModalOpen, handleUpdate } = toggleDrawerData;
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

			<TableBody>
				{data?.map((product) => (
					<TableRow key={product.id}>
						<TableCell>
							<CheckBox
								type="checkbox"
								name="product"
								id={parseInt(product.id)}
								handleClick={handleClick}
								isChecked={isCheck?.includes(parseInt(product.id))}
							/>
						</TableCell>

						<TableCell className="font-semibold uppercase text-xs">
							{product?.id}
						</TableCell>
						<TableCell className="text-sm flex items-center gap-4">
							<img
								src={
									import.meta.env.VITE_APP_CLOUDINARY_URL +
									product?.thumbnailImage?.url
								}
								alt="thumbnail"
								className="w-8 object-contain"
							/>
							{product?.product_translations[0]?.title}
						</TableCell>
						<TableCell className="text-sm">{product?.sku || "-"}</TableCell>
						{/* <TableCell className="text-sm">
							{product?.categories?.length > 0
								? product?.categories
										?.map((v) => showingTranslateValue(v?.title))
										?.join(", ")
								: "-"}
						</TableCell> */}

						<TableCell className="text-center">
							<ShowHideButton id={product.id} product status={product.status} />
						</TableCell>
						<TableCell>
							<EditDeleteButton
								id={product?.id}
								parent={product}
								isCheck={isCheck}
								children={product?.children}
								handleUpdate={handleUpdate}
								handleModalOpen={handleModalOpen}
								title={showingTranslateValue(product?.name)}
							/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</>
	);
};

export default ProductTable;
