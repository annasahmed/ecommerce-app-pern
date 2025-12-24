const catchAsync = require('../../utils/catchAsync');
const { adminProductService } = require('../../services/Admin');
const httpStatus = require('http-status');

const getProductById = catchAsync(async (req, res) => {
	const product = await adminProductService.getProductById(
		req.params.productId
	);
	res.send(product);
});
const getProducts = catchAsync(async (req, res) => {
	const products = await adminProductService.getProducts(req);
	res.send(products);
});
const createProduct = catchAsync(async (req, res) => {
	const products = await adminProductService.createProduct(req);
	res.status(httpStatus.CREATED).send(products);
});
const createBulkProducts = catchAsync(async (req, res) => {
	for (const data of bulkProductData) {
		req.body = data;
		await adminProductService.createProduct(req);
		console.log(req.body.sku, 'added');
	}
	res.send({ message: 'sucessfull' });
});

const softDeleteProduct = catchAsync(async (req, res) => {
	await adminProductService.softDeleteProductById(req);
	res.send({ success: true });
});
const permanentDeleteProduct = catchAsync(async (req, res) => {
	await adminProductService.permanentDeleteProductById(req.params.productId);
	res.send({ success: true });
});

const updateProduct = catchAsync(async (req, res) => {
	const product = await adminProductService.updateProduct(req);

	res.send(product);
});

module.exports = {
	getProductById,
	getProducts,
	createProduct,
	softDeleteProduct,
	permanentDeleteProduct,
	updateProduct,
	createBulkProducts,
};

const bulkProductData = [
	{
		sku: '100078',
		meta_title:
			'Kidzo Baby Adjustable Swaddle Blue – Soft & Breathable Newborn Swaddle',
		meta_description:
			'Buy the Kidzo Baby Adjustable Swaddle in Blue. Soft, breathable, adjustable design for newborn comfort and longer sleep. Perfect for daily use',
		base_price: '1000',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'Baby adjustable swaddle doted blue | Kidzo',
				slug: 'baby-adjustable-swaddle-blue-kidzo',
				excerpt:
					'Soft, breathable, and adjustable blue swaddle by Kidzo—designed to keep your baby safe, cozy, and comfortably wrapped all night.',
				description:
					'The Kidzo Baby Adjustable Swaddle in Blue is made with ultra-soft, breathable cotton to provide your newborn with maximum comfort and security. Its adjustable Velcro wings ensure a perfect fit, helping prevent startle reflex and promoting longer, more peaceful sleep. Ideal for newborns and infants, this swaddle keeps your baby snug, warm, and safely wrapped throughout the night.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100077',
		meta_title:
			'Kidzo Baby Adjustable Swaddle White – Soft & Breathable Newborn Swaddle',
		meta_description:
			'Buy the Kidzo Baby Adjustable Swaddle in White. Soft, breathable, and adjustable design for newborn comfort and peaceful sleep. Ideal for everyday use.',
		base_price: '400',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'Baby adjustable swaddle doted white | Kidzo',
				slug: 'baby-adjustable-swaddle-white-kidzo',
				excerpt:
					'Soft and breathable adjustable white swaddle by Kidzo, designed to keep your baby cozy, safe, and comfortably wrapped.',
				description:
					'The Kidzo Baby Adjustable Swaddle in White is crafted from gentle, breathable cotton to ensure maximum comfort for newborns. Its adjustable Velcro wings provide a secure and customized fit, reducing the startle reflex and helping babies sleep longer and more peacefully. Perfect for daily use, this swaddle keeps your baby snug, warm, and safely wrapped throughout the night.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100075',
		meta_title:
			'Kidzo Baby Adjustable Swaddle Pink – Soft & Breathable Newborn Swaddle',
		meta_description:
			'Buy the Kidzo Baby Adjustable Swaddle in Pink. Soft, breathable, and adjustable design for newborn comfort and restful sleep. Perfect for daily use.',
		base_price: '400',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'Baby adjustable swaddle doted pink | Kidzo',
				slug: 'baby-adjustable-swaddle-pink-kidzo',
				excerpt:
					'Soft and breathable adjustable pink swaddle by Kidzo, designed to keep your baby cozy, safe, and comfortably wrapped.',
				description:
					'The Kidzo Baby Adjustable Swaddle in Pink is made from ultra-soft, breathable cotton to provide maximum comfort for newborns. Its adjustable Velcro wings offer a snug and secure fit, helping reduce the startle reflex and allowing babies to enjoy longer, peaceful sleep. Ideal for everyday use, this swaddle keeps your little one warm, cozy, and safely wrapped.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100078',
		meta_title:
			'Kidzo Baby Adjustable Swaddle Bear White – Soft, Cute & Breathable',
		meta_description:
			'Buy the Kidzo Baby Adjustable Swaddle in Bear White. Soft,breathable cotton with adorable bear print, adjustable fit, and ideal newborn comfort.',
		base_price: '400',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'Baby adjustable swaddle bear white | Kidzo',
				slug: 'baby-adjustable-swaddle-bear-white-kidzo',
				excerpt:
					'Soft and breathable white swaddle with cute bear print by Kidzo, designed to keep your baby cozy, secure, and comfortably wrapped.',
				description:
					'The Kidzo Baby Adjustable Swaddle in Bear White features a soft, breathable cotton fabric with an adorable bear print, offering comfort and style together. Its adjustable Velcro wings allow a secure and customized fit, helping reduce the startle reflex and promoting longer, peaceful sleep. Perfect for newborns, this swaddle keeps your baby warm, snug, and safely wrapped throughout the night.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100080',
		meta_title:
			'Kidzo Baby Adjustable Swaddle Box Pink – Soft & Breathable Newborn Swaddle',
		meta_description:
			'Buy the Kidzo Baby Adjustable Swaddle in Box Pink. Soft,breathable cotton with box pattern, adjustable fit, and ideal newborn comfort.',
		base_price: '545',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'Baby adjustable swaddle box pink | Kidzo',
				slug: 'baby-adjustable-swaddle-box-pink-kidzo',
				excerpt:
					'Soft, breathable, and adjustable pink swaddle by Kidzo with a charming box pattern, designed to keep your baby cozy, safe, and comfortably wrapped.',
				description:
					'The Kidzo Baby Adjustable Swaddle in Box Pink features soft, breathable cotton with a stylish box pattern, offering comfort and a cute look for your newborn. Its adjustable Velcro wings allow a secure and customized fit, helping reduce the startle reflex and supporting longer, peaceful sleep. Ideal for daily use, this swaddle keeps your baby warm, snug, and safely wrapped throughout the night.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100083',
		meta_title:
			'Kidzo Baby Adjustable Swaddle Box Baby Pink – Soft & Breathable Newborn Swaddle',
		meta_description:
			'Shop the Kidzo Baby Adjustable Swaddle in Box Baby Pink. Soft, breathable cotton with cute box pattern and adjustable fit for newborn comfort.',
		base_price: '545',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'Baby adjustable swaddle box baby pink | Kidzo',
				slug: 'baby-adjustable-swaddle-box-baby-pink-kidzo',
				excerpt:
					'Soft, breathable, and adjustable baby pink swaddle by Kidzo with a cute box pattern, designed to keep your newborn cozy, safe, and comfortably wrapped.',
				description:
					'The Kidzo Baby Adjustable Swaddle in Box Baby Pink is made from soft, breathable cotton and features a charming box pattern for a sweet and stylish look. Its adjustable Velcro wings provide a secure and customized fit that helps reduce the startle reflex, allowing babies to enjoy longer, peaceful sleep. Ideal for everyday use, this swaddle keeps your little one warm, snug, and safely wrapped throughout the night.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100079',
		meta_title:
			'Kidzo Baby Adjustable Swaddle Box Orange – Soft & Breathable Newborn Swaddle',
		meta_description:
			'Buy the Kidzo Baby Adjustable Swaddle in Box Orange. Soft, breathable cotton with a cute box pattern and adjustable fit for newborn comfort.',
		base_price: '545',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'Baby adjustable swaddle box Orange | Kidzo',
				slug: 'baby-adjustable-swaddle-box-orange-kidzo',
				excerpt:
					'Soft, breathable, and adjustable orange swaddle by Kidzo featuring a cute box pattern to keep your baby cozy, secure, and comfortably wrapped.',
				description:
					'The Kidzo Baby Adjustable Swaddle in Box Orange is made from soft, breathable cotton and designed with a charming box pattern for a stylish look. Its adjustable Velcro wings ensure a snug and customized fit, helping reduce the startle reflex and supporting longer, peaceful sleep. Perfect for everyday use, this swaddle keeps your newborn warm, snug, and safely wrapped throughout the night.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100081',
		meta_title:
			'Kidzo Baby Adjustable Swaddle Box Blue – Soft & Breathable Newborn Swaddle',
		meta_description:
			'Shop the Kidzo Baby Adjustable Swaddle in Box Blue. Soft, breathable cotton with cute box pattern and adjustable fit for newborn comfort.',
		base_price: '545',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'Baby adjustable swaddle box Blue | Kidzo',
				slug: 'baby-adjustable-swaddle-box-blue-kidzo',
				excerpt:
					'Soft, breathable, and adjustable blue swaddle by Kidzo with a cute box pattern, designed to keep your baby cozy, secure, and comfortably wrapped.',
				description:
					'The Kidzo Baby Adjustable Swaddle in Box Blue is crafted from soft, breathable cotton and features an adorable box pattern for a stylish and comforting look. Its adjustable Velcro wings provide a snug and customized fit, helping reduce the startle reflex and supporting longer, peaceful sleep. Ideal for everyday use, this swaddle keeps your newborn warm, snug, and safely wrapped throughout the night.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100082',
		meta_title:
			'Kidzo Baby Adjustable Swaddle Box Green – Soft & Breathable Newborn Swaddle',
		meta_description:
			'Buy the Kidzo Baby Adjustable Swaddle in Box Green. Soft, breathable cotton with cute box pattern and adjustable fit for newborn comfort.',
		base_price: '545',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'Baby adjustable swaddle box Green| Kidzo',
				slug: 'baby-adjustable-swaddle-box-green-kidzo',
				excerpt:
					'Soft, breathable, and adjustable green swaddle by Kidzo featuring a cute box pattern to keep your baby cozy, secure, and comfortably wrapped.',
				description:
					'The Kidzo Baby Adjustable Swaddle in Box Green is made from soft, breathable cotton and designed with an adorable box pattern for a stylish, comforting look. Its adjustable Velcro wings ensure a snug and customized fit, helping reduce the startle reflex and supporting longer, peaceful sleep. Ideal for everyday use, this swaddle keeps your newborn warm, snug, and safely wrapped throughout the night.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100085',
		meta_title:
			'Montaly Baby Wrapping Sheet Cow White – Soft & Comfortable Newborn Wrap',
		meta_description:
			'Buy the Montaly Baby Wrapping Sheet in Cow White. Soft, breathable fabric with cute cow print, designed to keep newborns warm, secure, and comfortably wrapped.',
		base_price: '995',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'Baby Wrapping Sheet Cow White | Montaly',
				slug: 'baby-wrapping-sheet-cow-white-montaly',
				excerpt:
					'Soft and cozy white baby wrapping sheet by Montaly featuring a cute cow print, designed to keep your newborn warm, secure, and comfortably wrapped.',
				description:
					'The Montaly Baby Wrapping Sheet in Cow White is made from soft, gentle, and breathable fabric to provide maximum comfort for newborns. With its adorable cow print and smooth texture, this wrapping sheet offers full coverage and a snug wrap. Perfect for swaddling, sleeping, and everyday use, it helps keep your baby warm, calm, and securely wrapped throughout the day and night.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100086',
		meta_title:
			'Mountaly Baby Wrapping Sheet Bear Car White – Soft & Comfortable Newborn Wrap',
		meta_description:
			'Buy the Mountaly Baby Wrapping Sheet in Bear Car White. Soft, breathable fabric with cute bear and car print for warm, secure, and comfortable newborn wrapping.',
		base_price: '995',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'Baby Wrapping Sheet Bear Car White | Montaly',
				slug: 'baby-wrapping-sheet-bear-car-white-mountaly',
				excerpt:
					'Soft and cozy white baby wrapping sheet by Mountaly featuring a cute bear and car print, designed to keep your newborn warm, secure, and comfortably wrapped.',
				description:
					'The Mountaly Baby Wrapping Sheet in Bear Car White is made from soft, gentle, and breathable fabric to ensure maximum comfort for your newborn. Its adorable bear and car print adds a fun and charming look, while the spacious and smooth design provides full coverage and a snug wrap. Ideal for swaddling, sleeping, and everyday use, this wrapping sheet helps keep your baby warm, calm, and securely wrapped throughout the day and night.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100087',
		meta_title:
			'Mountaly Baby Wrapping Sheet Hippo White – Soft & Comfortable Newborn Wrap',
		meta_description:
			'Buy the Mountaly Baby Wrapping Sheet in Hippo White. Soft, breathable fabric with cute hippo print, perfect for keeping newborns warm, secure, and comfortably wrapped.',
		base_price: '995',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'Baby Wrapping Sheet Hippo White | Montaly',
				slug: 'baby-wrapping-sheet-hippo-white-mountaly',
				excerpt:
					'Soft and cozy white baby wrapping sheet by Mountaly featuring a cute hippo print, designed to keep your newborn warm, secure, and comfortably wrapped.',
				description:
					'The Mountaly Baby Wrapping Sheet in Hippo White is crafted from soft, breathable, and gentle fabric  to ensure maximum comfort for your newborn. Its adorable hippo print adds a sweet and playful touch, while the smooth and spacious design provides full coverage and a snug wrap. Perfect for swaddling, sleeping, and everyday use, this wrapping sheet helps keep your baby warm, calm, and securely wrapped day and night.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100090',
		meta_title:
			'Wrapping Sheet Thailand Cotton Bear Blue – Mami Baby | Soft Newborn Swaddle',
		meta_description:
			'Buy Mami Baby Wrapping Sheet Thailand Cotton Bear Blue. Soft, breathable Thailand cotton with cute bear print for warm, secure, and comfortable newborn wrapping.',
		base_price: '1220',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'WRAPING SHEET THAILAND COTTON BEAR BLUE MAMI BABY',
				slug: 'wrapping-sheet-thailand-cotton-bear-blue-mami-baby',
				excerpt:
					'Soft and breathable Thailand cotton wrapping sheet by Mami Baby featuring a cute bear print in blue, designed for warm, cozy, and secure newborn wrapping.',
				description:
					'The Mami Baby Thailand Cotton Wrapping Sheet in Bear Blue is crafted from premium, ultra‑soft Thailand cotton that is gentle and safe for newborn skin. With a cute blue bear design and smooth texture, it provides excellent warmth and comfort. The lightweight, breathable fabric ensures proper airflow while keeping your baby snug and relaxed. Ideal for swaddling, sleeping, or everyday wrapping, this sheet helps promote better sleep and a secure feeling for newborns.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100091',
		meta_title:
			'Wrapping Sheet Thailand Cotton Bear Pink – Mami Baby | Soft Newborn Swaddle',
		meta_description:
			'Buy Mami Baby Wrapping Sheet Thailand Cotton Bear Pink. Soft, breathable Thailand cotton with cute pink bear print for warm, secure, and comfortable newborn wrapping.',
		base_price: '1220',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'WRAPING SHEET THAILAND COTTON BEAR PINK MAMI BABY',
				slug: 'wrapping-sheet-thailand-cotton-bear-pink-mami-baby',
				excerpt:
					'Soft and breathable Thailand cotton wrapping sheet by Mami Baby featuring a cute pink bear print, designed to keep newborns warm, cozy, and securely wrapped.',
				description:
					'The Mami Baby Thailand Cotton Wrapping Sheet in Bear Pink is crafted from premium, ultra‑soft Thailand cotton that is gentle on delicate newborn skin. Its adorable pink bear print adds a sweet look, while the lightweight and breathable fabric ensures proper airflow. The smooth texture provides a snug, warm, and comfortable swaddle that helps newborns feel secure and sleep peacefully. Perfect for daily wrapping, swaddling, and newborn sleep routines.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100089',
		meta_title:
			'Wrapping Sheet Thailand Cotton Cat Yellow – Mami Baby | Soft Newborn Swaddle',
		meta_description:
			'Buy Mami Baby Wrapping Sheet Thailand Cotton Cat Yellow. Soft, breathable Thailand cotton with cute yellow cat print for warm, secure, and comfortable newborn wrapping.',
		base_price: '1220',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'WRAPING SHEET THAILAND COTTON CAT YELLOW MAMI BABY',
				slug: 'wrapping-sheet-thailand-cotton-cat-yellow-mami-baby',
				excerpt:
					'Soft and breathable Thailand cotton wrapping sheet by Mami Baby featuring a cute yellow cat print, designed to keep newborns warm, cozy, and securely wrapped.',
				description:
					'The Mami Baby Thailand Cotton Wrapping Sheet in Cat Yellow is made from premium, ultra‑soft Thailand cotton that feels gentle on delicate newborn skin. Its adorable yellow cat print adds a cheerful touch, while the lightweight and breathable fabric ensures proper ventilation. This smooth and comfy wrapping sheet keeps babies snug, warm, and secure, helping them sleep peacefully. Perfect for everyday swaddling, wrapping, and newborn sleep routines.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100092',
		meta_title:
			'Wrapping Sheet Thailand Cotton Bear Green – Mami Baby | Soft Newborn Swaddle',
		meta_description:
			'Buy Mami Baby Wrapping Sheet Thailand Cotton Bear Green. Soft, breathable Thailand cotton with cute green bear print for warm, secure, and cozy newborn wrapping.',
		base_price: '1220',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'WRAPING SHEET THAILAND COTTON BEAR GREEN MAMI BABY',
				slug: 'wrapping-sheet-thailand-cotton-bear-green-mami-baby',
				excerpt:
					'Soft and breathable Thailand cotton wrapping sheet by Mami Baby featuring a cute green bear print, perfect for keeping newborns warm, cozy, and securely wrapped.',
				description:
					'The Mami Baby Wrapping Sheet Thailand Cotton Bear Green is crafted from premium Thailand cotton known for its softness, breathability, and durability. The adorable green bear print adds charm, while the lightweight fabric ensures proper airflow to keep newborns comfortable throughout the day. Designed for gentle swaddling, this sheet provides warmth, security, and a snug feel that helps babies sleep better. Ideal for daily wrapping, swaddling, and newborn routines.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100088',
		meta_title:
			'Baby Wrapping Sheet Cat White – Montaly | Soft & Cozy Newborn Swaddle',
		meta_description:
			'Buy Montaly Baby Wrapping Sheet Cat White. Soft, breathable fabric with cute cat print for warm, secure, and comfortable newborn swaddling.',
		base_price: '995',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY WRAPING SHEET CAT WHITE MONTALY',
				slug: 'baby-wrapping-sheet-cat-white-montaly',
				excerpt:
					'Soft and breathable Montaly wrapping sheet featuring a cute white cat print, designed to keep newborns warm, cozy, and securely wrapped.',
				description:
					'The Montaly Baby Wrapping Sheet in Cat White is made from soft, gentle, and breathable fabric that keeps newborns comfortable throughout the day. Its adorable white cat design adds a charming touch, while the smooth texture ensures a cozy and secure swaddle. Perfect for daily wrapping, swaddling, and peaceful newborn sleep, this sheet offers warmth, comfort, and reliable Montaly quality.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100109',
		meta_title:
			'Baby Feeder Cover Yellow – Blore Winnie Care | Soft & Hygienic Feeder Protection',
		meta_description:
			'Buy Baby Feeder Cover Yellow by Blore Winnie Care. Soft, washable, and hygienic fabric cover designed to protect baby feeders from dust and germs.',
		base_price: '525',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY FEEDER COVER YELLOW BLORE WINNIE CARE',
				slug: 'baby-feeder-cover-yellow-blore-winnie-care',
				excerpt:
					'Soft and protective yellow feeder cover by Blore Winnie Care, designed to keep baby feeders clean, hygienic, and safe from dust.',
				description:
					'The Baby Feeder Cover Yellow by Blore Winnie Care is crafted from soft, durable, and baby‑safe fabric that protects feeders from dust, dirt, and germs. Its cute yellow Winnie design adds charm while ensuring hygiene for daily use. The lightweight material is easy to wash, reuse, and fits standard feeders perfectly. Ideal for keeping your baby’s feeding accessories clean and well‑maintained.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100096',
		meta_title:
			'Baby Feeder Cover Welcome to the World Skin – Little Home | Soft & Hygienic',
		meta_description:
			'Shop Little Home Baby Feeder Cover in Skin color with “Welcome to the World” print. Soft, washable, hygienic cover to protect feeders while keeping them cute and clean.',
		base_price: '340',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY FEEDER COVER WELCOME TO THE WORLD SKIN LITTLE HOME',
				slug: 'baby-feeder-cover-welcome-to-the-world-skin-little-home',
				excerpt:
					'Soft and gentle feeder cover by Little Home featuring a “Welcome to the World” theme in a calm skin‑tone color, designed to protect feeders from dust while adding a cute newborn-friendly look.',
				description:
					'The Little Home Baby Feeder Cover in “Welcome to the World” Skin color is made from soft, breathable fabric that keeps your baby’s feeder safe from dust and external germs. The soothing skin‑tone shade and adorable welcoming print make it perfect for newborn essentials. Lightweight, washable, and reusable, this cover maintains hygiene while adding a sweet touch to your baby’s feeding routine.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100097',
		meta_title:
			'Baby Feeder Cover Welcome to the World Red – Little Home | Soft & Hygienic',
		meta_description:
			'Buy Baby Feeder Cover Welcome to the World Red by Little Home. Soft, washable, and protective cover designed to keep feeders clean, safe, and hygienic for daily use.',
		base_price: '340',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY FEEDER COVER WELCOME TO  THE WORLD RED LITTLE HOME',
				slug: 'baby-feeder-cover-welcome-to-the-world-red-little-home',
				excerpt:
					'Soft and protective feeder cover by Little Home featuring a cute “Welcome to the World” red design, made to keep baby feeders clean, safe, and hygienic.',
				description:
					'The Little Home Baby Feeder Cover in “Welcome to the World” Red is crafted from soft, durable, and washable fabric that protects the baby feeder from dust, dirt, and germs. Its adorable newborn‑themed design adds a sweet touch, while the gentle material ensures safety for babies. Designed to fit standard feeders, this cover is lightweight, easy to use, and perfect for daily feeding routines.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100103',
		meta_title:
			'Baby Feeder Cover Welcome to the World Pink – Little Home | Soft & Protective',
		meta_description:
			'Buy Little Home Baby Feeder Cover Welcome to the World Pink. Soft, durable, hygienic cover designed to protect baby feeders from dust and germs.',
		base_price: '340',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY FEEDER COVER WELCOME TO  THE WORLD PINK LITTLE HOME',
				slug: 'baby-feeder-cover-welcome-to-the-world-pink-little-home',
				excerpt:
					'Soft and cute pink feeder cover by Little Home with “Welcome to the World” design, made to keep baby feeders clean, protected, and dust‑free.',
				description:
					'The Little Home Baby Feeder Cover in Pink features a charming “Welcome to the World” theme, crafted with soft and durable fabric that keeps feeders shielded from dust and germs. Its gentle material is safe for babies, and the snug fit ensures the feeder stays covered and clean at all times. Perfect for home use and travel, offering both hygiene and an adorable look.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100104',
		meta_title:
			'Baby Feeder Cover Welcome to the World Brown – Little Home | Soft & Hygienic Cover',
		meta_description:
			'Buy Baby Feeder Cover Welcome to the World Brown by Little Home. Soft, durable, washable, and perfect for keeping feeders clean and protected.',
		base_price: '340',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY FEEDER COVER WELCOME TO THE WORLD BROWN LITTLE HOME',
				slug: 'baby-feeder-cover-welcome-to-the-world-brown-little-home',
				excerpt:
					'Soft and durable baby feeder cover featuring a “Welcome to the World” brown theme by Little Home, designed to protect feeders from dust while adding a cute look.',
				description:
					'The Little Home Baby Feeder Cover in Welcome to the World Brown is crafted from soft, washable, and durable fabric that keeps feeders safe from dust and germs. Its adorable brown-themed design gives a warm and cozy feel, while the gentle material ensures it’s safe for everyday baby use. Perfect for maintaining feeder hygiene and adding a stylish touch to baby accessories.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100098',
		meta_title:
			'Baby Feeder Cover Welcome to the World Blue – Little Home | Soft Feeder Protection',
		meta_description:
			'Buy Baby Feeder Cover Welcome to the World Blue by Little Home. Soft, washable fabric that keeps feeders safe, clean, and dust‑free with a cute newborn theme.',
		base_price: '340',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY FEEDER COVER WELCOME TO THE WORLD BLUE LITTLE HOME',
				slug: 'baby-feeder-cover-welcome-to-the-world-blue-little-home',
				excerpt:
					'Soft and protective baby feeder cover featuring a “Welcome to the World” blue theme by Little Home, designed to keep feeders clean, safe, and dust‑free.',
				description:
					'The Baby Feeder Cover Welcome to the World Blue by Little Home is crafted from soft, durable, and washable fabric that keeps your baby’s feeder protected from dust, germs, and scratches. Its cute blue “Welcome to the World” design adds a charming touch while providing full coverage and a secure fit. Ideal for maintaining feeder hygiene at home or while traveling, this cover offers gentle protection suitable for everyday use.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100105',
		meta_title:
			'Baby Feeder Cover Pink Blore – Winnie Care | Soft Feeder Protection',
		meta_description:
			'Buy Baby Feeder Cover Pink Blore by Winnie Care. Soft, washable cover that protects feeders from dust and germs with a cute pink Blore design.',
		base_price: '340',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY FEEDER COVER PINK BLORE WINNIE CARE',
				slug: 'baby-feeder-cover-pink-blore-winnie-care',
				excerpt:
					'Soft and protective baby feeder cover by Winnie Care featuring a cute pink Blore design, perfect for keeping feeders clean, safe, and dust‑free.',
				description:
					'The Baby Feeder Cover Pink Blore by Winnie Care is made from soft, durable, and washable fabric designed to protect baby feeders from dust, germs, and scratches. Its adorable pink Blore print adds a charming touch while ensuring full coverage and a comfortable fit. Ideal for everyday use at home or during travel, this cover keeps feeders hygienic and well‑protected with trusted Winnie Care quality.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100108',
		meta_title:
			'Baby Feeder Cover Orange Blore – Winnie Care | Soft Feeder Protection',
		meta_description:
			'Buy Baby Feeder Cover Orange Blore by Winnie Care. Soft, washable cover that protects feeders from dust and germs with a bright orange Blore design.',
		base_price: '525',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY FEEDER COVER ORANGE BLORE WINNIE CARE',
				slug: 'baby-feeder-cover-orange-blore-winnie-care',
				excerpt:
					'Soft and protective baby feeder cover by Winnie Care featuring a bright orange Blore design, perfect for keeping feeders clean, safe, and dust‑free.',
				description:
					'The Baby Feeder Cover Orange Blore by Winnie Care is crafted from soft, durable, and washable fabric that protects baby feeders from dust, germs, and scratches. Its vibrant orange Blore print adds a fun touch while offering full coverage and a secure fit. Designed for daily home use or travel, this cover ensures hygiene, safety, and convenience with trusted Winnie Care quality.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100107',
		meta_title:
			'Baby Feeder Cover Green Blore – Winnie Care | Soft Hygienic Feeder Cover',
		meta_description:
			'Buy Baby Feeder Cover Green Blore by Winnie Care. Soft, washable cover that protects feeders from dust with a refreshing green Blore design.',
		base_price: '525',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY FEEDER COVER GREEN BLORE WINNIE CARE',
				slug: 'baby-feeder-cover-green-blore-winnie-care',
				excerpt:
					'Soft and protective baby feeder cover by Winnie Care featuring a refreshing green Blore design, made to keep feeders clean, hygienic, and dust‑free.',
				description:
					'The Baby Feeder Cover Green Blore by Winnie Care is designed using soft, durable, and fully washable fabric that keeps baby feeders protected from dust, germs, and scratches. Its fresh green Blore print adds a cute and stylish touch, while the snug fit ensures full coverage and hygiene. Perfect for everyday home use or travel, this cover provides convenience, protection, and trusted Winnie Care quality.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100106',
		meta_title:
			'Baby Feeder Cover Blue Blore – Winnie Care | Hygienic Feeder Protection',
		meta_description:
			'Buy Baby Feeder Cover Blue Blore by Winnie Care. Soft, washable, hygienic feeder cover with cool blue Blore design for daily protection.',
		base_price: '525',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY FEEDER COVER BLUE BLORE WINNIE CARE',
				slug: 'baby-feeder-cover-blue-blore-winnie-care',
				excerpt:
					'Soft and protective baby feeder cover by Winnie Care featuring a cool blue Blore design, made to keep feeders clean, hygienic, and dust‑free.',
				description:
					'The Baby Feeder Cover Blue Blore by Winnie Care is crafted from soft, washable fabric that keeps your baby’s feeder safe from dust, dirt, and scratches. Its cool blue Blore print gives a neat and stylish look, while the comfortable fit ensures full protection. Ideal for daily use and travel, this feeder cover combines convenience, hygiene, and trusted Winnie Care quality.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100101',
		meta_title:
			'Baby Feeder Cover Bear Pink – Little Home | Cute & Hygienic Feeder Cover',
		meta_description:
			'Buy Baby Feeder Cover Bear Pink by Little Home. Soft, washable feeder cover with cute pink bear design for hygienic daily use and protection.',
		base_price: '340',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY FEEDER COVER BEAR PINK LITTLE HOME',
				slug: 'baby-feeder-cover-bear-pink-little-home',
				excerpt:
					'Soft and cute baby feeder cover by Little Home featuring an adorable pink bear design, made to protect feeders from dust and keep them clean.',
				description:
					'The Baby Feeder Cover Bear Pink by Little Home is crafted from soft, durable, and washable fabric that keeps your baby’s feeder hygienic and protected. The adorable pink bear print adds a sweet touch, while the snug fit ensures full coverage from dust, dirt, and scratches. Ideal for home use and travel, providing both protection and a cute look with trusted Little Home quality.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100102',
		meta_title:
			'Baby Feeder Cover Bear Grey | Little Home | Soft Bottle Cover',
		meta_description:
			'Buy Baby Feeder Cover Bear Grey by Little Home. Soft, protective feeder cover with cute bear design—ideal for clean, easy, comfortable feeding.',
		base_price: '340',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY FEEDER COVER BEAR GREY LITTLE HOME',
				slug: 'baby-feeder-cover-bear-grey-little-home',
				excerpt:
					'Soft and durable baby feeder cover by Little Home featuring a cute grey bear design, made to protect feeders from dust and keep them hygieni',
				description:
					'The Baby Feeder Cover Bear Grey by Little Home is a cute and practical accessory designed to keep your baby’s feeder clean, insulated, and comfortable to grip. Made with soft, gentle fabric, it protects the bottle from dust while providing a warm layer for easier handling. The adorable grey bear design adds charm, making it perfect for everyday feeding. Durable, washable, and ideal for both home and travel use.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100099',
		meta_title:
			'Baby Feeder Cover Bear Green – Little Home | Soft & Hygienic Feeder Cover',
		meta_description:
			'Buy Baby Feeder Cover Bear Green by Little Home. Soft, washable, protective feeder cover with cute green bear design for daily hygiene and convenience.',
		base_price: '340',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY FEEDER COVER BEAR GREEN LITTLE HOME',
				slug: 'baby-feeder-cover-bear-green-little-home',
				excerpt:
					'Soft and protective baby feeder cover by Little Home featuring a cute green bear design, made to keep feeders clean and hygienic.',
				description:
					'The Baby Feeder Cover Bear Green by Little Home is crafted from soft, washable, and durable fabric designed to protect baby feeders from dust and dirt. Its adorable green bear print adds a charming touch, while the snug fit helps maintain feeder hygiene at home or during travel. Made with baby‑safe fabric and trusted Little Home quality, it ensures convenience and cleanliness for everyday use.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100100',
		meta_title:
			'Baby Feeder Cover Bear Blue – Little Home | Soft & Hygienic Feeder Cover',
		meta_description:
			'Buy Baby Feeder Cover Bear Blue by Little Home. Soft, washable feeder cover with cute blue bear design for hygiene, protection, and everyday feeding convenience.',
		base_price: '340',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY FEEDER COVER BEAR BLUE LITTLE HOME',
				slug: 'baby-feeder-cover-bear-blue-little-home',
				excerpt:
					'Soft and protective baby feeder cover by Little Home featuring a cute blue bear design, made to keep feeders clean and hygienic.',
				description:
					'The Baby Feeder Cover Bear Blue by Little Home is crafted from soft, durable, and easy‑to‑wash fabric that keeps baby feeders protected from dust and dirt. Its adorable blue bear print adds a sweet look, while the snug fit helps maintain feeder hygiene at home or during travel. Designed with baby‑safe material, it offers daily convenience and trusted Little Home quality.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '10069',
		meta_title:
			'Baby Hooded Bath Towel Sunday Yellow – Mums World | Soft & Absorbent Baby Towel',
		meta_description:
			'Buy Baby Hooded Bath Towel Sunday Yellow by Mums World. Soft, absorbent, baby‑friendly towel with cozy hood and cheerful Sunday yellow design for newborn bath time.',
		base_price: '465',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY HOODED BATH TOWEL SUNDAY YELLOW MUMS WORLD',
				slug: 'baby-hooded-bath-towel-sunday-yellow-mums-world',
				excerpt: 'BABY HOODED BATH TOWEL SUNDAY YELLOW MUMS WORLD',
				description:
					'The Baby Hooded Bath Towel Sunday Yellow by Mums World is made from soft, highly absorbent, and baby‑friendly fabric designed to gently dry your little one after a bath. Its cozy hood helps keep the baby’s head warm, while the bright yellow “Sunday” theme adds a cheerful touch. Comfortable, lightweight, and gentle on delicate skin, this towel ensures a warm and pleasant post‑bath experience for newborns and infants.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100071',
		meta_title: 'Baby Hooded Bath Towel Sunday Pink | Mums World',
		meta_description:
			'Shop Baby Hooded Bath Towel Sunday Pink by Mums World. Soft, absorbent, hooded towel for warm and gentle post‑bath comfort.',
		base_price: '465',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY HOODED BATH TOWEL SUNDAY PINK MUMS WORLD',
				slug: 'baby-hooded-bath-towel-sunday-pink-mums-world',
				excerpt:
					'Soft, cozy pink hooded bath towel from Mums World—perfect for keeping your baby warm and snug after bath time.',
				description:
					'The Baby Hooded Bath Towel Sunday Pink by Mums World is designed to give your little one a warm, gentle, and comfortable drying experience. Made from soft, absorbent fabric, it quickly dries delicate baby skin without irritation. The cute hood adds extra warmth and helps keep your baby’s head covered after a bath. Lightweight, durable, and easy to wash, this towel is perfect for daily use and ideal for newborns and infants.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100070',
		meta_title: 'Baby Hooded Bath Towel Sunday Blue | Mums World',
		meta_description:
			'Buy Baby Hooded Bath Towel Sunday Blue by Mums World. Soft, absorbent, cozy hooded towel—perfect for newborn and infant bath time.',
		base_price: '465',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY HOODED BATH TOWEL SUNDAY BLUE MUMS WORLD',
				slug: 'baby-hooded-bath-towel-sunday-blue-mums-world',
				excerpt:
					'Soft, absorbent, and cozy hooded bath towel by Mums World featuring the “Sunday Blue” theme — perfect for gently drying and warming babies after bath time.',
				description:
					'The Baby Hooded Bath Towel Sunday Blue by Mums World is made from gentle, absorbent fabric that dries your baby quickly while keeping their delicate skin protected. The attached hood provides extra warmth and helps keep your little one snug after bath time. Durable, lightweight, and easy to wash, this towel is perfect for newborns and infants and ideal for everyday use.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100073',
		meta_title:
			'Baby Hooded Bath Towel Baby Orange – Mums World | Soft & Absorbent Bath Wrap',
		meta_description:
			'Buy Baby Hooded Bath Towel Baby Orange by Mums World. Soft, absorbent, and gentle towel with hood design for warm, comfortable post‑bath wrapping.',
		base_price: '435',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY HOODED BATH TOWEL BABY ORANGE MUMS WORLD',
				slug: 'baby-hooded-bath-towel-baby-orange-mums-world',
				excerpt:
					'Soft, absorbent, and gentle baby hooded bath towel in a bright orange shade by Mums World, designed to keep babies warm and cozy after bath time.',
				description:
					'The Baby Hooded Bath Towel Baby Orange by Mums World is crafted from soft, absorbent fabric that quickly dries delicate baby skin while keeping them warm. The attached hood adds extra comfort and makes wrapping easier after a bath. Its bright orange color and baby‑friendly design make it both functional and adorable. Ideal for daily baths, beach time, or as a newborn gift essential.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100072',
		meta_title:
			'Baby Hooded Bath Towel Baby Blue – Mums World | Soft & Absorbent Towel',
		meta_description:
			'Buy Mums World Baby Hooded Bath Towel Baby Blue. Soft, gentle, absorbent fabric with hooded design for cozy and comfortable post‑bath drying.',
		base_price: '435',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY HOODED BATH TOWEL BABY BLUE MUMS WORLD',
				slug: 'baby-hooded-bath-towel-baby-blue-mums-world',
				excerpt:
					'Soft and absorbent hooded bath towel by Mums World in a soothing baby‑blue shade, designed to keep newborns warm and cozy after bath time.',
				description:
					'The Mums World Baby Hooded Bath Towel in Baby Blue is crafted from soft, gentle, and absorbent fabric ideal for newborn skin. Its hooded design helps keep your baby warm after a bath, while the lightweight texture ensures quick drying and comfortable use. With its cute baby‑blue color and smooth finish, this towel is perfect for daily bath routines, travel, or gifting.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100074',
		meta_title:
			'Baby Hooded Bath Towel Baby Pink – Mums World | Soft & Absorbent',
		meta_description:
			'Buy Mums World Baby Hooded Bath Towel Baby Pink. Soft, absorbent, and gentle material with a cozy hood—perfect for newborn bath time comfort.',
		base_price: '435',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY HOODED BATH TOWEL BABY PINK MUMS WORLD',
				slug: 'baby-hooded-bath-towel-baby-pink-mums-world',
				excerpt:
					'Soft, absorbent, and cozy hooded bath towel by Mums World in a cute baby pink color, designed to keep newborns warm and snug after bath time.',
				description:
					'The Baby Hooded Bath Towel Baby Pink by Mums World is made from ultra‑soft, gentle, and absorbent fabric that keeps your little one warm and comfortable after every bath. Its hooded design helps dry the baby’s head quickly while preventing heat loss. The lightweight, skin‑friendly material ensures a smooth and irritation‑free experience, making it perfect for everyday use. Ideal for newborns and infants, this towel brings both comfort and cuteness to bath time.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100093',
		meta_title: 'Baby Socks Heat Like Baby 3PCS Card | Soft & Comfortable',
		meta_description:
			'Buy Heat Like Baby 3PCS Baby Socks. Soft, warm, stretchable, and gentle material—perfect for newborn comfort and daily wear.',
		base_price: '340',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY SOCKS HEAT LIKE BABY 3PCS CARD',
				slug: 'baby-socks-heat-like-baby-3pcs-card',
				excerpt:
					'Soft and cozy 3‑pair baby socks featuring the “Heat Like Baby” design, crafted to keep little feet warm, comfortable, and gently protected.',
				description:
					'The Heat Like Baby 3PCS Baby Socks Pack is designed with soft, stretchy, and skin‑friendly fabric that keeps newborn feet warm and comfortable all day. Each pair offers a snug fit without irritation, making it ideal for daily wear. The breathable material prevents sweating, while the cute Heat Like Baby theme adds charm. Perfect for newborns and infants, these socks ensure warmth, comfort, and durability in every use.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100094',
		meta_title: 'Baby Socks Frill Carters 3PCS Card 0–12M | Soft & Stylish',
		meta_description:
			'Buy Carter’s Frill Baby Socks 3PCS Card (0–12M). Soft, breathable, and adorable frill‑edge socks—perfect for newborn comfort and everyday wear.',
		base_price: '298',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY SOCKS FRILL CARTERS 3PCS CARD 0-12M',
				slug: 'baby-socks-frill-carters-3pcs-card-0-12m',
				excerpt:
					'Soft and stylish Carter’s frill baby socks (0–12 months), designed with gentle fabric and cute frill edges to keep tiny feet warm, comfortable, and adorable.',
				description:
					'The Carter’s Frill Baby Socks 3PCS Card (0–12M) are crafted from soft, breathable, and stretchy material that keeps newborn and infant feet cozy throughout the day. Each pair features a delicate frill design that adds a cute and classy touch. The fabric is gentle on sensitive baby skin, while the snug fit prevents slipping. Durable, comfortable, and perfect for daily wear, these socks provide warmth, charm, and long‑lasting quality.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100095',
		meta_title:
			'Baby Socks Fancy 3PCS Pack Chubester’s 0–6M | Soft & Stylish',
		meta_description:
			'Buy Chubester’s Fancy Baby Socks 3PCS Pack (0–6M). Soft, breathable, stylish socks for newborn comfort and everyday use.',
		base_price: '340',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY SOCKS FANCY 3PCS PACK CHUBESTER`S 0-6M',
				slug: 'baby-socks-fancy-3pcs-pack-chubesters-0-6m',
				excerpt:
					'Soft and adorable Chubester’s fancy baby socks (0–6 months), designed with gentle fabric and cute patterns to keep tiny feet warm, comfortable, and stylish.',
				description:
					'The Chubester’s Fancy 3PCS Baby Socks Pack (0–6M) features soft, breathable, and stretchable fabric that keeps newborn feet warm and cozy. Each pair includes cute, fancy patterns that add charm while maintaining comfort. The skin‑friendly material ensures no irritation, and the snug elastic fit prevents slipping. Perfect for daily wear, gifting, and newborn essentials, these socks offer durability, comfort, and adorable style in every pair.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100084',
		meta_title:
			'Baby 2PCS Swaddle Blanket Box – Kidzo | Soft & Gentle Swaddles',
		meta_description:
			'Buy Kidzo 2PCS Swaddle Blanket Box. Soft, breathable, skin‑friendly swaddles designed for newborn comfort, secure wrapping, and peaceful sleep.',
		base_price: '995',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY 2PCS SWADDLE BLANKET BOX KIDZO',
				slug: 'baby-2pcs-swaddle-blanket-box-kidzo',
				excerpt:
					'Soft and breathable 2‑piece Kidzo swaddle blanket set designed to keep newborns cozy, secure, and comfortably wrapped.',
				description:
					'The Kidzo 2PCS Swaddle Blanket Box includes two premium‑quality swaddles made from soft, gentle, and breathable fabric ideal for newborns. Each blanket provides a snug and secure wrap that helps babies feel calm and sleep better. The material is smooth on sensitive skin, lightweight, and perfect for daily swaddling. Packed in a beautiful box, this set is ideal for gifting and everyday newborn essentials.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100110',
		meta_title:
			'Baby Rattle Box Cyan 8PCS (0–3M) | Safe & Fun Newborn Rattle Set',
		meta_description:
			'Buy Baby Rattle Box Cyan 8PCS for newborns 0–3 months. Safe, lightweight rattles that support hearing, sensory development, and early motor skills.',
		base_price: '1265',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY RATTLE BOX CYAN 8PCS 0-3M',
				slug: 'baby-rattle-box-cyan-8pcs-0-3m',
				excerpt:
					'Soft and colorful Baby Rattle Box (Cyan) containing 8 playful rattles designed for newborns 0–3 months, helping stimulate hearing and early motor development.',
				description:
					'The Baby Rattle Box Cyan 8PCS (0–3M) includes a collection of lightweight, easy‑to‑hold rattles specially designed for newborns. Each rattle produces gentle sounds that help improve auditory development while encouraging hand‑eye coordination. Made from safe, non‑toxic materials with smooth edges, this set ensures a fun and secure playtime experience. The bright cyan theme and engaging shapes keep babies entertained while supporting early sensory growth.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100111',
		meta_title:
			'Baby Rattle Box Baby Pink 8PCS – Safe Rattles for 3+ Months',
		meta_description:
			'Buy Baby Rattle Box Baby Pink (8PCS). Safe, lightweight, colorful rattles designed for babies 3+ months to support sensory and motor skill development.',
		base_price: '1265',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY RATTLE BOX BABY PINK 8PCS 3+M',
				slug: 'baby-rattle-box-baby-pink-8pcs-3m',
				excerpt:
					'A colorful and engaging Baby Rattle Box in Baby Pink, featuring 8 playful pieces designed to stimulate motor skills and entertain babies aged 3+ months.',
				description:
					'The Baby Rattle Box Baby Pink (8PCS) is a delightful collection of safe, lightweight, and attractive rattles made especially for babies 3 months and above. Each piece is crafted with smooth edges, easy‑to‑hold shapes, and gentle sounds that help enhance sensory development. The bright baby‑pink theme makes it visually appealing, while the variety of rattles keeps little ones entertained and encourages early motor skill growth. Perfect as a gift or daily playtime essential.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100113',
		meta_title:
			'Baby Rattle Box 4PCS | Safe & Colorful Sensory Toys for Babies',
		meta_description:
			'Buy Baby Rattle Box 4PCS. Safe, lightweight, and engaging rattles designed to support newborn sensory and motor development.',
		base_price: '685',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY RATTLE BOX 4PCS',
				slug: 'baby-rattle-box-4pcs',
				excerpt:
					'Soft and engaging 4‑piece baby rattle set designed to stimulate sensory development and keep little ones entertained.',
				description:
					'The Baby Rattle Box 4PCS includes four colorful, lightweight, and easy‑to‑hold rattles crafted to support early motor and sensory skills. Each rattle features gentle sounds, smooth edges, and baby‑safe materials suitable for newborns. Designed to attract attention and encourage hand‑eye coordination, this set is perfect for daily playtime, gifting, and newborn essentials.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100112',
		meta_title:
			'Baby Rattle Box 3PCS | Safe & Colorful Sensory Toys for Babies',
		meta_description:
			'Buy Baby Rattle Box 3PCS. Lightweight, safe, and engaging rattles designed for newborn sensory and motor development.',
		base_price: '550',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY RATTLE BOX 3PCS',
				slug: 'baby-rattle-box-3pcs',
				excerpt:
					'Colorful and lightweight 3‑piece baby rattle set designed to support early sensory development and keep babies engaged.',
				description:
					'The Baby Rattle Box 3PCS includes three bright, easy‑to‑grip rattles made from baby‑safe, smooth materials. Each rattle produces gentle, pleasant sounds that stimulate hearing and help develop motor skills. Perfect for newborns and infants, this compact set encourages hand‑eye coordination and sensory exploration. Ideal for gifting, daily playtime, and early learning.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100052',
		meta_title:
			'Baby Bib 2PCS Neck Style – Nannanqin | Soft & Absorbent Feeding Bibs',
		meta_description:
			'Buy Baby Bib 2PCS Neck Style by Nannanqin. Soft, absorbent, and comfortable bibs designed to keep babies clean during feeding.',
		base_price: '645',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY BIB 2PCS NECK STYLE NANNANQIN',
				slug: 'baby-bib-2pcs-neck-style-nannanqin',
				excerpt:
					'Soft and absorbent 2‑piece neck‑style baby bib set by Nannanqin, designed to keep babies clean and comfortable during feeding.',
				description:
					'The Baby Bib 2PCS Neck Style by Nannanqin features two high‑quality, soft, and absorbent bibs perfect for daily feeding. Designed with an easy‑to-wear neck style, these bibs provide full coverage to protect your baby’s clothes from spills and drool. Made with gentle, baby‑friendly fabric, they ensure comfort while keeping your little one clean. Ideal for newborns and infants during mealtime or everyday use.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100058',
		meta_title:
			'Baby Triangle Bib 2PCS – Nannanqin | Soft & Absorbent Feeding Bibs',
		meta_description:
			'Buy Baby Triangle Bib 2PCS by Nannanqin. Soft, absorbent, and gentle triangle bibs ideal for feeding and everyday use.',
		base_price: '280',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY TRIANGLE BIB 2PCS NANNANQIN',
				slug: 'baby-triangle-bib-2pcs-nannanqin',
				excerpt:
					'Soft, absorbent 2‑piece triangle bib set by Nannanqin—perfect for keeping babies clean and comfortable during feeding.',
				description:
					'The Baby Triangle Bib 2PCS by Nannanqin features two premium, soft, and highly absorbent bibs designed in a stylish triangle shape. These bibs are gentle on delicate baby skin and ideal for catching drool, milk spills, and food drips. With an easy, comfortable neck fastening, they provide a secure fit and are perfect for daily use. A great choice for newborns and infants for feeding time or all‑day wear.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100051',
		meta_title: 'Aifeier Baby Bib 2PCS | Soft & Absorbent Feeding Bibs',
		meta_description:
			'Shop Aifeier Baby Bib 2PCS. Soft, absorbent, and gentle bibs ideal for feeding, drooling, and daily baby care.',
		base_price: '355',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'AIFEIER BABY BIB 2PCS',
				slug: 'aifeier-baby-bib-2pcs',
				excerpt:
					'Soft and absorbent 2‑piece baby bib set by Aifeier, designed for everyday feeding and drooling protection.',
				description:
					'The Aifeier Baby Bib 2PCS set includes two soft, high‑quality bibs made to keep your baby clean and comfortable. Crafted from gentle, absorbent fabric, these bibs effectively catch milk, drool, and food spills. The easy neck-closure design ensures a secure and comfortable fit for newborns and infants. Perfect for daily feeding, teething, or general use, offering both practicality and durability.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100050',
		meta_title:
			'China Baby Apron Plastic Bib (Big) | Waterproof Feeding Bib',
		meta_description:
			'Buy China Baby Apron Plastic Bib in big size. Waterproof, easy‑clean, full‑coverage bib ideal for feeding and self‑feeding toddlers.',
		base_price: '128',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'CHINA BABY APPRIN PLASTIC BIB BIG',
				slug: 'china-baby-apron-plastic-bib-big',
				excerpt:
					'Durable and easy‑clean large plastic apron‑style baby bib made in China—perfect for mess‑free feeding.',
				description:
					'The China Baby Apron Plastic Bib (Big Size) is designed to provide full coverage and maximum protection during feeding time. Made from sturdy, waterproof plastic, it prevents spills, food stains, and liquids from reaching your baby’s clothes. The apron style covers more area than regular bibs, making it ideal for self‑feeding toddlers. Lightweight, easy to wipe, and quick to clean, this bib is a practical choice for daily meals.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100062',
		meta_title: 'Kidzo Baby Bib 3PCS Terry | Soft & Absorbent Feeding Bibs',
		meta_description:
			'Shop Kidzo Baby Bib 3PCS Terry. Soft, absorbent terry bibs ideal for feeding, drooling, and everyday baby care.',
		base_price: '435',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'KIDZO BABY BIB 3PCS TERRY',
				slug: 'kidzo-baby-bib-3pcs-terry',
				excerpt:
					'Soft and absorbent 3‑piece terry baby bib set by Kidzo, perfect for daily feeding and drooling protection.',
				description:
					'The Kidzo Baby Bib 3PCS Terry set includes three high‑quality terry cloth bibs designed for maximum absorption and comfort. Made from gentle, skin‑friendly fabric, these bibs keep your baby’s clothes clean during feeding, teething, or playtime. The secure and comfortable neck closure ensures a snug fit for infants. Durable, washable, and perfect for everyday use, offering great value and reliability from Kidzo.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100054',
		meta_title:
			'Little Alpaca Baby 2PCS Bib + 1 Spoon Set | Feeding Essentials',
		meta_description:
			'Buy Little Alpaca Baby 2PCS Bib + 1 Spoon Set. Soft bibs and safe feeding spoon—perfect for daily feeding and mess‑free mealtimes.',
		base_price: '680',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'LITTLE APLACA BABY 2PCS BIB+1SPOON SET',
				slug: 'little-alpaca-baby-2pcs-bib-1spoon-set',
				excerpt:
					'Cute and practical Little Alpaca baby set featuring 2 bibs + 1 feeding spoon—perfect for clean, easy mealtime.',
				description:
					'The Little Alpaca Baby 2PCS Bib + 1 Spoon Set is a convenient feeding combo designed for everyday use. The soft, gentle bibs keep your baby’s clothes clean from spills, while the included feeding spoon is safe, smooth, and comfortable for little mouths. Ideal for newborns and infants, this set offers both practicality and adorable style, making mealtime easier for parents and more comfortable for babies.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100053',
		meta_title: 'Loly Pop Baby Bib Printed | Soft & Cute Feeding Bib',
		meta_description:
			'Buy Loly Pop Baby Bib Printed—soft, absorbent, easy‑to‑wash bib with cute prints. Perfect for daily feeding and drool protection.',
		base_price: '125',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'LOLY POP BABY BIB PRINTED',
				slug: 'loly-pop-baby-bib-printed',
				excerpt:
					'Soft and cute printed Loly Pop baby bib—perfect for keeping your little one clean during meals.',
				description:
					'The Loly Pop Baby Bib Printed is designed to make feeding time easier and cleaner. Made with soft, comfortable, and absorbent fabric, it gently protects your baby’s clothes from spills and drool. The fun printed design adds charm, making it both practical and adorable. Lightweight, easy to wash, and ideal for daily use, this bib is a great choice for newborns and infants.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100060',
		meta_title: 'NB Kidzo Baby Bib 3PCS Medium | Soft & Absorbent Bibs',
		meta_description:
			'Shop NB Kidzo Baby Bib 3PCS Medium—soft, absorbent, easy‑to‑wash bibs perfect for newborn and infant feeding.',
		base_price: '160',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'NB KIDZO BABY BIB 3PCS MEDIUM',
				slug: 'nb-kidzo-baby-bib-3pcs-medium',
				excerpt:
					'Soft and absorbent KIDZO baby bib set—medium size, perfect for daily feeding and spill protection.',
				description:
					'The NB Kidzo Baby Bib 3PCS Medium set is designed to keep your baby clean and comfortable during meals. Made with soft, gentle, and absorbent fabric, these bibs protect clothing from spills, drool, and messes. Each pack includes three medium‑size bibs that offer a secure fit and long‑lasting comfort. Easy to wash, durable, and ideal for everyday use, this bib set is a practical choice for newborns and infants.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100059',
		meta_title: 'NB Kidzo Baby Bib 3PCS Pack Large | Soft & Absorbent Bibs',
		meta_description:
			'Shop NB Kidzo Baby Bib 3PCS Pack Large—soft, absorbent, easy‑to‑wash bibs offering extra coverage for feeding and daily use.',
		base_price: '165',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'NB KIDZO BABY BIB 3PCS PACK LARGE',
				slug: 'nb-kidzo-baby-bib-3pcs-pack-large',
				excerpt:
					'Soft and absorbent NB Kidzo large‑size baby bib set—perfect coverage for feeding and drool protection.',
				description:
					'The NB Kidzo Baby Bib 3PCS Pack Large is designed to give extra coverage and comfort during feeding time. Made from soft, gentle, and absorbent fabric, these large‑size bibs help protect your baby’s clothes from spills, milk drips, and drool. Each pack includes three durable bibs with a secure and comfortable fit. Easy to wash and ideal for everyday use, this set is a practical choice for babies who need a little more coverage.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100061',
		meta_title: 'NB Kidzo Baby Bib Magic 3PCS | Soft & Absorbent Baby Bibs',
		meta_description:
			'Buy NB Kidzo Baby Bib Magic 3PCS—soft, absorbent, easy‑fit bibs perfect for newborn and infant feeding. Lightweight and easy to wash.',
		base_price: '180',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'NB KIDZO BABY BIB MAGIC 3PCS',
				slug: 'nb-kidzo-baby-bib-magic-3pcs',
				excerpt:
					'Soft and absorbent NB Kidzo Magic Baby Bib set—3pcs designed for easy feeding and mess control.',
				description:
					'The NB Kidzo Baby Bib Magic 3PCS set is made with soft, gentle, and highly absorbent fabric to keep your baby clean and comfortable during meals. These bibs feature a “Magic” easy‑fit design that sits securely while protecting clothes from spills, drool, and food mess. Durable, lightweight, and perfect for everyday use, this 3‑piece set is ideal for newborns and infants.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100056',
		meta_title: 'NUS Baby Apprin Plastic Bib | Waterproof Feeding Bib',
		meta_description:
			'Buy NUS Baby Apprin Plastic Bib—waterproof, easy‑clean bib designed to protect your baby’s clothes during feeding. Durable and lightweight.',
		base_price: '220',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'NUS BABY APPRIN BIB PLASTIC',
				slug: 'nus-baby-apprin-bib-plastic',
				excerpt:
					'Durable and easy‑to‑clean plastic bib—perfect for keeping babies mess‑free during meals.',
				description:
					'The NUS Baby Apprin Plastic Bib is designed to provide full protection during feeding time. Made from lightweight, waterproof plastic material, it prevents spills, stains, and food splashes from reaching your baby’s clothes. The bib is easy to wipe clean, quick‑drying, and comfortable for everyday use. Ideal for babies who need strong mess control during meals.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100055',
		meta_title:
			'NUS Sleeve Bib China Printed | Full‑Coverage Waterproof Bib',
		meta_description:
			'Shop NUS Sleeve Bib China Printed—waterproof, lightweight, full‑sleeve bib for feeding and messy play. Easy to clean with cute prints.',
		base_price: '325',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'NUS SLEEVE BIB CHINA PRINTED',
				slug: 'nus-sleeve-bib-china-printed',
				excerpt:
					'Soft, waterproof, and protective sleeve bib—perfect for keeping your baby fully covered during meals and play.',
				description:
					'The NUS Sleeve Bib China Printed is designed to give full‑sleeve protection, keeping your baby’s clothes clean from spills, splashes, and food mess. Made from lightweight, waterproof material, it’s comfortable for daily use and easy to wipe clean. The cute printed designs add charm while the elastic sleeves ensure a secure fit. Ideal for feeding, painting, and messy play activities.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100057',
		meta_title:
			'TU Baby 2PCS Plastic Apprin Bib | Waterproof Feeding Bib Set',
		meta_description:
			'Shop TU Baby 2PCS Plastic Apprin Bib—waterproof, easy‑to‑clean bib set perfect for feeding time. Lightweight, durable, and convenient for daily use.',
		base_price: '415',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'TU BABY 2PCS PLASTIC APPRIN BIB',
				slug: 'tu-baby-2pcs-plastic-apprin-bib',
				excerpt:
					'Durable and easy‑clean 2‑piece plastic bib set—perfect for mess‑free feeding time.',
				description:
					'The TU Baby 2PCS Plastic Apprin Bib set is designed to keep your baby’s clothes fully protected during meals. Made from lightweight, waterproof plastic material, these bibs prevent spills, stains, and food mess from soaking through. Each bib is easy to wipe clean, quick‑drying, and comfortable for daily use. With a practical 2‑piece pack, you’ll always have a backup bib ready for feeding time.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100117',
		meta_title:
			'Baby Casual Shoes Black 12–18M | Soft & Comfortable Baby Footwear',
		meta_description:
			'Shop Baby Casual Shoes Black 12–18M—comfortable, lightweight, and stylish shoes for infants. Perfect for daily wear and early walking support.',
		base_price: '885',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY CASUAL SHOES BLACK 12-18M',
				slug: 'baby-casual-shoes-black-12-18m',
				excerpt:
					'Comfortable and stylish black casual baby shoes for ages 12–18 months.',
				description:
					'These Baby Casual Shoes in Black (12–18M) are designed for both comfort and daily wear. Made with soft inner padding and a flexible sole, they provide gentle support for growing feet. The slip‑on/easy‑wear design makes dressing quick and hassle‑free, while the classic black color matches any outfit. Perfect for outings, casual wear, and early walkers.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100121',
		meta_title:
			'Baby Casual Shoes Black 18–24M | Comfortable & Stylish Baby Footwear',
		meta_description:
			'Buy Baby Casual Shoes Black 18–24M—soft, comfy, and easy‑wear shoes designed for toddlers. Lightweight, durable, and perfect for everyday outfits.',
		base_price: '885',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY CASUAL SHOES BLACK 18-24M',
				slug: 'baby-casual-shoes-black-18-24m',
				excerpt:
					'Stylish and comfortable black casual shoes for babies aged 18–24 months.',
				description:
					'These Baby Casual Shoes in Black (18–24M) are designed to provide comfort, support, and style for little feet. Made with a soft inner lining and a flexible, lightweight sole, they help babies walk with ease. The classic black design pairs well with any outfit, making them perfect for daily wear, outings, and early walkers. Easy to put on and gentle on the feet, these shoes are ideal for active toddlers.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100115',
		meta_title:
			'Baby Casual Shoes Black 6–12M | Soft & Lightweight Baby Shoes',
		meta_description:
			'Shop Baby Casual Shoes Black 6–12M—comfortable, flexible, and easy‑wear shoes for infants. Perfect for daily use and early walking support.',
		base_price: '885',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY CASUAL SHOES BLACK 6-12M',
				slug: 'baby-casual-shoes-black-6-12m',
				excerpt:
					'Soft, lightweight black casual shoes for babies aged 6–12 months—perfect for daily wear.',
				description:
					'These Baby Casual Shoes in Black (6–12M) are designed to keep little feet comfortable and supported. Made with a soft inner lining and a flexible sole, they help babies move naturally while crawling or taking early steps. The easy‑wear design makes dressing quick, and the classic black color pairs well with any outfit. Ideal for everyday use, outings, and first walkers.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100116',
		meta_title:
			'Baby Casual Shoes Blue 18–24M | Comfortable & Lightweight Toddler Shoes',
		meta_description:
			'Buy Baby Casual Shoes Blue 18–24M—soft, flexible, and stylish footwear for toddlers. Ideal for daily wear, comfortable walking, and active movement.',
		base_price: '885',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY CASUAL SHOES BLUE 18-24M',
				slug: 'baby-casual-shoes-blue-18-24m',
				excerpt:
					'Comfortable and stylish blue casual shoes for toddlers aged 18–24 months.',
				description:
					'These Baby Casual Shoes in Blue (18–24M) are designed to give comfort, flexibility, and support for active toddlers. Featuring a soft inner lining and a lightweight, flexible sole, they help little ones walk confidently. The easy‑wear design makes them simple to put on, while the vibrant blue color adds a cute touch to any outfit. Perfect for daily wear, outings, and early walkers.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100118',
		meta_title: 'Baby Casual Shoes Light Grey 0–1M | Soft Newborn Shoes',
		meta_description:
			'Buy Baby Casual Shoes Light Grey 0–1M—super soft, lightweight, and cozy newborn shoes. Perfect for daily wear and gentle foot protection.',
		base_price: '885',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY CASUAL SHOES LIGHT GREY 0-1M',
				slug: 'baby-casual-shoes-light-grey-0-1m',
				excerpt:
					'Soft and lightweight light‑grey casual shoes for newborns aged 0–1 month.',
				description:
					'These Baby Casual Shoes in Light Grey (0–1M) are designed especially for newborn comfort. Made with ultra‑soft fabric and a gentle, flexible sole, they keep tiny feet warm and cozy without restricting movement. The lightweight design ensures comfort during naps, outings, and daily wear. The neutral light‑grey color pairs perfectly with any newborn outfit.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100120',
		meta_title:
			'Baby Casual Shoes Mustard 0–1M | Soft & Lightweight Newborn Shoes',
		meta_description:
			'Shop Baby Casual Shoes Mustard 0–1M—soft, breathable, lightweight newborn shoes perfect for daily comfort and style.',
		base_price: '885',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY CASUAL SHOES MUSTARD 0-1M',
				slug: 'baby-casual-shoes-mustard-0-1m',
				excerpt:
					'Ultra‑soft mustard‑color casual shoes for newborns aged 0–1 month—perfect for cozy daily wear.',
				description:
					'The Baby Casual Shoes in Mustard (0–1M) are specially designed for newborn comfort. Made with gentle, ultra‑soft fabric and a flexible sole, they keep tiny feet warm without restricting natural movement. The lightweight design makes them ideal for naps, outings, or everyday wear, while the trendy mustard color adds a cute touch to any newborn outfit.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100119',
		meta_title: 'Baby Casual Shoes White 1–3M | Soft & Cozy Newborn Shoes',
		meta_description:
			'Shop Baby Casual Shoes White 1–3M—soft, flexible, and lightweight footwear for newborns. Perfect for daily comfort and gentle foot support.',
		base_price: '885',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY CASUAL SHOES WHITE 1-3M',
				slug: 'baby-casual-shoes-white-1-3m',
				excerpt:
					'Soft, lightweight white casual shoes for babies aged 1–3 months—perfect for daily comfort.',
				description:
					'These Baby Casual Shoes in White (1–3M) are designed to keep your little one’s feet cozy, protected, and stylish. Made with ultra‑soft fabric and a flexible sole, they support natural movement without causing discomfort. The pure white color gives a clean, classic look that pairs easily with any outfit. Ideal for newborn outings, daily wear, and gentle foot protection.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100023',
		meta_title:
			'Nexton Baby Lotion Smooth & Soft 500ml | Hydrating & Gentle Baby Lotion',
		meta_description:
			'Shop Nexton Baby Lotion Smooth & Soft 500ml—gentle, soothing, and fast‑absorbing lotion that keeps baby skin hydrated, soft, and irritation‑free.',
		base_price: '940',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'NEXTON BABY LOTION SMOOTH AND SOFT 500ML',
				slug: 'nexton-baby-lotion-smooth-and-soft-500ml',
				excerpt:
					'Nexton Baby Lotion Smooth & Soft 500ml — deeply moisturizing lotion made for delicate baby skin.',
				description:
					'Nexton Baby Lotion Smooth & Soft (500ml) is a gentle, nourishing formula created to keep your baby’s skin soft, hydrated, and protected throughout the day. Enriched with soothing ingredients, it helps prevent dryness, irritation, and roughness. The lightweight, non‑greasy texture absorbs quickly, making it ideal for everyday use after bath time or during bedtime routines. Safe for sensitive skin and dermatologically tested, this lotion ensures long‑lasting softness and comfort.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100024',
		meta_title:
			'Nexton Baby Lotion Smooth & Soft 250ml | Gentle Daily Moisturizing Lotion',
		meta_description:
			'Buy Nexton Baby Lotion Smooth & Soft 250ml—gentle, hydrating lotion for delicate baby skin. Non‑greasy, soothing, and perfect for daily use.',
		base_price: '560',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'nexton baby lotion smooth and soft 250ML',
				slug: 'nexton-baby-lotion-smooth-and-soft-250ml',
				excerpt:
					'Nexton Baby Lotion Smooth & Soft 250ml — gentle daily‑use lotion that keeps baby skin soft, hydrated, and protected.',
				description:
					'Nexton Baby Lotion Smooth & Soft (250ml) is specially formulated for delicate baby skin. Its mild, nourishing ingredients help retain moisture, prevent dryness, and keep the skin smooth and healthy. The lightweight, non‑greasy formula absorbs quickly, making it perfect for everyday use after baths or before sleep. With a soft baby fragrance and dermatologically tested formula, this lotion provides long‑lasting moisture and comfort for sensitive skin.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100016',
		meta_title:
			'Nexton Baby Lotion Aloe Vera 250ml | Soothing & Hydrating Baby Lotion',
		meta_description:
			'Shop Nexton Baby Lotion Aloe Vera 250ml—gentle, soothing, and fast‑absorbing lotion enriched with aloe vera to keep baby skin soft, fresh, and moisturized.',
		base_price: '560',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'NEXTON BABY LOTION ALEOVERA 250ML',
				slug: 'nexton-baby-lotion-aloe-vera-250ml',
				excerpt:
					'Nexton Baby Lotion Aloe Vera 250ml — soothing, hydrating lotion enriched with aloe vera for soft and healthy baby skin.',
				description:
					'Nexton Baby Lotion Aloe Vera (250ml) is formulated with the natural goodness of aloe vera to provide deep hydration and gentle nourishment to delicate baby skin. Its soothing properties help calm irritation, prevent dryness, and keep the skin soft and fresh all day. The lightweight and non‑greasy formula absorbs quickly, making it perfect for daily use after bath time. Dermatologically tested and safe for sensitive skin, this lotion ensures long‑lasting moisture and protection.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100015',
		meta_title:
			'Nexton Baby Lotion Aloe Vera 125ml | Gentle Soothing Moisturizer',
		meta_description:
			'Shop Nexton Baby Lotion Aloe Vera 125ml—gentle, soothing aloe‑enriched formula that keeps baby skin hydrated, soft, and irritation‑free.',
		base_price: '360',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'NEXTON BABY LOTION ALEOVERA 125ML',
				slug: 'nexton-baby-lotion-aloe-vera-125ml',
				excerpt:
					'Nexton Baby Lotion Aloe Vera 125ml — a soothing, hydrating lotion enriched with aloe vera to keep baby skin soft, calm, and moisturized.',
				description:
					'Nexton Baby Lotion Aloe Vera (125ml) is specially formulated for delicate baby skin. Enriched with natural aloe vera extract, it helps soothe irritation, prevent dryness, and maintain long‑lasting moisture. Its light, non‑greasy formula absorbs quickly and leaves the skin feeling soft and fresh. Perfect for daily use after bath time or before sleep, this dermatologically tested lotion is gentle enough for sensitive skin. The compact 125ml bottle is travel‑friendly and ideal for everyday care.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100022',
		meta_title:
			'Nexton Baby Oil Lavender 250ml | Calming & Nourishing Baby Oil',
		meta_description:
			'Buy Nexton Baby Oil Lavender 250ml—moisturizing baby oil with soothing lavender to keep baby skin soft, hydrated, and calm.',
		base_price: '592',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'nexton baby oil lavender 250ML',
				slug: 'nexton-baby-oil-lavender-250ml',
				excerpt:
					'Nexton Baby Oil Lavender 250ml — calming, moisturizing baby oil enriched with lavender for soft skin and soothing comfort.',
				description:
					'Nexton Baby Oil Lavender (250ml) is specially crafted to nourish and protect delicate baby skin. Infused with gentle lavender extract, it provides a calming effect that helps relax babies, especially during massage or bedtime routines. The lightweight formula absorbs smoothly, locking in moisture and preventing dryness. Suitable for daily use, this dermatologically tested oil keeps the skin soft, smooth, and delicately scented. Its 250ml bottle is perfect for regular home use.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100019',
		meta_title:
			'Nexton Baby Oil Lavender 125ml | Gentle & Soothing Baby Oil',
		meta_description:
			'Shop Nexton Baby Oil Lavender 125ml—moisturizing, lavender‑infused baby oil that keeps skin soft, hydrated, and relaxed.',
		base_price: '358',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'nexton baby oil lavender 125ML',
				slug: 'nexton-baby-oil-lavender-125ml',
				excerpt:
					'Nexton Baby Oil Lavender 125ml — gentle, soothing baby oil infused with calming lavender to moisturize and relax your baby.',
				description:
					'Nexton Baby Oil Lavender (125ml) is a mild and nourishing oil formulated to care for delicate baby skin. Enriched with natural lavender extract, it provides a calming effect that helps relax babies during massage or bedtime routines. The lightweight, non‑sticky formula absorbs easily, locking in moisture and keeping the skin soft, smooth, and protected from dryness. Perfect for daily use, this dermatologically tested oil leaves a light, comforting lavender scent. The 125ml bottle is ideal for travel or regular home use.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100021',
		meta_title:
			'Nexton Baby Oil Aloe Vera 65ml | Gentle Nourishing Baby Oil',
		meta_description:
			'Buy Nexton Baby Oil Aloe Vera 65ml—light, soothing oil enriched with aloe vera to keep baby skin soft, hydrated, and protected.',
		base_price: '248',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'nexton baby oil aloevera 65ML',
				slug: 'nexton-baby-oil-aloe-vera-65ml',
				excerpt:
					'Nexton Baby Oil Aloe Vera 65ml — a gentle, hydrating baby oil enriched with soothing aloe vera for soft and nourished skin.',
				description:
					'Nexton Baby Oil Aloe Vera (65ml) is specially formulated to care for delicate baby skin. Enriched with natural aloe vera extract, it helps soothe irritation, prevent dryness, and keep the skin soft and moisturized. Its lightweight, non‑sticky texture absorbs easily, making it perfect for daily baby massage or post‑bath use. Dermatologically tested and mild on sensitive skin, this compact 65ml bottle is travel‑friendly and ideal for everyday use.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100020',
		meta_title:
			'Nexton Baby Oil Aloe Vera 125ml | Gentle & Nourishing Baby Oil',
		meta_description:
			'Shop Nexton Baby Oil Aloe Vera 125ml—soothing, lightweight oil enriched with aloe vera to keep baby skin soft, hydrated, and irritation‑free.',
		base_price: '358',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'nexton baby oil aloevera 125ML',
				slug: 'nexton-baby-oil-aloe-vera-125ml',
				excerpt:
					'Nexton Baby Oil Aloe Vera 125ml — a gentle, hydrating baby oil enriched with soothing aloe vera to keep baby skin soft, calm, and nourished.',
				description:
					'Nexton Baby Oil Aloe Vera (125ml) is formulated to provide deep nourishment and comfort for delicate baby skin. Infused with natural aloe vera extract, it helps soothe irritation, prevent dryness, and maintain long‑lasting moisture. The lightweight, non‑sticky texture absorbs easily, making it ideal for daily massage or after‑bath care. Dermatologically tested and gentle on sensitive skin, this 125ml bottle is perfect for everyday use at home or on the go.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100012',
		meta_title: 'Nexton Baby Powder Rash Off 50gm | Anti‑Rash Baby Powder',
		meta_description:
			'Buy Nexton Baby Powder Rash Off 50gm—gentle, soothing baby powder that helps prevent rashes and keeps skin dry and comfortable.',
		base_price: '130',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'nexton baby powder rash off 50gm',
				slug: 'nexton-baby-powder-rash-off-50gm',
				excerpt:
					'Nexton Baby Powder Rash Off 50gm — gentle, soothing powder designed to protect baby skin from rash, irritation, and moisture.',
				description:
					'Nexton Baby Powder Rash Off (50gm) is specially formulated to keep your baby’s skin dry, fresh, and protected from rashes. Enriched with mild, skin‑friendly ingredients, it helps reduce friction, absorb excess moisture, and soothe irritation—especially in diaper areas. Its smooth, silky texture is gentle on sensitive skin and ideal for daily use. The compact 50gm size is perfect for travel and diaper bags.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100011',
		meta_title: 'Nexton Baby Powder Rash Off 100gm | Anti‑Rash Baby Powder',
		meta_description:
			'Nexton Baby Powder Rash Off 100gm—gentle, soothing powder that helps prevent rashes, absorbs moisture, and keeps baby skin comfortable.',
		base_price: '199',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'nexton baby powder rash off 100gm',
				slug: 'nexton-baby-powder-rash-off-100gm',
				excerpt:
					'Nexton Baby Powder Rash Off 100gm — soothing, anti‑rash powder that keeps baby skin dry, fresh, and protected from irritation.',
				description:
					'Nexton Baby Powder Rash Off (100gm) is specially designed to prevent and soothe diaper rash by keeping your baby’s skin dry and comfortable. Its gentle, skin‑friendly formula absorbs excess moisture, reduces friction, and calms irritation—making it ideal for daily use on sensitive areas. The silky, lightweight texture spreads smoothly without clumping, leaving the skin soft and fresh. The 100gm size is perfect for home use and lasts longer.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100013',
		meta_title:
			'Nexton Baby Powder Nourishing 200gm | Soft & Gentle Baby Powder',
		meta_description:
			'Buy Nexton Baby Powder Nourishing 200gm—soft, gentle formula that absorbs moisture, prevents irritation, and keeps baby skin smooth and fresh.',
		base_price: '310',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'nexton baby powder nourishing 200gm',
				slug: 'nexton-baby-powder-nourishing-200gm',
				excerpt:
					'Nexton Baby Powder Nourishing 200gm — soft, refreshing powder enriched with gentle ingredients to keep baby skin dry, smooth, and nourished all day.',
				description:
					'Nexton Baby Powder Nourishing (200gm) is designed to give your baby long‑lasting freshness and comfort. Its mild, talc‑based formula absorbs excess moisture, helps prevent friction, and keeps the skin smooth and dry. Enriched with skin‑friendly, nourishing ingredients, it supports healthy skin while maintaining softness. Perfect for daily use after bath time or diaper changes, the silky texture spreads easily and leaves a pleasant, gentle fragrance. The 200gm pack offers great value for regular home use.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100014',
		meta_title:
			'Nexton Baby Powder Nourishing 100gm | Gentle & Refreshing Baby Powder',
		meta_description:
			'Shop Nexton Baby Powder Nourishing 100gm—soft, gentle powder that absorbs moisture and keeps baby skin smooth, fresh, and irritation‑free.',
		base_price: '181',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'nexton baby powder nourishing 100gm',
				slug: 'nexton-baby-powder-nourishing-100gm',
				excerpt:
					'Nexton Baby Powder Nourishing 100gm — gentle, refreshing powder that keeps baby skin soft, dry, and nourished throughout the day.',
				description:
					'Nexton Baby Powder Nourishing (100gm) is created to maintain your baby’s comfort by absorbing excess moisture and reducing skin friction. Its mild, nourishing formula helps keep delicate skin smooth, fresh, and protected. With a silky texture and a light, pleasant fragrance, it is perfect for daily use after baths or diaper changes. The 100gm size is convenient for both home use and travel.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100047',
		meta_title:
			'Nexton Baby Soap Rose Water | Gentle & Refreshing Baby Soap',
		meta_description:
			'Buy Nexton Baby Soap Rose Water — mild, refreshing soap enriched with rose water to keep baby skin soft, clean, and moisturized.',
		base_price: '179',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'Nexton baby soap rose water',
				slug: 'nexton-baby-soap-rose-water',
				excerpt:
					'Nexton Baby Soap Rose Water — gentle cleansing soap enriched with soothing rose water to keep baby’s skin soft, fresh, and moisturized.',
				description:
					'Nexton Baby Soap Rose Water is specially formulated for delicate baby skin. Enriched with natural rose water, it gently cleanses while helping maintain skin softness and hydration. Its mild, tear‑free formula creates a soft lather that washes away impurities without causing dryness or irritation. The calming rose scent leaves your baby feeling fresh and comfortable after every bath. Suitable for daily use on sensitive skin.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100048',
		meta_title:
			'Nexton Baby Soap Aloe Vera | Gentle & Moisturizing Baby Soap',
		meta_description:
			'Nexton Baby Soap Aloe Vera — soothing, mild formula enriched with aloe vera to keep baby skin soft, clean, and moisturized.',
		base_price: '179',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'Nexton baby soap aloevera',
				slug: 'nexton-baby-soap-aloevera',
				excerpt:
					'Nexton Baby Soap Aloe Vera — mild, soothing baby soap enriched with aloe vera to keep delicate skin soft, calm, and moisturized.',
				description:
					'Nexton Baby Soap Aloe Vera is specially made for gentle cleansing of your baby’s sensitive skin. Enriched with natural aloe vera extract, it helps soothe irritation, maintain moisture, and protect the skin’s softness. The tear‑free, mild formula creates a creamy lather that cleans without stripping natural oils. Its light, calming fragrance keeps your baby feeling fresh and comfortable after every bath. Perfect for everyday use on newborn and sensitive skin.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100049',
		meta_title: 'Pampers Baby Wipes 72pcs | Soft & Gentle Baby Wipes',
		meta_description:
			'Buy Pampers Baby Wipes 72pcs—gentle, hypoallergenic wipes designed to clean and protect sensitive baby skin. Ideal for daily use.',
		base_price: '235',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'PAMPARS BABY WIPES 72PCS',
				slug: 'pampers-baby-wipes-72pcs',
				excerpt:
					'Pampers Baby Wipes 72pcs — soft, gentle, and hypoallergenic wipes designed to cleanse and protect your baby’s delicate skin.',
				description:
					'Pampers Baby Wipes (72pcs) offer a mild yet effective cleansing experience for your baby’s sensitive skin. Made with a soft, thick texture, these wipes gently remove dirt and impurities while helping maintain the skin’s natural moisture balance. Their dermatologically tested, alcohol‑free, and fragrance‑friendly formula reduces the risk of irritation, making them ideal for diaper changes, feeding time cleanups, or everyday use. Conveniently packed, the 72pcs pack is perfect for home or travel.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100000',
		meta_title:
			'Nexton Baby Wipes Soft & Thick 64pcs | Gentle & Moisturizing Wipes',
		meta_description:
			'Nexton Baby Wipes Soft & Thick 64pcs—soft, durable, alcohol‑free wipes designed for gentle daily cleansing of your baby’s sensitive skin.',
		base_price: '358',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'NEXTON BABY WIPES SOFT AND THICK 64PCS',
				slug: 'nexton-baby-wipes-soft-and-thick-64pcs',
				excerpt:
					'Nexton Baby Wipes Soft & Thick 64pcs — gentle, moisturizing wipes designed to clean delicate baby skin with extra softness and durability.',
				description:
					'Nexton Baby Wipes Soft & Thick (64pcs) are specially crafted to provide gentle cleansing for your baby’s sensitive skin. The wipes are made with a soft, thick, and durable fabric that cleans effectively without causing irritation. Enriched with mild moisturizers, they help maintain the natural softness of the skin and prevent dryness. Their alcohol‑free and dermatologically tested formula makes them safe for everyday use—perfect for diaper changes, feeding messes, or quick cleanups. The compact 64pcs pack is convenient to carry in diaper bags and ideal for home or travel.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100005',
		meta_title:
			'Nexton Baby Wipes Natural Aloe Vera 64pcs | Gentle & Aloe‑Enriched Baby Wipes',
		meta_description:
			'Buy Nexton Baby Wipes Natural Aloe Vera 64pcs — thick, soft, and soothing wipes enriched with aloe vera for gentle daily baby care. Alcohol‑free & dermatologically tested.',
		base_price: '358',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'NEXTON BABY WIPES NATURAL ALOEVERA 64PCS',
				slug: 'nexton-baby-wipes-natural-aloe-vera-64pcs',
				excerpt:
					'Nexton Baby Wipes Natural Aloe Vera 64pcs — soft, thick, and soothing wipes enriched with natural aloe vera for gentle daily cleaning.',
				description:
					'Nexton Baby Wipes Natural Aloe Vera (64pcs) are specially made to provide gentle and refreshing cleansing for your baby’s sensitive skin. Each wipe is infused with natural aloe vera extract that helps soothe irritation, moisturize the skin, and maintain its natural softness. With a thick, durable texture, these wipes clean effectively without causing discomfort. Free from alcohol and harsh chemicals, these dermatologically tested wipes are safe for newborns and ideal for diaper changing, feeding cleanups, or quick on‑the‑go hygiene. The resealable pack keeps the wipes moist and fresh for everyday use.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100006',
		meta_title:
			'Nexton Baby Wipes Fragrance Free 64pcs | Sensitive & Chemical‑Free Baby Wipes',
		meta_description:
			'Nexton Baby Wipes Fragrance Free 64pcs — soft, thick, hypoallergenic wipes ideal for sensitive baby skin. Alcohol‑free, fragrance‑free & dermatologically tested.',
		base_price: '358',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'NEXTON BABY WIPES FRAGRANCE FREE 64PCS',
				slug: 'nexton-baby-wipes-fragrance-free-64pcs',
				excerpt:
					'Nexton Baby Wipes Fragrance Free 64pcs — gentle, soft, and chemical‑free wipes ideal for babies with sensitive or allergy‑prone skin.',
				description:
					'Nexton Baby Wipes Fragrance Free (64pcs) are specially designed for babies with delicate, sensitive, or fragrance‑reactive skin. Made with a soft and thick material, these wipes provide smooth and effective cleaning during diaper changes, feeding times, and daily hygiene. The fragrance‑free, alcohol‑free, and paraben‑free formula ensures safe use on newborn skin without causing irritation. Each wipe is dermatologically tested and enriched with mild moisturizers to help maintain natural skin softness. The resealable pack keeps wipes moist, hygienic, and ready for everyday use at home or on‑the‑go.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100041',
		meta_title:
			'Johnson’s Baby Wipes 84pcs | Soft & Mild Baby Cleansing Wipes',
		meta_description:
			'Buy Johnson’s Baby Wipes 84pcs — soft, mild, and dermatologist‑tested wipes for gentle baby cleansing. Ideal for newborns and daily use.',
		base_price: '225',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'Johnson baby wipes 84pcs',
				slug: 'johnsons-baby-wipes-84pcs',
				excerpt:
					'Johnson’s Baby Wipes 84pcs — soft, mild, and gentle wipes designed to cleanse and protect your baby’s delicate skin with every use.',
				description:
					'Johnson’s Baby Wipes 84pcs provide gentle cleansing specially formulated for newborn and sensitive baby skin. Made with Johnson’s signature No More Tears formula, these wipes are mild, dermatologist‑tested, and free from harsh chemicals. The ultra‑soft fabric ensures comfortable cleaning during diaper changes, feeding messes, and daily hygiene. Enriched with mild moisturizers, the wipes help maintain natural skin softness while preventing dryness and irritation. Conveniently packed with a resealable lid to keep wipes fresh, moist, and hygienic for everyday use at home or while traveling.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100042',
		meta_title:
			'Johnson’s Baby Wipes 60pcs | Mild & Gentle Baby Cleansing Wipes',
		meta_description:
			'Johnson’s Baby Wipes 60pcs — soft, mild, and dermatologist‑tested wipes for newborn‑safe cleansing. Alcohol‑free and ideal for daily baby care.',
		base_price: '242',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'Johnson baby wipes 60pcs',
				slug: 'johnsons-baby-wipes-60pcs',
				excerpt:
					'Johnson’s Baby Wipes 60pcs — mild, soft, and gentle cleansing wipes designed to protect and care for your baby’s delicate skin.',
				description:
					'Johnson’s Baby Wipes 60pcs are formulated with the trusted No More Tears mildness, making them safe and gentle for newborn and sensitive skin. The ultra‑soft wipes provide smooth and comfortable cleaning during diaper changes and everyday hygiene without causing irritation. These wipes are enriched with mild moisturizers to prevent dryness and maintain natural skin softness. Dermatologist‑tested and free from alcohol and harsh chemicals, they ensure gentle, everyday care. The compact resealable pack keeps the wipes fresh, moist, and perfect for travel or quick use anytime.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100164',
		meta_title:
			'Johnson Baby Wipes 72pcs — ultra‑gentle, dermatologist‑tested wipes designed for everyday baby skin care.',
		meta_description:
			'Johnson Baby Wipes 72pcs — ultra‑gentle, dermatologist‑tested wipes designed for everyday baby skin care.',
		base_price:
			'Johnson Baby Wipes 72pcs — ultra‑gentle, dermatologist‑tested wipes designed for everyday baby skin care.',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'JOHNSON BABY WIPES 72pcs',
				slug: 'johnson-baby-wipes-72pcs',
				excerpt:
					'Johnson Baby Wipes 72pcs — ultra‑gentle, dermatologist‑tested wipes designed for everyday baby skin care.',
				description:
					'Johnson Baby Wipes 72pcs — ultra‑gentle, dermatologist‑tested wipes designed for everyday baby skin care.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100068',
		meta_title:
			'Pigeon Baby Shampoo 200ml | Gentle & Tear‑Free Baby Hair Care',
		meta_description:
			'Pigeon Baby Shampoo 200ml — mild, tear‑free, and pH‑balanced shampoo for newborns and sensitive baby hair. Keeps hair soft, clean, and moisturized.',
		base_price: '1025',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'Pigeon baby shampoo 200ML',
				slug: 'pigeon-baby-shampoo-200ml',
				excerpt:
					'Pigeon Baby Shampoo 200ml — a gentle, tear‑free shampoo specially formulated to cleanse and protect your baby’s delicate hair and scalp.',
				description:
					'Pigeon Baby Shampoo 200ml is crafted with a mild, tear‑free formula that gently cleanses your baby’s hair without irritating the eyes or skin. Enriched with natural conditioning ingredients, it helps keep the hair soft, smooth, and tangle‑free. The hypoallergenic and pH‑balanced formula is suitable for newborns and sensitive scalps. It cleans effectively while maintaining natural moisture, preventing dryness or irritation. Its light fragrance leaves the hair fresh and pleasant throughout the day. Perfect for daily use and dermatologist‑tested for safe baby care.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100027',
		meta_title:
			'Nexton Baby Aloe Vera Shampoo 250ml | Gentle & Nourishing Baby Shampoo',
		meta_description:
			'Nexton Baby Aloe Vera Shampoo 250ml — tear‑free, soothing, and mild shampoo enriched with aloe vera. Keeps baby hair soft and clean. Ideal for daily use.',
		base_price: '505',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'nexton baby aloevera shampoo 250ML',
				slug: 'nexton-baby-aloevera-shampoo-250ml',
				excerpt:
					'Nexton Baby Aloe Vera Shampoo 250ml — a mild, nourishing shampoo enriched with aloe vera to gently cleanse and protect your baby’s delicate hair and scalp.',
				description:
					'Nexton Baby Aloe Vera Shampoo 250ml is specially formulated with the natural soothing power of aloe vera to gently clean your baby’s hair while keeping the scalp soft and comfortable. Its mild, tear‑free formula ensures a stress‑free bath time, protecting your baby’s eyes and sensitive skin. The shampoo helps maintain natural moisture, leaving hair soft, smooth, and easy to manage. Dermatologically tested and free from harsh chemicals, it is suitable for newborns and babies with sensitive skin. Perfect for everyday use, offering a refreshing and calming bath experience.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100030',
		meta_title:
			'Dr.Rashel Shampoo & Bath Bubble 2 in 1 | Gentle Baby Hair & Body Wash',
		meta_description:
			'Dr.Rashel Shampoo & Bath Bubble 2 in 1 — mild, tear‑free formula for gentle baby cleansing. Works as both shampoo and bath wash. Softens, hydrates & refreshes.',
		base_price: '710',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'Dr.Rashel Shampoo & Bath Bubble 2 in 1',
				slug: 'dr-rashel-shampoo-and-bath-bubble-2-in-1',
				excerpt:
					'Dr.Rashel Shampoo & Bath Bubble 2 in 1 — a gentle dual‑action formula that cleanses hair and body while leaving the baby’s skin soft, refreshed, and nourished.',
				description:
					'Dr.Rashel Shampoo & Bath Bubble 2 in 1 is designed to give babies a soothing and enjoyable bath experience. This dual‑purpose formula works as both a mild shampoo and a gentle bath wash, making it perfect for quick, convenient, and effective cleansing. Enriched with skin‑friendly ingredients, it cleans without stripping natural moisture and helps maintain softness and hydration. The tear‑free formula ensures a comfortable bath time without eye irritation, while its subtle fragrance leaves your baby feeling fresh. Suitable for daily use on newborns and babies with sensitive skin.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100044',
		meta_title:
			'Nexton Baby Diaper Care Cream 75ml | Protective & Soothing Rash Cream',
		meta_description:
			'Nexton Baby Diaper Care Cream 75ml — gentle, protective formula that helps prevent diaper rash and keeps baby skin soft and healthy. Safe for newborns.',
		base_price: '325',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'Nexton baby diaper care cream 75ml',
				slug: 'nexton-baby-diaper-care-cream-75ml',
				excerpt:
					'Nexton Baby Diaper Care Cream 75ml — a protective, soothing cream formulated to prevent diaper rash and keep your baby’s skin soft, calm, and healthy.',
				description:
					'Nexton Baby Diaper Care Cream 75ml is specially designed to protect your baby’s delicate skin from irritation caused by wetness and friction. Enriched with gentle moisturizing ingredients, it forms a protective barrier that helps prevent diaper rash while soothing existing redness. The lightweight, non‑sticky texture absorbs easily, providing lasting comfort without clogging pores. Dermatologically tested and free from harsh chemicals, it is safe for newborns and suitable for daily diaper‑change routines.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100043',
		meta_title:
			'Nexton Baby Diaper Care Cream 150ml | Protective & Gentle Rash Barrier Cream',
		meta_description:
			'Nexton Baby Diaper Care Cream 150ml — gentle, protective cream that prevents diaper rash and soothes baby skin. Safe for newborns and ideal for daily use.',
		base_price: '565',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'Nexton baby diaper care cream 150ml',
				slug: 'nexton-baby-diaper-care-cream-150ml',
				excerpt:
					'Nexton Baby Diaper Care Cream 150ml — a gentle, protective cream formulated to prevent diaper rash and keep your baby’s skin soft, soothed, and healthy.',
				description:
					'Nexton Baby Diaper Care Cream 150ml is designed to protect delicate baby skin from irritation caused by moisture, friction, and long diaper use. Its soothing formula creates a protective barrier that helps prevent diaper rash, redness, and discomfort. The cream absorbs quickly without leaving a greasy layer, keeping the baby’s skin dry, fresh, and nourished. Enriched with skin‑calming ingredients, it is suitable for newborns and babies with sensitive skin. Dermatologically tested and free from harsh chemicals, making it ideal for daily diaper‑change routines.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100029',
		meta_title:
			'Dr.Rashel Moisturizing Cream Yellow | Deep Hydration & Soft Skin Care',
		meta_description:
			'Dr.Rashel Moisturizing Cream Yellow — lightweight, nourishing cream that hydrates and softens skin. Non‑greasy, fast‑absorbing, and suitable for all skin types.',
		base_price: '580',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'DR.RASHEL MOISTURIZING CREAM YELLOW',
				slug: 'dr-rashel-moisturizing-cream-yellow',
				excerpt:
					'Dr.Rashel Moisturizing Cream Yellow — a nourishing, lightweight cream designed to hydrate, soften, and protect the skin with long‑lasting moisture.',
				description:
					'Dr.Rashel Moisturizing Cream Yellow is formulated to deeply hydrate and nourish the skin, keeping it soft, smooth, and naturally glowing. Its lightweight, non‑greasy texture absorbs easily, providing instant moisture without clogging pores. Enriched with skin‑friendly ingredients, this cream helps maintain the skin’s natural balance while preventing dryness and roughness. Ideal for everyday use on face and body, it leaves the skin feeling fresh, moisturized, and comfortable throughout the day. Dermatologically safe and suitable for all skin types.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100004',
		meta_title:
			'Dr.Rashel Moisturizing Cream Pink | Softening & Deep Hydration Cream',
		meta_description:
			'Dr.Rashel Moisturizing Cream Pink — lightweight, deeply hydrating cream for smooth and refreshed skin. Non‑greasy and suitable for all skin types.',
		base_price: '580',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'Dr.Rashel Moisturizing Cream Pink',
				slug: 'dr-rashel-moisturizing-cream-pink',
				excerpt:
					'Dr.Rashel Moisturizing Cream Pink — a soft, hydrating cream that nourishes the skin, leaving it smooth, fresh, and naturally radiant.',
				description:
					'Dr.Rashel Moisturizing Cream Pink is formulated to deliver deep hydration while maintaining a lightweight, comfortable feel on the skin. It absorbs quickly, leaving no greasy residue, and helps restore the skin’s natural moisture barrier. Enriched with gentle skin‑loving ingredients, it keeps the skin soft, supple, and protected from dryness. Suitable for everyday use on all skin types, this cream provides long‑lasting freshness and smoothness. Perfect for face and body care, and ideal for daily moisturizing routines.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100001',
		meta_title:
			'Dr.Rashel Moisturizing Cream Blue | Cooling & Deep Hydration Skincare',
		meta_description:
			'Dr.Rashel Moisturizing Cream Blue — lightweight, hydrating cream that refreshes and softens the skin. Non‑greasy and suitable for all skin types.',
		base_price: '580',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'DR.RASHEL MOISTURIZING CREAM BLUE',
				slug: 'dr-rashel-moisturizing-cream-blue',
				excerpt:
					'Dr.Rashel Moisturizing Cream Blue — a refreshing, hydrating cream designed to soothe, moisturize, and protect the skin with long‑lasting softness.',
				description:
					'Dr.Rashel Moisturizing Cream Blue is formulated to deliver deep moisture while giving the skin a fresh, cooling feel. Its lightweight, non‑sticky texture absorbs quickly, making it perfect for everyday use on both face and body. Enriched with gentle nourishing ingredients, it helps restore the skin’s natural moisture barrier, prevents dryness, and leaves the skin soft, smooth, and refreshed. Suitable for all skin types and safe for daily use, this cream maintains hydration and comfort throughout the day without clogging pores.  ✅ Slug',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100031',
		meta_title:
			'Dr.Rashel Baby Diaper Rash Cream | Protective & Soothing Baby Skin Care',
		meta_description:
			'Dr.Rashel Baby Diaper Rash Cream — gentle formula that protects, soothes, and heals diaper rash. Safe for newborns and perfect for daily use.',
		base_price: '625',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'Dr.Rashel Baby Diaper Rash Cream',
				slug: 'dr-rashel-baby-diaper-rash-cream',
				excerpt:
					'Dr.Rashel Baby Diaper Rash Cream — a soothing, protective cream that helps prevent and relieve diaper rash while keeping baby’s skin soft and healthy.',
				description:
					'Dr.Rashel Baby Diaper Rash Cream is specially formulated to protect delicate baby skin from irritation caused by wetness, friction, and long diaper wear. Its gentle, skin‑calming formula forms a protective barrier that shields the skin while helping soothe redness, inflammation, and discomfort. Enriched with moisturizing and healing ingredients, it keeps the skin soft, nourished, and dry. The cream absorbs easily, is non‑sticky, and safe for everyday diaper‑change routines. Dermatologically tested and suitable for newborns and sensitive baby skin.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100008',
		meta_title:
			'Nexton Baby Cologne Secret Love 80ml | Gentle & Long‑Lasting Baby Fragrance',
		meta_description:
			'Buy Nexton Baby Cologne Secret Love 80ml — a soft, gentle, long‑lasting fragrance safe for delicate baby skin. Perfect for daily freshness.',
		base_price: '433',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'NEXTON BABY COLOGNE SECRET LOVE 80ML',
				slug: 'nexton-baby-cologne-secret-love-80ml',
				excerpt:
					'Nexton Baby Cologne Secret Love 80ml — a soft, refreshing fragrance specially made for babies, keeping them fresh, clean, and pleasantly scented all day.',
				description:
					'Nexton Baby Cologne Secret Love 80ml is a gentle and refreshing fragrance crafted to keep your baby smelling clean and sweet throughout the day. Its mild formula is skin‑friendly, making it suitable for babies’ delicate and sensitive skin. The soft, long‑lasting scent adds freshness after a bath, before going out, or anytime you want your baby to feel extra fresh. This cologne is alcohol‑safe, dermatologically tested, and perfect for daily use.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100007',
		meta_title:
			'Nexton Baby Cologne Pure Love 80ml | Gentle & Long‑Lasting Baby Fragrance',
		meta_description:
			'Nexton Baby Cologne Pure Love 80ml — a mild, safe, long‑lasting baby fragrance designed for daily freshness and suitable for delicate skin.',
		base_price: '433',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'NEXTON BABY COLOGNE PURE LOVE 80ML',
				slug: 'nexton-baby-cologne-pure-love-80ml',
				excerpt:
					'Nexton Baby Cologne Pure Love 80ml — a soft, comforting baby fragrance designed to keep your little one fresh, clean, and pleasantly scented all day.',
				description:
					'Nexton Baby Cologne Pure Love 80ml offers a gentle, refreshing scent specially formulated for delicate baby skin. Its mild and soothing fragrance provides long‑lasting freshness without causing irritation. Perfect for daily use, this cologne adds a soft, pleasant aroma after bath time, before outings, or anytime your baby needs an extra touch of freshness. The formula is alcohol‑safe, dermatologically tested, and suitable for even the most sensitive skin types.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100063',
		meta_title:
			'Farlin Baby Feeding Bottle Wash 700ml | Safe & Effective Bottle Cleaner',
		meta_description:
			'Farlin Baby Feeding Bottle Wash 700ml — gentle, plant‑based formula that removes milk residue and grease safely from baby bottles and feeding accessories.',
		base_price: '1200',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'FARLIN BABY FEEDING BOTTLE WASH 700ML',
				slug: 'farlin-baby-feeding-bottle-wash-700ml',
				excerpt:
					'Farlin Baby Feeding Bottle Wash 700ml — a powerful yet gentle cleanser designed to safely remove milk residue, grease, and odors from baby bottles and feeding accessories.',
				description:
					'Farlin Baby Feeding Bottle Wash 700ml is specially formulated to ensure thorough and safe cleaning of baby bottles, nipples, sippers, and other feeding items. Its mild, plant‑based formula effectively removes milk stains, grease, and harmful residues without leaving any fragrance or chemical traces behind. This bottle wash creates a rich lather that cleans deeply while remaining gentle on the skin. It is free from harsh chemicals, making it completely safe for newborn feeding items. Ideal for daily use to maintain the highest hygiene standards for your baby’s feeding routine.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100064',
		meta_title:
			'Farlin Baby Feeding Bottle Wash 500ml | Safe & Gentle Bottle Cleaner',
		meta_description:
			'Farlin Baby Feeding Bottle Wash 500ml — plant‑based, gentle formula that removes milk residue and grease safely from baby bottles and feeding accessories.',
		base_price: '970',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'Farlin baby feeding bottle wash 500ML',
				slug: 'farlin-baby-feeding-bottle-wash-500ml',
				excerpt:
					'Farlin Baby Feeding Bottle Wash 500ml — a gentle, plant‑based cleanser designed to effectively remove milk residue, grease, and odors from baby bottles and feeding accessories.',
				description:
					'Farlin Baby Feeding Bottle Wash 500ml is specially formulated for safe and thorough cleaning of baby bottles, nipples, sippers, pacifiers, and feeding utensils. Its mild, biodegradable formula removes tough milk stains and grease without leaving any harmful chemical traces. The wash produces a rich, foamy lather that cleans deeply while remaining gentle on hands. Free from artificial colors, strong fragrances, and harsh chemicals, making it safe for newborn feeding essentials. Ideal for everyday use to maintain hygiene and protect your baby’s health.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100149',
		meta_title: 'U Teether Car Yellow | Soft & Safe Baby Teething Toy',
		meta_description:
			'Buy U Teether Car Yellow — BPA‑free, soft, and baby‑safe teething toy with textured comfort and easy‑to‑hold car design.',
		base_price: '85',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'U TEETHER CAR YELLOW',
				slug: 'u-teether-car-yellow',
				excerpt:
					'U Teether Car Yellow — a soft, baby‑safe teether designed to soothe sore gums with a fun, easy‑to‑hold car shape.',
				description:
					'The U Teether Car Yellow is a gentle and effective teething toy crafted to provide comfort during your baby’s teething stage. Made from high‑quality, BPA‑free material, it is completely safe for daily chewing. The cute car design fits perfectly in small hands, helping babies grasp and hold it easily. Its textured surface offers soothing gum relief while supporting sensory development. The bright yellow color keeps babies engaged and visually stimulated. Simple to wash and ideal for everyday use.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100148',
		meta_title: 'U Teether Car Blue | Safe & Soft Baby Teething Toy',
		meta_description:
			'U Teether Car Blue — BPA‑free, soft, textured baby teether with an easy‑to‑hold car design. Perfect for soothing sore gums safely.',
		base_price: '85',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'U TEETHER CAR BLUE',
				slug: 'u-teether-car-blue',
				excerpt:
					'U Teether Car Blue — a soft, safe baby teether designed to soothe sore gums with an easy‑to‑hold car‑shaped design.',
				description:
					'The U Teether Car Blue is a gentle, baby‑friendly teething toy made to comfort infants during the teething stage. Crafted from BPA‑free, non‑toxic material, it is completely safe for babies to chew on daily. The playful car shape helps little hands grip it easily, improving hand‑eye coordination. Its textured surface massages the gums, providing soothing relief while supporting sensory development. The bright blue color makes it visually appealing and engaging for babies. Easy to wash and durable for everyday use.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100139',
		meta_title:
			'Teether Strawberry Red – Hercules Bear | Soft & Safe Baby Teething Toy',
		meta_description:
			'Hercules Bear Strawberry Red Teether — BPA‑free, textured, strawberry‑shaped teething toy designed to soothe sore baby gums safely.',
		base_price: '250',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'TEETHER STRAWBERRY RED HERCULES BEAR',
				slug: 'teether-strawberry-red-hercules-bear',
				excerpt: 'TEETHER STRAWBERRY RED HERCULES BEAR',
				description:
					'The Teether Strawberry Red by Hercules Bear is a gentle, baby‑safe teething toy crafted to comfort babies during the teething phase. Made from high‑quality, BPA‑free material, it is completely safe for daily chewing and helps relieve gum discomfort. Its cute strawberry shape and lightweight design make it easy for small hands to hold, improving grip and hand‑eye coordination. The textured surface provides soothing massage to gums while stimulating sensory development. Bright red color makes it visually appealing and engaging for babies. Easy to wash and suitable for everyday use.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100140',
		meta_title:
			'Teether Strawberry Pink – Hercules Bear | Soft & Safe Baby Teething Toy',
		meta_description:
			'Hercules Bear Strawberry Pink Teether — BPA‑free, textured strawberry‑shaped teething toy designed to safely soothe sore baby gums.',
		base_price: '250',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'TEETHER STRAWBERRY PINK HERCULES BEAR',
				slug: 'teether-strawberry-pink-hercules-bear',
				excerpt:
					'Hercules Bear Strawberry Pink Teether — a soft, baby‑safe strawberry‑shaped teether designed to gently soothe sore gums and support sensory growth.',
				description:
					'The Teether Strawberry Pink by Hercules Bear is a gentle, BPA‑free teething toy made to comfort babies during the teething stage. Its soft, chew‑friendly material helps relieve gum discomfort while staying completely safe for daily use. The adorable strawberry shape is lightweight and easy for small hands to hold, supporting grip and early motor development. A textured surface provides soothing gum massage and encourages sensory stimulation. The bright pink color keeps babies visually engaged. Easy to wash, durable, and perfect for everyday use.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100138',
		meta_title: 'Teether Owl Pink Flower Baby | Soft & Safe Baby Teether',
		meta_description:
			'Owl Pink Flower Baby Teether — BPA‑free, soft, textured teether designed to soothe sore gums with a cute owl and flower design.',
		base_price: '230',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'TEETHER OWL PINK FLOWER BABY',
				slug: 'teether-owl-pink-flower-baby',
				excerpt:
					'Owl Pink Flower Baby Teether — a soft, baby‑safe owl‑shaped teether with a cute flower design, made to soothe sore gums gently.',
				description:
					'The Teether Owl Pink Flower Baby is a soft, BPA‑free teething toy designed to comfort babies during the teething stage. Its adorable owl shape with a flower detail makes it fun and easy for little hands to hold. The chew‑friendly, safe material helps relieve gum discomfort, while the textured surface supports sensory development. Lightweight, durable, and easy to clean — perfect for daily teething relief. The bright pink color keeps babies visually engaged and happy while chewing.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100137',
		meta_title:
			'Teether Koala Blue Flower Baby | Soft & Safe Baby Teething Toy',
		meta_description:
			'Koala Blue Flower Baby Teether — BPA‑free, soft, textured koala‑shaped teether designed to safely soothe sore baby gums.',
		base_price: '230',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'TEETHER KOALA BLUE FLOWER BABY',
				slug: 'teether-koala-blue-flower-baby',
				excerpt:
					'Koala Blue Flower Baby Teether — a soft, baby‑safe koala‑shaped teether with a cute flower design, made to gently soothe sore gums.',
				description:
					'The Teether Koala Blue Flower Baby is a gentle, BPA‑free teething toy designed to comfort infants during the teething stage. Its adorable koala shape with a small flower detail makes it fun, attractive, and extremely easy for little hands to grip. Made from soft, chew‑friendly material, it helps soothe sore gums while the textured areas provide added sensory stimulation. Lightweight, durable, and simple to wash, this teether is perfect for daily use. The bright blue color keeps babies engaged and visually stimulated.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100136',
		meta_title:
			'Teether Elephant Baby Pink Flower | Soft & Safe Baby Teething Toy',
		meta_description:
			'Elephant Baby Pink Flower Teether — BPA‑free, textured elephant‑shaped teether designed to safely soothe sore baby gums.',
		base_price: '230',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'TEETHER ELEPHANT BABY PINK FLOWER BABY',
				slug: 'teether-elephant-baby-pink-flower-baby',
				excerpt:
					'Elephant Baby Pink Flower Teether — a soft, baby‑safe elephant‑shaped teether with a cute flower design made to gently soothe sore gums.',
				description:
					'The Teether Elephant Baby Pink Flower is a BPA‑free, gentle teething toy designed to comfort babies during the teething phase. Its adorable elephant shape with a small flower detail makes it fun, attractive, and easy for little hands to hold securely. Crafted from soft, chew‑friendly material, it helps relieve gum discomfort while the textured surface encourages sensory development. Lightweight, durable, and easy to clean — ideal for everyday use. The bright pink color keeps babies visually engaged and happy while chewing.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100141',
		meta_title:
			'Teether Duck Cyan – Hercules Bear | Soft & Safe Baby Teething Toy',
		meta_description:
			'Hercules Bear Duck Cyan Teether — BPA‑free, textured duck‑shaped teething toy designed to safely soothe sore baby gums.',
		base_price: '250',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'TEETHER DUCK CYAN HERCULES BEAR',
				slug: 'teether-duck-cyan-hercules-bear',
				excerpt:
					'Hercules Bear Duck Cyan Teether — a soft, baby‑safe duck‑shaped teether designed to gently soothe sore gums and support early sensory development.',
				description:
					'The Teether Duck Cyan by Hercules Bear is a BPA‑free, gentle teething toy created to comfort babies during the teething stage. Its adorable duck shape makes it fun, attractive, and very easy for small hands to hold. Made from soft, chew‑friendly material, it helps relieve gum discomfort while the textured areas provide soothing massage and sensory stimulation. The bright cyan color keeps babies visually engaged and excited. Lightweight, durable, and simple to clean — perfect for everyday teething relief.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100134',
		meta_title:
			'Teether Dino Yellow Flower Baby | Soft & Safe Baby Teething Toy',
		meta_description:
			'Dino Yellow Flower Baby Teether — BPA‑free, textured dinosaur‑shaped teething toy designed to safely soothe sore baby gums.',
		base_price: '230',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'TEETHER DINO YELLOW FLOWER BABY',
				slug: 'teether-dino-yellow-flower-baby',
				excerpt:
					'Dino Yellow Flower Baby Teether — a soft, baby‑safe dinosaur‑shaped teether with a cute flower design, made to gently soothe sore gums.',
				description:
					'The Teether Dino Yellow Flower Baby is a BPA‑free, gentle teething toy designed to comfort babies during the teething stage. Its adorable dinosaur shape with a flower detail makes it fun, eye‑catching, and easy for small hands to hold securely. Crafted from soft, chew‑friendly, non‑toxic material, it helps relieve gum soreness while the textured areas stimulate sensory development. The bright yellow color keeps babies visually engaged, making teething time more enjoyable. Lightweight, durable, and easy to clean — perfect for everyday teething relief.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100135',
		meta_title:
			'Teether Dino Purple Flower Baby | Soft & Safe Baby Teething Toy',
		meta_description:
			'Dino Purple Flower Baby Teether — BPA‑free, textured purple dinosaur teething toy designed to safely soothe sore baby gums.',
		base_price: '230',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'TEETHER DINO PURPLE FLOWER BABY',
				slug: 'teether-dino-purple-flower-baby',
				excerpt:
					'Dino Purple Flower Baby Teether — a soft, baby‑safe dinosaur‑shaped teether with a cute flower design, specially made to soothe sore gums gently.',
				description:
					'The Teether Dino Purple Flower Baby is a BPA‑free, gentle teething toy designed to comfort babies during the teething stage. Its adorable purple dinosaur shape with a small flower detail makes it fun, attractive, and easy for infants to hold securely. Made from soft, chew‑friendly material, it helps relieve gum discomfort, while textured areas stimulate sensory development. The bright purple color keeps babies visually engaged and entertained. Lightweight, durable, and easy to clean — perfect for everyday teething relief.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100128',
		meta_title:
			'Mittens Teether Silicone Orange – Only Baby | Safe Silicone Teething Toy',
		meta_description:
			'Only Baby Mittens Silicone Orange Teether — BPA‑free, soft silicone mitten‑shaped teether designed to soothe sore baby gums safely.',
		base_price: '220',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'MITTENS TEETHER SILICONE ORANGE ONLY BABY',
				slug: 'mittens-teether-silicone-orange-only-baby',
				excerpt:
					'Mittens Silicone Orange Teether — a soft, baby‑safe silicone teether shaped like mittens, designed to gently soothe sore gums.',
				description:
					'The Mittens Teether Silicone Orange by Only Baby is a BPA‑free, gentle teething toy made from premium soft silicone. Its cute mitten shape is easy for little hands to grip and chew safely. The flexible, chew‑friendly material helps relieve gum discomfort, while the textured surface supports sensory and oral development. The bright orange color stimulates visual interest, keeping babies engaged. Lightweight, durable, and easy to clean — perfect for everyday teething relief.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100129',
		meta_title:
			'Mittens Teether Silicone Light Green – Only Baby | Safe Silicone Baby Teether',
		meta_description:
			'Only Baby Mittens Silicone Light Green Teether — BPA‑free, soft silicone teether shaped like mittens to soothe sore baby gums safely.',
		base_price: '220',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'MITTENS TEETHER SILICONE LIGHT GREEN ONLY BABY',
				slug: 'mittens-teether-silicone-light-green-only-baby',
				excerpt:
					'Mittens Silicone Light Green Teether — a soft, baby‑safe silicone mitten‑shaped teether designed to gently soothe sore gums.',
				description:
					'The Mittens Teether Silicone Light Green by Only Baby is a BPA‑free, flexible silicone teething toy made to comfort babies during teething. Its adorable mitten shape is easy for small hands to hold, grip, and chew safely. The soft, chew‑friendly material helps reduce gum discomfort, while the textured surfaces support sensory development and oral stimulation. Its light green color is calming and visually appealing for babies. Lightweight, durable, and easy to clean — ideal for everyday teething comfort.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100126',
		meta_title:
			'Mittens Teether Silicone Green – Only Baby | Safe Silicone Baby Teether',
		meta_description:
			'Only Baby Mittens Silicone Green Teether — BPA‑free soft silicone mitten‑shaped teether designed to safely soothe sore baby gums.',
		base_price: '220',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'MITTENS TEETHER SILICONE GREEN ONLY BABY',
				slug: 'mittens-teether-silicone-green-only-baby',
				excerpt:
					'Mittens Silicone Green Teether — a soft, baby‑safe silicone mitten‑shaped teether designed to gently soothe sore gums.',
				description:
					'The Mittens Teether Silicone Green by Only Baby is a BPA‑free, flexible silicone teething toy specially designed to comfort babies during their teething phase. Its cute mitten‑shaped design is easy for infants to grip and chew safely. Made from soft, chew‑friendly silicone, it helps soothe irritated gums while the textured surface supports sensory and oral development. The bright green color keeps babies visually engaged and interested. Lightweight, durable, and simple to wash — perfect for daily teething relief.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100127',
		meta_title:
			'Mittens Teether Silicone Baby Pink – Only Baby | Safe Silicone Baby Teether',
		meta_description:
			'Only Baby Mittens Silicone Baby Pink Teether — BPA‑free soft silicone mitten‑shaped teether designed to safely soothe sore baby gums.',
		base_price: '220',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'MITTENS TEETHER SILICONE BABY PINK ONLY BABY',
				slug: 'mittens-teether-silicone-baby-pink-only-baby',
				excerpt:
					'Mittens Silicone Baby Pink Teether — a soft, baby‑safe silicone mitten‑shaped teether designed to gently soothe sore gums.',
				description:
					'The Mittens Teether Silicone Baby Pink by Only Baby is a BPA‑free, flexible silicone teething toy created to comfort babies during the teething stage. Its adorable mitten shape is easy for infants to grip and chew safely. Made from soft, chew‑friendly silicone, it helps relieve gum irritation while the textured surface supports sensory and oral development. The gentle baby‑pink color is calming and visually appealing for little ones. Lightweight, durable, and easy to wash — perfect for everyday teething relief.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100133',
		meta_title: 'Baby Bell Teether Ring | Soft & Safe Baby Teething Toy',
		meta_description:
			'Baby Bell Teether Ring — BPA‑free teething toy with gentle bell sound and textured surfaces to safely soothe sore baby gums.',
		base_price: '135',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY BELL TEETHER RING',
				slug: 'baby-bell-teether-ring',
				excerpt:
					'Baby Bell Teether Ring — a soft, baby‑safe teether with a gentle bell sound designed to soothe gums and engage infants.',
				description:
					'The Baby Bell Teether Ring is a BPA‑free teething toy created to comfort babies during the teething stage. Its circular ring shape is easy for small hands to grip, while the soft material is perfect for safe chewing. A gentle built‑in bell adds sensory stimulation, helping babies stay engaged and entertained. The textured surfaces provide soothing relief to sore gums and encourage oral development. Lightweight, durable, and easy to clean — ideal for everyday teething comfort and playful interaction.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100144',
		meta_title:
			'Feeder Brush Silicone Yellow | Soft & Safe Bottle Cleaning Brush',
		meta_description:
			'Silicone Feeder Brush Yellow — BPA‑free, flexible silicone cleaning brush designed to safely and thoroughly clean baby bottles and nipples.',
		base_price: '350',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'FEEDER BRUSH SILICONE YELLOW',
				slug: 'feeder-brush-silicone-yellow',
				excerpt:
					'Silicone Feeder Brush Yellow — a flexible, baby‑safe silicone brush designed for gentle and effective bottle cleaning.',
				description:
					'The Feeder Brush Silicone Yellow is a high‑quality, BPA‑free bottle‑cleaning brush made from soft and flexible silicone. It is designed to clean baby feeders, nipples, and wide‑neck bottles without scratching or damaging surfaces. The durable silicone bristles remove milk residue easily while resisting bacteria buildup. Its bright yellow color makes it easy to spot, and the non‑slip handle ensures a steady, comfortable grip during cleaning. Easy to wash, long‑lasting, and safe — the perfect tool for maintaining baby feeder hygiene.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100142',
		meta_title:
			'Feeder Brush Silicone Skin | Soft & Safe Silicone Bottle Cleaning Brush',
		meta_description:
			'Silicone Feeder Brush Skin — BPA‑free silicone bottle brush with flexible, scratch‑free bristles for safe and hygienic cleaning.',
		base_price: '350',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'FEEDER BRUSH SILICONE SKIN',
				slug: 'feeder-brush-silicone-skin',
				excerpt:
					'Silicone Feeder Brush Skin — a soft, flexible silicone bottle‑cleaning brush designed for scratch‑free and hygienic cleaning.',
				description:
					'The Feeder Brush Silicone Skin is a BPA‑free, high‑quality cleaning brush made with durable and flexible silicone bristles. Perfect for cleaning baby feeders, nipples, and wide‑neck bottles, it removes residue effectively without scratching delicate surfaces. The soft silicone material resists bacterial buildup and is easy to wash and sanitize. Its neutral skin‑tone color gives it a clean, minimal look, while the ergonomic handle ensures a comfortable non‑slip grip. Long‑lasting, hygienic, and gentle — a must‑have tool for maintaining bottle cleanliness.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100143',
		meta_title:
			'Feeder Brush Silicone Purple | Soft & Hygienic Bottle Cleaning Brush',
		meta_description:
			'Silicone Feeder Brush Purple — BPA‑free silicone bristle brush designed for hygienic, scratch‑free cleaning of baby bottles and nipples.',
		base_price: '350',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'FEEDER BRUSH SILICONE PURPLE',
				slug: 'feeder-brush-silicone-purple',
				excerpt:
					'Silicone Feeder Brush Purple — a flexible, soft silicone cleaning brush designed for safe and scratch‑free bottle cleaning.',
				description:
					'The Feeder Brush Silicone Purple is a BPA‑free, durable bottle‑cleaning brush made with flexible silicone bristles for gentle yet effective cleaning. It easily reaches inside feeders, nipples, and wide‑neck bottles to remove milk residue without scratching the surfaces. The silicone material resists bacterial buildup, ensuring hygienic cleaning every time. Its vibrant purple color adds a fun touch, while the ergonomic non‑slip handle offers a steady and comfortable grip. Easy to wash, long‑lasting, and safe — perfect for keeping baby feeding accessories spotless.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100145',
		meta_title:
			'Feeder Brush Silicone Green | Soft & Hygienic Bottle Cleaning Brush',
		meta_description:
			'Silicone Feeder Brush Green — BPA‑free silicone bottle brush with flexible, scratch‑free bristles for safe and hygienic baby bottle cleaning.',
		base_price: '350',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'FEEDER BRUSH SILICONE GREEN',
				slug: 'feeder-brush-silicone-green',
				excerpt:
					'Silicone Feeder Brush Green — a flexible, soft silicone bottle‑cleaning brush designed for hygienic and scratch‑free cleaning.',
				description:
					'The Feeder Brush Silicone Green is a BPA‑free, high‑quality cleaning brush made with durable and flexible silicone bristles. It is ideal for cleaning baby feeders, nipples, and wide‑neck bottles without causing scratches or damage. The silicone bristles remove milk residue effectively while resisting bacteria buildup, ensuring hygienic cleaning. Its bright green color makes it easy to spot in your kitchen, and the ergonomic non‑slip handle provides a comfortable grip. Easy to wash, long‑lasting, and safe — perfect for maintaining proper bottle hygiene.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100146',
		meta_title:
			'Baby Silicone Bottle Brush Orange – Smart Baby | Soft & Hygienic Bottle Cleaning Brush',
		meta_description:
			'Smart Baby Silicone Bottle Brush Orange — BPA‑free silicone bristle brush designed for hygienic, scratch‑free cleaning of baby bottles and nipples.',
		base_price: '375',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY SILICONE BOTTLE BRUSH ORANGE SMART BABY',
				slug: 'baby-silicone-bottle-brush-orange-smart-baby',
				excerpt:
					'Smart Baby Silicone Bottle Brush Orange — a flexible, soft silicone brush designed for safe, scratch‑free and hygienic bottle cleaning.',
				description:
					'The Baby Silicone Bottle Brush Orange by Smart Baby is a BPA‑free, premium bottle‑cleaning brush made from soft and flexible silicone bristles. It easily reaches inside feeders, nipples, and wide‑neck bottles, removing milk residue without scratching surfaces. The silicone material is hygienic, resists bacterial buildup, and dries quickly, making it safer than traditional sponge brushes. Its bright orange color gives it a clean, vibrant look, and the ergonomic non‑slip handle offers a firm, comfortable grip. Durable, long‑lasting, and easy to wash — the perfect tool for maintaining baby bottle hygiene.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100147',
		meta_title:
			'Baby Silicone Bottle Brush Green – Smart Baby | Hygienic Silicone Bottle Cleaning Brush',
		meta_description:
			'Smart Baby Silicone Bottle Brush Green — BPA‑free silicone bristle brush for hygienic, scratch‑free cleaning of baby bottles and nipples.',
		base_price: '375',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY SILICONE BOTTLE BRUSH GREEN SMART BABY',
				slug: 'baby-silicone-bottle-brush-green-smart-baby',
				excerpt:
					'Smart Baby Silicone Bottle Brush Green — a soft, flexible silicone brush designed for safe, hygienic, and scratch‑free bottle cleaning.',
				description:
					'The Baby Silicone Bottle Brush Green by Smart Baby is made from BPA‑free, high‑quality silicone bristles that provide gentle yet effective cleaning. It reaches deep inside feeders, nipples, and wide‑neck bottles, removing milk residue without scratching delicate surfaces. Silicone dries quickly, resists bacteria, and lasts longer than sponge brushes — making it a more hygienic choice for everyday use. The bright green color is easy to spot, and the ergonomic non‑slip handle ensures a secure, comfortable grip while cleaning. Durable, safe, and easy to wash — ideal for keeping baby bottles perfectly clean.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100151',
		meta_title:
			'Baby Brush Set 5pcs Yellow – Minitree | Safe Baby Grooming Kit',
		meta_description:
			'Minitree Baby Brush Set 5pcs Yellow — a complete, safe and gentle 5‑piece grooming kit for newborns and infants.',
		base_price: '295',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY BRUSH SET 5PCS YELLOW MINITREE',
				slug: 'baby-brush-set-5pcs-yellow-minitree',
				excerpt:
					'Minitree Baby Brush Set 5pcs Yellow — a complete grooming kit designed for gentle, safe, and everyday baby care.',
				description:
					'The Baby Brush Set 5pcs Yellow by Minitree is a soft and safe grooming kit designed especially for newborns and infants. This 5‑piece set includes essential baby‑care tools such as a soft‑bristle brush, baby comb, nail clipper, nail file, and a mini scissor (or equivalent set depending on model). Each item is designed with rounded, baby‑friendly edges and a gentle finish to ensure safe grooming. The bright yellow color gives the set a cheerful look, and all tools are lightweight and easy to handle. Perfect for daily baby care routines — safe, durable, and convenient for both home use and travel.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100152',
		meta_title:
			'Baby Brush Set 5pcs Pink – Minitree | Gentle Baby Grooming Kit',
		meta_description:
			'Minitree Baby Brush Set 5pcs Pink — a soft, safe and complete 5‑piece baby grooming kit ideal for newborns and infants.',
		base_price: '295',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY BRUSH SET 5PCS PINK MINITREE',
				slug: 'baby-brush-set-5pcs-pink-minitree',
				excerpt:
					'Minitree Baby Brush Set 5pcs Pink — a gentle and complete grooming kit designed for newborn and infant daily care.',
				description:
					'The Baby Brush Set 5pcs Pink by Minitree is a soft, baby‑friendly grooming kit made for safe everyday use. This 5‑piece set typically includes a soft‑bristle baby brush, a smooth‑tooth comb, nail clipper, nail file, and baby safety scissors (or equivalent items depending on model). All pieces are made with rounded, gentle edges to protect delicate skin. The cute pink color gives the set a sweet look, and each tool is lightweight, durable, and easy to handle. Perfect for newborn grooming, travel use, or gifting — safe, practical, and reliable.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100150',
		meta_title:
			'Baby Brush Set 5pcs Blue – Minitree | Safe & Gentle Baby Grooming Kit',
		meta_description:
			'Minitree Baby Brush Set 5pcs Blue — a gentle, safe and complete 5‑piece grooming kit for newborns and infants.',
		base_price: '295',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY BRUSH SET 5PCS BLUE MINITREE',
				slug: 'baby-brush-set-5pcs-blue-minitree',
				excerpt:
					'Minitree Baby Brush Set 5pcs Blue — a complete, gentle grooming kit designed for safe newborn and infant care.',
				description:
					'The Baby Brush Set 5pcs Blue by Minitree is a soft, baby‑friendly grooming kit created for daily newborn care. The set typically includes five essential tools: a soft‑bristle baby brush, smooth‑tooth comb, nail clipper, nail file, and baby‑safe scissors (or equivalent set). Each item is made with rounded, gentle edges to protect delicate baby skin and ensure safe grooming. The calm blue color gives the set a fresh, clean look, and all tools are lightweight, durable, and easy to hold. Perfect for at‑home care, travel, or gifting — safe, practical, and reliable for parents.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100122',
		meta_title:
			'Pack of 2 Soft Silicon Nipple Small – MAQ | BPA‑Free Baby Feeding Nipples',
		meta_description:
			'MAQ Soft Silicon Nipple Small (Pack of 2) — BPA‑free, gentle and flexible silicone nipples designed for newborn‑friendly, controlled‑flow feeding.',
		base_price: '85',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'PACK OF 2 SOFT SILICON NIPPLE SMALL MAQ',
				slug: 'pack-of-2-soft-silicon-nipple-small-maq',
				excerpt:
					'MAQ Soft Silicon Nipple Small (Pack of 2) — gentle, flexible and BPA‑free nipples designed for smooth baby feeding.',
				description:
					'The Pack of 2 Soft Silicon Nipple Small by MAQ is designed for comfortable and natural‑flow feeding. Made from BPA‑free, food‑grade silicone, these nipples are soft, flexible, and gentle on a baby’s gums. The small‑size flow is ideal for newborns and young babies, ensuring controlled milk intake and reducing choking or overfeeding. Each nipple fits most standard‑size baby bottles and is heat‑resistant, durable, and easy to clean. Perfect for parents looking for a safe, hygienic, and long‑lasting nipple option.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100123',
		meta_title:
			'Pack of 2 Soft Silicon Nipple Large – MAQ | BPA‑Free Fast‑Flow Nipples',
		meta_description:
			'MAQ Soft Silicon Nipple Large (Pack of 2) — BPA‑free, flexible silicone nipples designed for older babies needing faster milk flow.',
		base_price: '115',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'PACK OF 2 SOFT SILICON NIPPLE LARGE MAQ',
				slug: 'pack-of-2-soft-silicon-nipple-large-maq',
				excerpt:
					'MAQ Soft Silicon Nipple Large (Pack of 2) — durable, flexible, BPA‑free silicone nipples designed for faster milk flow.',
				description:
					'The Pack of 2 Soft Silicon Nipple Large by MAQ is made from BPA‑free, food‑grade silicone designed to provide a smooth and natural feeding experience. The large‑flow size is suitable for older babies who can comfortably handle a faster milk flow. These nipples are soft, flexible, and gentle on gums, offering a natural latch‑like feel. They fit most standard baby bottles, are heat‑resistant, and remain durable even after repeated sterilization. A safe, hygienic, and long‑lasting choice for efficient feeding.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100125',
		meta_title:
			'Baby Nipple Shield Silicon – Smart Baby | Soft & BPA‑Free Breastfeeding Shield',
		meta_description:
			'Smart Baby Silicone Nipple Shield — soft, flexible and BPA‑free shield designed to protect sensitive nipples and support comfortable breastfeeding.',
		base_price: '160',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY NIPPLE SHIELD SILICON SMART BABY',
				slug: 'baby-nipple-shield-silicon-smart-baby',
				excerpt:
					'Smart Baby Silicone Nipple Shield — soft, flexible, BPA‑free shield designed to protect sensitive nipples and support smooth breastfeeding.',
				description:
					'The Baby Nipple Shield Silicon by Smart Baby is made from high‑quality, BPA‑free silicone designed to help mothers breastfeed comfortably. Its soft, flexible material creates a gentle barrier that protects sore, cracked, or sensitive nipples while still allowing natural milk flow. The ergonomic shape ensures a secure fit and encourages proper latch, making feeding easier for both mother and baby. Transparent, lightweight, and easy to clean — this nipple shield is ideal for breastfeeding support and comfort. Perfect for moms who need temporary protection without interrupting natural feeding routines.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100124',
		meta_title: 'Breast Pump Plastic MAQ | Lightweight & Easy Manual Pump',
		meta_description:
			'Buy Breast Pump Plastic MAQ—lightweight, simple manual breast pump for gentle and convenient milk expression. Easy to use, clean, and carry.',
		base_price: '290',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BREAST PUMP PLASTIC MAQ',
				slug: 'breast-pump-plastic-maq',
				excerpt:
					'Breast Pump Plastic MAQ — a simple, lightweight manual pump designed for easy and comfortable milk expression.',
				description:
					'The Breast Pump Plastic MAQ is a convenient and affordable manual breast pump made for mothers who need an easy way to express and store milk. Its lightweight plastic design makes it easy to hold and use, while the soft suction creates a gentle pumping experience. Ideal for occasional use at home or on the go, it helps mothers maintain milk flow comfortably. Easy to clean, assemble, and carry, this pump is a practical choice for daily breastfeeding support.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100132',
		meta_title:
			'Baby Medicine Feeding Syringe White | Safe & Easy Medicine Feeder',
		meta_description:
			'Buy Baby Medicine Feeding Syringe White—safe, gentle, and accurate tool for giving liquid medicine to babies. Anti‑spill design and easy to clean.',
		base_price: '225',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY MEDICINE FEEDING SYRINGE WHITE',
				slug: 'baby-medicine-feeding-syringe-white',
				excerpt:
					'Baby Medicine Feeding Syringe White — an easy and safe tool to give medicine to babies without spills or discomfort.',
				description:
					"The Baby Medicine Feeding Syringe (White) is designed to help parents give liquid medicine to babies safely and comfortably. Its smooth, gentle tip ensures easy feeding without hurting the baby's mouth, while the clear measurement markings allow accurate dosing. The syringe-style design reduces spills and makes it easier for babies to swallow medicine calmly. Lightweight, reusable, and easy to clean, it’s a must‑have for every baby’s medicine kit.",
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100130',
		meta_title:
			'Baby Medicine Feeding Syringe Pink | Safe & Easy Baby Medicine Feeder',
		meta_description:
			'Buy Baby Medicine Feeding Syringe Pink — safe, gentle, and accurate tool for giving liquid medicine to babies. Soft tip, easy feeding, and spill‑free design.',
		base_price: '225',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY MEDICINE FEEDING SYRINGE PINK',
				slug: 'baby-medicine-feeding-syringe-pink',
				excerpt:
					'Baby Medicine Feeding Syringe Pink — an easy, safe, and mess‑free tool to help feed liquid medicine to infants with accurate dosage.',
				description:
					'The Baby Medicine Feeding Syringe Pink is designed to help parents give liquid medicines to babies safely and without spills. Made with soft, baby‑friendly materials, the syringe ensures gentle feeding while preventing choking or gagging. It features clear measurement markings for accurate dosing and a smooth plunger that makes feeding effortless. The pink silicone‑covered pacifier‑style tip helps deliver medicine comfortably and reduces mess during feeding time. Perfect for newborns and infants who struggle with taking medicine traditionally.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100131',
		meta_title:
			'Baby Medicine Feeding Syringe Blue | Safe & Easy Baby Medicine Feeder',
		meta_description:
			'Buy Baby Medicine Feeding Syringe Blue — gentle, soft‑tip syringe for accurate and mess‑free medicine feeding. Ideal for newborns and infants.',
		base_price: '225',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY MEDICINE FEEDING SYRINGE BLUE',
				slug: 'baby-medicine-feeding-syringe-blue',
				excerpt:
					'Baby Medicine Feeding Syringe Blue — a safe, soft‑tip syringe designed for easy, accurate, and mess‑free liquid medicine feeding for infants.',
				description:
					'The Baby Medicine Feeding Syringe Blue provides a simple and safe solution for giving liquid medication to infants. Designed with a soft, silicone‑covered pacifier‑style tip, it ensures a gentle and comfortable feeding experience while reducing the risk of spills or choking. Clear measurement markings allow accurate dosing, and the smooth‑glide plunger ensures controlled flow for easier feeding. Ideal for newborns and young infants who have difficulty taking medicine through spoons or cups. Easy to wash and durable for repeated use.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100157',
		meta_title:
			'Baby Pillow China Hippo Cat Pink | Soft & Comfortable Infant Pillow',
		meta_description:
			'Baby Pillow China Hippo Cat Pink — soft, breathable infant pillow with adorable hippo‑cat design, offering gentle comfort and support.',
		base_price: '565',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY PILLOW CHINA HIPPPO CAT PINK',
				slug: 'baby-pillow-china-hippo-cat-pink',
				excerpt:
					'Baby Pillow China Hippo Cat Pink — a soft, cute, and supportive infant pillow designed for comfortable head positioning.',
				description:
					'The Baby Pillow China Hippo Cat Pink is a soft and comfortable infant pillow featuring an adorable hippo‑cat themed design. Made with gentle, baby‑safe fabric, it provides light support to help maintain comfortable head positioning during sleep or rest time. The pillow is lightweight, breathable, and easy to carry — perfect for newborns and infants. Its bright pink color and cute cartoon design make it appealing for babies and ideal for gifting. Durable stitching and washable material ensure long‑lasting use and easy maintenance for parents.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100158',
		meta_title: 'Baby Pillow China Hippo Pink | Soft & Cute Infant Pillow',
		meta_description:
			'Baby Pillow China Hippo Pink — breathable, soft, and adorable infant pillow offering gentle head support for newborns and infants.',
		base_price: '595',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY PILLOW CHINA HIPPPO PINK',
				slug: 'baby-pillow-china-hippo-pink',
				excerpt:
					'Baby Pillow China Hippo Pink — a soft, lightweight, and cute infant pillow designed for gentle head suppo',
				description:
					'The Baby Pillow China Hippo Pink is a soft and comfortable infant pillow made with baby‑safe, breathable fabric. It features a cute hippo‑themed pink design that adds charm to your baby’s sleeping space. The pillow provides light head support, helping keep your baby comfortable during sleep or rest. It is lightweight, durable, and easy to wash — making it practical for everyday use. Perfect for newborns and infants, whether at home or while traveling.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100159',
		meta_title: 'Baby Pillow Bug Blue | Soft & Cute Infant Pillow',
		meta_description:
			'Baby Pillow Bug Blue — a soft, breathable and adorable bug‑themed infant pillow designed for gentle newborn and infant head support.',
		base_price: '850',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY PILLOW BUG BLUE',
				slug: 'baby-pillow-bug-blue',
				excerpt:
					'Baby Pillow Bug Blue — a soft, adorable, and breathable infant pillow designed for gentle head comfort.',
				description:
					'The Baby Pillow Bug Blue is a cute and comfortable infant pillow made with soft, baby‑safe fabric. Featuring a fun blue bug‑themed design, it brings color and charm to your baby’s resting space. The pillow provides light head support to help keep your little one comfortable during naps or tummy‑time. It is lightweight, breathable, and easy to carry, making it ideal for use at home or during travel. Durable stitching and washable material ensure long‑lasting use and hassle‑free cleaning.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100156',
		meta_title:
			'Baby Pillow China Bear Blue | Soft & Comfortable Infant Pillow',
		meta_description:
			'Baby Pillow China Bear Blue — soft, breathable infant pillow with a cute bear design, offering gentle head support for newborns and infants.',
		base_price: '565',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY PILLOW CHINA BEAR BLUE',
				slug: 'baby-pillow-china-bear-blue',
				excerpt:
					'Baby Pillow China Bear Blue — a soft, breathable, and cute infant pillow with an adorable bear design.',
				description:
					'The Baby Pillow China Bear Blue is a lightweight and comfortable infant pillow made from soft, baby‑safe fabric. Its adorable blue bear design makes it appealing for babies and adds a sweet touch to any crib or bedding setup. The pillow offers gentle head support, helping keep your baby comfortable during sleep, tummy‑time, or rest. It is breathable, easy to carry, and made with durable, washable materials — perfect for daily use at home or while traveling. A practical and charming choice for newborns and infants.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100155',
		meta_title: 'Baby Pillow rabbit Blue | Soft & Cute Infant Pillow',
		meta_description:
			'Baby Pillow  rabbit Blue — soft, breathable and adorable rabbit‑themed infant pillow offering gentle head support for newborns and infants.',
		base_price: '675',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY PILLOW rabbit BLUE',
				slug: 'baby-pillow-rabbit-blue',
				excerpt: 'BABY PILLOW rabbit BLUE',
				description:
					'The Baby Pillow Elephant Blue is crafted from soft, breathable, baby‑safe fabric that ensures gentle comfort for newborns and infants. Its charming blue elephant design adds a playful and soothing touch to your baby’s sleeping area. The pillow offers light head support, helping maintain comfort during naps, rest, or tummy‑time. Lightweight, washable, and easy to carry, it is perfect for everyday use at home or while traveling. Durable stitching ensures long-lasting use for growing babies.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100154',
		meta_title: 'Baby Pillow hen Pink | Soft & Cute Infant Pillow',
		meta_description:
			'Baby Pillow hen Pink — adorable pink hen‑themed pillow made from soft, breathable fabric for gentle newborn and infant comfort.',
		base_price: '675',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY PILLOW hen pink',
				slug: 'baby-pillow-hen-pink',
				excerpt:
					'Baby Pillow hen Pink — a soft, cute, and comfortable infant pillow featuring an adorable pink elephant design.',
				description:
					'The Baby Pillow Elephant Pink is made from soft, baby‑friendly, breathable fabric designed to keep newborns and infants comfortable. Its charming pink elephant design adds a sweet and playful touch to your baby’s nursery or bedding setup. The pillow provides gentle head support, making it ideal for naps, tummy‑time, or resting. It is lightweight, durable, and easy to wash — perfect for everyday use at home or while traveling. A cozy and stylish pillow that ensures comfort while adding a touch of cuteness.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100153',
		meta_title:
			'Baby Pillow Elephant Yellow | Soft & Adorable Infant Pillow',
		meta_description:
			'Baby Pillow Elephant Yellow — soft, breathable infant pillow with a cute yellow elephant design, providing gentle head support for newborns and infants.',
		base_price: '675',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY PILLOW ELEPHANT YELLOW',
				slug: 'baby-pillow-elephant-yellow',
				excerpt:
					'Baby Pillow Elephant Yellow — a soft, bright, and adorable infant pillow with a cute yellow elephant design.',
				description:
					'The Baby Pillow Elephant Yellow is crafted from soft, breathable, and baby‑safe fabric to keep infants comfortable during rest or sleep. Its cheerful yellow elephant design adds a fun and lively touch to any baby nursery or bedding setup. The pillow provides gentle head support, making it ideal for naps, tummy‑time, or everyday comfort. Lightweight, durable, and washable — this pillow is designed for convenient daily use at home or during travel. A perfect blend of cuteness, comfort, and practicality for newborns and infants.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100160',
		meta_title: 'Baby Pillow Smile Brown | Soft & Cute Infant Pillow',
		meta_description:
			'Baby Pillow Smile Brown — soft, breathable infant pillow with a cute smiley design, offering gentle head support for newborns and infants.',
		base_price: '850',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY PILLOW SMILE BROWN',
				slug: 'baby-pillow-smile-brown',
				excerpt:
					'Baby Pillow Smile Brown — a soft, cozy, and cute infant pillow featuring a friendly smiley‑face design',
				description:
					'The Baby Pillow Smile Brown is made from soft, breathable, and baby‑safe fabric that ensures gentle comfort for newborns and infants. Its warm brown color and adorable smiling face design make it a charming addition to your baby’s bedding setup. The pillow provides light, supportive cushioning for the baby’s head during naps, rest, or tummy‑time. It is lightweight, easy to wash, and designed for daily use at home or while traveling. Durable stitching ensures long‑lasting quality, while the soft texture keeps your baby comfortable and relaxed.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100161',
		meta_title:
			'Baby U‑Shape Neck Pillow Elephant Grey | Soft Travel Baby Pillow',
		meta_description:
			'Baby U‑Shape Neck Pillow Elephant Grey — soft, breathable infant neck pillow offering gentle head support with a cute grey elephant design.',
		base_price: '748',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY U SHAPE NECK PILLOW ELEPHANT GREY',
				slug: 'baby-u-shape-neck-pillow-elephant-grey',
				excerpt:
					'Baby U‑Shape Neck Pillow Elephant Grey — a soft, supportive travel neck pillow with a cute grey elephant design for infants.',
				description:
					'The Baby U‑Shape Neck Pillow Elephant Grey is designed to provide gentle neck and head support for infants during travel or rest. Made from ultra‑soft, breathable, and baby‑safe fabric, it keeps your little one comfortable whether in a stroller, car seat, or during naps. The adorable grey elephant design adds charm while the U‑shape helps keep the baby’s head in a comfortable position. Lightweight, portable, and washable — this pillow is perfect for everyday use and travel convenience. Durable stitching ensures long‑lasting comfort and reliability.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100162',
		meta_title:
			'Baby U‑Shape Neck Pillow Fox Orange | Soft Travel Infant Pillow',
		meta_description:
			'Baby U‑Shape Neck Pillow Fox Orange — soft, breathable infant neck pillow with a cute orange fox design, offering gentle support for travel and naps.',
		base_price: '748',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY U SHAPE NECK PILLOW FOX ORANGE',
				slug: 'baby-u-shape-neck-pillow-fox-orange',
				excerpt:
					'Baby U‑Shape Neck Pillow Fox Orange — a soft, supportive infant travel pillow featuring a cute orange fox design.',
				description:
					'The Baby U‑Shape Neck Pillow Fox Orange is designed to offer gentle neck and head support for infants during travel or rest. Made with ultra‑soft, breathable, and baby‑safe fabric, it keeps your little one comfortable in strollers, car seats, or during naps. The bright orange fox design adds a fun and friendly look while the U‑shape helps maintain a comfortable and stable head position. Lightweight and easy to carry, this pillow is perfect for everyday outings and long trips. Its washable and durable build ensures long‑lasting use and easy cleaning for parents.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
	{
		sku: '100163',
		meta_title:
			'Baby Play Gym Aeroplane Blue | Soft & Interactive Baby Activity Gym',
		meta_description:
			'Baby Play Gym Aeroplane Blue — soft padded activity gym with hanging toys and an aeroplane theme to support motor and sensory development.',
		base_price: '1695',
		base_discount_percentage: '20',
		images: [],
		translations: [
			{
				title: 'BABY PLAY GYM AEROPLANE BLUE',
				slug: 'baby-play-gym-aeroplane-blue',
				excerpt:
					'Baby Play Gym Aeroplane Blue — a colorful, soft, and engaging baby play gym with an aeroplane theme.',
				description:
					'The Baby Play Gym Aeroplane Blue is designed to keep infants entertained, active, and stimulated. It features a soft padded mat printed with a fun aeroplane theme, along with hanging toys to encourage reaching, grasping, kicking, and visual development. The overhead arch includes rattles, plush toys, and interactive elements that help improve motor skills and sensory growth. Made with soft, baby‑safe materials, it provides a cozy and safe play area for tummy‑time, sitting, and early play activities. Lightweight and easy to assemble, it’s perfect for use at home or for taking along when traveling.',
				language_id: 1,
			},
		],

		is_featured: false,
		status: true,
	},
];
