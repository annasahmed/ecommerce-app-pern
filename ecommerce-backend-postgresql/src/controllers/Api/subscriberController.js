const catchAsync = require('../../utils/catchAsync');
const { apiSubscriberService } = require('../../services/Api');
const httpStatus = require('http-status');

const createSubscriber = catchAsync(async (req, res) => {
	const subscriber = await apiSubscriberService.createSubscriber(req);
	res.status(httpStatus.CREATED).send(subscriber);
});

module.exports = {
	createSubscriber,
};
