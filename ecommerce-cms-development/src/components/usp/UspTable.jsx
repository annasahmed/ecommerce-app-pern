import { TableBody, TableCell, TableRow } from "@windmill/react-ui";

//internal import

import CheckBox from "@/components/form/others/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ShowHideButton from "@/components/table/ShowHideButton";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const UspTable = ({
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
				{data?.map((usp) => (
					<TableRow key={usp.id}>
						<TableCell>
							<CheckBox
								type="checkbox"
								name="usp"
								id={parseInt(usp.id)}
								handleClick={handleClick}
								isChecked={isCheck?.includes(parseInt(usp.id))}
							/>
						</TableCell>

						<TableCell className="font-semibold uppercase text-xs">
							{usp?.id}
						</TableCell>
						<TableCell className="text-sm">
							{showingTranslateValue(usp?.title)}
						</TableCell>
						<TableCell className="text-sm">
							{showingTranslateValue(usp?.description)}
						</TableCell>

						<TableCell className="text-center">
							<ShowHideButton id={usp.id} usp status={usp.status} />
						</TableCell>
						<TableCell>
							<EditDeleteButton
								id={usp?.id}
								parent={usp}
								isCheck={isCheck}
								children={usp?.children}
								handleUpdate={handleUpdate}
								handleModalOpen={handleModalOpen}
								title={showingTranslateValue(usp?.name)}
							/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</>
	);
};

export default UspTable;
