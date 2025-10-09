const Joi = require('@hapi/joi');

const chartDataSchema = Joi.object({
	columns: Joi.array().items(Joi.string().required()).min(1).required(),

	rows: Joi.array()
		.items(
			Joi.array()
				.items(Joi.alternatives(Joi.string(), Joi.number()))
				.required()
		)
		.min(1)
		.required(),
}).custom((value, helpers) => {
	// Ensure each row matches columns length
	const colCount = value.columns.length;
	for (let i = 0; i < value.rows.length; i++) {
		if (value.rows[i].length !== colCount) {
			return helpers.error('any.invalid', {
				message: `Row ${
					i + 1
				} does not match columns length (${colCount})`,
			});
		}
	}
	return value;
}, 'Row-Column Length Validation');

const createSizeChart = {
	body: Joi.object().keys({
		name: Joi.object().required(),
		description: Joi.object().required(),
		chartData: chartDataSchema.required(),
		status: Joi.boolean(),
	}),
};

const updateSizeChart = {
	params: Joi.object().keys({
		sizeChartId: Joi.number().required(),
	}),
	body: Joi.object().keys({
		name: Joi.object().optional(),
		description: Joi.object().optional(),
		chartData: chartDataSchema.optional(),
		status: Joi.boolean(),
	}),
};

const getSizeCharts = {
	query: Joi.object().keys({
		limit: Joi.number().min(1),
		page: Joi.number().min(1),
	}),
};

const getSizeChart = {
	params: Joi.object().keys({
		sizeChartId: Joi.number().required(),
	}),
};

const deleteSizeChart = {
	params: Joi.object().keys({
		sizeChartId: Joi.number().required(),
	}),
};

module.exports = {
	createSizeChart,
	updateSizeChart,
	getSizeCharts,
	getSizeChart,
	deleteSizeChart,
};
