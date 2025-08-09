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
				{data?.map((branch) => (
					<TableRow key={branch.id}>
						<TableCell>
							<CheckBox
								type="checkbox"
								name="branch"
								id={parseInt(branch.id)}
								handleClick={handleClick}
								isChecked={isCheck?.includes(parseInt(branch.id))}
							/>
						</TableCell>

						<TableCell className="font-semibold uppercase text-xs">
							{branch?.id}
						</TableCell>
						<TableCell className="text-sm">
							{showingTranslateValue(branch?.name)}
						</TableCell>
						<TableCell className="text-sm">{branch?.location || "-"}</TableCell>
						<TableCell className="text-sm">{branch?.email}</TableCell>

						<TableCell className="text-center">
							<ShowHideButton id={branch.id} branch status={branch.status} />
						</TableCell>
						<TableCell>
							<EditDeleteButton
								id={branch?.id}
								parent={branch}
								isCheck={isCheck}
								children={branch?.children}
								handleUpdate={handleUpdate}
								handleModalOpen={handleModalOpen}
								title={showingTranslateValue(branch?.name)}
							/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</>
	);
};

export default ProductTable;
