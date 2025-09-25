const catchAsync = require('../../utils/catchAsync');
const { adminSizeChartService } = require('../../services/Admin');

const getSizeChartById = catchAsync(async (req, res) => {
	const sizeChart = await adminSizeChartService.getSizeChartById(
		req.params.sizeChartId
	);
	res.send(sizeChart);
});
const getSizeCharts = catchAsync(async (req, res) => {
	const sizeCharts = await adminSizeChartService.getSizeCharts(req);
	res.send(sizeCharts);
});
const createSizeChart = catchAsync(async (req, res) => {
	const sizeCharts = await adminSizeChartService.createSizeChart(req);
	res.send(sizeCharts);
});

const softDeleteSizeChart = catchAsync(async (req, res) => {
	await adminSizeChartService.softDeleteSizeChartById(req);
	res.send({ success: true });
});
const permanentDeleteSizeChart = catchAsync(async (req, res) => {
	await adminSizeChartService.permanentDeleteSizeChartById(
		req.params.sizeChartId
	);
	res.send({ success: true });
});

const updateSizeChart = catchAsync(async (req, res) => {
	const sizeChart = await adminSizeChartService.updateSizeChart(req);

	res.send(sizeChart);
});

module.exports = {
	getSizeChartById,
	getSizeCharts,
	createSizeChart,
	softDeleteSizeChart,
	permanentDeleteSizeChart,
	updateSizeChart,
};
