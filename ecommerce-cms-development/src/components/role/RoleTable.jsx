import { TableBody, TableCell, TableRow } from "@windmill/react-ui";

//internal import
import EditDeleteButton from "@/components/table/EditDeleteButton";
import { formatDate } from "@/utils/globals";
import DeleteModal from "../modal/DeleteModal";

const RoleTable = ({ data, toggleDrawerData, useParamId }) => {
	const { title, serviceId, handleModalOpen, handleUpdate } = toggleDrawerData;

	return (
		<>
			<DeleteModal useParamId={useParamId} id={serviceId} title={title} />

			<TableBody>
				{data?.map((role) => (
					<TableRow key={role.id}>
						<TableCell className="font-semibold uppercase text-xs">
							{role?.id}
						</TableCell>
						<TableCell className="text-sm">{role.name}</TableCell>
						<TableCell className="text-sm text-center">
							{formatDate(role.created_at)}
						</TableCell>

						{/* <TableCell className="text-center">
							<ShowHideButton id={role.id} role status={role.status} />
						</TableCell> */}
						<TableCell>
							<EditDeleteButton
								id={role?.id}
								parent={role}
								children={role?.children}
								handleUpdate={handleUpdate}
								handleModalOpen={handleModalOpen}
								title={role.name}
							/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</>
	);
};

export default RoleTable;
