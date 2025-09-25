const db = require('../../db/models/index.js');
const commonUtils = require('../../utils/commonUtils.js');
const createBaseService = require('../../utils/baseService.js');

const sizeChartService = createBaseService(db.size_chart, {
	name: 'SizeChart',
	checkDuplicateSlug: false,
	formatCreateData: (data) => ({
		name: data.name,
		description: data.description,
		chart_data: data.chartData,
		status: data.status,
	}),
	formatUpdateData: (data) => {
		const toUpdate = {};
		if (data.name) toUpdate.name = data.name;
		if (data.description) toUpdate.description = data.description;
		if (data.chartData) toUpdate.chart_data = data.description;
		if (data.status !== undefined) toUpdate.status = data.status;

		return toUpdate;
	},
});

// Using userId logic from request
async function createSizeChart(req) {
	const userId = commonUtils.getUserId(req);
	return sizeChartService.create(req.body, userId);
}

async function updateSizeChart(req) {
	const userId = commonUtils.getUserId(req);
	return sizeChartService.update(req.params.sizeChartId, req.body, userId);
}

async function softDeleteSizeChartById(req) {
	const userId = commonUtils.getUserId(req);
	return sizeChartService.softDelete(req.params.sizeChartId, userId);
}

module.exports = {
	getSizeChartById: sizeChartService.getById,
	createSizeChart,
	updateSizeChart,
	getSizeCharts: (req) =>
		sizeChartService.list(req, [], [], [['created_at', 'ASC']]),
	permanentDeleteSizeChartById: sizeChartService.permanentDelete,
	softDeleteSizeChartById,
};
