import React, { useState } from "react";
import Drawer from "rc-drawer";
import ReactDOM from "react-dom";
import {
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from "@windmill/react-ui";

export default function App() {
	const [drawerVisible, setDrawerVisible] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);

	const onClose = () => {
		setModalVisible(false);
	};

	return (
		<div>
			<Button onClick={() => setDrawerVisible(true)}>Open Drawer</Button>

			<Drawer
				open={drawerVisible}
				onClose={() => setDrawerVisible(false)}
				placement="right"
				width="300px"
				handler={false}
				level={null} // prevents push effect
			>
				<div style={{ padding: 20 }}>
					<h2>Drawer Content</h2>
					<Button onClick={() => setModalVisible(true)}>Open Modal</Button>
				</div>
			</Drawer>

			<Modal
				isOpen={modalVisible}
				onClose={onClose}
				style={{
					zIndex: 999999,
				}}>
				<ModalHeader>My Modal</ModalHeader>
				<ModalBody>
					<p>This modal is above the drawer!</p>
				</ModalBody>
				<ModalFooter>
					<Button onClick={onClose}>Close</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
}
