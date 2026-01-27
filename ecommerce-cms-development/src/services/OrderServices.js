import requests from "./httpService";

const OrderServices = {
	getAllOrder: async () => {
		return requests.get("/order");
	},

	getAllOrders: async () => {
		return requests.get("/order");
	},

	getOrderById: async (id) => {
		return requests.get(`/order/${id}`);
	},

	addOrder: async (body) => {
		return requests.post("/order", body);
	},

	addAllOrder: async (body) => {
		return requests.post("/order", body);
	},

	updateOrder: async (id, body) => {
		return requests.patch(`/order/${id}`, body);
	},

	updateOrderStatus: async (id, body) => {
		return requests.patch(`/order/status/${id}`, body);
	},

	deleteOrder: async (id, body) => {
		return requests.delete(`/order/${id}`, body);
	},

	updateManyOrder: async (body) => {
		return requests.patch("/order/update/many", body);
	},

	deleteManyOrder: async (body) => {
		return requests.patch("/order/delete/many", body);
	},
};

export default OrderServices;
