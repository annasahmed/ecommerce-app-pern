'use strict';

module.exports = {
	async up(queryInterface) {
		const [attributes] = await queryInterface.sequelize.query(`
      SELECT id, name, values
      FROM attribute
      WHERE values IS NOT NULL
    `);

		for (const attr of attributes) {
			if (!Array.isArray(attr.values)) continue;

			const attrName = attr.name?.en?.toLowerCase();
			let newValues = [];

			if (attrName === 'size') {
				newValues = attr.values.map((v) => {
					const val = (v.en || '').toLowerCase();

					// feeder: 60ml, 120mg
					if (/\d+\s?(ml|mg|gm)$/.test(val)) {
						return { ...v, type: 'feeder' };
					}

					// clothing: XS, S, M, L, XL
					if (/^(xs|s|m|l|xl|xxl)$/.test(val)) {
						return { ...v, type: 'clothing' };
					}

					// baby: 0-3m, 3-6m, 6 months
					return { ...v, type: 'baby' };
				});
			} else {
				newValues = attr.values.map((v) => ({
					...v,
					// type: 'clothing',
				}));
			}

			/**
			 * Convert JS array → PostgreSQL jsonb[]
			 */
			const pgArray = newValues
				.map((v) => `'${JSON.stringify(v)}'::jsonb`)
				.join(',');

			await queryInterface.sequelize.query(
				`
        UPDATE attribute
        SET values = ARRAY[${pgArray}]
        WHERE id = :id
        `,
				{
					replacements: { id: attr.id },
				}
			);
		}
	},

	async down(queryInterface) {
		const [attributes] = await queryInterface.sequelize.query(`
      SELECT id, values
      FROM attribute
      WHERE values IS NOT NULL
    `);

		for (const attr of attributes) {
			if (!Array.isArray(attr.values)) continue;

			const reverted = attr.values.map((v) => {
				const { type, ...rest } = v;
				return rest;
			});

			const pgArray = reverted
				.map((v) => `'${JSON.stringify(v)}'::jsonb`)
				.join(',');

			await queryInterface.sequelize.query(
				`
        UPDATE attribute
        SET values = ARRAY[${pgArray}]
        WHERE id = :id
        `,
				{
					replacements: { id: attr.id },
				}
			);
		}
	},
};
