const orderConfirmationCustomerTemplate = ({
	orderId,
	customerName,
	items,
	subtotal,
	shipping,
	total,
}) => {
	const itemsHtml = items
		.map(
			(item) => `
			<tr>
				<td style="padding:8px 0;">${item.title}</td>
				<td style="padding:8px 0;" align="center">${item.quantity}</td>
				<td style="padding:8px 0;" align="right">Rs ${item.finalPrice}</td>
			</tr>
		`
		)
		.join('');

	return `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; background:#f6f6f6; padding:20px;">
	<table width="100%" cellpadding="0" cellspacing="0">
		<tr>
			<td align="center">
				<table width="600" style="background:#ffffff; padding:24px; border-radius:8px;">
					
					<tr>
						<td>
							<h2 style="margin:0 0 10px;">Thank you for your order 🎉</h2>
							<p style="margin:0 0 20px;">
								Hi <strong>${customerName}</strong>,<br/>
								Your order <strong>#${orderId}</strong> has been placed successfully.
							</p>
						</td>
					</tr>

					<tr>
						<td>
							<h3 style="margin-bottom:10px;">Order Summary</h3>
							<table width="100%" cellpadding="0" cellspacing="0">
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
							<table width="100%">
								<tr>
									<td>Subtotal</td>
									<td align="right">Rs ${subtotal}</td>
								</tr>
								<tr>
									<td>Shipping</td>
									<td align="right">Rs ${shipping}</td>
								</tr>
								<tr>
									<td style="font-weight:bold;">Total</td>
									<td align="right" style="font-weight:bold;">
										Rs ${total}
									</td>
								</tr>
							</table>
						</td>
					</tr>

					<tr>
						<td style="padding-top:20px;">
							<p style="margin:0;">
								We’ll contact you once your order is shipped.<br/>
								If you have any questions, just reply to this email.
							</p>
						</td>
					</tr>

					<tr>
						<td style="padding-top:30px; font-size:12px; color:#888;">
							© ${new Date().getFullYear()} BnB Store
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

module.exports = { orderConfirmationCustomerTemplate };
