import { TableBody, TableCell, TableRow } from "@windmill/react-ui";

//internal import
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ShowHideButton from "@/components/table/ShowHideButton";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import { formatDate } from "@/utils/globals";
import DeleteModal from "../modal/DeleteModal";

const UserTable = ({ data, toggleDrawerData, useParamId }) => {
	const { title, serviceId, handleModalOpen, handleUpdate } = toggleDrawerData;
	const { showSelectedLanguageTranslation } = useUtilsFunction();

	return (
		<>
			<DeleteModal useParamId={useParamId} id={serviceId} title={title} />

			<TableBody>
				{data?.map((user) => (
					<TableRow key={user.id}>
						<TableCell className="font-semibold uppercase text-xs">
							{user?.id}
						</TableCell>
						<TableCell className="text-sm">
							{user.first_name + " " + (user.last_name || "")}
						</TableCell>
						<TableCell className="text-sm">{user.email}</TableCell>
						<TableCell className="text-sm">{user.role?.name}</TableCell>
						<TableCell className="text-sm text-center">
							{formatDate(user.created_at)}
						</TableCell>

						<TableCell className="text-center">
							<ShowHideButton id={user.id} user status={user.status} />
						</TableCell>
						<TableCell>
							<EditDeleteButton
								id={user?.id}
								parent={user}
								children={user?.children}
								handleUpdate={handleUpdate}
								handleModalOpen={handleModalOpen}
								title={showSelectedLanguageTranslation(
									user?.translations,
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

export default UserTable;
