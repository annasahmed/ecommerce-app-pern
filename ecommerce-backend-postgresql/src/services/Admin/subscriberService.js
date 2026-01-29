const db = require('../../db/models');
const createBaseService = require('../../utils/baseService');

const subscriberService = createBaseService(db.subscriber, {
	name: 'Subscriber',
	formatCreateData: (data) => {},
	formatUpdateData: (data) => {},
});

module.exports = {
	getSubscribers: (req) =>
		subscriberService.list(req, [], [], [['created_at', 'ASC']]),
};
