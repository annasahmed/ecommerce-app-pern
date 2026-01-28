import { TableBody, TableCell, TableRow } from "@windmill/react-ui";

//internal import

import DeleteModal from "@/components/modal/DeleteModal";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import { formatDate } from "@/utils/globals";

const ReturnedTable = ({
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
				{data?.map((returned) => (
					<TableRow key={returned.id}>
						<TableCell className="font-semibold uppercase text-xs">
							{returned?.id}
						</TableCell>
						<TableCell className="text-sm">
							{formatDate(returned.updated_at)}
						</TableCell>
						{/* <TableCell className="text-sm">{returned.tracking_id}</TableCell> */}
						<TableCell className="text-sm">
							{returned.guest_first_name
								? returned.guest_first_name +
									" " +
									(returned.guest_last_name || "")
								: returned.app_user_id
									? returned.user?.name
									: "-"}
						</TableCell>
						{/* <TableCell className="text-sm text-center uppercase">
							{returned.payment_method}
						</TableCell> */}
						<TableCell className="capitalize text-sm max-w-42 whitespace-break-spaces">
							{returned.order_item?.product_title?.toLowerCase() ||
								"-"}
						</TableCell>
						<TableCell className="text-sm">
							Rs. {returned.order_item?.price * returned.quantity}{" "}
							<span className="text-gray-500 text-xs">
								(Qty:{""}
								{returned.quantity})
							</span>
						</TableCell>

						<TableCell className={`text-sm`}>
							<span
								className={`px-4 py-1 rounded-full text-xs font-bold uppercase p4 tracking-wide shadow-sm ${
									returned.status === "requested"
										? "bg-yellow-100 text-yellow-800 ring-1 ring-yellow-300"
										: returned.status === "approved"
											? "bg-blue-100 text-blue-800 ring-1 ring-blue-300"
											: returned.status === "rejected"
												? "bg-red-100 text-red-800 ring-1 ring-red-300"
												: returned.status === "received"
													? "bg-green-100 text-green-800 ring-1 ring-green-300"
													: "bg-gray-100 text-gray-800"
								}`}>
								{returned.status}
							</span>
						</TableCell>

						<TableCell>
							<button
								onClick={() => {
									handleUpdate(returned.id);
								}}>
								View
							</button>
							{/* <EditDeleteButton
								id={returned?.id}
								parent={returned}
								isCheck={isCheck}
								children={returned?.children}
								handleUpdate={handleUpdate}
								handleModalOpen={handleModalOpen}
								title={showSelectedLanguageTranslation(
									returned?.translations,
									"title",
								)}
							/> */}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</>
	);
};

export default ReturnedTable;
