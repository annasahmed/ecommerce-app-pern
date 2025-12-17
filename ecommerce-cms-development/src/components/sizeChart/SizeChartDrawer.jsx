import { useContext, useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";

//internal import
import DrawerButton from "@/components/form/button/DrawerButton";
import InputArea from "@/components/form/input/InputArea";
import Error from "@/components/form/others/Error";
import LabelArea from "@/components/form/selectOption/LabelArea";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import { SidebarContext } from "@/context/SidebarContext";
import useTranslationValue from "@/hooks/useTranslationValue";
import SizeChartServices from "@/services/SizeChartServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useForm } from "react-hook-form";
import DrawerHeader from "../newComponents/DrawerHeader";
import { Button, Input } from "@windmill/react-ui";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import InputAreaField from "../form/fields/InputAreaField";

const defaultValues = {
	columns: ["Size", "Chest (in)", "Waist (in)", "Length (in)"],
	rows: [
		["S", "36", "30", "25"],
		["M", "38", "32", "26"],
		["L", "40", "34", "27"],
	],
};

const SizeChartDrawer = ({ id, data }) => {
	const { t } = useTranslation();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [resData, setResData] = useState({});
	const { closeDrawer, setIsUpdate } = useContext(SidebarContext);
	const [columns, setColumns] = useState([
		"Size",
		"Chest (in)",
		"Waist (in)",
		"Length (in)",
	]);
	const [rows, setRows] = useState([
		["S", "36", "30", "25"],
		["M", "38", "32", "26"],
		["L", "40", "34", "27"],
	]);

	const handleAddColumn = () => {
		setColumns([...columns, `Column ${columns.length + 1}`]);
		setRows(rows.map((row) => [...row, ""]));
	};

	const handleRemoveColumn = (index) => {
		if (columns.length <= 1) {
			toast({
				title: "Cannot remove column",
				description: "At least one column is required",
				variant: "destructive",
			});
			return;
		}
		setColumns(columns.filter((_, i) => i !== index));
		setRows(rows.map((row) => row.filter((_, i) => i !== index)));
	};

	const handleColumnChange = (index, value) => {
		const newColumns = [...columns];
		newColumns[index] = value;
		setColumns(newColumns);
	};

	const handleAddRow = () => {
		setRows([...rows, Array(columns.length).fill("")]);
	};

	const handleRemoveRow = (index) => {
		if (rows.length <= 1) {
			toast({
				title: "Cannot remove row",
				description: "At least one row is required",
				variant: "destructive",
			});
			return;
		}
		setRows(rows.filter((_, i) => i !== index));
	};

	const handleCellChange = (rowIndex, colIndex, value) => {
		const newRows = [...rows];
		newRows[rowIndex][colIndex] = value;
		setRows(newRows);
	};

	const {
		register,
		handleSubmit,
		setValue,
		clearErrors,
		reset,
		formState: { errors },
	} = useForm();

	const { handlerTextTranslateHandler } = useTranslationValue();

	const onSubmit = async (data) => {
		const { name, description } = data;

		try {
			setIsSubmitting(true);
			const nameTranslates = await handlerTextTranslateHandler(
				name,
				"en",
				resData?.name,
			);
			const descriptionTranslates = await handlerTextTranslateHandler(
				description,
				"en",
				resData?.description,
			);

			const sizeChartData = {
				name: {
					...nameTranslates,
					["en"]: name,
				},
				description: {
					...descriptionTranslates,
					["en"]: description,
				},
				chartData: { columns, rows },
			};

			if (id) {
				const res = await SizeChartServices.updateSizeChart(id, sizeChartData);
				setIsUpdate(true);
				setIsSubmitting(false);
				notifySuccess(res.message);
				setColumns(defaultValues.columns);
				setRows(defaultValues.rows);
				closeDrawer();
				reset();
			} else {
				const res = await SizeChartServices.addSizeChart(sizeChartData);
				setIsUpdate(true);
				setIsSubmitting(false);
				notifySuccess(res.message);
				setColumns(defaultValues.columns);
				setRows(defaultValues.rows);
				closeDrawer();
				reset();
			}
		} catch (err) {
			setIsSubmitting(false);
			notifyError(err ? err?.response?.data?.message : err?.message);
		}
	};

	useEffect(() => {
		if (id) {
			(async () => {
				try {
					const res = await SizeChartServices.getSizeChartById(id);
					if (res) {
						setResData(res);
						setValue("name", res.name["en"]);
						setValue("description", res.description["en"]);
						setColumns(res.chart_data.columns ?? []);
						setRows(res.chart_data.rows ?? []);
					}
				} catch (err) {
					notifyError(err ? err.response?.data?.message : err.message);
				}
			})();
		} else {
			reset();
		}
	}, [id, setValue, clearErrors, data]);

	return (
		<>
			<DrawerHeader
				id={id}
				register={register}
				updateTitle={t("UpdateSizeChart")}
				updateDescription={t("UpdateSizeChartDescription")}
				addTitle={t("AddSizeChartTitle")}
				addDescription={t("AddSizeChartDescription")}
			/>

			<Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-customGray-700 dark:text-customGray-200">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="p-6 flex-grow flex flex-col gap-4 scrollbar-hide w-full max-h-full pb-10">
						<InputAreaField
							label={t("Name")}
							required={true}
							register={register}
							inputLabel="name"
							inputName="name"
							inputType="text"
							inputPlaceholder={t("NamePlaceholder")}
							errorName={errors.name}
							isVertical
						/>
						<InputAreaField
							label={t("Description")}
							required={false}
							register={register}
							inputLabel="description"
							inputName="description"
							inputType="text"
							inputPlaceholder={t("DescriptionPlaceholder")}
							errorName={errors.description}
							isVertical
						/>

						<div className="mt-6 mb-6">
							<section>
								<div className="flex justify-between items-center mb-4">
									<h2 className="text-xl font-semibold text-foreground">
										{t("SizeChartData")}
									</h2>
									<div className="flex gap-2">
										<Button
											type="button"
											size="small"
											onClick={handleAddColumn}>
											<FiPlus className="w-4 h-4 mr-1" />
											{t("AddColumn")}
										</Button>
										<Button type="button" size="small" onClick={handleAddRow}>
											<FiPlus className="w-4 h-4 mr-1" />
											{t("AddRow")}
										</Button>
									</div>
								</div>

								<div className="overflow-x-auto">
									<table className="w-full border-collapse">
										<thead>
											<tr>
												{columns.map((col, colIndex) => (
													<th
														key={colIndex}
														className="border border-border bg-muted p-2">
														<div className="flex items-center gap-2">
															<Input
																className="text-sm"
																value={col}
																onChange={(e) =>
																	handleColumnChange(colIndex, e.target.value)
																}
																placeholder={`Column ${colIndex + 1}`}
															/>
															<button
																type="button"
																onClick={() => handleRemoveColumn(colIndex)}
																className="text-destructive hover:text-destructive/80 p-1">
																<FiTrash2 className="w-4 h-4" />
															</button>
														</div>
													</th>
												))}
												<th className="border border-border bg-muted p-2 w-16">
													{t("Actions")}
												</th>
											</tr>
										</thead>
										<tbody>
											{rows.map((row, rowIndex) => (
												<tr key={rowIndex}>
													{row.map((cell, colIndex) => (
														<td
															key={colIndex}
															className="border border-border p-2">
															<Input
																className="text-sm"
																value={cell}
																onChange={(e) =>
																	handleCellChange(
																		rowIndex,
																		colIndex,
																		e.target.value,
																	)
																}
																placeholder={`Value`}
															/>
														</td>
													))}
													<td className="border border-border p-2 text-center">
														<button
															type="button"
															onClick={() => handleRemoveRow(rowIndex)}
															className="text-destructive hover:text-destructive/80 p-1">
															<FiTrash2 className="w-4 h-4" />
														</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>

								{rows.length === 0 && (
									<div className="text-center py-8 text-muted-foreground">
										No rows added yet. Click "Add Row" to get started.
									</div>
								)}
							</section>
						</div>
					</div>

					<DrawerButton id={id} title="SizeChart" isSubmitting={isSubmitting} />
				</form>
			</Scrollbars>
		</>
	);
};

export default SizeChartDrawer;
