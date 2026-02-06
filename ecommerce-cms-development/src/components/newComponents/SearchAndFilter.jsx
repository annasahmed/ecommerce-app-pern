import { Button, Card, CardBody, Input } from "@windmill/react-ui";
import { FiPlus } from "react-icons/fi";
import AnimatedContent from "../common/AnimatedContent";
import UploadProductsExcel from "../product/UploadProductsExcel";

const SearchAndFilter = ({
	onSubmitFilter = () => {},
	inputPlaceholder = "",
	buttonText = "",
	onClick = () => {},
	showAddButtom = true,
	showImportButton = false,
}) => {
	return (
		<AnimatedContent>
			<Card className="min-w-0 shadow-xs overflow-hidden bg-customWhite dark:bg-customGray-800 rounded-t-lg rounded-0 mb-4">
				<CardBody>
					<form
						onSubmit={onSubmitFilter}
						className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
						<div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
							<Input
								// ref={categoryRef}
								type="search"
								placeholder={inputPlaceholder}
							/>
						</div>

						<div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
							<div className="w-full mx-1">
								<Button type="submit" className="h-12 w-full bg-customTeal-700">
									Filter
								</Button>
							</div>

							<div className="w-full mx-1">
								<Button
									layout="outline"
									// onClick={handleResetField}
									type="reset"
									className="px-4 md:py-1 py-2 h-12 text-sm dark:bg-customGray-700">
									<span className="text-customBlack dark:text-customGray-200">
										Reset
									</span>
								</Button>
							</div>
						</div>
						{showAddButtom && (
							<div className="w-full md:w-48 lg:w-48 xl:w-48">
								<Button onClick={onClick} className="rounded-md h-12 w-full">
									<span className="mr-2">
										<FiPlus />
									</span>

									{buttonText}
								</Button>
							</div>
						)}

						{/* {showImportButton && <UploadProductsExcel />} */}
					</form>
				</CardBody>
			</Card>
		</AnimatedContent>
	);
};

export default SearchAndFilter;
