import { TableBody, TableCell, TableRow } from "@windmill/react-ui";

//internal import

import ShowHideButton from "@/components/table/ShowHideButton";
import { formatDate } from "@/utils/globals";

const AppuserTable = ({ data }) => {
	return (
		<>
			<TableBody>
				{data?.map((appuser) => (
					<TableRow key={appuser.id}>
						<TableCell className="font-semibold uppercase text-xs">
							{appuser?.id}
						</TableCell>
						<TableCell className="text-sm max-w-24">{appuser?.name}</TableCell>
						<TableCell className="text-sm max-w-24">{appuser?.email}</TableCell>
						<TableCell className="text-sm max-w-20">{appuser?.phone}</TableCell>
						<TableCell className="text-sm max-w-20 text-center">
							{formatDate(appuser?.created_at)}
						</TableCell>

						<TableCell className="text-center">
							<ShowHideButton id={appuser.id} appuser status={appuser.status} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</>
	);
};

export default AppuserTable;
