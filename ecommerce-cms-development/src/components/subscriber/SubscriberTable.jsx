import { TableBody, TableCell, TableRow } from "@windmill/react-ui";

//internal import

import { formatDate } from "@/utils/globals";

const SubscriberTable = ({ data }) => {
	return (
		<>
			<TableBody>
				{data?.map((subscriber) => (
					<TableRow key={subscriber.id}>
						<TableCell className="font-semibold uppercase text-xs">
							{subscriber?.id}
						</TableCell>
						{/* <TableCell className="text-sm">
							{formatDate(subscriber.name)}
						</TableCell> */}
						<TableCell className="text-sm">{subscriber.email}</TableCell>
						<TableCell className="text-sm">
							{formatDate(subscriber.updated_at)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</>
	);
};

export default SubscriberTable;
