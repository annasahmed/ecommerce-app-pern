const {
	orderConfirmationAdminTemplate,
} = require('../../config/emailTemplates/orderConfirmationAdmin');
const {
	orderConfirmationCustomerTemplate,
} = require('../../config/emailTemplates/orderConfirmationUser');
const { sendEmail } = require('../email.service');

async function confirmOrder(req) {
	const { customer, billingAddress, items, summary } = req.body;
	let orderId = 10909;

	// send order confirmation email to user
	await sendEmail({
		to: customer.email,
		subject: `Order Confirmation #${orderId}`,
		html: orderConfirmationCustomerTemplate({
			orderId,
			customerName: `${customer.firstName} ${customer.lastName}`,
			items,
			subtotal: summary.subtotal,
			shipping: summary.shipping,
			total: summary.total,
		}),
	});
	// send order notification email to admin
	await sendEmail({
		to: 'annasahmed1609@gmail.com',
		// to: 'orders@babiesnbaba.com',
		subject: `New Order #${orderId}`,
		html: orderConfirmationAdminTemplate({
			orderId,
			customer,
			billingAddress,
			items,
			total: summary.total,
			shipping: summary.shipping,
			paymentMethod: customer.paymentMethod,
		}),
	});
}

module.exports = {
	confirmOrder,
};
