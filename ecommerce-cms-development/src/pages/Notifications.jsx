import {
	Avatar,
	Badge,
	Button,
	Card,
	CardBody,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from "@windmill/react-ui";
import { useContext, useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { FiTrash2, FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";

//internal import
import ellipse from "@/assets/img/icons/ellipse.svg";
import CheckBox from "@/components/form/input/CheckBox";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import { notifyError, notifySuccess } from "@/utils/toast";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import NotificationServices from "@/services/NotificationServices";

const Notifications = () => {
	// react hook
	const [data, setData] = useState([]);
	const [totalDoc, setTotalDoc] = useState(0);
	const [totalUnreadDoc, setTotalUnreadDoc] = useState(0);
	const [page, setPage] = useState(2);
	const [isCheck, setIsCheck] = useState([]);
	const [isCheckAll, setIsCheckAll] = useState(false);

	const { showDateTimeFormat } = useUtilsFunction();

	// handle notification status change
	const handleNotificationStatusChange = async (id) => {
		try {
			await NotificationServices.updateStatusNotification(id, {
				status: "read",
			});
			const getAllRes = await NotificationServices.getAllNotification();
			setData(getAllRes?.notifications);
			setTotalUnreadDoc(getAllRes?.totalUnreadDoc);
			window.location.reload(false);
		} catch (err) {
			// console.log(err);
			notifyError(err?.response?.data?.message || err?.message);
		}
	};

	// handle notification delete
	const handleNotificationDelete = async (id) => {
		try {
			await NotificationServices.deleteNotification(id);
			const getAllRes = await NotificationServices.getAllNotification();
			setData(getAllRes?.notifications);
			setTotalUnreadDoc(getAllRes?.totalUnreadDoc);
			setTotalDoc(getAllRes?.totalDoc);
		} catch (err) {
			// console.log(err);
			notifyError(err?.response?.data?.message || err?.message);
		}
	};

	// handle see more notification
	const handleSeeMoreNotification = async (pg) => {
		// console.log("pg ===>", pg);

		try {
			const getAllRes = await NotificationServices.getAllNotification(pg);
			setData((pre) => [...pre, ...getAllRes?.notifications]);
			setTotalUnreadDoc(getAllRes?.totalUnreadDoc);
			setPage((pre) => pre + 1);
		} catch (err) {
			// console.log(err);
			notifyError(err?.response?.data?.message || err?.message);
		}
	};

	// handle mark is read
	const handleMarkIsRead = async () => {
		try {
			// notification status update many
			const res = await NotificationServices.updateManyStatusNotification({
				ids: isCheck,
				status: "read",
			});
			setIsCheck([]);
			notifySuccess(res.message);
			setPage(1);
			// get all Notification
			const getAllRes = await NotificationServices.getAllNotification();
			setData(getAllRes?.notifications);
			setTotalUnreadDoc(getAllRes?.totalUnreadDoc);
		} catch (err) {
			// notifyError("Server Side Error");
			notifyError(err?.response?.data?.message || err?.message);
			// console.log(err);
		}
	};

	// handle delete many
	const handleDeleteMany = async () => {
		try {
			// notification
			const res = await NotificationServices.deleteManyNotification({
				ids: isCheck,
			});
			notifySuccess(res.message);
			setIsCheck([]);
			setPage(1);
			// get all Notification
			const getAllRes = await NotificationServices.getAllNotification();
			setData(getAllRes?.notifications);
			setTotalUnreadDoc(getAllRes?.totalUnreadDoc);
		} catch (err) {
			// notifyError("Server Side Error");
			notifyError(err?.response?.data?.message || err?.message);
			// console.log(err);
		}
	};

	// handle select all
	const handleSelectAll = () => {
		setIsCheckAll(!isCheckAll);
		setIsCheck(data?.map((li) => li.id));
		if (isCheckAll) {
			setIsCheck([]);
		}
	};

	// handle single click
	const handleClick = (e) => {
		const { id, checked } = e.target;
		setIsCheck([...isCheck, id]);
		if (!checked) {
			setIsCheck(isCheck.filter((item) => item !== id));
		}
	};

	useEffect(() => {
		(async () => {
			try {
				const res = await NotificationServices.getAllNotification();
				setData(res?.notifications);
				setTotalUnreadDoc(res?.totalUnreadDoc);
				setTotalDoc(res?.totalDoc);
				setPage(1);
			} catch (err) {
				// console.log(err?.response?.data?.message || err?.message);
				notifyError(err?.response?.data?.message || err?.message);
			}
		})();
	}, []);

	return (
		<>
			<PageTitle>Notifications</PageTitle>

			<Card className="shadow-xs overflow-hidden bg-customWhite dark:bg-customGray-800 mb-5">
				<CardBody className="flex justify-between">
					<div className="">
						<Button
							disabled={isCheck?.length < 1}
							onClick={handleMarkIsRead}
							className="w-full rounded-md h-10 flex items-center justify-center bg-customBlue-500 text-customWhite px-1 hover:bg-customBlue-700">
							<span className="mr-2">
								<FiMail />
							</span>
							Mark is read
						</Button>
					</div>

					<div className="">
						<Button
							disabled={isCheck?.length < 1}
							onClick={handleDeleteMany}
							className="w-full rounded-md h-10 bg-customRed-500 btn-red">
							<span className="mr-3">
								<FiTrash2 />
							</span>
							Delete
						</Button>
					</div>
				</CardBody>
			</Card>

			<Card className="shadow-xs overflow-hidden bg-customWhite dark:bg-customGray-800 mb-5">
				<CardBody style={{ padding: 0 }}>
					<div className="p-4 dark:text-customGray-300">
						<p className="text-sm font-semibold text-customTeal-700">
							Unread Notification ({totalUnreadDoc})
						</p>
					</div>

					<div className="border rounded-md">
						<div className="bg-customGray-200 border-customGray-400 p-2 dark:bg-customGray-700 dark:text-customGray-400 flex justify-between">
							<div className="flex">
								<CheckBox
									type="checkbox"
									name="selectAll"
									id="selectAll"
									handleClick={handleSelectAll}
									isChecked={isCheckAll}
								/>
								<p className="text-xs font-semibold text-customGray-500 my-auto dark:text-customGray-300 ml-6 uppercase">
									Notification
								</p>
							</div>

							{/* <div className="text-left w-1/6">
                <p className="text-sm font-semibold text-customGray-500 my-auto dark:text-customGray-300">
                  Notification
                </p>
              </div> */}
							<div className="text-right">
								<p className="text-xs font-semibold text-customGray-500 my-auto dark:text-customGray-300 mr-2 uppercase">
									Action
								</p>
							</div>
						</div>

						<div className="w-full lg:h-lg md:h-sm h-md relative">
							<Scrollbars className="scrollbar-hide">
								<TableContainer className="border-none p-2">
									<Table>
										<TableBody className="w-full h-440">
											{data.map((value, index) => {
												return (
													<TableRow className="border-none" key={index + 1}>
														<TableCell style={{ padding: 0 }}>
															<CheckBox
																type="checkbox"
																name={value?.id}
																id={value.id}
																handleClick={handleClick}
																isChecked={isCheck?.includes(value.id)}
															/>
														</TableCell>

														<TableCell
															className="md:w-full w-1/5"
															style={{ paddingRight: 0 }}>
															<Link
																to={
																	value.productId
																		? `/product/${value.productId}`
																		: `/order/${value.orderId}`
																}
																className="flex items-center"
																onClick={() =>
																	handleNotificationStatusChange(value.id)
																}>
																<Avatar
																	className="mr-2 md:block hidden bg-customGray-50 border border-customGray-200"
																	src={value.image}
																	alt="image"
																/>

																<div className="notification-content">
																	<div className="md:inline-block hidden">
																		<h6 className="font-medium text-customGray-500">
																			{value?.message}
																		</h6>
																	</div>
																	<div className="md:hidden">
																		<h6 className="font-medium text-customGray-500">
																			{value?.message.substring(0, 33) + "..."}
																		</h6>
																	</div>

																	<p className="flex items-center text-xs text-customGray-400">
																		{value.productId ? (
																			<Badge type="danger">Stock Out</Badge>
																		) : (
																			<Badge type="success">New Order</Badge>
																		)}
																		<span className="ml-2">
																			{showDateTimeFormat(value?.createdAt)}
																		</span>
																	</p>
																</div>

																{value.status === "unread" && (
																	<span className="px-2 md:flex hidden focus:outline-none text-customTeal-600">
																		<img
																			src={ellipse}
																			width={12}
																			height={12}
																			alt="ellipse"
																			className="w-3 h-3 text-customTeal-600"
																		/>
																	</span>
																)}
															</Link>
														</TableCell>

														<TableCell
															className="text-right"
															style={{
																padding: `${
																	window.innerWidth < 420 ? "0" : "0.5rem"
																}`,
															}}>
															<div className="group inline-block relative">
																<button
																	onClick={() =>
																		handleNotificationDelete(value.id)
																	}
																	type="button"
																	className="px-2 group-hover:text-customBlue-500 text-customRed-500 focus:outline-none">
																	<FiTrash2 />
																</button>

																<div className="absolute hidden group-hover:inline-block bg-customGray-50 dark:text-customWhite mr-8 mb-1 right-0 z-50 px-3 py-2 text-sm font-medium text-customRed-600 rounded-lg shadow-sm tooltip dark:bg-customGray-700">
																	Delete
																</div>
															</div>
														</TableCell>
													</TableRow>
												);
											})}
										</TableBody>
									</Table>

									<div>
										{totalDoc > 5 && data.length !== totalDoc ? (
											<div className="text-center py-2">
												<button
													onClick={() => handleSeeMoreNotification(page + 1)}
													type="button"
													className="focus:outline-none text-customBlue-700 hover:underline transition ease-out duration-200 dark:text-customGray-400">
													See more notifications
												</button>
											</div>
										) : null}
									</div>
								</TableContainer>
							</Scrollbars>
						</div>
					</div>
				</CardBody>
			</Card>
		</>
	);
};

export default Notifications;
