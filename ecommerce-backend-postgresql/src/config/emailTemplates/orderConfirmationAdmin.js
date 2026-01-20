const orderConfirmationAdminTemplate = ({
	orderId,
	customer,
	items,
	total,
	shipping,
	paymentMethod,
	billingAddress = null,
}) => {
	const itemsHtml = items
		.map(
			(item) => `
			<tr>
				<td>${item.title}</td>
				<td align="center">${item.quantity}</td>
				<td align="right">Rs ${item.finalPrice}</td>
			</tr>
		`
		)
		.join('');

	return `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; background:#f6f6f6; padding:20px;">
	<table width="100%">
		<tr>
			<td align="center">
				<table width="600" style="background:#ffffff; padding:24px; border-radius:8px;">
					
					<tr>
						<td>
							<h2>🛒 New Order Received</h2>
							<p><strong>Order ID:</strong> #${orderId}</p>
						</td>
					</tr>

					<tr>
						<td>
							<h3>Customer Details</h3>
							<p>
								<strong>Name:</strong> ${customer.firstName} ${customer.lastName}<br/>
								<strong>Email:</strong> ${customer.email}<br/>
								<strong>Phone:</strong> ${customer.phone}<br/>
								<strong>Address:</strong> ${customer.address}<br/>
								<strong>City:</strong> ${customer.city}<br/>
								<strong>Postal Code:</strong> ${customer.postalCode}<br/>
								<strong>Country:</strong> ${customer.country}<br/>
								<strong>Billing Address:</strong> ${
									customer.billingSameAsShipping
										? 'Same as Shipping'
										: 'Different'
								}<br/>
								${
									billingAddress
										? `
<br/>
								<strong style="font-weight:medium; text-align: center;">Billing Address Details:</strong><br/>
								<br/>
								<strong>Phone:</strong> ${billingAddress.phone || ''}<br/>
								<strong>Address:</strong> ${billingAddress.address}<br/>
								<strong>City:</strong> ${billingAddress.city}<br/>
								<strong>Postal Code:</strong> ${billingAddress.postalCode}<br/>`
										: ''
								}
							</p>
						</td>
					</tr>

					<tr>
						<td>
							<h3>Order Items</h3>
							<table width="100%" cellpadding="6" cellspacing="0">
								<tr style="border-bottom:1px solid #eee;">
									<th align="left">Item</th>
									<th align="center">Qty</th>
									<th align="right">Price</th>
								</tr>
								${itemsHtml}
							</table>
						</td>
					</tr>

					<tr>
						<td style="padding-top:20px;">
							<p>
								<strong>Payment Method:</strong> ${paymentMethod}<br/>
								<strong>Shipping:</strong> Rs ${shipping}<br/>
								<strong>Total Amount:</strong> Rs ${total}
							</p>
						</td>
					</tr>

					

				</table>
			</td>
		</tr>
	</table>
</body>
</html>
`;
};
module.exports = { orderConfirmationAdminTemplate };

{
	/* <tr>
						<td style="padding-top:20px;">
							<a href="https://your-admin-panel.com/orders/${orderId}"
							   style="display:inline-block; padding:10px 16px; background:#6d28d9; color:#fff; text-decoration:none; border-radius:6px;">
								View Order
							</a>
						</td>
					</tr> */
}
