import { TableBody, TableCell, TableRow } from "@windmill/react-ui";

//internal import

import CheckBox from "@/components/form/others/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ShowHideButton from "@/components/table/ShowHideButton";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import useTranslationUtils from "@/hooks/newHooks/useTranslationHooks";

const AttributeTable = ({
	data,
	toggleDrawerData,
	isCheck,
	setIsCheck,
	useParamId,
}) => {
	const { title, serviceId, handleModalOpen, handleUpdate } = toggleDrawerData;
	const { showSelectedLanguageTranslation } = useUtilsFunction();
	const { displayTranslatedValue } = useTranslationUtils();

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
				{data?.map((attribute) => (
					<TableRow key={attribute.id}>
						{/* <TableCell>
							<CheckBox
								type="checkbox"
								name="attribute"
								id={parseInt(attribute.id)}
								handleClick={handleClick}
								isChecked={isCheck?.includes(parseInt(attribute.id))}
							/>
						</TableCell> */}

						<TableCell className="font-semibold uppercase text-xs">
							{attribute?.id}
						</TableCell>
						<TableCell className="text-sm">
							{displayTranslatedValue(attribute?.name)}
						</TableCell>
						<TableCell className="text-sm text-wrap">
							[
							{attribute?.values
								?.map((v) => displayTranslatedValue(v))
								.join(", ")}
							]
						</TableCell>

						<TableCell className="text-center">
							<ShowHideButton
								id={attribute.id}
								attribute
								status={attribute.status}
							/>
						</TableCell>
						<TableCell>
							<EditDeleteButton
								id={attribute?.id}
								parent={attribute}
								isCheck={isCheck}
								children={attribute?.children}
								handleUpdate={handleUpdate}
								handleModalOpen={handleModalOpen}
								title={showSelectedLanguageTranslation(
									attribute?.translations,
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

export default AttributeTable;
