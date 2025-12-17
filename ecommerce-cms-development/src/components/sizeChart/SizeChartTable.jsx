import { TableBody, TableCell, TableRow } from "@windmill/react-ui";

//internal import

import CheckBox from "@/components/form/others/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ShowHideButton from "@/components/table/ShowHideButton";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const SizeChartTable = ({
	data,
	toggleDrawerData,
	isCheck,
	setIsCheck,
	useParamId,
}) => {
	const { title, serviceId, handleModalOpen, handleUpdate } = toggleDrawerData;
	const { showSelectedLanguageTranslation, showingTranslateValue } =
		useUtilsFunction();

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
				{data?.map((sizeChart) => (
					<TableRow key={sizeChart.id}>
						<TableCell>
							<CheckBox
								type="checkbox"
								name="sizeChart"
								id={parseInt(sizeChart.id)}
								handleClick={handleClick}
								isChecked={isCheck?.includes(parseInt(sizeChart.id))}
							/>
						</TableCell>

						<TableCell className="font-semibold uppercase text-xs">
							{sizeChart?.id}
						</TableCell>
						<TableCell className="text-sm">
							{showingTranslateValue(sizeChart?.name)}
						</TableCell>
						<TableCell className="text-sm">
							{showingTranslateValue(sizeChart?.description)}
						</TableCell>

						<TableCell className="text-center">
							<ShowHideButton
								id={sizeChart.id}
								sizeChart
								status={sizeChart.status}
							/>
						</TableCell>
						<TableCell>
							<EditDeleteButton
								id={sizeChart?.id}
								parent={sizeChart}
								isCheck={isCheck}
								children={sizeChart?.children}
								handleUpdate={handleUpdate}
								handleModalOpen={handleModalOpen}
								title={showingTranslateValue(sizeChart?.name)}
							/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</>
	);
};

export default SizeChartTable;
