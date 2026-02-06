import { Pagination, TableContainer, TableFooter } from "@windmill/react-ui";
import TableLoading from "../preloader/TableLoading";
import NotFound from "../table/NotFound";

const TableWrapperWithPagination = ({
	loading,
	error,
	data,
	children,
	onPageChange,
}) => {
	return loading ? (
		<TableLoading row={12} col={6} width={190} height={20} />
	) : error ? (
		<span className="text-center mx-auto text-customRed-500">{error}</span>
	) : data?.total !== 0 &&
	  (data?.records ? data?.records?.length !== 0 : true) ? (
		<TableContainer className="mb-8">
			{children}
			<TableFooter>
				<Pagination
					totalResults={data.total || 10}
					resultsPerPage={data.limit || 10}
					// onChange={() => {}}
					onChange={(page) => onPageChange(page)} // 👈 fetch next page
					label="Table navigation"
				/>
			</TableFooter>
		</TableContainer>
	) : (
		<NotFound title="Sorry, There are no data right now." />
	);
};

export default TableWrapperWithPagination;
