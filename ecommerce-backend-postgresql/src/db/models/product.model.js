const {
	baseFields,
	baseScopes,
	baseAssociation,
	mediaField,
	mediaAssociation,
} = require('./base_model');
const modelValidators = require('./model_validators');

module.exports = (sequelize, DataTypes) => {
	const product = sequelize.define(
		'product',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			sku: {
				type: DataTypes.STRING,
				allowNull: true,
				unique: true, // need to run migration for this
			},
			slug: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isValidOption(value) {
						modelValidators.validateSlug(value);
					},
				},
			},
			thumbnail: mediaField,
			is_featured: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			meta_title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			meta_description: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'user',
					key: 'id',
				},
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			},
			...baseFields,
		},
		{
			tableName: 'product',
			timestamps: true,
			...baseScopes(),
		}
	);

	product.associate = (models) => {
		product.belongsTo(models.user, {
			foreignKey: 'user_id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		product.belongsToMany(models.category, {
			through: 'product_to_category',
			foreignKey: 'product_id',
			otherKey: 'category_id',
		});
		product.belongsToMany(models.media, {
			through: 'product_to_media',
			foreignKey: 'product_id',
			otherKey: 'media_id',
		});
		product.belongsToMany(models.usp, {
			through: 'product_to_usp',
			foreignKey: 'product_id',
			otherKey: 'usp_id',
		});
		product.hasMany(models.product_translation);
		baseAssociation(product, models);
		mediaAssociation(product, models, 'thumbnail');
	};

	return product;
};

const abc = {
	id: 1,
	sku: 'PRD-001',
	slug: 'classic-white-shirt',
	cost_price: 15.99,
	stock: 120,
	sale_price: 25.99,
	discount_percentage: 10.0,
	thumbnail: 'https://example.com/images/products/shirt-thumbnail.jpg',
	images: [
		'https://example.com/images/products/shirt-front.jpg',
		'https://example.com/images/products/shirt-back.jpg',
		'https://example.com/images/products/shirt-side.jpg',
	],
	is_featured: true,
	meta_title: 'Classic White Shirt | Men’s Clothing',
	meta_description:
		'Buy the classic white shirt for men. Perfect for formal and casual events. Premium cotton with a comfortable fit.',
	user_id: 2,
	created_by: 2,
	updated_by: 2,
	created_at: '2025-08-01T10:00:00Z',
	updated_at: '2025-08-05T15:30:00Z',
};

const a = [
	{
		id: 1,
		title: 'Classic White Shirt',
		excerpt: 'A must-have white shirt for all occasions.',
		description:
			'This classic white shirt is crafted from premium cotton, offering both comfort and style. Perfect for work, events, and everyday wear.',
		product_id: 1,
		language_id: 1, // English
		created_at: '2025-08-01T10:00:00Z',
		updated_at: '2025-08-05T15:30:00Z',
	},
	{
		id: 2,
		title: 'قميص أبيض كلاسيكي',
		excerpt: 'قميص أبيض لا غنى عنه لجميع المناسبات.',
		description:
			'هذا القميص الأبيض الكلاسيكي مصنوع من القطن الفاخر، ويوفر الراحة والأناقة. مثالي للعمل والمناسبات والاستخدام اليومي.',
		product_id: 1,
		language_id: 2, // Arabic
		created_at: '2025-08-01T10:00:00Z',
		updated_at: '2025-08-05T15:30:00Z',
	},
];
