import React from "react";
import { Modal, ModalBody, ModalFooter, Button } from "@windmill/react-ui";

const AccessListModal = ({ isOpen, onClose, staff, showingTranslateValue }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<h1 className="text-xl font-medium text-center pb-6 dark:text-customGray-300">
				List of route access for{" "}
				<span className="text-customTeal-600">
					{showingTranslateValue(staff?.name)}
				</span>
			</h1>
			<ModalBody>
				{staff?.access_list?.length > 0 ? (
					<ol className="list-disc pl-5">
						{staff?.access_list?.map((route, index) => (
							<li
								key={index}
								className="text-sm text-customGray-700 dark:text-customGray-300 capitalize">
								{route}
							</li>
						))}
					</ol>
				) : (
					<p className="text-customOrange-500 py-10 text-lg text-center">
						This staff not have any route access!
					</p>
				)}
			</ModalBody>
			<ModalFooter className="justify-end">
				<Button
					className="w-full sm:w-auto bg-customRed-400 text-customWhite hover:bg-customRed-500"
					layout="delete"
					onClick={onClose}>
					Close
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default AccessListModal;
