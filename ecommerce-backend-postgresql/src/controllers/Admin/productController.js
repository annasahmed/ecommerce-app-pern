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
	// for (const data of bulkProductData) {
	// 	req.body = data;
	// 	await adminProductService.createProduct(req);
	// 	console.log(req.body.sku, 'added');
	// }
	res.send({ message: 'sucessfull' });
});
const updateProductBySlug = catchAsync(async (req, res) => {
	const updatedProducts = [];
	const updateProducts = require('../../data/update_product_categories.json');
	for (const data of updateProducts) {
		req.body = data;
		const updatedProduct =
			await adminProductService.updateProductCategoriesBySku(req);
		if (updatedProduct) {
			updatedProducts.push(updatedProduct);
		}
	}
	res.send({ message: `updated these products`, updatedProducts });
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
const importProductsFromSheet = catchAsync(async (req, res) => {
	const results = await adminProductService.importProductsFromSheet(req);
	res.send(results);
});
const exportProducts = catchAsync(async (req, res) => {
	await adminProductService.exportProducts(req, res);
	// res.send(results);
});

module.exports = {
	getProductById,
	getProducts,
	createProduct,
	softDeleteProduct,
	permanentDeleteProduct,
	updateProduct,
	createBulkProducts,
	updateProductBySlug,
	importProductsFromSheet,
	exportProducts,
};

const bulkProductData = [
	{
		sku: '100076',
		title: 'Baby adjustable swaddle doted blue | Kidzo',
		description:
			'<p>The Kidzo Baby Adjustable Swaddle in Blue is made with ultra-soft, breathable cotton to provide your newborn with maximum comfort and security. Its adjustable Velcro wings ensure a perfect fit, helping prevent startle reflex and promoting longer, more peaceful sleep. Ideal for newborns and infants, this swaddle keeps your baby snug, warm, and safely wrapped throughout the night.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and breathable cotton fabric</li>\n  <li>Adjustable Velcro wings for perfect fit</li>\n  <li>Supports longer, peaceful sleep</li>\n  <li>Safe and comfortable newborn wrapping</li>\n  <li>Premium Kidzo quality</li>\n</ul>',
	},
	{
		sku: '100077',
		title: 'Baby adjustable swaddle doted white | Kidzo',
		description:
			'<p>The Kidzo Baby Adjustable Swaddle in White is crafted from gentle, breathable cotton to ensure\n maximum comfort for newborns. Its adjustable Velcro wings provide a secure and customized fit, reducing the startle reflex and helping babies sleep longer and more peacefully. Perfect for daily use, this swaddle keeps your baby snug, warm, and safely wrapped throughout the night.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and breathable cotton fabric</li>\n  <li>Adjustable Velcro wings for perfect fit</li>\n  <li>Supports longer, peaceful sleep</li>\n  <li>Safe and comfortable newborn wrapping</li>\n  <li>Premium Kidzo quality</li>\n</ul>',
	},
	{
		sku: '100075',
		title: 'Baby adjustable swaddle doted pink | Kidzo',
		description:
			'<p>The Kidzo Baby Adjustable Swaddle in Pink is made from ultra-soft, breathable cotton to provide\n maximum comfort for newborns. Its adjustable Velcro wings offer a snug and secure fit, helping reduce the startle reflex and allowing babies to enjoy longer, peaceful sleep. Ideal for everyday use, this swaddle keeps your little one warm, cozy, and safely wrapped.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and breathable cotton fabric</li>\n  <li>Adjustable Velcro wings for perfect fit</li>\n  <li>Supports longer, peaceful sleep</li>\n  <li>Safe and comfortable newborn wrapping</li>\n  <li>Premium Kidzo quality</li>\n</ul>',
	},
	{
		sku: '100078',
		title: 'Baby adjustable swaddle bear white | Kidzo',
		description:
			'<p>The Kidzo Baby Adjustable Swaddle in Bear White features a soft, breathable cotton fabric with an adorable bear print, offering comfort and style together. Its adjustable Velcro wings allow a secure and customized fit, helping reduce the startle reflex and promoting longer, peaceful sleep. Perfect for newborns, this swaddle keeps your baby warm, snug, and safely wrapped throughout the night.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and breathable cotton fabric</li>\n  <li>Cute bear print design</li>\n  <li>Adjustable Velcro wings for perfect fit</li>\n  <li>Helps reduce startle reflex</li>\n  <li>Supports longer, peaceful sleep</li>\n  <li>Safe and comfortable newborn wrapping</li>\n  <li>Premium Kidzo quality</li>\n</ul>',
	},
	{
		sku: '100080',
		title: 'Baby adjustable swaddle box pink | Kidzo',
		description:
			'<p>The Kidzo Baby Adjustable Swaddle in Box Pink features soft, breathable cotton with a stylish box pattern,\n offering comfort and a cute look for your newborn. Its adjustable Velcro wings allow a secure and customized fit, helping reduce the startle reflex and supporting longer, peaceful sleep. Ideal for daily use, this swaddle keeps your baby warm, snug, and safely wrapped throughout the night.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and breathable cotton fabric</li>\n  <li>Cute box pattern design</li>\n  <li>Adjustable Velcro wings for perfect fit</li>\n  <li>Supports longer, peaceful sleep</li>\n  <li>Safe and comfortable newborn wrapping</li>\n  <li>Premium Kidzo quality</li>\n</ul>',
	},
	{
		sku: '100083',
		title: 'Baby adjustable swaddle box baby pink | Kidzo',
		description:
			'<p>The Kidzo Baby Adjustable Swaddle in Box Baby Pink is made from soft, breathable cotton and features a charming box pattern for a sweet and stylish look. Its adjustable Velcro wings provide a secure and customized fit that helps reduce the startle reflex, allowing babies to enjoy longer, peaceful sleep. Ideal for everyday use, this swaddle keeps your little one warm, snug, and safely wrapped throughout the night.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and breathable cotton fabric</li>\n  <li>Adorable box pattern design</li>\n  <li>Adjustable Velcro wings for perfect fit</li>\n  <li>Supports longer, peaceful sleep</li>\n  <li>Safe and comfortable newborn wrapping</li>\n  <li>Premium Kidzo quality</li>\n</ul>',
	},
	{
		sku: '100079',
		title: 'Baby adjustable swaddle box Orange | Kidzo',
		description:
			'<p>The Kidzo Baby Adjustable Swaddle in Box Orange is made from soft, breathable cotton and designed with a charming box pattern for a stylish look. Its adjustable Velcro wings ensure a snug and customized fit, helping reduce the startle reflex and supporting longer, peaceful sleep. Perfect for everyday use, this swaddle keeps your newborn warm, snug, and safely wrapped throughout the night.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and breathable cotton fabric</li>\n  <li>Adorable box pattern design</li>\n  <li>Adjustable Velcro wings for perfect fit</li>\n  <li>Supports longer, peaceful sleep</li>\n  <li>Safe and comfortable newborn wrapping</li>\n  <li>Premium Kidzo quality</li>\n</ul>',
	},
	{
		sku: '100081',
		title: 'Baby adjustable swaddle box Blue | Kidzo',
		description:
			'<p>The Kidzo Baby Adjustable Swaddle in Box Blue is crafted from soft, breathable cotton and features\n an adorable box pattern for a stylish and comforting look. Its adjustable Velcro wings provide a snug and customized fit, helping reduce the startle reflex and supporting longer, peaceful sleep. Ideal for everyday use, this swaddle keeps your newborn warm, snug, and safely wrapped throughout the night.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and breathable cotton fabric</li>\n  <li>Adorable box pattern design</li>\n  <li>Adjustable Velcro wings for perfect fit</li>\n  <li>Supports longer, peaceful sleep</li>\n  <li>Safe and comfortable newborn wrapping</li>\n  <li>Premium Kidzo quality</li>\n</ul>',
	},
	{
		sku: '100082',
		title: 'Baby adjustable swaddle box Green| Kidzo',
		description:
			'<p>The Kidzo Baby Adjustable Swaddle in Box Green is made from soft, breathable cotton and designed\n with an adorable box pattern for a stylish, comforting look. Its adjustable Velcro wings ensure a snug and customized fit, helping reduce the startle reflex and supporting longer, peaceful sleep. Ideal for everyday use, this swaddle keeps your newborn warm, snug, and safely wrapped throughout the night.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and breathable cotton fabric</li>\n  <li>Adorable box pattern design</li>\n  <li>Adjustable Velcro wings for perfect fit</li>\n  <li>Supports longer, peaceful sleep</li>\n  <li>Safe and comfortable newborn wrapping</li>\n  <li>Premium Kidzo quality</li>\n</ul>',
	},
	{
		sku: '100085',
		title: 'Baby Wrapping Sheet Cow White | Montaly',
		description:
			'<p>The Montaly Baby Wrapping Sheet in Cow White is made from soft, gentle, and breathable fabric to provide maximum comfort for newborns. With its adorable cow print and smooth texture, this wrapping sheet offers full coverage and a snug wrap. Perfect for swaddling, sleeping, and everyday use, it helps keep your baby warm, calm, and securely wrapped throughout the day and night.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and breathable fabric</li>\n  <li>Cute cow print design</li>\n  <li>Provides warm and secure wrapping</li>\n  <li>Gentle on newborn skin</li>\n  <li>Ideal for swaddling and sleeping</li>\n  <li>Premium Montaly quality</li>\n</ul>',
	},
	{
		sku: '100086',
		title: 'Baby Wrapping Sheet Bear Car White | Montaly',
		description:
			'<p>The Mountaly Baby Wrapping Sheet in Bear Car White is made from soft, gentle, and breathable fabric\n to ensure maximum comfort for your newborn. Its adorable bear and car print adds a fun and charming look, while the spacious and smooth design provides full coverage and a snug wrap. Ideal for swaddling, sleeping, and everyday use, this wrapping sheet helps keep your baby warm, calm, and securely wrapped throughout the day and night.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and breathable fabric</li>\n  <li>Cute bear and car print design</li>\n  <li>Provides warm and secure wrapping</li>\n  <li>Gentle on newborn skin</li>\n  <li>Ideal for swaddling and sleeping</li>\n  <li>Premium Mountaly quality</li>\n</ul>',
	},
	{
		sku: '100087',
		title: 'Baby Wrapping Sheet Hippo White | Montaly',
		description:
			'<p>The Mountaly Baby Wrapping Sheet in Hippo White is crafted from soft, breathable, and gentle fabric  to ensure maximum comfort for your newborn. Its adorable hippo print adds a sweet and playful touch, while the smooth and spacious design provides full coverage and a snug wrap. Perfect for swaddling, sleeping, and everyday use, this wrapping sheet helps keep your baby warm, calm, and securely wrapped day and night.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and breathable fabric</li>\n  <li>Cute hippo print design</li>\n  <li>Provides warm and secure wrapping</li>\n  <li>Gentle on newborn skin</li>\n  <li>Ideal for swaddling and sleeping</li>\n  <li>Premium Mountaly quality</li>\n</ul>',
	},
	{
		sku: '100090',
		title: 'WRAPING SHEET THAILAND COTTON BEAR BLUE MAMI BABY',
		description:
			'<p>The Mami Baby Thailand Cotton Wrapping Sheet in Bear Blue is crafted from premium, ultra‑soft Thailand cotton that is gentle and safe for newborn skin. With a cute blue bear design and smooth texture, it provides excellent warmth and comfort. The lightweight, breathable fabric ensures proper airflow while keeping your baby snug and relaxed. Ideal for swaddling, sleeping, or everyday wrapping, this sheet helps promote better sleep and a secure feeling for newborns.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Premium Thailand cotton fabric</li>\n  <li>Soft, breathable, and skin-friendly</li>\n  <li>Cute bear print in soothing blue color</li>\n  <li>Provides warm and secure wrapping</li>\n  <li>Ideal for swaddling and newborn sleep</li>\n  <li>High‑quality Mami Baby product</li>\n</ul>',
	},
	{
		sku: '100091',
		title: 'WRAPING SHEET THAILAND COTTON BEAR PINK MAMI BABY',
		description:
			'<p>The Mami Baby Thailand Cotton Wrapping Sheet in Bear Pink is crafted from premium, ultra‑soft Thailand cotton that is gentle on delicate newborn skin. Its adorable pink bear print adds a sweet look, while the lightweight and breathable fabric ensures proper airflow. The smooth texture provides a snug, warm, and comfortable swaddle that helps newborns feel secure and sleep peacefully. Perfect for daily wrapping, swaddling, and newborn sleep routines.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Premium Thailand cotton fabric</li>\n  <li>Soft, breathable, and gentle on baby skin</li>\n  <li>Cute pink bear print design</li>\n  <li>Provides warm and secure wrapping</li>\n  <li>Ideal for swaddling and newborn sleep</li>\n  <li>Quality product from Mami Baby</li>\n</ul>',
	},
	{
		sku: '100089',
		title: 'WRAPING SHEET THAILAND COTTON CAT YELLOW MAMI BABY',
		description:
			'<p>The Mami Baby Thailand Cotton Wrapping Sheet in Cat Yellow is made from premium, ultra‑soft Thailand cotton that feels gentle on delicate newborn skin. Its adorable yellow cat print adds a cheerful touch, while the lightweight and breathable fabric ensures proper ventilation. This smooth and comfy wrapping sheet keeps babies snug, warm, and secure, helping them sleep peacefully. Perfect for everyday swaddling, wrapping, and newborn sleep routines.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Premium Thailand cotton fabric</li>\n  <li>Soft, breathable, and gentle on baby skin</li>\n  <li>Cute Cat Yellow print design</li>\n  <li>Provides warm and secure wrapping</li>\n  <li>Ideal for swaddling and newborn sleep</li>\n  <li>Quality product from Mami Baby</li>\n</ul>',
	},
	{
		sku: '100092',
		title: 'WRAPING SHEET THAILAND COTTON BEAR GREEN MAMI BABY',
		description:
			'<p>The Mami Baby Wrapping Sheet Thailand Cotton Bear Green is crafted from premium Thailand cotton known for its softness, breathability, and durability. The adorable green bear print adds charm, while the lightweight fabric ensures proper airflow to keep newborns comfortable throughout the day. Designed for gentle swaddling, this sheet provides warmth, security, and a snug feel that helps babies sleep better. Ideal for daily wrapping, swaddling, and newborn routines.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Premium Thailand cotton fabric</li>\n  <li>Soft and breathable material</li>\n  <li>Gentle on newborn skin</li>\n  <li>Cute green bear print design</li>\n  <li>Provides warm and secure wrapping</li>\n  <li>Ideal for swaddling and daily newborn use</li>\n  <li>Trusted Mami Baby quality</li>\n</ul>',
	},
	{
		sku: '100088',
		title: 'BABY WRAPING SHEET CAT WHITE MONTALY',
		description:
			'<p>The Montaly Baby Wrapping Sheet in Cat White is made from soft, gentle, and breathable fabric that keeps newborns comfortable throughout the day. Its adorable white cat design adds a charming touch, while the smooth texture ensures a cozy and secure swaddle. Perfect for daily wrapping, swaddling, and peaceful newborn sleep, this sheet offers warmth, comfort, and reliable Montaly quality.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and breathable fabric</li>\n  <li>Gentle on newborn skin</li>\n  <li>Cute white cat print design</li>\n  <li>Provides warm and cozy wrapping</li>\n  <li>Ideal for swaddling and daily newborn use</li>\n  <li>Durable Montaly quality material</li>\n</ul>',
	},
	{
		sku: '100109',
		title: 'BABY FEEDER COVER YELLOW BLORE WINNIE CARE',
		description:
			'<p>The Baby Feeder Cover Yellow by Blore Winnie Care is crafted from soft, durable, and baby‑safe fabric that protects feeders from dust, dirt, and germs. Its cute yellow Winnie design adds charm while ensuring hygiene for daily use. The lightweight material is easy to wash, reuse, and fits standard feeders perfectly. Ideal for keeping your baby’s feeding accessories clean and well‑maintained.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and durable fabric</li>\n  <li>Cute yellow Winnie design</li>\n  <li>Protects feeder from dust and germs</li>\n  <li>Easy to wash and reuse</li>\n  <li>Safe and gentle material for babies</li>\n  <li>Perfect fit for standard feeders</li>\n  <li>Quality by Blore Winnie Care</li>\n</ul>',
	},
	{
		sku: '100096',
		title: 'BABY FEEDER COVER WELCOME TO\n THE WORLD SKIN LITTLE HOME',
		description:
			'<p>The Little Home Baby Feeder Cover in “Welcome to the World” Skin color is made from soft, breathable fabric that keeps your baby’s feeder safe from dust and external germs. The soothing skin‑tone shade and adorable welcoming print make it perfect for newborn essentials. Lightweight, washable, and reusable, this cover maintains hygiene while adding a sweet touch to your baby’s feeding routine.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and breathable fabric</li>\n  <li>“Welcome to the World” cute print</li>\n  <li>Protects feeder from dust and germs</li>\n  <li>Gentle and safe material for babies</li>\n  <li>Washable and reusable</li>\n  <li>Fits standard baby feeders</li>\n  <li>Quality product by Little Home</li>\n</ul>',
	},
	{
		sku: '100097',
		title: 'BABY FEEDER COVER WELCOME TO \nTHE WORLD RED LITTLE HOME',
		description:
			'<p>The Little Home Baby Feeder Cover in “Welcome to the World” Red is crafted from soft, durable, and washable fabric that protects the baby feeder from dust, dirt, and germs. Its adorable newborn‑themed design adds a sweet touch, while the gentle material ensures safety for babies. Designed to fit standard feeders, this cover is lightweight, easy to use, and perfect for daily feeding routines.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and durable fabric</li>\n  <li>Cute “Welcome to the World” red design</li>\n  <li>Protects feeder from dust and germs</li>\n  <li>Gentle and safe for babies</li>\n  <li>Easy to wash and reuse</li>\n  <li>Fits most standard feeders</li>\n  <li>Quality Little Home product</li>\n</ul>',
	},
	{
		sku: '100103',
		title: 'BABY FEEDER COVER WELCOME TO \nTHE WORLD PINK LITTLE HOME',
		description:
			'<p>The Little Home Baby Feeder Cover in Pink features a charming “Welcome to the World” theme, crafted with soft and durable fabric that keeps feeders shielded from dust and germs. Its gentle material is safe for babies, and the snug fit ensures the feeder stays covered and clean at all times. Perfect for home use and travel, offering both hygiene and an adorable look.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and durable fabric</li>\n  <li>Cute “Welcome to the World” pink design</li>\n  <li>Protects feeder from dust and germs</li>\n  <li>Easy to wash and reuse</li>\n  <li>Gentle and safe material for babies</li>\n  <li>Perfect fit for standard feeders</li>\n  <li>Quality by Little Home</li>\n</ul>',
	},
	{
		sku: '100104',
		title: 'BABY FEEDER COVER WELCOME TO\nTHE WORLD BROWN LITTLE HOME',
		description:
			'<p>The Little Home Baby Feeder Cover in Welcome to the World Brown is crafted from soft, washable, and durable fabric that keeps feeders safe from dust and germs. Its adorable brown-themed design gives a warm and cozy feel, while the gentle material ensures it’s safe for everyday baby use. Perfect for maintaining feeder hygiene and adding a stylish touch to baby accessories.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and durable fabric</li>\n  <li>Cute "Welcome to the World" brown theme</li>\n  <li>Protects feeder from dust and germs</li>\n  <li>Easy to wash and reuse</li>\n  <li>Gentle and safe for babies</li>\n  <li>Fits standard feeders perfectly</li>\n  <li>Quality by Little Home</li>\n</ul>',
	},
	{
		sku: '100098',
		title: 'BABY FEEDER COVER WELCOME TO THE\nWORLD BLUE LITTLE HOME',
		description:
			'<p>The Baby Feeder Cover Welcome to the World Blue by Little Home is crafted from soft, durable, and washable fabric that keeps your baby’s feeder protected from dust, germs, and scratches. Its cute blue “Welcome to the World” design adds a charming touch while providing full coverage and a secure fit. Ideal for maintaining feeder hygiene at home or while traveling, this cover offers gentle protection suitable for everyday use.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and durable fabric</li>\n  <li>Cute “Welcome to the World” blue design</li>\n  <li>Protects feeder from dust and germs</li>\n  <li>Easy to wash and reuse</li>\n  <li>Gentle material safe for babies</li>\n  <li>Perfect fit for standard feeders</li>\n  <li>Quality by Little Home</li>\n</ul>',
	},
	{
		sku: '100105',
		title: 'BABY FEEDER COVER PINK BLORE WINNIE CARE',
		description:
			'<p>The Baby Feeder Cover Pink Blore by Winnie Care is made from soft, durable, and washable fabric designed to protect baby feeders from dust, germs, and scratches. Its adorable pink Blore print adds a charming touch while ensuring full coverage and a comfortable fit. Ideal for everyday use at home or during travel, this cover keeps feeders hygienic and well‑protected with trusted Winnie Care quality.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and washable fabric</li>\n  <li>Cute pink Blore design</li>\n  <li>Protects feeder from dust and germs</li>\n  <li>Gentle material safe for babies</li>\n  <li>Durable and long‑lasting quality</li>\n  <li>Easy to use and fits most feeders</li>\n  <li>Trusted Winnie Care brand</li>\n</ul>',
	},
	{
		sku: '100108',
		title: 'BABY FEEDER COVER ORANGE BLORE WINNIE CARE',
		description:
			'<p>The Baby Feeder Cover Orange Blore by Winnie Care is crafted from soft, durable, and washable fabric that protects baby feeders from dust, germs, and scratches. Its vibrant orange Blore print adds a fun touch while offering full coverage and a secure fit. Designed for daily home use or travel, this cover ensures hygiene, safety, and convenience with trusted Winnie Care quality.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and washable fabric</li>\n  <li>Bright orange Blore design</li>\n  <li>Protects feeder from dust and germs</li>\n  <li>Gentle material safe for babies</li>\n  <li>Durable and long‑lasting quality</li>\n  <li>Easy to use and fits most feeders</li>\n  <li>Trusted Winnie Care brand</li>\n</ul>',
	},
	{
		sku: '100107',
		title: 'BABY FEEDER COVER GREEN BLORE WINNIE CARE',
		description:
			'<p>The Baby Feeder Cover Green Blore by Winnie Care is designed using soft, durable, and fully washable fabric that keeps baby feeders protected from dust, germs, and scratches. Its fresh green Blore print adds a cute and stylish touch, while the snug fit ensures full coverage and hygiene. Perfect for everyday home use or travel, this cover provides convenience, protection, and trusted Winnie Care quality.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and washable fabric</li>\n  <li>Fresh green Blore design</li>\n  <li>Protects feeder from dust and germs</li>\n  <li>Gentle and baby‑safe material</li>\n  <li>Durable and long‑lasting quality</li>\n  <li>Easy to use and fits most feeders</li>\n  <li>Trusted Winnie Care brand</li>\n</ul>',
	},
	{
		sku: '100106',
		title: 'BABY FEEDER COVER BLUE BLORE WINNIE CARE',
		description:
			'<p>The Baby Feeder Cover Blue Blore by Winnie Care is crafted from soft, washable fabric that keeps your baby’s feeder safe from dust, dirt, and scratches. Its cool blue Blore print gives a neat and stylish look, while the comfortable fit ensures full protection. Ideal for daily use and travel, this feeder cover combines convenience, hygiene, and trusted Winnie Care quality.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and washable fabric</li>\n  <li>Cool blue Blore design</li>\n  <li>Protects feeder from dust and germs</li>\n  <li>Gentle and baby‑safe material</li>\n  <li>Durable and long‑lasting quality</li>\n  <li>Easy to use and fits most feeders</li>\n  <li>Trusted Winnie Care brand</li>\n</ul>',
	},
	{
		sku: '100101',
		title: 'BABY FEEDER COVER BEAR PINK LITTLE HOME',
		description:
			'<p>The Baby Feeder Cover Bear Pink by Little Home is crafted from soft, durable, and washable fabric that keeps your baby’s feeder hygienic and protected. The adorable pink bear print adds a sweet touch, while the snug fit ensures full coverage from dust, dirt, and scratches. Ideal for home use and travel, providing both protection and a cute look with trusted Little Home quality.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and washable fabric</li>\n  <li>Cute pink bear design</li>\n  <li>Protects feeder from dust and germs</li>\n  <li>Gentle and baby‑safe material</li>\n  <li>Durable and long‑lasting</li>\n  <li>Easy to use and fits most feeders</li>\n  <li>Trusted Little Home quality</li>\n</ul>',
	},
	{
		sku: '100102',
		title: 'BABY FEEDER COVER BEAR GREY LITTLE HOME',
		description:
			'<p>The Baby Feeder Cover Bear Grey by Little Home is a cute and practical accessory designed to keep your baby’s feeder clean, insulated, and comfortable to grip. Made with soft, gentle fabric, it protects the bottle from dust while providing a warm layer for easier handling. The adorable grey bear design adds charm, making it perfect for everyday feeding. Durable, washable, and ideal for both home and travel use.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and comfortable fabric</li>\n  <li>Cute grey bear design</li>\n  <li>Protects bottle from dust</li>\n  <li>Easy to grip and hold</li>\n  <li>Washable and reusable</li>\n  <li>Ideal for home or travel</li>\n  <li>Little Home quality</li>\n</ul>',
	},
	{
		sku: '100099',
		title: 'BABY FEEDER COVER BEAR GREEN LITTLE HOME',
		description:
			'<p>The Baby Feeder Cover Bear Green by Little Home is crafted from soft, washable, and durable fabric designed to protect baby feeders from dust and dirt. Its adorable green bear print adds a charming touch, while the snug fit helps maintain feeder hygiene at home or during travel. Made with baby‑safe fabric and trusted Little Home quality, it ensures convenience and cleanliness for everyday use.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and washable material</li>\n  <li>Cute green bear design</li>\n  <li>Protects feeder from dust and dirt</li>\n  <li>Gentle and baby‑safe fabric</li>\n  <li>Durable and long‑lasting quality</li>\n  <li>Easy to use and fits most feeders</li>\n  <li>Trusted Little Home brand</li>\n</ul>',
	},
	{
		sku: '100100',
		title: 'BABY FEEDER COVER BEAR BLUE LITTLE HOME',
		description:
			'<p>The Baby Feeder Cover Bear Blue by Little Home is crafted from soft, durable, and easy‑to‑wash fabric that keeps baby feeders protected from dust and dirt. Its adorable blue bear print adds a sweet look, while the snug fit helps maintain feeder hygiene at home or during travel. Designed with baby‑safe material, it offers daily convenience and trusted Little Home quality.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and washable material</li>\n  <li>Cute blue bear design</li>\n  <li>Protects feeder from dust and dirt</li>\n  <li>Gentle and baby‑safe fabric</li>\n  <li>Durable and long‑lasting quality</li>\n  <li>Easy to use and fits most feeders</li>\n  <li>Trusted Little Home brand</li>\n</ul>',
	},
	{
		sku: '10069',
		title: 'BABY HOODED BATH TOWEL SUNDAY YELLOW MUMS WORLD',
		description:
			'<p>The Baby Hooded Bath Towel Sunday Yellow by Mums World is made from soft, highly absorbent, and baby‑friendly fabric designed to gently dry your little one after a bath. Its cozy hood helps keep the baby’s head warm, while the bright yellow “Sunday” theme adds a cheerful touch. Comfortable, lightweight, and gentle on delicate skin, this towel ensures a warm and pleasant post‑bath experience for newborns and infants.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and highly absorbent material</li>\n  <li>Cozy hood for warmth after bath</li>\n  <li>Gentle and safe for delicate baby skin</li>\n  <li>Cute Sunday-themed yellow design</li>\n  <li>Lightweight and comfortable fabric</li>\n  <li>Ideal for newborns and infants</li>\n  <li>Trusted Mums World quality</li>\n</ul>',
	},
	{
		sku: '100071',
		title: 'BABY HOODED BATH TOWEL SUNDAY PINK MUMS WORLD',
		description:
			'<p>The Baby Hooded Bath Towel Sunday Pink by Mums World is designed to give your little one a warm, gentle, and comfortable drying experience. Made from soft, absorbent fabric, it quickly dries delicate baby skin without irritation. The cute hood adds extra warmth and helps keep your baby’s head covered after a bath. Lightweight, durable, and easy to wash, this towel is perfect for daily use and ideal for newborns and infants.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and absorbent fabric</li>\n  <li>Gentle on baby’s skin</li>\n  <li>Cozy hood for extra warmth</li>\n  <li>Beautiful Sunday Pink color</li>\n  <li>Perfect for newborns and infants</li>\n  <li>Lightweight and durable</li>\n  <li>Easy to wash and reuse</li>\n</ul>',
	},
	{
		sku: '100070',
		title: 'BABY HOODED BATH TOWEL SUNDAY BLUE MUMS WORLD',
		description:
			'<p>The Baby Hooded Bath Towel Sunday Blue by Mums World is made from gentle, absorbent fabric that dries your baby quickly while keeping their delicate skin protected. The attached hood provides extra warmth and helps keep your little one snug after bath time. Durable, lightweight, and easy to wash, this towel is perfect for newborns and infants and ideal for everyday use.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and absorbent material</li>\n  <li>Gentle on baby’s skin</li>\n  <li>Cozy hood for extra warmth</li>\n  <li>Beautiful Sunday Blue color</li>\n  <li>Ideal for newborns and infants</li>\n  <li>Lightweight & durable</li>\n  <li>Easy to wash and reuse</li>\n</ul>',
	},
	{
		sku: '100073',
		title: 'BABY HOODED BATH TOWEL BABY ORANGE MUMS WORLD',
		description:
			'<p>The Baby Hooded Bath Towel Baby Orange by Mums World is crafted from soft, absorbent fabric that quickly dries delicate baby skin while keeping them warm. The attached hood adds extra comfort and makes wrapping easier after a bath. Its bright orange color and baby‑friendly design make it both functional and adorable. Ideal for daily baths, beach time, or as a newborn gift essential.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and absorbent bath towel</li>\n  <li>Gentle on baby’s delicate skin</li>\n  <li>Cozy hooded design for warmth</li>\n  <li>Bright and attractive orange color</li>\n  <li>Ideal for daily bath use</li>\n  <li>Durable and baby‑friendly material</li>\n  <li>Trusted quality by Mums World</li>\n</ul>',
	},
	{
		sku: '100072',
		title: 'BABY HOODED BATH TOWEL BABY BLUE MUMS WORLD',
		description:
			'<p>The Mums World Baby Hooded Bath Towel in Baby Blue is crafted from soft, gentle, and absorbent fabric ideal for newborn skin. Its hooded design helps keep your baby warm after a bath, while the lightweight texture ensures quick drying and comfortable use. With its cute baby‑blue color and smooth finish, this towel is perfect for daily bath routines, travel, or gifting.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and absorbent fabric</li>\n  <li>Gentle on newborn skin</li>\n  <li>Cozy hooded design for warmth</li>\n  <li>Perfect for daily bath routines</li>\n  <li>Quick‑dry and lightweight material</li>\n  <li>Cute baby‑blue color</li>\n  <li>Trusted Mums World quality</li>\n</ul>',
	},
	{
		sku: '100074',
		title: 'BABY HOODED BATH TOWEL BABY PINK MUMS WORLD',
		description:
			'<p>The Baby Hooded Bath Towel Baby Pink by Mums World is made from ultra‑soft, gentle, and absorbent fabric that keeps your little one warm and comfortable after every bath. Its hooded design helps dry the baby’s head quickly while preventing heat loss. The lightweight, skin‑friendly material ensures a smooth and irritation‑free experience, making it perfect for everyday use. Ideal for newborns and infants, this towel brings both comfort and cuteness to bath time.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Ultra‑soft and absorbent fabric</li>\n  <li>Gentle and safe for newborn skin</li>\n  <li>Cozy hood for quick head drying</li>\n  <li>Baby pink color for a cute look</li>\n  <li>Keeps baby warm after bath</li>\n  <li>Ideal for daily newborn use</li>\n  <li>Trusted Mums World quality</li>\n</ul>',
	},
	{
		sku: '100093',
		title: 'BABY SOCKS HEAT LIKE BABY 3PCS CARD',
		description:
			'<p>The Heat Like Baby 3PCS Baby Socks Pack is designed with soft, stretchy, and skin‑friendly fabric that keeps newborn feet warm and comfortable all day. Each pair offers a snug fit without irritation, making it ideal for daily wear. The breathable material prevents sweating, while the cute Heat Like Baby theme adds charm. Perfect for newborns and infants, these socks ensure warmth, comfort, and durability in every use.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and skin‑friendly fabric</li>\n  <li>Warm and cozy for newborn feet</li>\n  <li>Stretchable for a secure, comfy fit</li>\n  <li>Cute “Heat Like Baby” theme</li>\n  <li>Durable stitching for long use</li>\n  <li>Pack of 3 pairs for daily wear</li>\n  <li>Ideal for newborns and infants</li>\n</ul>',
	},
	{
		sku: '100094',
		title: 'BABY SOCKS FRILL CARTERS 3PCS CARD 0-12M',
		description:
			'<p>The Carter’s Frill Baby Socks 3PCS Card (0–12M) are crafted from soft, breathable, and stretchy material that keeps newborn and infant feet cozy throughout the day. Each pair features a delicate frill design that adds a cute and classy touch. The fabric is gentle on sensitive baby skin, while the snug fit prevents slipping. Durable, comfortable, and perfect for daily wear, these socks provide warmth, charm, and long‑lasting quality.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and gentle fabric</li>\n  <li>Cute frill-edge design</li>\n  <li>Stretchable and comfortable fit</li>\n  <li>Skin‑friendly material for newborns</li>\n  <li>Pack of 3 pairs for daily use</li>\n  <li>Durable stitching for long wear</li>\n  <li>Suitable for ages 0–12 months</li>\n</ul>',
	},
	{
		sku: '100095',
		title: 'BABY SOCKS FANCY 3PCS PACK CHUBESTER`S 0-6M',
		description:
			'<p>The Chubester’s Fancy 3PCS Baby Socks Pack (0–6M) features soft, breathable, and stretchable fabric that keeps newborn feet warm and cozy. Each pair includes cute, fancy patterns that add charm while maintaining comfort. The skin‑friendly material ensures no irritation, and the snug elastic fit prevents slipping. Perfect for daily wear, gifting, and newborn essentials, these socks offer durability, comfort, and adorable style in every pair.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and skin‑friendly fabric</li>\n  <li>Cute fancy patterns</li>\n  <li>Stretchable and comfy fit</li>\n  <li>Gentle on newborn skin</li>\n  <li>Pack of 3 pairs for daily wear</li>\n  <li>Durable stitching for long life</li>\n  <li>Suitable for ages 0–6 months</li>\n</ul>',
	},
	{
		sku: '100084',
		title: 'BABY 2PCS SWADDLE BLANKET BOX KIDZO',
		description:
			'<p>The Kidzo 2PCS Swaddle Blanket Box includes two premium‑quality swaddles made from soft, gentle, and breathable fabric ideal for newborns. Each blanket provides a snug and secure wrap that helps babies feel calm and sleep better. The material is smooth on sensitive skin, lightweight, and perfect for daily swaddling. Packed in a beautiful box, this set is ideal for gifting and everyday newborn essentials.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and gentle fabric for newborn skin</li>\n  <li>Lightweight and breathable material</li>\n  <li>Provides secure and cozy swaddling</li>\n  <li>Set of 2 blankets for daily use</li>\n  <li>Helps improve newborn sleep</li>\n  <li>Premium quality by Kidzo</li>\n  <li>Comes in a beautiful gift box</li>\n</ul>',
	},
	{
		sku: '100110',
		title: 'BABY RATTLE BOX CYAN 8PCS 0-3M',
		description:
			'<p>The Baby Rattle Box Cyan 8PCS (0–3M) includes a collection of lightweight, easy‑to‑hold rattles specially designed for newborns. Each rattle produces gentle sounds that help improve auditory development while encouraging hand‑eye coordination. Made from safe, non‑toxic materials with smooth edges, this set ensures a fun and secure playtime experience. The bright cyan theme and engaging shapes keep babies entertained while supporting early sensory growth.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Safe and non-toxic material</li>\n  <li>Lightweight and easy for newborns to hold</li>\n  <li>Gentle rattling sound for auditory stimulation</li>\n  <li>Helps develop motor and sensory skills</li>\n  <li>Smooth edges for safe play</li>\n  <li>Bright cyan color theme</li>\n  <li>8 engaging rattles in one box</li>\n  <li>Suitable for babies 0–3 months</li>\n</ul>',
	},
	{
		sku: '100111',
		title: 'BABY RATTLE BOX BABY PINK 8PCS 3+M',
		description:
			'<p>The Baby Rattle Box Baby Pink (8PCS) is a delightful collection of safe, lightweight, and attractive rattles made especially for babies 3 months and above. Each piece is crafted with smooth edges, easy‑to‑hold shapes, and gentle sounds that help enhance sensory development. The bright baby‑pink theme makes it visually appealing, while the variety of rattles keeps little ones entertained and encourages early motor skill growth. Perfect as a gift or daily playtime essential.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>8‑piece baby rattle set</li>\n  <li>Safe for babies 3+ months</li>\n  <li>Lightweight and easy to hold</li>\n  <li>Smooth, baby‑friendly edges</li>\n  <li>Gentle rattling sound</li>\n  <li>Attractive baby‑pink color theme</li>\n  <li>Helps sensory development</li>\n  <li>Supports early motor skill growth</li>\n</ul>',
	},
	{
		sku: '100113',
		title: 'BABY RATTLE BOX 4PCS',
		description:
			'<p>The Baby Rattle Box 4PCS includes four colorful, lightweight, and easy‑to‑hold rattles crafted to support early motor and sensory skills. Each rattle features gentle sounds, smooth edges, and baby‑safe materials suitable for newborns. Designed to attract attention and encourage hand‑eye coordination, this set is perfect for daily playtime, gifting, and newborn essentials.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Set of 4 colorful rattles</li>\n  <li>Lightweight and easy for babies to hold</li>\n  <li>Gentle sound for sensory stimulation</li>\n  <li>Smooth, baby‑safe materials</li>\n  <li>Helps develop motor and coordination skills</li>\n  <li>Ideal for gifting and daily play</li>\n  <li>Suitable for newborns</li>\n</ul>',
	},
	{
		sku: '100112',
		title: 'BABY RATTLE BOX 3PCS',
		description:
			'<p>The Baby Rattle Box 3PCS includes three bright, easy‑to‑grip rattles made from baby‑safe, smooth materials. Each rattle produces gentle, pleasant sounds that stimulate hearing and help develop motor skills. Perfect for newborns and infants, this compact set encourages hand‑eye coordination and sensory exploration. Ideal for gifting, daily playtime, and early learning.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Set of 3 colorful rattles</li>\n  <li>Lightweight and baby‑friendly design</li>\n  <li>Gentle sound for sensory stimulation</li>\n  <li>Smooth, safe materials for infants</li>\n  <li>Encourages motor and coordination skills</li>\n  <li>Perfect for gifting and daily play</li>\n  <li>Suitable for newborns</li>\n</ul>',
	},
	{
		sku: '100052',
		title: 'BABY BIB 2PCS NECK STYLE NANNANQIN',
		description:
			'<p>The Baby Bib 2PCS Neck Style by Nannanqin features two high‑quality, soft, and absorbent bibs perfect for daily feeding. Designed with an easy‑to-wear neck style, these bibs provide full coverage to protect your baby’s clothes from spills and drool. Made with gentle, baby‑friendly fabric, they ensure comfort while keeping your little one clean. Ideal for newborns and infants during mealtime or everyday use.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>2‑piece baby bib set</li>\n  <li>Soft and absorbent fabric</li>\n  <li>Comfortable neck‑style design</li>\n  <li>Gentle on baby’s skin</li>\n  <li>Protects clothes from spills and drool</li>\n  <li>Ideal for daily feeding and use</li>\n  <li>Trusted Nannanqin quality</li>\n</ul>',
	},
	{
		sku: '100058',
		title: 'BABY TRIANGLE BIB 2PCS NANNANQIN',
		description:
			'<p>The Baby Triangle Bib 2PCS by Nannanqin features two premium, soft, and highly absorbent bibs designed in a stylish triangle shape. These bibs are gentle on delicate baby skin and ideal for catching drool, milk spills, and food drips. With an easy, comfortable neck fastening, they provide a secure fit and are perfect for daily use. A great choice for newborns and infants for feeding time or all‑day wear.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>2‑piece triangle bib set</li>\n  <li>Soft and absorbent fabric</li>\n  <li>Comfortable neck fastening</li>\n  <li>Gentle on baby’s skin</li>\n  <li>Perfect for drool, milk, and food spills</li>\n  <li>Stylish triangle design</li>\n  <li>Ideal for newborns and infants</li>\n</ul>',
	},
	{
		sku: '100051',
		title: 'AIFEIER BABY BIB 2PCS',
		description:
			'<p>The Aifeier Baby Bib 2PCS set includes two soft, high‑quality bibs made to keep your baby clean and comfortable. Crafted from gentle, absorbent fabric, these bibs effectively catch milk, drool, and food spills. The easy neck-closure design ensures a secure and comfortable fit for newborns and infants. Perfect for daily feeding, teething, or general use, offering both practicality and durability.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>2‑piece baby bib set</li>\n  <li>Soft and absorbent fabric</li>\n  <li>Gentle on baby’s skin</li>\n  <li>Easy and comfortable neck closure</li>\n  <li>Protects clothes from spills and drool</li>\n  <li>Suitable for newborns and infants</li>\n  <li>Durable Aifeier quality</li>\n</ul>',
	},
	{
		sku: '100050',
		title: 'CHINA BABY APPRIN PLASTIC BIB BIG',
		description:
			'<p>The China Baby Apron Plastic Bib (Big Size) is designed to provide full coverage and maximum protection during feeding time. Made from sturdy, waterproof plastic, it prevents spills, food stains, and liquids from reaching your baby’s clothes. The apron style covers more area than regular bibs, making it ideal for self‑feeding toddlers. Lightweight, easy to wipe, and quick to clean, this bib is a practical choice for daily meals.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Large apron‑style bib</li>\n  <li>Waterproof plastic material</li>\n  <li>Full clothing protection</li>\n  <li>Easy to clean and reusable</li>\n  <li>Ideal for messy eaters</li>\n  <li>Lightweight and comfortable</li>\n  <li>Great for daily feeding</li>\n</ul>',
	},
	{
		sku: '100062',
		title: 'KIDZO BABY BIB 3PCS TERRY',
		description:
			'<p>The Kidzo Baby Bib 3PCS Terry set includes three high‑quality terry cloth bibs designed for maximum absorption and comfort. Made from gentle, skin‑friendly fabric, these bibs keep your baby’s clothes clean during feeding, teething, or playtime. The secure and comfortable neck closure ensures a snug fit for infants. Durable, washable, and perfect for everyday use, offering great value and reliability from Kidzo.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>3‑piece terry bib set</li>\n  <li>Soft and absorbent fabric</li>\n  <li>Gentle on baby’s skin</li>\n  <li>Easy and secure neck closure</li>\n  <li>Protects clothes from spills and drool</li>\n  <li>Durable and washable</li>\n  <li>Trusted Kidzo quality</li>\n</ul>',
	},
	{
		sku: '100054',
		title: 'LITTLE APLACA BABY 2PCS BIB+1SPOON SET',
		description:
			'<p>The Little Alpaca Baby 2PCS Bib + 1 Spoon Set is a convenient feeding combo designed for everyday use. The soft, gentle bibs keep your baby’s clothes clean from spills, while the included feeding spoon is safe, smooth, and comfortable for little mouths. Ideal for newborns and infants, this set offers both practicality and adorable style, making mealtime easier for parents and more comfortable for babies.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>2 soft, comfortable bibs</li>\n  <li>Includes 1 baby‑safe feeding spoon</li>\n  <li>Gentle on newborn skin</li>\n  <li>Easy to clean and reusable</li>\n  <li>Ideal for feeding and drooling</li>\n  <li>Cute Little Alpaca theme</li>\n  <li>Perfect for daily use or gifting</li>\n</ul>',
	},
	{
		sku: '100053',
		title: 'LOLY POP BABY BIB PRINTED',
		description:
			'<p>The Loly Pop Baby Bib Printed is designed to make feeding time easier and cleaner. Made with soft, comfortable, and absorbent fabric, it gently protects your baby’s clothes from spills and drool. The fun printed design adds charm, making it both practical and adorable. Lightweight, easy to wash, and ideal for daily use, this bib is a great choice for newborns and infants.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and gentle fabric</li>\n  <li>Cute printed design</li>\n  <li>Protects clothes from spills</li>\n  <li>Lightweight and comfortable</li>\n  <li>Easy to wash and reuse</li>\n  <li>Ideal for newborns and infants</li>\n</ul>',
	},
	{
		sku: '100060',
		title: 'NB KIDZO BABY BIB 3PCS MEDIUM',
		description:
			'<p>The NB Kidzo Baby Bib 3PCS Medium set is designed to keep your baby clean and comfortable during meals. Made with soft, gentle, and absorbent fabric, these bibs protect clothing from spills, drool, and messes. Each pack includes three medium‑size bibs that offer a secure fit and long‑lasting comfort. Easy to wash, durable, and ideal for everyday use, this bib set is a practical choice for newborns and infants.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and gentle material</li>\n  <li>Medium size for daily use</li>\n  <li>Protects clothes from spills</li>\n  <li>Comfortable and secure fit</li>\n  <li>Easy to wash and reuse</li>\n  <li>Pack of 3 for convenience</li>\n</ul>',
	},
	{
		sku: '100059',
		title: 'NB KIDZO BABY BIB 3PCS PACK LARGE',
		description:
			'<p>The NB Kidzo Baby Bib 3PCS Pack Large is designed to give extra coverage and comfort during feeding time. Made from soft, gentle, and absorbent fabric, these large‑size bibs help protect your baby’s clothes from spills, milk drips, and drool. Each pack includes three durable bibs with a secure and comfortable fit. Easy to wash and ideal for everyday use, this set is a practical choice for babies who need a little more coverage.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Large size for better coverage</li>\n  <li>Soft and skin‑friendly fabric</li>\n  <li>Protects clothes from spills and drool</li>\n  <li>Comfortable and secure fit</li>\n  <li>Easy to wash and reuse</li>\n  <li>Pack of 3 for daily convenience</li>\n</ul>',
	},
	{
		sku: '100061',
		title: 'NB KIDZO BABY BIB MAGIC 3PCS',
		description:
			'<p>The NB Kidzo Baby Bib Magic 3PCS set is made with soft, gentle, and highly absorbent fabric to keep your baby clean and comfortable during meals. These bibs feature a “Magic” easy‑fit design that sits securely while protecting clothes from spills, drool, and food mess. Durable, lightweight, and perfect for everyday use, this 3‑piece set is ideal for newborns and infants.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Magic easy‑fit design</li>\n  <li>Soft and skin‑friendly fabric</li>\n  <li>Protects clothes from spills and drool</li>\n  <li>Lightweight and absorbent</li>\n  <li>Easy to wash and reuse</li>\n  <li>3‑piece pack for daily use</li>\n</ul>',
	},
	{
		sku: '100056',
		title: 'NUS BABY APPRIN BIB PLASTIC',
		description:
			'<p>The NUS Baby Apprin Plastic Bib is designed to provide full protection during feeding time. Made from lightweight, waterproof plastic material, it prevents spills, stains, and food splashes from reaching your baby’s clothes. The bib is easy to wipe clean, quick‑drying, and comfortable for everyday use. Ideal for babies who need strong mess control during meals.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Waterproof plastic material</li>\n  <li>Protects clothes from spills and stains</li>\n  <li>Lightweight and comfortable</li>\n  <li>Easy to wipe clean</li>\n  <li>Durable for long‑term use</li>\n  <li>Ideal for daily feeding sessions</li>\n</ul>',
	},
	{
		sku: '100055',
		title: 'NUS SLEEVE BIB CHINA PRINTED',
		description:
			'<p>The NUS Sleeve Bib China Printed is designed to give full‑sleeve protection, keeping your baby’s clothes clean from spills, splashes, and food mess. Made from lightweight, waterproof material, it’s comfortable for daily use and easy to wipe clean. The cute printed designs add charm while the elastic sleeves ensure a secure fit. Ideal for feeding, painting, and messy play activities.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Full‑sleeve protection</li>\n  <li>Waterproof and lightweight</li>\n  <li>Cute printed designs</li>\n  <li>Easy to wipe and wash</li>\n  <li>Perfect for feeding and messy play</li>\n  <li>Comfortable, secure fit for babies</li>\n</ul>',
	},
	{
		sku: '100057',
		title: 'TU BABY 2PCS PLASTIC APPRIN BIB',
		description:
			'<p>The TU Baby 2PCS Plastic Apprin Bib set is designed to keep your baby’s clothes fully protected during meals. Made from lightweight, waterproof plastic material, these bibs prevent spills, stains, and food mess from soaking through. Each bib is easy to wipe clean, quick‑drying, and comfortable for daily use. With a practical 2‑piece pack, you’ll always have a backup bib ready for feeding time.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Waterproof plastic material</li>\n  <li>Easy to wipe clean</li>\n  <li>Lightweight and comfortable</li>\n  <li>Protects clothes from spills and stains</li>\n  <li>Quick‑drying</li>\n  <li>2‑piece set for daily convenience</li>\n</ul>',
	},
	{
		sku: '100117',
		title: 'BABY CASUAL SHOES BLACK 12-18M',
		description:
			'<p>These Baby Casual Shoes in Black (12–18M) are designed for both comfort and daily wear. Made with soft inner padding and a flexible sole, they provide gentle support for growing feet. The slip‑on/easy‑wear design makes dressing quick and hassle‑free, while the classic black color matches any outfit. Perfect for outings, casual wear, and early walkers.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and comfortable inner padding</li>\n  <li>Flexible sole for easy movement</li>\n  <li>Lightweight and durable</li>\n  <li>Easy‑wear design</li>\n  <li>Stylish black color matches all outfits</li>\n  <li>Ideal for 12–18‑month babies</li>\n</ul>',
	},
	{
		sku: '100121',
		title: 'BABY CASUAL SHOES BLACK 18-24M',
		description:
			'<p>These Baby Casual Shoes in Black (18–24M) are designed to provide comfort, support, and style for little feet. Made with a soft inner lining and a flexible, lightweight sole, they help babies walk with ease. The classic black design pairs well with any outfit, making them perfect for daily wear, outings, and early walkers. Easy to put on and gentle on the feet, these shoes are ideal for active toddlers.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft inner padding for comfort</li>\n  <li>Flexible sole for natural movement</li>\n  <li>Durable and lightweight</li>\n  <li>Easy to wear and remove</li>\n  <li>Classic black color suits all outfits</li>\n  <li>Ideal for 18–24‑month toddlers</li>\n</ul>',
	},
	{
		sku: '100115',
		title: 'BABY CASUAL SHOES BLACK 6-12M',
		description:
			'<p>These Baby Casual Shoes in Black (6–12M) are designed to keep little feet comfortable and supported. Made with a soft inner lining and a flexible sole, they help babies move naturally while crawling or taking early steps. The easy‑wear design makes dressing quick, and the classic black color pairs well with any outfit. Ideal for everyday use, outings, and first walkers.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft and comfy inner lining</li>\n  <li>Flexible sole for natural movement</li>\n  <li>Lightweight and durable</li>\n  <li>Easy to wear and remove</li>\n  <li>Classic black color matches all outfits</li>\n  <li>Ideal for 6–12‑month babies</li>\n</ul>',
	},
	{
		sku: '100116',
		title: 'BABY CASUAL SHOES BLUE 18-24M',
		description:
			'<p>These Baby Casual Shoes in Blue (18–24M) are designed to give comfort, flexibility, and support for active toddlers. Featuring a soft inner lining and a lightweight, flexible sole, they help little ones walk confidently. The easy‑wear design makes them simple to put on, while the vibrant blue color adds a cute touch to any outfit. Perfect for daily wear, outings, and early walkers.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft inner padding for comfort</li>\n  <li>Flexible, lightweight sole</li>\n  <li>Easy to wear and remove</li>\n  <li>Durable for daily use</li>\n  <li>Stylish blue color</li>\n  <li>Ideal for 18–24‑month toddlers</li>\n</ul>',
	},
	{
		sku: '100118',
		title: 'BABY CASUAL SHOES LIGHT GREY 0-1M',
		description:
			'<p>These Baby Casual Shoes in Light Grey (0–1M) are designed especially for newborn comfort. Made with ultra‑soft fabric and a gentle, flexible sole, they keep tiny feet warm and cozy without restricting movement. The lightweight design ensures comfort during naps, outings, and daily wear. The neutral light‑grey color pairs perfectly with any newborn outfit.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Ultra‑soft material for newborn comfort</li>\n  <li>Flexible and gentle sole</li>\n  <li>Lightweight and breathable</li>\n  <li>Easy to put on</li>\n  <li>Neutral light‑grey color</li>\n  <li>Ideal for 0–1‑month newborns</li>\n</ul>',
	},
	{
		sku: '100120',
		title: 'BABY CASUAL SHOES MUSTARD 0-1M',
		description:
			'<p>The Baby Casual Shoes in Mustard (0–1M) are specially designed for newborn comfort. Made with gentle, ultra‑soft fabric and a flexible sole, they keep tiny feet warm without restricting natural movement. The lightweight design makes them ideal for naps, outings, or everyday wear, while the trendy mustard color adds a cute touch to any newborn outfit.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Ultra‑soft material for newborn comfort</li>\n  <li>Lightweight and breathable</li>\n  <li>Flexible sole for natural movement</li>\n  <li>Easy to put on and remove</li>\n  <li>Trendy mustard color</li>\n  <li>Ideal for 0–1‑month newborns</li>\n</ul>',
	},
	{
		sku: '100119',
		title: 'BABY CASUAL SHOES WHITE 1-3M',
		description:
			'<p>These Baby Casual Shoes in White (1–3M) are designed to keep your little one’s feet cozy, protected, and stylish. Made with ultra‑soft fabric and a flexible sole, they support natural movement without causing discomfort. The pure white color gives a clean, classic look that pairs easily with any outfit. Ideal for newborn outings, daily wear, and gentle foot protection.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Ultra‑soft and gentle material</li>\n  <li>Flexible sole for natural movement</li>\n  <li>Lightweight and breathable</li>\n  <li>Easy to put on and remove</li>\n  <li>Classic white color matches all outfits</li>\n  <li>Ideal for 1–3‑month babies</li>\n</ul>',
	},
	{
		sku: '100023',
		title: 'NEXTON BABY LOTION SMOOTH AND SOFT 500ML',
		description:
			'<p>Nexton Baby Lotion Smooth & Soft (500ml) is a gentle, nourishing formula created to keep your baby’s skin soft, hydrated, and protected throughout the day. Enriched with soothing ingredients, it helps prevent dryness, irritation, and roughness. The lightweight, non‑greasy texture absorbs quickly, making it ideal for everyday use after bath time or during bedtime routines. Safe for sensitive skin and dermatologically tested, this lotion ensures long‑lasting softness and comfort.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Gentle and safe for sensitive skin</li>\n  <li>Deep moisturization with fast absorption</li>\n  <li>Non‑greasy and lightweight</li>\n  <li>Prevents dryness and irritation</li>\n  <li>Mild, refreshing baby fragrance</li>\n  <li>Dermatologically tested</li>\n  <li>Large 500ml bottle for long‑lasting use</li>\n</ul>',
	},
	{
		sku: '100024',
		title: 'nexton baby lotion smooth and soft 250ML',
		description:
			'<p>Nexton Baby Lotion Smooth & Soft (250ml) is specially formulated for delicate baby skin. Its mild, nourishing ingredients help retain moisture, prevent dryness, and keep the skin smooth and healthy. The lightweight, non‑greasy formula absorbs quickly, making it perfect for everyday use after baths or before sleep. With a soft baby fragrance and dermatologically tested formula, this lotion provides long‑lasting moisture and comfort for sensitive skin.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Gentle and safe for sensitive skin</li>\n  <li>Fast‑absorbing, non‑greasy formula</li>\n  <li>Prevents dryness and irritation</li>\n  <li>Mild baby fragrance</li>\n  <li>Dermatologically tested</li>\n  <li>Handy 250ml bottle—perfect for travel and daily use</li>\n</ul>',
	},
	{
		sku: '100016',
		title: 'NEXTON BABY LOTION ALEOVERA 250ML',
		description:
			'<p>Nexton Baby Lotion Aloe Vera (250ml) is formulated with the natural goodness of aloe vera to provide deep hydration and gentle nourishment to delicate baby skin. Its soothing properties help calm irritation, prevent dryness, and keep the skin soft and fresh all day. The lightweight and non‑greasy formula absorbs quickly, making it perfect for daily use after bath time. Dermatologically tested and safe for sensitive skin, this lotion ensures long‑lasting moisture and protection.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Enriched with soothing aloe vera</li>\n  <li>Gentle on sensitive skin</li>\n  <li>Fast‑absorbing and non‑greasy</li>\n  <li>Helps prevent dryness and irritation</li>\n  <li>Mild baby fragrance</li>\n  <li>Dermatologically tested</li>\n  <li>Convenient 250ml daily‑use bottle</li>\n</ul>',
	},
	{
		sku: '100015',
		title: 'NEXTON BABY LOTION ALEOVERA 125ML',
		description:
			'<p>Nexton Baby Lotion Aloe Vera (125ml) is specially formulated for delicate baby skin. Enriched with natural aloe vera extract, it helps soothe irritation, prevent dryness, and maintain long‑lasting moisture. Its light, non‑greasy formula absorbs quickly and leaves the skin feeling soft and fresh. Perfect for daily use after bath time or before sleep, this dermatologically tested lotion is gentle enough for sensitive skin. The compact 125ml bottle is travel‑friendly and ideal for everyday care.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Enriched with natural aloe vera</li>\n  <li>Gentle on sensitive baby skin</li>\n  <li>Lightweight, non‑greasy texture</li>\n  <li>Helps relieve dryness and irritation</li>\n  <li>Mild, comforting baby fragrance</li>\n  <li>Dermatologically tested</li>\n  <li>Handy 125ml daily‑use bottle</li>\n</ul>',
	},
	{
		sku: '100022',
		title: 'nexton baby oil lavender 250ML',
		description:
			'<p>Nexton Baby Oil Lavender (250ml) is specially crafted to nourish and protect delicate baby skin. Infused with gentle lavender extract, it provides a calming effect that helps relax babies, especially during massage or bedtime routines. The lightweight formula absorbs smoothly, locking in moisture and preventing dryness. Suitable for daily use, this dermatologically tested oil keeps the skin soft, smooth, and delicately scented. Its 250ml bottle is perfect for regular home use.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Enriched with calming lavender</li>\n  <li>Helps relax baby during massage</li>\n  <li>Prevents dryness and locks in moisture</li>\n  <li>Gentle on sensitive baby skin</li>\n  <li>Lightweight, non-sticky formula</li>\n  <li>Dermatologically tested</li>\n  <li>Ideal 250ml bottle for everyday use</li>\n</ul>',
	},
	{
		sku: '100019',
		title: 'nexton baby oil lavender 125ML',
		description:
			'<p>Nexton Baby Oil Lavender (125ml) is a mild and nourishing oil formulated to care for delicate baby skin. Enriched with natural lavender extract, it provides a calming effect that helps relax babies during massage or bedtime routines. The lightweight, non‑sticky formula absorbs easily, locking in moisture and keeping the skin soft, smooth, and protected from dryness. Perfect for daily use, this dermatologically tested oil leaves a light, comforting lavender scent. The 125ml bottle is ideal for travel or regular home use.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Infused with gentle lavender extract</li>\n  <li>Helps soothe and relax baby</li>\n  <li>Locks in moisture, prevents dryness</li>\n  <li>Non‑sticky, quickly absorbed</li>\n  <li>Safe for sensitive baby skin</li>\n  <li>Dermatologically tested</li>\n  <li>Handy 125ml size for daily or travel use</li>\n</ul>',
	},
	{
		sku: '100021',
		title: 'nexton baby oil aloevera 65ML',
		description:
			'<p>Nexton Baby Oil Aloe Vera (65ml) is specially formulated to care for delicate baby skin. Enriched with natural aloe vera extract, it helps soothe irritation, prevent dryness, and keep the skin soft and moisturized. Its lightweight, non‑sticky texture absorbs easily, making it perfect for daily baby massage or post‑bath use. Dermatologically tested and mild on sensitive skin, this compact 65ml bottle is travel‑friendly and ideal for everyday use.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Enriched with natural aloe vera</li>\n  <li>Soothes and moisturizes delicate skin</li>\n  <li>Lightweight and non‑sticky</li>\n  <li>Gentle for sensitive baby skin</li>\n  <li>Quick‑absorbing formula</li>\n  <li>Dermatologically tested</li>\n  <li>Compact 65ml bottle for daily or travel use</li>\n</ul>',
	},
	{
		sku: '100020',
		title: 'nexton baby oil aloevera 125ML',
		description:
			'<p>Nexton Baby Oil Aloe Vera (125ml) is formulated to provide deep nourishment and comfort for delicate baby skin. Infused with natural aloe vera extract, it helps soothe irritation, prevent dryness, and maintain long‑lasting moisture. The lightweight, non‑sticky texture absorbs easily, making it ideal for daily massage or after‑bath care. Dermatologically tested and gentle on sensitive skin, this 125ml bottle is perfect for everyday use at home or on the go.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Enriched with natural aloe vera</li>\n  <li>Helps soothe & calm delicate skin</li>\n  <li>Locks in moisture and prevents dryness</li>\n  <li>Lightweight, non‑sticky formula</li>\n  <li>Gentle for sensitive baby skin</li>\n  <li>Dermatologically tested</li>\n  <li>Convenient 125ml bottle for daily use</li>\n</ul>',
	},
	{
		sku: '100012',
		title: 'nexton baby powder rash off 50gm',
		description:
			'<p>Nexton Baby Powder Rash Off (50gm) is specially formulated to keep your baby’s skin dry, fresh, and protected from rashes. Enriched with mild, skin‑friendly ingredients, it helps reduce friction, absorb excess moisture, and soothe irritation—especially in diaper areas. Its smooth, silky texture is gentle on sensitive skin and ideal for daily use. The compact 50gm size is perfect for travel and diaper bags.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Helps prevent diaper rash</li>\n  <li>Absorbs excess moisture</li>\n  <li>Soothes irritation and redness</li>\n  <li>Gentle on sensitive baby skin</li>\n  <li>Smooth and soft texture</li>\n  <li>Daily‑use safe formula</li>\n  <li>Compact 50gm pack for easy carry</li>\n</ul>',
	},
	{
		sku: '100011',
		title: 'nexton baby powder rash off 100gm',
		description:
			'<p>Nexton Baby Powder Rash Off (100gm) is specially designed to prevent and soothe diaper rash by keeping your baby’s skin dry and comfortable. Its gentle, skin‑friendly formula absorbs excess moisture, reduces friction, and calms irritation—making it ideal for daily use on sensitive areas. The silky, lightweight texture spreads smoothly without clumping, leaving the skin soft and fresh. The 100gm size is perfect for home use and lasts longer.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Helps prevent and calm diaper rash</li>\n  <li>Absorbs excess moisture effectively</li>\n  <li>Reduces friction and irritation</li>\n  <li>Gentle, smooth formula for sensitive skin</li>\n  <li>Ideal for daily use</li>\n  <li>Leaves skin soft, dry, and fresh</li>\n  <li>Long‑lasting 100gm pack</li>\n</ul>',
	},
	{
		sku: '100013',
		title: 'nexton baby powder nourishing 200gm',
		description:
			'<p>Nexton Baby Powder Nourishing (200gm) is designed to give your baby long‑lasting freshness and comfort. Its mild, talc‑based formula absorbs excess moisture, helps prevent friction, and keeps the skin smooth and dry. Enriched with skin‑friendly, nourishing ingredients, it supports healthy skin while maintaining softness. Perfect for daily use after bath time or diaper changes, the silky texture spreads easily and leaves a pleasant, gentle fragrance. The 200gm pack offers great value for regular home use.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Nourishing, skin‑friendly formula</li>\n  <li>Helps absorb moisture and reduce irritation</li>\n  <li>Keeps skin soft, dry, and fresh</li>\n  <li>Smooth, silky texture</li>\n  <li>Mild & gentle fragrance</li>\n  <li>Suitable for daily baby care</li>\n  <li>Value‑size 200gm pack</li>\n</ul>',
	},
	{
		sku: '100014',
		title: 'nexton baby powder nourishing 100gm',
		description:
			'<p>Nexton Baby Powder Nourishing (100gm) is created to maintain your baby’s comfort by absorbing excess moisture and reducing skin friction. Its mild, nourishing formula helps keep delicate skin smooth, fresh, and protected. With a silky texture and a light, pleasant fragrance, it is perfect for daily use after baths or diaper changes. The 100gm size is convenient for both home use and travel.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Nourishing & gentle formula</li>\n  <li>Absorbs moisture to prevent irritation</li>\n  <li>Leaves skin soft and smooth</li>\n  <li>Silky, easy‑to‑apply texture</li>\n  <li>Mild, pleasant fragrance</li>\n  <li>Suitable for everyday baby care</li>\n  <li>Handy 100gm pack for travel or home use</li>\n</ul>',
	},
	{
		sku: '100047',
		title: 'Nexton baby soap rose water',
		description:
			'<p>Nexton Baby Soap Rose Water is specially formulated for delicate baby skin. Enriched with natural rose water, it gently cleanses while helping maintain skin softness and hydration. Its mild, tear‑free formula creates a soft lather that washes away impurities without causing dryness or irritation. The calming rose scent leaves your baby feeling fresh and comfortable after every bath. Suitable for daily use on sensitive skin.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Enriched with soothing rose water</li>\n  <li>Gentle, tear‑free cleansing</li>\n  <li>Helps maintain skin softness and moisture</li>\n  <li>Mild fragrance for a refreshing feel</li>\n  <li>Suitable for sensitive baby skin</li>\n  <li>Perfect for everyday bathing</li>\n</ul>',
	},
	{
		sku: '100048',
		title: 'Nexton baby soap aloevera',
		description:
			'<p>Nexton Baby Soap Aloe Vera is specially made for gentle cleansing of your baby’s sensitive skin. Enriched with natural aloe vera extract, it helps soothe irritation, maintain moisture, and protect the skin’s softness. The tear‑free, mild formula creates a creamy lather that cleans without stripping natural oils. Its light, calming fragrance keeps your baby feeling fresh and comfortable after every bath. Perfect for everyday use on newborn and sensitive skin.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Enriched with soothing aloe vera</li>\n  <li>Gentle, tear‑free cleansing</li>\n  <li>Helps maintain moisture and softness</li>\n  <li>Mild, calming fragrance</li>\n  <li>Suitable for sensitive and newborn skin</li>\n  <li>Ideal for daily bath time</li>\n</ul>',
	},
	{
		sku: '100049',
		title: 'PAMPARS BABY WIPES 72PCS',
		description:
			'<p>Pampers Baby Wipes (72pcs) offer a mild yet effective cleansing experience for your baby’s sensitive skin. Made with a soft, thick texture, these wipes gently remove dirt and impurities while helping maintain the skin’s natural moisture balance. Their dermatologically tested, alcohol‑free, and fragrance‑friendly formula reduces the risk of irritation, making them ideal for diaper changes, feeding time cleanups, or everyday use. Conveniently packed, the 72pcs pack is perfect for home or travel.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft, thick, and gentle texture</li>\n  <li>Alcohol‑free & dermatologically tested</li>\n  <li>Helps maintain baby’s skin moisture</li>\n  <li>Suitable for sensitive skin</li>\n  <li>Multi‑purpose everyday use</li>\n  <li>Convenient 72pcs pack for home or travel</li>\n</ul>',
	},
	{
		sku: '100000',
		title: 'NEXTON BABY WIPES SOFT AND THICK 64PCS',
		description:
			'<p>Nexton Baby Wipes Soft & Thick (64pcs) are specially crafted to provide gentle cleansing for your baby’s sensitive skin. The wipes are made with a soft, thick, and durable fabric that cleans effectively without causing irritation. Enriched with mild moisturizers, they help maintain the natural softness of the skin and prevent dryness. Their alcohol‑free and dermatologically tested formula makes them safe for everyday use—perfect for diaper changes, feeding messes, or quick cleanups. The compact 64pcs pack is convenient to carry in diaper bags and ideal for home or travel.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft, thick, and durable wipes</li>\n  <li>Gentle and moisturizing formula</li>\n  <li>Alcohol‑free & dermatologically tested</li>\n  <li>Safe for sensitive baby skin</li>\n  <li>Suitable for diaper changes & daily cleanups</li>\n  <li>Handy 64pcs pack for home or travel</li>\n</ul>',
	},
	{
		sku: '100005',
		title: 'NEXTON BABY WIPES NATURAL ALOEVERA 64PCS',
		description:
			'<p>Nexton Baby Wipes Natural Aloe Vera (64pcs) are specially made to provide gentle and refreshing cleansing for your baby’s sensitive skin. Each wipe is infused with natural aloe vera extract that helps soothe irritation, moisturize the skin, and maintain its natural softness. With a thick, durable texture, these wipes clean effectively without causing discomfort.\nFree from alcohol and harsh chemicals, these dermatologically tested wipes are safe for newborns and ideal for diaper changing, feeding cleanups, or quick on‑the‑go hygiene. The resealable pack keeps the wipes moist and fresh for everyday use.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Enriched with natural aloe vera</li>\n  <li>Soft, thick, and gentle fabric</li>\n  <li>Alcohol‑free & dermatologically tested</li>\n  <li>Helps prevent dryness and irritation</li>\n  <li>Safe for newborns and sensitive skin</li>\n  <li>Resealable pack keeps wipes fresh</li>\n</ul>',
	},
	{
		sku: '100006',
		title: 'NEXTON BABY WIPES FRAGRANCE FREE 64PCS',
		description:
			'<p>Nexton Baby Wipes Fragrance Free (64pcs) are specially designed for babies with delicate, sensitive, or fragrance‑reactive skin. Made with a soft and thick material, these wipes provide smooth and effective cleaning during diaper changes, feeding times, and daily hygiene.\nThe fragrance‑free, alcohol‑free, and paraben‑free formula ensures safe use on newborn skin without causing irritation. Each wipe is dermatologically tested and enriched with mild moisturizers to help maintain natural skin softness. The resealable pack keeps wipes moist, hygienic, and ready for everyday use at home or on‑the‑go.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Fragrance‑free & hypoallergenic</li>\n  <li>Soft, thick, and gentle wipes</li>\n  <li>Alcohol‑free & paraben‑free</li>\n  <li>Safe for newborns & sensitive skin</li>\n  <li>Dermatologically tested formula</li>\n  <li>Resealable pack for everyday use</li>\n</ul>',
	},
	{
		sku: '100041',
		title: 'Johnson baby wipes 84pcs',
		description:
			'<p>Johnson’s Baby Wipes 84pcs provide gentle cleansing specially formulated for newborn and sensitive baby skin. Made with Johnson’s signature No More Tears formula, these wipes are mild, dermatologist‑tested, and free from harsh chemicals.\nThe ultra‑soft fabric ensures comfortable cleaning during diaper changes, feeding messes, and daily hygiene. Enriched with mild moisturizers, the wipes help maintain natural skin softness while preventing dryness and irritation.\nConveniently packed with a resealable lid to keep wipes fresh, moist, and hygienic for everyday use at home or while traveling.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Johnson’s No More Tears mild formula</li>\n  <li>Extra soft, gentle, and thick wipes</li>\n  <li>Dermatologist‑tested</li>\n  <li>Alcohol‑free & paraben‑free</li>\n  <li>Helps prevent dryness and irritation</li>\n  <li>Resealable lid keeps wipes fresh</li>\n</ul>',
	},
	{
		sku: '100042',
		title: 'Johnson baby wipes 60pcs',
		description:
			'<p>Johnson’s Baby Wipes 60pcs are formulated with the trusted No More Tears mildness, making them safe and gentle for newborn and sensitive skin. The ultra‑soft wipes provide smooth and comfortable cleaning during diaper changes and everyday hygiene without causing irritation.\nThese wipes are enriched with mild moisturizers to prevent dryness and maintain natural skin softness. Dermatologist‑tested and free from alcohol and harsh chemicals, they ensure gentle, everyday care. The compact resealable pack keeps the wipes fresh, moist, and perfect for travel or quick use anytime.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>No More Tears gentle formula</li>\n  <li>Soft, thick, and mild wipes</li>\n  <li>Alcohol‑free & paraben‑free</li>\n  <li>Dermatologist‑tested</li>\n  <li>Helps prevent dryness & irritation</li>\n  <li>Compact resealable pack for freshness</li>\n</ul>',
	},
	{
		sku: '100164',
		title: 'JOHNSON BABY WIPES 72pcs',
		description:
			'<p>Johnson Baby Wipes 72pcs — ultra‑gentle, dermatologist‑tested wipes designed for everyday baby skin care.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Dermatologist‑tested formula</li>\n  <li>Gentle on sensitive baby skin</li>\n  <li>Soft & durable wipe material</li>\n  <li>Suitable for newborns</li>\n  <li>Ideal for diaper changes & daily use</li>\n  <li>Convenient 72‑piece pack</li>\n</ul>',
	},
	{
		sku: '100068',
		title: 'Pigeon baby shampoo 200ML',
		description:
			'<p>Pigeon Baby Shampoo 200ml is crafted with a mild, tear‑free formula that gently cleanses your baby’s hair without irritating the eyes or skin. Enriched with natural conditioning ingredients, it helps keep the hair soft, smooth, and tangle‑free.\nThe hypoallergenic and pH‑balanced formula is suitable for newborns and sensitive scalps. It cleans effectively while maintaining natural moisture, preventing dryness or irritation. Its light fragrance leaves the hair fresh and pleasant throughout the day.\nPerfect for daily use and dermatologist‑tested for safe baby care.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Tear‑free gentle formula</li>\n  <li>pH‑balanced & hypoallergenic</li>\n  <li>Softens and smooths baby hair</li>\n  <li>Safe for newborns & sensitive scalps</li>\n  <li>Light, pleasant fragrance</li>\n  <li>Dermatologist‑tested</li>\n</ul>',
	},
	{
		sku: '100027',
		title: 'nexton baby aloevera shampoo 250ML',
		description:
			'<p>Nexton Baby Aloe Vera Shampoo 250ml is specially formulated with the natural soothing power of aloe vera to gently clean your baby’s hair while keeping the scalp soft and comfortable. Its mild, tear‑free formula ensures a stress‑free bath time, protecting your baby’s eyes and sensitive skin.\nThe shampoo helps maintain natural moisture, leaving hair soft, smooth, and easy to manage. Dermatologically tested and free from harsh chemicals, it is suitable for newborns and babies with sensitive skin. Perfect for everyday use, offering a refreshing and calming bath experience.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Aloe vera–enriched gentle formula</li>\n  <li>Tear‑free and safe for newborns</li>\n  <li>Keeps hair soft, smooth & manageable</li>\n  <li>Dermatologically tested</li>\n  <li>Mild fragrance for a fresh feel</li>\n  <li>Suitable for sensitive baby skin</li>\n</ul>',
	},
	{
		sku: '100044',
		title: 'Nexton baby diaper care cream 75ml',
		description:
			'<p>Nexton Baby Diaper Care Cream 75ml is specially designed to protect your baby’s delicate skin from irritation caused by wetness and friction. Enriched with gentle moisturizing ingredients, it forms a protective barrier that helps prevent diaper rash while soothing existing redness.\nThe lightweight, non‑sticky texture absorbs easily, providing lasting comfort without clogging pores. Dermatologically tested and free from harsh chemicals, it is safe for newborns and suitable for daily diaper‑change routines.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Helps prevent diaper rash</li>\n  <li>Forms protective moisture barrier</li>\n  <li>Soothes redness & irritation</li>\n  <li>Gentle formula for newborns</li>\n  <li>Quick‑absorbing, non‑sticky texture</li>\n  <li>Dermatologically tested</li>\n</ul>',
	},
	{
		sku: '100043',
		title: 'Nexton baby diaper care cream 150ml',
		description:
			'<p>Nexton Baby Diaper Care Cream 150ml is designed to protect delicate baby skin from irritation caused by moisture, friction, and long diaper use. Its soothing formula creates a protective barrier that helps prevent diaper rash, redness, and discomfort.\nThe cream absorbs quickly without leaving a greasy layer, keeping the baby’s skin dry, fresh, and nourished. Enriched with skin‑calming ingredients, it is suitable for newborns and babies with sensitive skin.\nDermatologically tested and free from harsh chemicals, making it ideal for daily diaper‑change routines.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Prevents diaper rash</li>\n  <li>Forms a gentle protective barrier</li>\n  <li>Soothes irritation & redness</li>\n  <li>Safe for newborns and sensitive skin</li>\n  <li>Quick‑absorbing, non‑sticky formula</li>\n  <li>Dermatologically tested</li>\n</ul>',
	},
	{
		sku: '100029',
		title: 'DR.RASHEL MOISTURIZING CREAM YELLOW',
		description:
			'<p>Dr.Rashel Moisturizing Cream Yellow is formulated to deeply hydrate and nourish the skin, keeping it soft, smooth, and naturally glowing. Its lightweight, non‑greasy texture absorbs easily, providing instant moisture without clogging pores.\nEnriched with skin‑friendly ingredients, this cream helps maintain the skin’s natural balance while preventing dryness and roughness. Ideal for everyday use on face and body, it leaves the skin feeling fresh, moisturized, and comfortable throughout the day.\nDermatologically safe and suitable for all skin types.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Deep hydration for soft, smooth skin</li>\n  <li>Lightweight & non‑greasy formula</li>\n  <li>Fast‑absorbing</li>\n  <li>Helps prevent dryness</li>\n  <li>Suitable for all skin types</li>\n  <li>Daily‑use dermatologist‑safe formula</li>\n</ul>',
	},
	{
		sku: '100004',
		title: 'Dr.Rashel Moisturizing Cream Pink',
		description:
			'<p>Dr.Rashel Moisturizing Cream Pink is formulated to deliver deep hydration while maintaining a lightweight, comfortable feel on the skin. It absorbs quickly, leaving no greasy residue, and helps restore the skin’s natural moisture barrier.\nEnriched with gentle skin‑loving ingredients, it keeps the skin soft, supple, and protected from dryness. Suitable for everyday use on all skin types, this cream provides long‑lasting freshness and smoothness.\nPerfect for face and body care, and ideal for daily moisturizing routines.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Deep, long‑lasting hydration</li>\n  <li>Lightweight & quick‑absorbing</li>\n  <li>Softens and smooths skin</li>\n  <li>Non‑greasy, comfortable feel</li>\n  <li>Suitable for all skin types</li>\n  <li>Ideal for daily moisturizing</li>\n</ul>',
	},
	{
		sku: '100001',
		title: 'DR.RASHEL MOISTURIZING CREAM BLUE',
		description:
			'<p>Dr.Rashel Moisturizing Cream Blue is formulated to deliver deep moisture while giving the skin a fresh, cooling feel. Its lightweight, non‑sticky texture absorbs quickly, making it perfect for everyday use on both face and body.\nEnriched with gentle nourishing ingredients, it helps restore the skin’s natural moisture barrier, prevents dryness, and leaves the skin soft, smooth, and refreshed.\nSuitable for all skin types and safe for daily use, this cream maintains hydration and comfort throughout the day without clogging pores.\n\n✅ Slug</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Deep hydration & nourishment</li>\n  <li>Cooling, refreshing feel</li>\n  <li>Lightweight & fast‑absorbing</li>\n  <li>Non‑greasy daily formula</li>\n  <li>Helps prevent dryness</li>\n  <li>Suitable for all skin types</li>\n</ul>',
	},
	{
		sku: '100031',
		title: 'Dr.Rashel Baby Diaper Rash Cream',
		description:
			'<p>Dr.Rashel Baby Diaper Rash Cream is specially formulated to protect delicate baby skin from irritation caused by wetness, friction, and long diaper wear. Its gentle, skin‑calming formula forms a protective barrier that shields the skin while helping soothe redness, inflammation, and discomfort.\nEnriched with moisturizing and healing ingredients, it keeps the skin soft, nourished, and dry. The cream absorbs easily, is non‑sticky, and safe for everyday diaper‑change routines.\nDermatologically tested and suitable for newborns and sensitive baby skin.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Helps prevent diaper rash</li>\n  <li>Soothes redness & irritation</li>\n  <li>Forms protective moisture barrier</li>\n  <li>Gentle, baby‑safe formula</li>\n  <li>Non‑sticky & fast‑absorbing</li>\n  <li>Dermatologically tested</li>\n</ul>',
	},
	{
		sku: '100008',
		title: 'NEXTON BABY COLOGNE SECRET LOVE 80ML',
		description:
			'<p>Nexton Baby Cologne Secret Love 80ml is a gentle and refreshing fragrance crafted to keep your baby smelling clean and sweet throughout the day. Its mild formula is skin‑friendly, making it suitable for babies’ delicate and sensitive skin.\nThe soft, long‑lasting scent adds freshness after a bath, before going out, or anytime you want your baby to feel extra fresh.\nThis cologne is alcohol‑safe, dermatologically tested, and perfect for daily use.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft & gentle fragrance</li>\n  <li>Safe for sensitive baby skin</li>\n  <li>Long‑lasting freshness</li>\n  <li>Alcohol‑safe & dermatologically tested</li>\n  <li>Ideal for daily use</li>\n</ul>',
	},
	{
		sku: '100007',
		title: 'NEXTON BABY COLOGNE PURE LOVE 80ML',
		description:
			'<p>Nexton Baby Cologne Pure Love 80ml offers a gentle, refreshing scent specially formulated for delicate baby skin. Its mild and soothing fragrance provides long‑lasting freshness without causing irritation.\nPerfect for daily use, this cologne adds a soft, pleasant aroma after bath time, before outings, or anytime your baby needs an extra touch of freshness.\nThe formula is alcohol‑safe, dermatologically tested, and suitable for even the most sensitive skin types.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft, mild fragrance</li>\n  <li>Safe for sensitive baby skin</li>\n  <li>Long‑lasting freshness</li>\n  <li>Alcohol‑safe formula</li>\n  <li>Dermatologically tested</li>\n  <li>Ideal for everyday use</li>\n</ul>',
	},
	{
		sku: '100063',
		title: 'FARLIN BABY FEEDING BOTTLE WASH 700ML',
		description:
			'<p>Farlin Baby Feeding Bottle Wash 700ml is specially formulated to ensure thorough and safe cleaning of baby bottles, nipples, sippers, and other feeding items.\nIts mild, plant‑based formula effectively removes milk stains, grease, and harmful residues without leaving any fragrance or chemical traces behind.\nThis bottle wash creates a rich lather that cleans deeply while remaining gentle on the skin. It is free from harsh chemicals, making it completely safe for newborn feeding items.\nIdeal for daily use to maintain the highest hygiene standards for your baby’s feeding routine.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Removes milk residue & grease effectively</li>\n  <li>Plant‑based, gentle formula</li>\n  <li>Safe for newborn feeding accessories</li>\n  <li>No harsh chemicals or strong fragrance</li>\n  <li>Rich lather for deep cleaning</li>\n  <li>Ideal for daily hygiene</li>\n</ul>',
	},
	{
		sku: '100064',
		title: 'Farlin baby feeding bottle wash 500ML',
		description:
			'<p>Farlin Baby Feeding Bottle Wash 500ml is specially formulated for safe and thorough cleaning of baby bottles, nipples, sippers, pacifiers, and feeding utensils.\nIts mild, biodegradable formula removes tough milk stains and grease without leaving any harmful chemical traces.\nThe wash produces a rich, foamy lather that cleans deeply while remaining gentle on hands.\nFree from artificial colors, strong fragrances, and harsh chemicals, making it safe for newborn feeding essentials.\nIdeal for everyday use to maintain hygiene and protect your baby’s health.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Removes milk residue & grease efficiently</li>\n  <li>Plant‑based & gentle formula</li>\n  <li>Safe for newborn feeding accessories</li>\n  <li>No harsh chemicals or strong scents</li>\n  <li>Rich foaming lather for deep cleaning</li>\n  <li>Perfect for daily hygiene</li>\n</ul>',
	},
	{
		sku: '100149',
		title: 'U TEETHER CAR YELLOW',
		description:
			'<p>The U Teether Car Yellow is a gentle and effective teething toy crafted to provide comfort during your baby’s teething stage.\nMade from high‑quality, BPA‑free material, it is completely safe for daily chewing. The cute car design fits perfectly in small hands, helping babies grasp and hold it easily.\nIts textured surface offers soothing gum relief while supporting sensory development.\nThe bright yellow color keeps babies engaged and visually stimulated. Simple to wash and ideal for everyday use.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft, BPA‑free material</li>\n  <li>Textured surface for gum relief</li>\n  <li>Easy‑to‑hold car shape</li>\n  <li>Bright & engaging yellow color</li>\n  <li>Supports sensory development</li>\n  <li>Simple to clean & safe for daily use</li>\n</ul>',
	},
	{
		sku: '100148',
		title: 'U TEETHER CAR BLUE',
		description:
			'<p>The U Teether Car Blue is a gentle, baby‑friendly teething toy made to comfort infants during the teething stage.\nCrafted from BPA‑free, non‑toxic material, it is completely safe for babies to chew on daily.\nThe playful car shape helps little hands grip it easily, improving hand‑eye coordination.\nIts textured surface massages the gums, providing soothing relief while supporting sensory development.\nThe bright blue color makes it visually appealing and engaging for babies. Easy to wash and durable for everyday use.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>BPA‑free & non‑toxic</li>\n  <li>Soft, chew‑friendly material</li>\n  <li>Textured surface for gum comfort</li>\n  <li>Easy‑to‑grip car shape</li>\n  <li>Bright blue color for visual appeal</li>\n  <li>Safe, washable & durable</li>\n</ul>',
	},
	{
		sku: '100139',
		title: 'TEETHER STRAWBERRY RED HERCULES BEAR',
		description:
			'<p>The Teether Strawberry Red by Hercules Bear is a gentle, baby‑safe teething toy crafted to comfort babies during the teething phase.\nMade from high‑quality, BPA‑free material, it is completely safe for daily chewing and helps relieve gum discomfort.\nIts cute strawberry shape and lightweight design make it easy for small hands to hold, improving grip and hand‑eye coordination.\nThe textured surface provides soothing massage to gums while stimulating sensory development.\nBright red color makes it visually appealing and engaging for babies. Easy to wash and suitable for everyday use.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>BPA‑free & non‑toxic</li>\n  <li>Soft and safe for chewing</li>\n  <li>Strawberry‑shaped design for easy grip</li>\n  <li>Textured surface for gum relief</li>\n  <li>Bright red color for visual engagement</li>\n  <li>Easy to clean & durable for daily use</li>\n</ul>',
	},
	{
		sku: '100140',
		title: 'TEETHER STRAWBERRY PINK HERCULES BEAR',
		description:
			'<p>The Teether Strawberry Pink by Hercules Bear is a gentle, BPA‑free teething toy made to comfort babies during the teething stage.\nIts soft, chew‑friendly material helps relieve gum discomfort while staying completely safe for daily use.\nThe adorable strawberry shape is lightweight and easy for small hands to hold, supporting grip and early motor development.\nA textured surface provides soothing gum massage and encourages sensory stimulation.\nThe bright pink color keeps babies visually engaged. Easy to wash, durable, and perfect for everyday use.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>BPA‑free & non‑toxic</li>\n  <li>Soft and gentle for chewing</li>\n  <li>Easy‑to‑hold strawberry shape</li>\n  <li>Textured surface for gum relief</li>\n  <li>Bright pink color for visual stimulation</li>\n  <li>Easy to clean & suitable for daily use</li>\n</ul>',
	},
	{
		sku: '100138',
		title: 'TEETHER OWL PINK FLOWER BABY',
		description:
			'<p>The Teether Owl Pink Flower Baby is a soft, BPA‑free teething toy designed to comfort babies during the teething stage.\nIts adorable owl shape with a flower detail makes it fun and easy for little hands to hold.\nThe chew‑friendly, safe material helps relieve gum discomfort, while the textured surface supports sensory development.\nLightweight, durable, and easy to clean — perfect for daily teething relief.\nThe bright pink color keeps babies visually engaged and happy while chewing.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>BPA‑free & baby‑safe</li>\n  <li>Cute owl shape with flower design</li>\n  <li>Soft material for gentle chewing</li>\n  <li>Textured surface for gum relief</li>\n  <li>Lightweight & easy to hold</li>\n  <li>Easy to clean & durable for daily use</li>\n</ul>',
	},
	{
		sku: '100137',
		title: 'TEETHER KOALA BLUE FLOWER BABY',
		description:
			'<p>The Teether Koala Blue Flower Baby is a gentle, BPA‑free teething toy designed to comfort infants during the teething stage.\nIts adorable koala shape with a small flower detail makes it fun, attractive, and extremely easy for little hands to grip.\nMade from soft, chew‑friendly material, it helps soothe sore gums while the textured areas provide added sensory stimulation.\nLightweight, durable, and simple to wash, this teether is perfect for daily use.\nThe bright blue color keeps babies engaged and visually stimulated.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>BPA‑free & non‑toxic</li>\n  <li>Cute koala shape with flower detail</li>\n  <li>Soft and safe for chewing</li>\n  <li>Textured surface for gum relief</li>\n  <li>Lightweight & easy for babies to hold</li>\n  <li>Easy to clean & durable for everyday use</li>\n</ul>',
	},
	{
		sku: '100136',
		title: 'TEETHER ELEPHANT BABY PINK FLOWER BABY',
		description:
			'<p>The Teether Elephant Baby Pink Flower is a BPA‑free, gentle teething toy designed to comfort babies during the teething phase.\nIts adorable elephant shape with a small flower detail makes it fun, attractive, and easy for little hands to hold securely.\nCrafted from soft, chew‑friendly material, it helps relieve gum discomfort while the textured surface encourages sensory development.\nLightweight, durable, and easy to clean — ideal for everyday use.\nThe bright pink color keeps babies visually engaged and happy while chewing.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>BPA‑free & non‑toxic</li>\n  <li>Cute elephant shape with flower detail</li>\n  <li>Soft, chew‑friendly material</li>\n  <li>Textured surface for gum relief</li>\n  <li>Lightweight & easy to hold</li>\n  <li>Durable & simple to clean</li>\n</ul>',
	},
	{
		sku: '100141',
		title: 'TEETHER DUCK CYAN HERCULES BEAR',
		description:
			'<p>The Teether Duck Cyan by Hercules Bear is a BPA‑free, gentle teething toy created to comfort babies during the teething stage.\nIts adorable duck shape makes it fun, attractive, and very easy for small hands to hold.\nMade from soft, chew‑friendly material, it helps relieve gum discomfort while the textured areas provide soothing massage and sensory stimulation.\nThe bright cyan color keeps babies visually engaged and excited.\nLightweight, durable, and simple to clean — perfect for everyday teething relief.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>BPA‑free & non‑toxic</li>\n  <li>Cute duck shape</li>\n  <li>Soft and safe for chewing</li>\n  <li>Textured surface for gum soothing</li>\n  <li>Lightweight & easy for babies to hold</li>\n  <li>Durable & easy to clean</li>\n</ul>',
	},
	{
		sku: '100134',
		title: 'TEETHER DINO YELLOW FLOWER BABY',
		description:
			'<p>The Teether Dino Yellow Flower Baby is a BPA‑free, gentle teething toy designed to comfort babies during the teething stage.\nIts adorable dinosaur shape with a flower detail makes it fun, eye‑catching, and easy for small hands to hold securely.\nCrafted from soft, chew‑friendly, non‑toxic material, it helps relieve gum soreness while the textured areas stimulate sensory development.\nThe bright yellow color keeps babies visually engaged, making teething time more enjoyable.\nLightweight, durable, and easy to clean — perfect for everyday teething relief.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>BPA‑free & non‑toxic</li>\n  <li>Cute dinosaur shape with flower detail</li>\n  <li>Soft and safe for chewing</li>\n  <li>Textured surface for gum relief</li>\n  <li>Lightweight & easy for babies to hold</li>\n  <li>Durable & easy to clean</li>\n</ul>',
	},
	{
		sku: '100135',
		title: 'TEETHER DINO PURPLE FLOWER BABY',
		description:
			'<p>The Teether Dino Purple Flower Baby is a BPA‑free, gentle teething toy designed to comfort babies during the teething stage.\nIts adorable purple dinosaur shape with a small flower detail makes it fun, attractive, and easy for infants to hold securely.\nMade from soft, chew‑friendly material, it helps relieve gum discomfort, while textured areas stimulate sensory development.\nThe bright purple color keeps babies visually engaged and entertained.\nLightweight, durable, and easy to clean — perfect for everyday teething relief.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>BPA‑free & non‑toxic</li>\n  <li>Cute purple dinosaur shape</li>\n  <li>Soft, chew‑friendly material</li>\n  <li>Textured surface for gum comfort</li>\n  <li>Lightweight & easy to grip</li>\n  <li>Durable & simple to clean</li>\n</ul>',
	},
	{
		sku: '100128',
		title: 'MITTENS TEETHER SILICONE ORANGE ONLY BABY',
		description:
			'<p>The Mittens Teether Silicone Orange by Only Baby is a BPA‑free, gentle teething toy made from premium soft silicone.\nIts cute mitten shape is easy for little hands to grip and chew safely.\nThe flexible, chew‑friendly material helps relieve gum discomfort, while the textured surface supports sensory and oral development.\nThe bright orange color stimulates visual interest, keeping babies engaged.\nLightweight, durable, and easy to clean — perfect for everyday teething relief.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>BPA‑free premium silicone</li>\n  <li>Soft & gentle for chewing</li>\n  <li>Cute mitten‑shaped design</li>\n  <li>Textured surface for gum relief</li>\n  <li>Lightweight & easy for babies to hold</li>\n  <li>Easy to wash & durable for daily use</li>\n</ul>',
	},
	{
		sku: '100129',
		title: 'MITTENS TEETHER SILICONE LIGHT GREEN ONLY BABY',
		description:
			'<p>The Mittens Teether Silicone Light Green by Only Baby is a BPA‑free, flexible silicone teething toy made to comfort babies during teething.\nIts adorable mitten shape is easy for small hands to hold, grip, and chew safely.\nThe soft, chew‑friendly material helps reduce gum discomfort, while the textured surfaces support sensory development and oral stimulation.\nIts light green color is calming and visually appealing for babies.\nLightweight, durable, and easy to clean — ideal for everyday teething comfort.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>BPA‑free premium silicone</li>\n  <li>Soft, flexible & safe for chewing</li>\n  <li>Cute mitten‑shaped design</li>\n  <li>Textured surface for gum relief</li>\n  <li>Lightweight & easy for babies to hold</li>\n  <li>Durable & easy to clean</li>\n</ul>',
	},
	{
		sku: '100126',
		title: 'MITTENS TEETHER SILICONE GREEN ONLY BABY',
		description:
			'<p>The Mittens Teether Silicone Green by Only Baby is a BPA‑free, flexible silicone teething toy specially designed to comfort babies during their teething phase.\nIts cute mitten‑shaped design is easy for infants to grip and chew safely.\nMade from soft, chew‑friendly silicone, it helps soothe irritated gums while the textured surface supports sensory and oral development.\nThe bright green color keeps babies visually engaged and interested.\nLightweight, durable, and simple to wash — perfect for daily teething relief.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>BPA‑free premium silicone</li>\n  <li>Soft, flexible & safe for chewing</li>\n  <li>Cute mitten‑shaped design</li>\n  <li>Textured surface for gum relief</li>\n  <li>Lightweight & easy to hold</li>\n  <li>Durable & easy to wash</li>\n</ul>',
	},
	{
		sku: '100127',
		title: 'MITTENS TEETHER SILICONE BABY PINK ONLY BABY',
		description:
			'<p>The Mittens Teether Silicone Baby Pink by Only Baby is a BPA‑free, flexible silicone teething toy created to comfort babies during the teething stage.\nIts adorable mitten shape is easy for infants to grip and chew safely.\nMade from soft, chew‑friendly silicone, it helps relieve gum irritation while the textured surface supports sensory and oral development.\nThe gentle baby‑pink color is calming and visually appealing for little ones.\nLightweight, durable, and easy to wash — perfect for everyday teething relief.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>BPA‑free premium silicone</li>\n  <li>Soft & safe for chewing</li>\n  <li>Cute mitten‑shaped design</li>\n  <li>Textured surface for gum relief</li>\n  <li>Lightweight & easy for babies to hold</li>\n  <li>Durable & easy to clean</li>\n</ul>',
	},
	{
		sku: '100133',
		title: 'BABY BELL TEETHER RING',
		description:
			'<p>The Baby Bell Teether Ring is a BPA‑free teething toy created to comfort babies during the teething stage.\nIts circular ring shape is easy for small hands to grip, while the soft material is perfect for safe chewing.\nA gentle built‑in bell adds sensory stimulation, helping babies stay engaged and entertained.\nThe textured surfaces provide soothing relief to sore gums and encourage oral development.\nLightweight, durable, and easy to clean — ideal for everyday teething comfort and playful interaction.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>BPA‑free & non‑toxic</li>\n  <li>Built‑in gentle bell sound</li>\n  <li>Soft and safe for chewing</li>\n  <li>Textured gum‑soothing design</li>\n  <li>Lightweight & easy to grip</li>\n  <li>Durable & simple to clean</li>\n</ul>',
	},
	{
		sku: '100144',
		title: 'FEEDER BRUSH SILICONE YELLOW',
		description:
			'<p>The Feeder Brush Silicone Yellow is a high‑quality, BPA‑free bottle‑cleaning brush made from soft and flexible silicone.\nIt is designed to clean baby feeders, nipples, and wide‑neck bottles without scratching or damaging surfaces.\nThe durable silicone bristles remove milk residue easily while resisting bacteria buildup.\nIts bright yellow color makes it easy to spot, and the non‑slip handle ensures a steady, comfortable grip during cleaning.\nEasy to wash, long‑lasting, and safe — the perfect tool for maintaining baby feeder hygiene.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>BPA‑free silicone bristles</li>\n  <li>Soft, flexible & scratch‑free cleaning</li>\n  <li>Non‑slip comfortable handle</li>\n  <li>Hygienic & easy to wash</li>\n  <li>Durable and long‑lasting</li>\n  <li>Ideal for feeders, nipples & bottles</li>\n</ul>',
	},
	{
		sku: '100142',
		title: 'FEEDER BRUSH SILICONE SKIN',
		description:
			'<p>The Feeder Brush Silicone Skin is a BPA‑free, high‑quality cleaning brush made with durable and flexible silicone bristles.\nPerfect for cleaning baby feeders, nipples, and wide‑neck bottles, it removes residue effectively without scratching delicate surfaces.\nThe soft silicone material resists bacterial buildup and is easy to wash and sanitize.\nIts neutral skin‑tone color gives it a clean, minimal look, while the ergonomic handle ensures a comfortable non‑slip grip.\nLong‑lasting, hygienic, and gentle — a must‑have tool for maintaining bottle cleanliness.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>BPA‑free premium silicone</li>\n  <li>Soft, flexible & scratch‑free</li>\n  <li>Hygienic, resists bacterial buildup</li>\n  <li>Ergonomic non‑slip handle</li>\n  <li>Durable & long‑lasting</li>\n  <li>Ideal for feeders, nipples & bottles</li>\n</ul>',
	},
	{
		sku: '100143',
		title: 'FEEDER BRUSH SILICONE PURPLE',
		description:
			'<p>The Feeder Brush Silicone Purple is a BPA‑free, durable bottle‑cleaning brush made with flexible silicone bristles for gentle yet effective cleaning.\nIt easily reaches inside feeders, nipples, and wide‑neck bottles to remove milk residue without scratching the surfaces.\nThe silicone material resists bacterial buildup, ensuring hygienic cleaning every time.\nIts vibrant purple color adds a fun touch, while the ergonomic non‑slip handle offers a steady and comfortable grip.\nEasy to wash, long‑lasting, and safe — perfect for keeping baby feeding accessories spotless.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>BPA‑free & non‑toxic silicone</li>\n  <li>Soft, flexible & scratch‑free</li>\n  <li>Hygienic and easy to clean</li>\n  <li>Non‑slip ergonomic handle</li>\n  <li>Durable and long‑lasting</li>\n  <li>Ideal for feeders, nipples & bottles</li>\n</ul>',
	},
	{
		sku: '100145',
		title: 'FEEDER BRUSH SILICONE GREEN',
		description:
			'<p>The Feeder Brush Silicone Green is a BPA‑free, high‑quality cleaning brush made with durable and flexible silicone bristles.\nIt is ideal for cleaning baby feeders, nipples, and wide‑neck bottles without causing scratches or damage.\nThe silicone bristles remove milk residue effectively while resisting bacteria buildup, ensuring hygienic cleaning.\nIts bright green color makes it easy to spot in your kitchen, and the ergonomic non‑slip handle provides a comfortable grip.\nEasy to wash, long‑lasting, and safe — perfect for maintaining proper bottle hygiene.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>BPA‑free silicone</li>\n  <li>Soft, flexible & scratch‑free</li>\n  <li>Hygienic, resists bacterial buildup</li>\n  <li>Non‑slip ergonomic handle</li>\n  <li>Durable & long‑lasting</li>\n  <li>Ideal for feeders, nipples & bottles</li>\n</ul>',
	},
	{
		sku: '100146',
		title: 'BABY SILICONE BOTTLE BRUSH ORANGE SMART BABY',
		description:
			'<p>The Baby Silicone Bottle Brush Orange by Smart Baby is a BPA‑free, premium bottle‑cleaning brush made from soft and flexible silicone bristles.\nIt easily reaches inside feeders, nipples, and wide‑neck bottles, removing milk residue without scratching surfaces.\nThe silicone material is hygienic, resists bacterial buildup, and dries quickly, making it safer than traditional sponge brushes.\nIts bright orange color gives it a clean, vibrant look, and the ergonomic non‑slip handle offers a firm, comfortable grip.\nDurable, long‑lasting, and easy to wash — the perfect tool for maintaining baby bottle hygiene.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>BPA‑free premium silicone</li>\n  <li>Soft & scratch‑free cleaning</li>\n  <li>Hygienic, resists bacterial buildup</li>\n  <li>Bright, easy‑to‑spot orange color</li>\n  <li>Comfortable non‑slip handle</li>\n  <li>Durable & easy to clean</li>\n  <li>Perfect for bottles, nipples & feeders</li>\n</ul>',
	},
	{
		sku: '100147',
		title: 'BABY SILICONE BOTTLE BRUSH GREEN SMART BABY',
		description:
			'<p>The Baby Silicone Bottle Brush Green by Smart Baby is made from BPA‑free, high‑quality silicone bristles that provide gentle yet effective cleaning.\nIt reaches deep inside feeders, nipples, and wide‑neck bottles, removing milk residue without scratching delicate surfaces.\nSilicone dries quickly, resists bacteria, and lasts longer than sponge brushes — making it a more hygienic choice for everyday use.\nThe bright green color is easy to spot, and the ergonomic non‑slip handle ensures a secure, comfortable grip while cleaning.\nDurable, safe, and easy to wash — ideal for keeping baby bottles perfectly clean.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>BPA‑free high‑quality silicone</li>\n  <li>Soft, flexible & scratch‑free</li>\n  <li>Hygienic — resists bacterial buildup</li>\n  <li>Fast‑drying & long‑lasting</li>\n  <li>Bright green, easy to spot</li>\n  <li>Non‑slip ergonomic handle</li>\n  <li>Perfect for feeders, nipples & bottles</li>\n</ul>',
	},
	{
		sku: '100151',
		title: 'BABY BRUSH SET 5PCS YELLOW MINITREE',
		description:
			'<p>The Baby Brush Set 5pcs Yellow by Minitree is a soft and safe grooming kit designed especially for newborns and infants.\nThis 5‑piece set includes essential baby‑care tools such as a soft‑bristle brush, baby comb, nail clipper, nail file, and a mini scissor (or equivalent set depending on model).\nEach item is designed with rounded, baby‑friendly edges and a gentle finish to ensure safe grooming.\nThe bright yellow color gives the set a cheerful look, and all tools are lightweight and easy to handle.\nPerfect for daily baby care routines — safe, durable, and convenient for both home use and travel.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>5‑piece complete grooming set</li>\n  <li>Soft, baby‑safe bristle brush</li>\n  <li>Gentle, rounded‑edge tools</li>\n  <li>Lightweight & travel‑friendly</li>\n  <li>Durable and easy to clean</li>\n  <li>Bright yellow color for easy identification</li>\n</ul>',
	},
	{
		sku: '100152',
		title: 'BABY BRUSH SET 5PCS PINK MINITREE',
		description:
			'<p>The Baby Brush Set 5pcs Pink by Minitree is a soft, baby‑friendly grooming kit made for safe everyday use.\nThis 5‑piece set typically includes a soft‑bristle baby brush, a smooth‑tooth comb, nail clipper, nail file, and baby safety scissors (or equivalent items depending on model).\nAll pieces are made with rounded, gentle edges to protect delicate skin.\nThe cute pink color gives the set a sweet look, and each tool is lightweight, durable, and easy to handle.\nPerfect for newborn grooming, travel use, or gifting — safe, practical, and reliable.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Complete 5‑piece grooming kit</li>\n  <li>Soft baby‑safe bristle brush</li>\n  <li>Gentle rounded‑edge tools</li>\n  <li>Lightweight & travel‑friendly</li>\n  <li>Durable and easy to clean</li>\n  <li>Cute pink color design</li>\n</ul>',
	},
	{
		sku: '100150',
		title: 'BABY BRUSH SET 5PCS BLUE MINITREE',
		description:
			'<p>The Baby Brush Set 5pcs Blue by Minitree is a soft, baby‑friendly grooming kit created for daily newborn care.\nThe set typically includes five essential tools: a soft‑bristle baby brush, smooth‑tooth comb, nail clipper, nail file, and baby‑safe scissors (or equivalent set).\nEach item is made with rounded, gentle edges to protect delicate baby skin and ensure safe grooming.\nThe calm blue color gives the set a fresh, clean look, and all tools are lightweight, durable, and easy to hold.\nPerfect for at‑home care, travel, or gifting — safe, practical, and reliable for parents.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Complete 5‑piece grooming set</li>\n  <li>Soft baby‑safe bristle brush</li>\n  <li>Rounded, gentle grooming tools</li>\n  <li>Lightweight & travel‑friendly</li>\n  <li>Durable and easy to clean</li>\n  <li>Fresh blue color design</li>\n</ul>',
	},
	{
		sku: '100122',
		title: 'PACK OF 2 SOFT SILICON NIPPLE SMALL MAQ',
		description:
			'<p>The Pack of 2 Soft Silicon Nipple Small by MAQ is designed for comfortable and natural‑flow feeding.\nMade from BPA‑free, food‑grade silicone, these nipples are soft, flexible, and gentle on a baby’s gums.\nThe small‑size flow is ideal for newborns and young babies, ensuring controlled milk intake and reducing choking or overfeeding.\nEach nipple fits most standard‑size baby bottles and is heat‑resistant, durable, and easy to clean.\nPerfect for parents looking for a safe, hygienic, and long‑lasting nipple option.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>BPA‑free food‑grade silicone</li>\n  <li>Soft & flexible for natural feel</li>\n  <li>Small flow ideal for newborns</li>\n  <li>Fits most standard bottles</li>\n  <li>Durable & heat‑resistant</li>\n  <li>Easy to clean & hygienic</li>\n</ul>',
	},
	{
		sku: '100123',
		title: 'PACK OF 2 SOFT SILICON NIPPLE LARGE MAQ',
		description:
			'<p>The Pack of 2 Soft Silicon Nipple Large by MAQ is made from BPA‑free, food‑grade silicone designed to provide a smooth and natural feeding experience.\nThe large‑flow size is suitable for older babies who can comfortably handle a faster milk flow.\nThese nipples are soft, flexible, and gentle on gums, offering a natural latch‑like feel.\nThey fit most standard baby bottles, are heat‑resistant, and remain durable even after repeated sterilization.\nA safe, hygienic, and long‑lasting choice for efficient feeding.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>BPA‑free food‑grade silicone</li>\n  <li>Large fast‑flow design</li>\n  <li>Soft & flexible for natural latch</li>\n  <li>Fits most standard bottles</li>\n  <li>Durable & heat‑resistant</li>\n  <li>Easy to clean & long‑lasting</li>\n</ul>',
	},
	{
		sku: '100125',
		title: 'BABY NIPPLE SHIELD SILICON SMART BABY',
		description:
			'<p>The Baby Nipple Shield Silicon by Smart Baby is made from high‑quality, BPA‑free silicone designed to help mothers breastfeed comfortably.\nIts soft, flexible material creates a gentle barrier that protects sore, cracked, or sensitive nipples while still allowing natural milk flow.\nThe ergonomic shape ensures a secure fit and encourages proper latch, making feeding easier for both mother and baby.\nTransparent, lightweight, and easy to clean — this nipple shield is ideal for breastfeeding support and comfort.\nPerfect for moms who need temporary protection without interrupting natural feeding routines.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>BPA‑free soft silicone</li>\n  <li>Protects sore or sensitive nipples</li>\n  <li>Supports natural latch & milk flow</li>\n  <li>Lightweight & comfortable</li>\n  <li>Easy to clean & reusable</li>\n  <li>Transparent ergonomic design</li>\n</ul>',
	},
	{
		sku: '100124',
		title: 'BREAST PUMP PLASTIC MAQ',
		description:
			'<p>The Breast Pump Plastic MAQ is a convenient and affordable manual breast pump made for mothers who need an easy way to express and store milk. Its lightweight plastic design makes it easy to hold and use, while the soft suction creates a gentle pumping experience. Ideal for occasional use at home or on the go, it helps mothers maintain milk flow comfortably. Easy to clean, assemble, and carry, this pump is a practical choice for daily breastfeeding support.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Lightweight and easy to use</li>\n  <li>Gentle manual suction</li>\n  <li>Ideal for occasional pumping</li>\n  <li>Compact and travel‑friendly</li>\n  <li>Easy to clean and assemble</li>\n  <li>Budget‑friendly manual pump</li>\n</ul>',
	},
	{
		sku: '100132',
		title: 'BABY MEDICINE FEEDING SYRINGE WHITE',
		description:
			"<p>The Baby Medicine Feeding Syringe (White) is designed to help parents give liquid medicine to babies safely and comfortably. Its smooth, gentle tip ensures easy feeding without hurting the baby's mouth, while the clear measurement markings allow accurate dosing. The syringe-style design reduces spills and makes it easier for babies to swallow medicine calmly. Lightweight, reusable, and easy to clean, it’s a must‑have for every baby’s medicine kit.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Gentle and safe tip for babies</li>\n  <li>Accurate measurement markings</li>\n  <li>Reduces spills and choking risk</li>\n  <li>Easy to hold and use</li>\n  <li>Reusable and simple to clean</li>\n  <li>Ideal for all liquid medicines</li>\n</ul>",
	},
	{
		sku: '100130',
		title: 'BABY MEDICINE FEEDING SYRINGE PINK',
		description:
			'<p>The Baby Medicine Feeding Syringe Pink is designed to help parents give liquid medicines to babies safely and without spills. Made with soft, baby‑friendly materials, the syringe ensures gentle feeding while preventing choking or gagging.\nIt features clear measurement markings for accurate dosing and a smooth plunger that makes feeding effortless. The pink silicone‑covered pacifier‑style tip helps deliver medicine comfortably and reduces mess during feeding time. Perfect for newborns and infants who struggle with taking medicine traditionally.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft silicone pacifier‑style tip</li>\n  <li>Accurate measurement markings</li>\n  <li>Easy‑to‑use smooth plunger</li>\n  <li>Helps reduce spills and gagging</li>\n  <li>Safe for newborns & infants</li>\n  <li>Durable and easy to clean</li>\n</ul>',
	},
	{
		sku: '100131',
		title: 'BABY MEDICINE FEEDING SYRINGE BLUE',
		description:
			'<p>The Baby Medicine Feeding Syringe Blue provides a simple and safe solution for giving liquid medication to infants. Designed with a soft, silicone‑covered pacifier‑style tip, it ensures a gentle and comfortable feeding experience while reducing the risk of spills or choking.\nClear measurement markings allow accurate dosing, and the smooth‑glide plunger ensures controlled flow for easier feeding. Ideal for newborns and young infants who have difficulty taking medicine through spoons or cups. Easy to wash and durable for repeated use.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft silicone pacifier‑style tip</li>\n  <li>Accurate measurement markings</li>\n  <li>Smooth, easy‑press plunger</li>\n  <li>Minimizes spills and discomfort</li>\n  <li>Safe for newborns</li>\n  <li>Easy to clean and reuse</li>\n</ul>',
	},
	{
		sku: '100157',
		title: 'BABY PILLOW CHINA HIPPPO CAT PINK',
		description:
			'<p>The Baby Pillow China Hippo Cat Pink is a soft and comfortable infant pillow featuring an adorable hippo‑cat themed design.\nMade with gentle, baby‑safe fabric, it provides light support to help maintain comfortable head positioning during sleep or rest time.\nThe pillow is lightweight, breathable, and easy to carry — perfect for newborns and infants.\nIts bright pink color and cute cartoon design make it appealing for babies and ideal for gifting.\nDurable stitching and washable material ensure long‑lasting use and easy maintenance for parents.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft & gentle baby‑safe fabric</li>\n  <li>Cute hippo‑cat pink design</li>\n  <li>Lightweight & breathable</li>\n  <li>Provides gentle head support</li>\n  <li>Washable & easy to maintain</li>\n  <li>Perfect for newborns & infants</li>\n</ul>',
	},
	{
		sku: '100158',
		title: 'BABY PILLOW CHINA HIPPPO PINK',
		description:
			'<p>The Baby Pillow China Hippo Pink is a soft and comfortable infant pillow made with baby‑safe, breathable fabric.\nIt features a cute hippo‑themed pink design that adds charm to your baby’s sleeping space.\nThe pillow provides light head support, helping keep your baby comfortable during sleep or rest.\nIt is lightweight, durable, and easy to wash — making it practical for everyday use.\nPerfect for newborns and infants, whether at home or while traveling.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft & gentle fabric</li>\n  <li>Cute pink hippo design</li>\n  <li>Lightweight & breathable</li>\n  <li>Provides gentle head support</li>\n  <li>Washable & long‑lasting</li>\n  <li>Ideal for newborns & infants</li>\n</ul>',
	},
	{
		sku: '100159',
		title: 'BABY PILLOW BUG BLUE',
		description:
			'<p>The Baby Pillow Bug Blue is a cute and comfortable infant pillow made with soft, baby‑safe fabric.\nFeaturing a fun blue bug‑themed design, it brings color and charm to your baby’s resting space.\nThe pillow provides light head support to help keep your little one comfortable during naps or tummy‑time.\nIt is lightweight, breathable, and easy to carry, making it ideal for use at home or during travel.\nDurable stitching and washable material ensure long‑lasting use and hassle‑free cleaning.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft & baby‑friendly fabric</li>\n  <li>Cute blue bug design</li>\n  <li>Lightweight & breathable</li>\n  <li>Provides gentle head support</li>\n  <li>Washable & durable</li>\n  <li>Perfect for newborns & infants</li>\n</ul>',
	},
	{
		sku: '100156',
		title: 'BABY PILLOW CHINA BEAR BLUE',
		description:
			'<p>The Baby Pillow China Bear Blue is a lightweight and comfortable infant pillow made from soft, baby‑safe fabric.\nIts adorable blue bear design makes it appealing for babies and adds a sweet touch to any crib or bedding setup.\nThe pillow offers gentle head support, helping keep your baby comfortable during sleep, tummy‑time, or rest.\nIt is breathable, easy to carry, and made with durable, washable materials — perfect for daily use at home or while traveling.\nA practical and charming choice for newborns and infants.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft & baby‑safe fabric</li>\n  <li>Cute blue bear design</li>\n  <li>Lightweight & breathable</li>\n  <li>Provides gentle head comfort</li>\n  <li>Washable & durable</li>\n  <li>Ideal for newborns & infants</li>\n</ul>',
	},
	{
		sku: '100155',
		title: 'BABY PILLOW rabbit BLUE',
		description:
			'<p>The Baby Pillow Elephant Blue is crafted from soft, breathable, baby‑safe fabric that ensures gentle comfort for newborns and infants.\nIts charming blue elephant design adds a playful and soothing touch to your baby’s sleeping area.\nThe pillow offers light head support, helping maintain comfort during naps, rest, or tummy‑time.\nLightweight, washable, and easy to carry, it is perfect for everyday use at home or while traveling.\nDurable stitching ensures long-lasting use for growing babies.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft & gentle baby‑safe fabric</li>\n  <li>Cute blue rabbit design</li>\n  <li>Lightweight & breathable</li>\n  <li>Provides gentle head support</li>\n  <li>Washable & durable</li>\n  <li>Ideal for newborns & infants</li>\n</ul>',
	},
	{
		sku: '100154',
		title: 'BABY PILLOW hen pink',
		description:
			'<p>The Baby Pillow Elephant Pink is made from soft, baby‑friendly, breathable fabric designed to keep newborns and infants comfortable.\nIts charming pink elephant design adds a sweet and playful touch to your baby’s nursery or bedding setup.\nThe pillow provides gentle head support, making it ideal for naps, tummy‑time, or resting.\nIt is lightweight, durable, and easy to wash — perfect for everyday use at home or while traveling.\nA cozy and stylish pillow that ensures comfort while adding a touch of cuteness.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft & gentle fabric</li>\n  <li>Cute pink hen design</li>\n  <li>Lightweight & breathable</li>\n  <li>Provides gentle head support</li>\n  <li>Washable & long‑lasting</li>\n  <li>Ideal for newborns & infants</li>\n</ul>',
	},
	{
		sku: '100153',
		title: 'BABY PILLOW ELEPHANT YELLOW',
		description:
			'<p>The Baby Pillow Elephant Yellow is crafted from soft, breathable, and baby‑safe fabric to keep infants comfortable during rest or sleep.\nIts cheerful yellow elephant design adds a fun and lively touch to any baby nursery or bedding setup.\nThe pillow provides gentle head support, making it ideal for naps, tummy‑time, or everyday comfort.\nLightweight, durable, and washable — this pillow is designed for convenient daily use at home or during travel.\nA perfect blend of cuteness, comfort, and practicality for newborns and infants.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft & baby‑safe fabric</li>\n  <li>Cute yellow elephant design</li>\n  <li>Lightweight & breathable</li>\n  <li>Provides gentle head support</li>\n  <li>Washable & long‑lasting</li>\n  <li>Ideal for newborns & infants</li>\n</ul>',
	},
	{
		sku: '100160',
		title: 'BABY PILLOW SMILE BROWN',
		description:
			'<p>The Baby Pillow Smile Brown is made from soft, breathable, and baby‑safe fabric that ensures gentle comfort for newborns and infants.\nIts warm brown color and adorable smiling face design make it a charming addition to your baby’s bedding setup.\nThe pillow provides light, supportive cushioning for the baby’s head during naps, rest, or tummy‑time.\nIt is lightweight, easy to wash, and designed for daily use at home or while traveling.\nDurable stitching ensures long‑lasting quality, while the soft texture keeps your baby comfortable and relaxed.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft & gentle baby‑safe fabric</li>\n  <li>Cute smiley‑face brown design</li>\n  <li>Lightweight & breathable</li>\n  <li>Provides gentle head support</li>\n  <li>Washable & durable</li>\n  <li>Ideal for newborns & infants</li>\n</ul>',
	},
	{
		sku: '100161',
		title: 'BABY U SHAPE NECK PILLOW ELEPHANT GREY',
		description:
			'<p>The Baby U‑Shape Neck Pillow Elephant Grey is designed to provide gentle neck and head support for infants during travel or rest.\nMade from ultra‑soft, breathable, and baby‑safe fabric, it keeps your little one comfortable whether in a stroller, car seat, or during naps.\nThe adorable grey elephant design adds charm while the U‑shape helps keep the baby’s head in a comfortable position.\nLightweight, portable, and washable — this pillow is perfect for everyday use and travel convenience.\nDurable stitching ensures long‑lasting comfort and reliability.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft & baby‑safe fabric</li>\n  <li>Comfortable U‑shape support</li>\n  <li>Cute grey elephant design</li>\n  <li>Lightweight & portable</li>\n  <li>Washable & durable</li>\n  <li>Ideal for strollers, car seats & naps</li>\n</ul>',
	},
	{
		sku: '100162',
		title: 'BABY U SHAPE NECK PILLOW FOX ORANGE',
		description:
			'<p>The Baby U‑Shape Neck Pillow Fox Orange is designed to offer gentle neck and head support for infants during travel or rest.\nMade with ultra‑soft, breathable, and baby‑safe fabric, it keeps your little one comfortable in strollers, car seats, or during naps.\nThe bright orange fox design adds a fun and friendly look while the U‑shape helps maintain a comfortable and stable head position.\nLightweight and easy to carry, this pillow is perfect for everyday outings and long trips.\nIts washable and durable build ensures long‑lasting use and easy cleaning for parents.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft & baby‑friendly fabric</li>\n  <li>Cute orange fox design</li>\n  <li>Comfortable U‑shape neck support</li>\n  <li>Lightweight & travel‑friendly</li>\n  <li>Washable & long‑lasting</li>\n  <li>Ideal for strollers, car seats & naps</li>\n</ul>',
	},
	{
		sku: '100163',
		title: 'BABY PLAY GYM AEROPLANE BLUE',
		description:
			'<p>The Baby Play Gym Aeroplane Blue is designed to keep infants entertained, active, and stimulated.\nIt features a soft padded mat printed with a fun aeroplane theme, along with hanging toys to encourage reaching, grasping, kicking, and visual development.\nThe overhead arch includes rattles, plush toys, and interactive elements that help improve motor skills and sensory growth.\nMade with soft, baby‑safe materials, it provides a cozy and safe play area for tummy‑time, sitting, and early play activities.\nLightweight and easy to assemble, it’s perfect for use at home or for taking along when traveling.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft padded mat with aeroplane theme</li>\n  <li>Hanging toys for sensory engagement</li>\n  <li>Encourages motor skill development</li>\n  <li>Safe & baby‑friendly materials</li>\n  <li>Easy to assemble & portable</li>\n  <li>Ideal for tummy‑time and early play</li>\n</ul>',
	},
	{
		sku: '100343',
		title: 'NEXTON BABY GIFT SET 3PCS BOX PINK',
		description:
			'<p>The Nexton Baby Gift Set 3pcs Box Pink is a thoughtfully curated baby care set designed to meet everyday newborn needs.\nPresented in an attractive pink gift box, this set includes essential baby care items made with gentle, baby‑safe formulations.\nIdeal for gifting at baby showers, newborn celebrations, or as a starter kit for new parents.\nThe products are suitable for delicate baby skin and offer daily care, comfort, and hygiene.\nA perfect combination of usefulness, safety, and elegant presentation.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Gentle and baby‑safe care products suitable for newborns</li>\n  <li>Beautifully packed 3‑piece gift set in an attractive pink box</li>\n  <li>Ideal for baby showers, newborn gifts, and special occasions</li>\n  <li>Made with skin‑friendly and mild formulations</li>\n  <li>Suitable for daily baby care and hygiene needs</li>\n  <li>Trusted Nexton brand for baby care essentials</li>\n</ul>',
	},
	{
		sku: '100344',
		title: 'NEXTON BABY GIFT SET 3PCS BOX GREEN',
		description:
			'<p>The Nexton Baby Gift Set 3pcs Box Green is a thoughtfully designed baby care set that includes essential items for daily newborn care.\nPacked in a neat and attractive green gift box, this set is ideal for baby showers, hospital visits, or welcoming a newborn.\nEach product in the set is made with gentle and baby‑safe formulations suitable for delicate skin.\nIt offers convenience, safety, and reliability for new parents while maintaining trusted Nexton quality.\nA perfect balance of usefulness and presentation for everyday baby care needs.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Gentle and baby‑safe care products suitable for newborns</li>\n  <li>Neatly packed 3‑piece baby gift set in an attractive green box</li>\n  <li>Ideal for baby showers, newborn gifts, and special occasions</li>\n  <li>Made with mild and skin‑friendly formulations</li>\n  <li>Suitable for daily baby care and hygiene needs</li>\n  <li>Trusted Nexton brand for quality baby care products</li>\n</ul>',
	},
	{
		sku: '100345',
		title: 'NEXTON BABY GIFT SET 3PCS BOX BLUE',
		description:
			'<p>The Nexton Baby Gift Set 3pcs Box Blue is a carefully selected baby care set designed to support daily newborn hygiene and care.\nPresented in an attractive blue gift box, it makes a perfect choice for baby showers, hospital visits, or welcoming a newborn baby.\nEach item in the set is made with gentle, baby‑safe formulations suitable for delicate skin.\nThe set combines usefulness with a clean and appealing presentation, making it convenient for new parents.\nTrusted Nexton quality ensures safety, comfort, and reliability for everyday baby care needs.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Gentle and baby‑safe care products suitable for newborns</li>\n  <li>Nicely packed 3‑piece baby gift set in an attractive blue box</li>\n  <li>Ideal for baby showers, newborn gifts, and special occasions</li>\n  <li>Made with mild and skin‑friendly formulations</li>\n  <li>Suitable for daily baby care and hygiene needs</li>\n  <li>Trusted Nexton brand for quality baby care products</li>\n</ul>',
	},
	{
		sku: '100346',
		title: 'LIOCK BABY GIFT BOX 3IN1 PINK',
		description:
			'<p>The Liock Baby Gift Box 3in1 Pink is a thoughtfully curated baby care set designed for everyday newborn needs.\nPresented in an elegant pink gift box, this 3‑in‑1 set makes an ideal gift for baby showers, hospital visits, or welcoming a newborn.\nEach item in the box is made with gentle and baby‑safe materials suitable for delicate skin.\nThe set offers convenience, safety, and practicality for new parents while maintaining a neat and attractive presentation.\nA perfect combination of usefulness and gift‑ready packaging for daily baby care.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Gentle and baby‑safe care items suitable for newborns</li>\n  <li>Nicely packed 3‑in‑1 baby gift set in an attractive pink box</li>\n  <li>Ideal for baby showers, newborn gifts, and special occasions</li>\n  <li>Made with skin‑friendly and mild materials</li>\n  <li>Suitable for daily baby care and hygiene needs</li>\n  <li>Practical and gift‑ready packaging for new parents</li>\n</ul>',
	},
	{
		sku: '100347',
		title: 'LIOCK BABY GIFT BOX 3IN1 GREEN',
		description:
			'<p>The Liock Baby Gift Box 3in1 Green is a carefully curated baby care set designed to support everyday newborn care.\nPresented in an attractive green gift box, this 3‑in‑1 set is ideal for baby showers, hospital visits, or welcoming a newborn baby.\nEach item in the set is made with gentle, baby‑safe materials suitable for delicate skin.\nThe gift box offers both practicality and a clean presentation, making it convenient for new parents.\nA reliable and thoughtful baby care gift option for daily hygiene and comfort.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Gentle and baby‑safe care items suitable for newborns</li>\n  <li>Nicely packed 3‑in‑1 baby gift set in an attractive green box</li>\n  <li>Ideal for baby showers, newborn gifts, and special occasions</li>\n  <li>Made with skin‑friendly and mild materials</li>\n  <li>Suitable for daily baby care and hygiene needs</li>\n  <li>Practical and gift‑ready packaging for new parents</li>\n</ul>',
	},
	{
		sku: '100122',
		title: 'PACK OF 2 SOFT SILICON NIPPLE SMALL MAQ',
		description:
			'<p>The Pack of 2 Soft Silicon Nipple Small MAQ is specially designed to provide a comfortable and natural feeding experience for babies.\nMade from soft, flexible silicone, these nipples are gentle on baby gums and suitable for newborns and early feeding stages.\nThe small size ensures controlled milk flow, helping reduce feeding discomfort.\nEasy to attach and clean, these nipples are ideal for daily feeding use at home or while traveling.\nA reliable and practical feeding accessory for baby care needs.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Made from soft and flexible silicone for gentle feeding</li>\n  <li>Small size suitable for newborns and early feeding stages</li>\n  <li>Designed to provide smooth and controlled milk flow</li>\n  <li>Easy to attach, remove, and clean</li>\n  <li>Gentle on baby gums and mouth</li>\n  <li>Ideal for daily baby feeding use</li>\n</ul>',
	},
	{
		sku: '100123',
		title: 'PACK OF 2 SOFT SILICON NIPPLE LARGE MAQ',
		description:
			'<p>The Pack of 2 Soft Silicon Nipple Large MAQ is designed to provide a natural and comfortable feeding experience for growing babies.\nMade from soft and flexible silicone, these nipples are gentle on baby gums and suitable for regular feeding use.\nThe large size allows a better milk flow, making it ideal for babies who require a faster feeding pace.\nEasy to attach and clean, these nipples ensure hygiene and convenience for daily use.\nA reliable feeding accessory that supports safe and comfortable baby feeding.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Made from soft and flexible silicone for comfortable feeding</li>\n  <li>Large size suitable for babies needing a faster milk flow</li>\n  <li>Designed to support smooth and natural feeding</li>\n  <li>Easy to attach, remove, and clean</li>\n  <li>Gentle on baby gums and mouth</li>\n  <li>Ideal for daily baby feeding use</li>\n</ul>',
	},
	{
		sku: '100124',
		title: 'BREAST PUMP PLASTIC MAQ',
		description:
			'<p>The Breast Pump Plastic MAQ is designed to support mothers with easy and convenient milk expression.\nMade from durable and baby‑safe plastic, this breast pump is lightweight, easy to handle, and suitable for regular use.\nIts simple design allows comfortable pumping while maintaining hygiene and safety.\nEasy to assemble, use, and clean, it is ideal for home use or occasional travel needs.\nA practical and affordable breastfeeding support accessory for nursing mothers.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Made from durable and baby‑safe plastic material</li>\n  <li>Lightweight design for easy handling and use</li>\n  <li>Simple manual operation for comfortable milk expression</li>\n  <li>Easy to assemble, use, and clean</li>\n  <li>Suitable for home use and occasional travel</li>\n  <li>Practical breastfeeding support for nursing mothers</li>\n</ul>',
	},
	{
		sku: '100125',
		title: 'BABY NIPPLE SHIELD SILICON SMART BABY',
		description:
			'<p>The Baby Nipple Shield Silicon Smart Baby is specially designed to assist mothers during breastfeeding while ensuring baby comfort.\nMade from soft and flexible silicone, this nipple shield provides gentle protection and helps babies latch more easily.\nIts lightweight and skin‑friendly design ensures comfort for both mother and baby during feeding sessions.\nEasy to use, clean, and store, it is suitable for regular breastfeeding support.\nA practical and helpful accessory for nursing mothers facing latching or sensitivity issues.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Made from soft and flexible silicone for gentle breastfeeding</li>\n  <li>Helps support proper baby latching during feeding</li>\n  <li>Comfortable and skin‑friendly design for mothers</li>\n  <li>Lightweight and easy to use</li>\n  <li>Easy to clean and maintain hygiene</li>\n  <li>Suitable for regular breastfeeding support</li>\n</ul>',
	},
	{
		sku: '100126',
		title: 'MITTENS TEETHER SILICONE GREEN ONLY BABY',
		description:
			'<p>The Mittens Teether Silicone Green Only Baby is specially designed to provide safe and gentle teething relief for babies.\nMade from soft and flexible silicone, this mitten teether helps soothe sore gums while preventing babies from dropping the teether.\nIts easy‑to‑wear mitten design allows babies to chew comfortably while keeping hands protected.\nLightweight and baby‑friendly, it is suitable for daily teething use at home or on the go.\nA practical and safe teething accessory for newborns and infants.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Made from soft and flexible silicone for gentle teething relief</li>\n  <li>Mitten design prevents teether from falling</li>\n  <li>Helps soothe sore and irritated baby gums</li>\n  <li>Lightweight and comfortable for babies to wear</li>\n  <li>Easy to use and clean</li>\n  <li>Suitable for daily teething support</li>\n</ul>',
	},
	{
		sku: '100127',
		title: 'MITTENS TEETHER SILICONE BABY PINK ONLY BABY',
		description:
			'<p>The Mittens Teether Silicone Baby Pink Only Baby is designed to help soothe baby gums during the teething stage.\nMade from soft and flexible silicone, this mitten teether is gentle, safe, and comfortable for babies to chew.\nThe mitten design helps keep the teether securely on the baby’s hand, preventing it from falling or getting lost.\nLightweight and baby‑friendly, it allows babies to self‑soothe while protecting their hands.\nAn ideal teething accessory for daily use at home or while traveling.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Made from soft and flexible silicone for gentle teething relief</li>\n  <li>Mitten design keeps the teether securely on baby’s hand</li>\n  <li>Helps soothe sore and irritated baby gums</li>\n  <li>Lightweight and comfortable for babies to wear</li>\n  <li>Easy to use and clean for daily hygiene</li>\n  <li>Suitable for daily teething support</li>\n</ul>',
	},
	{
		sku: '100128',
		title: 'MITTENS TEETHER SILICONE ORANGE ONLY BABY',
		description:
			'<p>The Mittens Teether Silicone Orange Only Baby is designed to provide safe and gentle relief for babies during teething.\nMade from soft and flexible silicone, this mitten teether is gentle on baby gums and easy for babies to chew.\nThe mitten design helps keep the teether securely on the baby’s hand, reducing the chances of dropping or losing it.\nLightweight and comfortable, it allows babies to self‑soothe while keeping their hands protected.\nAn ideal teething accessory for everyday use at home or while traveling.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Made from soft and flexible silicone for gentle teething relief</li>\n  <li>Mitten design keeps the teether securely on baby’s hand</li>\n  <li>Helps soothe sore and irritated baby gums</li>\n  <li>Lightweight and comfortable for babies to wear</li>\n  <li>Easy to use and clean for daily hygiene</li>\n  <li>Suitable for daily teething support</li>\n</ul>',
	},
	{
		sku: '100129',
		title: 'MITTENS TEETHER SILICONE LIGHT GREEN ONLY BABY',
		description:
			'<p>The Mittens Teether Silicone Light Green Only Baby is specially designed to provide safe and gentle relief for babies during the teething stage.\nMade from soft and flexible silicone, this mitten teether is gentle on sensitive baby gums and comfortable to chew.\nIts mitten‑style design helps keep the teether securely on the baby’s hand, reducing the risk of dropping.\nLightweight and baby‑friendly, it allows babies to self‑soothe while keeping their hands protected.\nA practical and reliable teething accessory for daily use at home or on the go.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Made from soft and flexible silicone for gentle teething relief</li>\n  <li>Mitten design keeps the teether securely on baby’s hand</li>\n  <li>Helps soothe sore and irritated baby gums</li>\n  <li>Lightweight and comfortable for babies to wear</li>\n  <li>Easy to use and clean for daily hygiene</li>\n  <li>Suitable for daily teething support</li>\n</ul>',
	},
	{
		sku: '100130',
		title: 'BABY MEDICINE FEEDING SYRINGE PINK',
		description:
			'<p>The Baby Medicine Feeding Syringe Pink is designed to help parents give liquid medicine to babies safely and accurately.\nMade from baby‑safe plastic, this syringe allows controlled and measured medicine feeding without spilling.\nIts smooth edges and gentle design ensure comfort for babies during use.\nEasy to use, clean, and store, it is suitable for daily medicine or supplement feeding.\nA practical and essential baby care accessory for home use.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Made from baby‑safe plastic material</li>\n  <li>Helps provide accurate and controlled medicine dosing</li>\n  <li>Gentle and safe design for baby use</li>\n  <li>Easy to use, clean, and maintain hygiene</li>\n  <li>Suitable for liquid medicines and supplements</li>\n  <li>Practical baby care essential for daily use</li>\n</ul>',
	},
	{
		sku: '100131',
		title: 'BABY MEDICINE FEEDING SYRINGE BLUE',
		description:
			'<p>The Baby Medicine Feeding Syringe Blue is designed to help parents give liquid medicine to babies safely and accurately.\nMade from baby‑safe plastic, this syringe allows controlled and measured medicine feeding without spills or wastage.\nIts smooth edges and gentle design ensure comfort for babies during use.\nEasy to use, clean, and store, it is suitable for daily medicine or supplement feeding.\nA practical and essential baby care accessory for home use.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Made from baby‑safe plastic material</li>\n  <li>Helps provide accurate and controlled medicine dosing</li>\n  <li>Gentle and safe design for baby use</li>\n  <li>Easy to use, clean, and maintain hygiene</li>\n  <li>Suitable for liquid medicines and supplements</li>\n  <li>Practical baby care essential for daily use</li>\n</ul>',
	},
	{
		sku: '100132',
		title: 'BABY MEDICINE FEEDING SYRINGE WHITE',
		description:
			'<p>The Baby Medicine Feeding Syringe White is designed to help parents give liquid medicine to babies safely and accurately.\nMade from baby‑safe plastic material, this syringe allows controlled and measured medicine feeding without spills.\nIts smooth edges and gentle design ensure comfort for babies during use.\nEasy to use, clean, and store, it is suitable for daily medicine or supplement feeding at home.\nA practical and essential baby care accessory for newborns and infants.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Made from baby‑safe plastic material</li>\n  <li>Helps provide accurate and controlled medicine dosing</li>\n  <li>Gentle and safe design for baby use</li>\n  <li>Easy to use, clean, and maintain hygiene</li>\n  <li>Suitable for liquid medicines and supplements</li>\n  <li>Practical baby care essential for daily use</li>\n</ul>',
	},
	{
		sku: '100133',
		title: 'BABY BELL TEETHER RING',
		description:
			'<p>The Baby Bell Teether Ring is designed to provide gentle relief to babies during the teething stage.\nMade from baby‑safe materials, this teether ring helps soothe sore gums while being easy for little hands to hold.\nThe built‑in bell sound helps keep babies engaged and encourages sensory development.\nLightweight and smooth in design, it ensures comfort and safety during use.\nAn ideal teething accessory for daily use at home or on the go.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Made from baby‑safe and gentle materials</li>\n  <li>Helps soothe sore and irritated baby gums</li>\n  <li>Easy‑to‑hold ring design for little hands</li>\n  <li>Bell sound helps engage and entertain babies</li>\n  <li>Lightweight and comfortable for daily use</li>\n  <li>Ideal teething accessory for newborns and infants</li>\n</ul>',
	},
	{
		sku: '100134',
		title: 'TEETHER DINO YELLOW FLOWER BABY',
		description:
			'<p>The Teether Dino Yellow Flower Baby is designed to provide gentle teething relief while keeping babies entertained.\nMade from baby‑safe and soft materials, this teether helps soothe sore gums during the teething stage.\nIts dinosaur shape with bright yellow flower design attracts baby’s attention and encourages sensory development.\nEasy for little hands to grip, it supports comfort and safe chewing.\nAn ideal teething toy for daily use at home or while traveling.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Made from baby‑safe and gentle materials</li>\n  <li>Helps soothe sore and irritated baby gums</li>\n  <li>Cute dinosaur design with bright yellow flower for engagement</li>\n  <li>Easy‑to‑hold shape for little hands</li>\n  <li>Lightweight and comfortable for daily use</li>\n  <li>Ideal teething toy for newborns and infants</li>\n</ul>',
	},
	{
		sku: '100135',
		title: 'TEETHER DINO PURPLE FLOWER BABY',
		description:
			'<p>The Teether Dino Purple Flower Baby is designed to provide gentle teething relief while keeping babies happy and engaged.\nMade from baby‑safe and soft materials, this teether helps soothe sore gums during the teething stage.\nIts dinosaur shape with an attractive purple flower design encourages visual interest and sensory development.\nEasy for small hands to grip, it supports safe chewing and comfort.\nAn ideal teething toy for daily use at home or while traveling.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Made from baby‑safe and gentle materials</li>\n  <li>Helps soothe sore and irritated baby gums</li>\n  <li>Cute dinosaur design with purple flower for engagement</li>\n  <li>Easy‑to‑hold shape for little hands</li>\n  <li>Lightweight and comfortable for daily use</li>\n  <li>Ideal teething toy for newborns and infants</li>\n</ul>',
	},
	{
		sku: '100136',
		title: 'TEETHER ELEPHANT BABY PINK FLOWER BABY',
		description:
			'<p>The Teether Elephant Baby Pink Flower Baby is designed to provide gentle teething relief while keeping babies happy and comfortable.\nMade from baby‑safe and soft materials, this teether helps soothe sore gums during the teething stage.\nIts adorable elephant shape with a soft pink flower design attracts baby’s attention and supports sensory development.\nEasy to grip and lightweight, it allows safe chewing for little hands.\nAn ideal teething toy for everyday use at home or while traveling.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Made from baby‑safe and gentle materials</li>\n  <li>Helps soothe sore and irritated baby gums</li>\n  <li>Cute elephant design with pink flower for visual engagement</li>\n  <li>Easy‑to‑hold shape for little hands</li>\n  <li>Lightweight and comfortable for daily use</li>\n  <li>Ideal teething toy for newborns and infants</li>\n</ul>',
	},
	{
		sku: '100137',
		title: 'TEETHER KOALA BLUE FLOWER BABY',
		description:
			'<p>The Teether Koala Blue Flower Baby is designed to provide gentle teething relief while keeping babies comfortable and happy.\nMade from baby‑safe and soft materials, this teether helps soothe sore gums during the teething stage.\nIts adorable koala shape with a blue flower design attracts baby’s attention and supports sensory development.\nEasy to hold and lightweight, it allows safe chewing for little hands.\nAn ideal teething toy for everyday use at home or while traveling.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Made from baby‑safe and gentle materials</li>\n  <li>Helps soothe sore and irritated baby gums</li>\n  <li>Cute koala design with blue flower for visual engagement</li>\n  <li>Easy‑to‑hold shape for little hands</li>\n  <li>Lightweight and comfortable for daily use</li>\n  <li>Ideal teething toy for newborns and infants</li>\n</ul>',
	},
	{
		sku: '100138',
		title: 'TEETHER OWL PINK FLOWER BABY',
		description:
			'<p>The Teether Owl Pink Flower Baby is designed to provide gentle teething relief while keeping babies comfortable and happy.\nMade from baby‑safe and soft materials, this teether helps soothe sore gums during the teething stage.\nIts adorable owl shape with a soft pink flower design attracts baby’s attention and supports sensory development.\nEasy to grip and lightweight, it allows safe chewing for little hands.\nAn ideal teething toy for everyday use at home or while traveling.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Made from baby‑safe and gentle materials</li>\n  <li>Helps soothe sore and irritated baby gums</li>\n  <li>Cute owl design with pink flower for visual engagement</li>\n  <li>Easy‑to‑hold shape for little hands</li>\n  <li>Lightweight and comfortable for daily use</li>\n  <li>Ideal teething toy for newborns and infants</li>\n</ul>',
	},
	{
		sku: '100139',
		title: 'TEETHER STRAWBERRY RED HERCULES BEAR',
		description:
			'<p>The Teether Strawberry Red Hercules Bear is designed to provide gentle teething relief while keeping babies happy and entertained.\nMade from baby‑safe and soft materials, this teether helps soothe sore gums during the teething stage.\nIts attractive strawberry shape with a red Hercules bear design captures baby’s attention and supports sensory development.\nEasy to hold and lightweight, it allows safe chewing for little hands.\nAn ideal teething toy for daily use at home or while traveling.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Made from baby‑safe and gentle materials</li>\n  <li>Helps soothe sore and irritated baby gums</li>\n  <li>Cute strawberry and Hercules bear design for visual engagement</li>\n  <li>Easy‑to‑hold shape for little hands</li>\n  <li>Lightweight and comfortable for daily use</li>\n  <li>Ideal teething toy for newborns and infants</li>\n</ul>',
	},
	{
		sku: '100140',
		title: 'TEETHER STRAWBERRY PINK HERCULES BEAR',
		description:
			'<p>The Teether Strawberry Pink Hercules Bear is designed to provide gentle teething relief while keeping babies happy and comfortable.\nMade from baby‑safe and soft materials, this teether helps soothe sore gums during the teething stage.\nIts attractive strawberry shape with a soft pink Hercules bear design captures baby’s attention and supports sensory development.\nEasy to hold and lightweight, it allows safe chewing for little hands.\nAn ideal teething toy for daily use at home or while traveling.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Made from baby‑safe and gentle materials</li>\n  <li>Helps soothe sore and irritated baby gums</li>\n  <li>Cute strawberry and pink Hercules bear design for visual engagement</li>\n  <li>Easy‑to‑hold shape for little hands</li>\n  <li>Lightweight and comfortable for daily use</li>\n  <li>Ideal teething toy for newborns and infants</li>\n</ul>',
	},
	{
		sku: '100141',
		title: 'TEETHER DUCK CYAN HERCULES BEAR',
		description:
			'<p>The Teether Duck Cyan Hercules Bear is designed to provide gentle teething relief while keeping babies happy and entertained.\nMade from baby‑safe and soft materials, this teether helps soothe sore gums during the teething stage.\nIts attractive duck shape with cyan color and Hercules bear design captures baby’s attention and supports sensory development.\nEasy to hold and lightweight, it allows safe chewing for little hands.\nAn ideal teething toy for daily use at home or while traveling.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Made from baby‑safe and gentle materials</li>\n  <li>Helps soothe sore and irritated baby gums</li>\n  <li>Cute duck design with cyan Hercules bear for visual engagement</li>\n  <li>Easy‑to‑hold shape for little hands</li>\n  <li>Lightweight and comfortable for daily use</li>\n  <li>Ideal teething toy for newborns and infants</li>\n</ul>',
	},
	{
		sku: '100142',
		title: 'FEEDER BRUSH SILICONE SKIN',
		description:
			'<p>The Feeder Brush Silicone Skin is designed to clean baby feeding bottles thoroughly while maintaining hygiene.\nMade from soft and flexible silicone, it gently removes milk residue without scratching bottles or feeders.\nIts ergonomic handle provides a comfortable grip, making daily cleaning easy and efficient.\nThe silicone material is durable, easy to wash, and quick to dry for better hygiene.\nAn essential baby feeding accessory for regular home use.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Made from soft and flexible silicone material</li>\n  <li>Gently cleans bottles without scratching surfaces</li>\n  <li>Helps maintain hygiene of baby feeding items</li>\n  <li>Comfortable grip for easy daily use</li>\n  <li>Easy to wash and quick drying design</li>\n  <li>Suitable for regular bottle and feeder cleaning</li>\n</ul>',
	},
	{
		sku: '100143',
		title: 'FEEDER BRUSH SILICONE PURPLE',
		description:
			'<p>The Feeder Brush Silicone Purple is designed to thoroughly clean baby feeding bottles and accessories while maintaining proper hygiene.\nMade from soft and flexible silicone, it gently removes milk residue without scratching bottles or feeders.\nIts ergonomic handle provides a comfortable grip, making daily cleaning easy and efficient.\nThe silicone material is durable, easy to wash, and quick to dry for better hygiene.\nAn essential baby feeding accessory for regular home use.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Made from soft and flexible silicone material</li>\n  <li>Gently cleans bottles without scratching surfaces</li>\n  <li>Helps maintain hygiene of baby feeding items</li>\n  <li>Comfortable grip for easy daily use</li>\n  <li>Easy to wash and quick drying design</li>\n  <li>Suitable for regular bottle and feeder cleaning</li>\n</ul>',
	},
	{
		sku: '100144',
		title: 'FEEDER BRUSH SILICONE YELLOW',
		description:
			'<p>The Feeder Brush Silicone Yellow is designed to thoroughly clean baby feeding bottles and accessories while maintaining proper hygiene.\nMade from soft and flexible silicone material, it gently removes milk residue without scratching bottles or feeders.\nIts ergonomic handle ensures a comfortable grip, making daily cleaning easy and convenient.\nThe silicone material is durable, easy to wash, and quick to dry for better hygiene.\nAn essential baby feeding accessory for everyday home use.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Made from soft and flexible silicone material</li>\n  <li>Gently cleans bottles without scratching surfaces</li>\n  <li>Helps maintain hygiene of baby feeding items</li>\n  <li>Comfortable grip for easy daily use</li>\n  <li>Easy to wash and quick drying design</li>\n  <li>Suitable for regular bottle and feeder cleaning</li>\n</ul>',
	},
	{
		sku: '100145',
		title: 'FEEDER BRUSH SILICONE GREEN',
		description:
			'<p>The Feeder Brush Silicone Green is designed to thoroughly clean baby feeding bottles and feeding accessories while maintaining proper hygiene.\nMade from soft and flexible silicone material, it gently removes milk residue without scratching bottles or feeders.\nIts ergonomic handle offers a comfortable grip, making daily cleaning easy and convenient.\nThe silicone material is durable, easy to wash, and quick to dry, ensuring better hygiene.\nAn essential baby feeding accessory for everyday home use.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Made from soft and flexible silicone material</li>\n  <li>Gently cleans bottles without scratching surfaces</li>\n  <li>Helps maintain hygiene of baby feeding items</li>\n  <li>Comfortable grip for easy daily use</li>\n  <li>Easy to wash and quick drying design</li>\n  <li>Suitable for regular bottle and feeder cleaning</li>\n</ul>',
	},
	{
		sku: '100146',
		title: 'BABY SILICONE BOTTLE BRUSH ORANGE SMART BABY',
		description:
			'<p>The Baby Silicone Bottle Brush Orange Smart Baby is specially designed to clean baby feeding bottles thoroughly while maintaining proper hygiene.\nMade from high‑quality soft silicone, it gently removes milk residue without scratching bottles or nipples.\nIts ergonomic handle provides a firm and comfortable grip, making daily bottle cleaning easy and efficient.\nThe silicone material is durable, easy to wash, and quick to dry, ensuring better cleanliness.\nAn essential feeding accessory for regular baby bottle care at home.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Made from soft and baby‑safe silicone material</li>\n  <li>Gently cleans bottles without scratching surfaces</li>\n  <li>Helps maintain proper hygiene of baby feeding bottles</li>\n  <li>Comfortable grip for easy and daily use</li>\n  <li>Easy to wash and quick drying design</li>\n  <li>Ideal for regular baby bottle cleaning at home</li>\n</ul>',
	},
	{
		sku: '100147',
		title: 'BABY SILICONE BOTTLE BRUSH GREEN SMART BABY',
		description:
			'<p>The Baby Silicone Bottle Brush Green Smart Baby is specially designed to clean baby feeding bottles thoroughly while maintaining proper hygiene.\nMade from high‑quality soft silicone, it gently removes milk residue without scratching bottles or nipples.\nIts ergonomic handle provides a comfortable and firm grip, making daily bottle cleaning easy and efficient.\nThe silicone material is durable, easy to wash, and quick to dry for better cleanliness.\nAn essential baby feeding accessory for regular bottle care at home.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Made from soft and baby‑safe silicone material</li>\n  <li>Gently cleans bottles without scratching surfaces</li>\n  <li>Helps maintain proper hygiene of baby feeding bottles</li>\n  <li>Comfortable grip for easy and daily use</li>\n  <li>Easy to wash and quick drying design</li>\n  <li>Ideal for regular baby bottle cleaning at home</li>\n</ul>',
	},
	{
		sku: '100148',
		title: 'U TEETHER CAR BLUE',
		description:
			'<p>The U Teether Car Blue is designed to provide gentle relief during the teething stage while keeping babies happy and comfortable.\nMade from baby‑safe and soft materials, this teether helps soothe sore and irritated gums.\nIts attractive car shape in blue color captures baby’s attention and supports sensory development.\nEasy to grip and lightweight, it allows safe chewing for little hands.\nAn ideal teething toy for everyday use at home or while traveling.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Made from baby‑safe and gentle materials</li>\n  <li>Helps soothe sore and irritated baby gums</li>\n  <li>Fun car design in blue color for visual engagement</li>\n  <li>Easy‑to‑hold shape for little hands</li>\n  <li>Lightweight and comfortable for daily use</li>\n  <li>Ideal teething toy for newborns and infants</li>\n</ul>',
	},
	{
		sku: '100149',
		title: 'U TEETHER CAR YELLOW',
		description:
			'<p>The U Teether Car Yellow is designed to provide gentle teething relief while keeping babies comfortable and happy.\nMade from baby‑safe and soft materials, this teether helps soothe sore and irritated gums during the teething stage.\nIts bright yellow car design attracts baby’s attention and supports sensory development.\nEasy to grip and lightweight, it allows safe chewing for little hands.\nAn ideal teething toy for daily use at home or while traveling.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Made from baby‑safe and gentle materials</li>\n  <li>Helps soothe sore and irritated baby gums</li>\n  <li>Fun car design in bright yellow color for visual engagement</li>\n  <li>Easy‑to‑hold shape for little hands</li>\n  <li>Lightweight and comfortable for daily use</li>\n  <li>Ideal teething toy for newborns and infants</li>\n</ul>',
	},
	{
		sku: '100150',
		title: 'BABY BRUSH SET 5PCS BLUE MINITREE',
		description:
			'<p>The Baby Brush Set 5PCS Blue Minitree is specially designed to meet a baby’s daily grooming and hygiene needs.\nThis complete 5‑piece set includes soft and baby‑friendly brushes suitable for delicate hair and sensitive skin.\nMade from gentle materials, it helps keep baby clean and well‑groomed without causing irritation.\nThe attractive blue color with a cute design makes grooming more enjoyable for parents and babies.\nAn essential baby care set ideal for everyday use at home or as a thoughtful baby gift.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Complete 5‑piece grooming set for babies</li>\n  <li>Made from gentle and baby‑safe materials</li>\n  <li>Soft brushes suitable for delicate baby skin</li>\n  <li>Helps maintain daily baby hygiene and grooming</li>\n  <li>Attractive blue color with cute design</li>\n  <li>Ideal for everyday use or baby gifting</li>\n</ul>',
	},
	{
		sku: '100151',
		title: 'BABY BRUSH SET 5PCS YELLOW MINITREE',
		description:
			'<p>The Baby Brush Set 5PCS Yellow Minitree is specially designed to fulfill a baby’s daily grooming and hygiene needs.\nThis complete 5‑piece set includes soft and baby‑friendly brushes suitable for delicate hair and sensitive skin.\nMade from gentle and safe materials, it helps keep baby clean and well‑groomed without causing irritation.\nThe bright yellow color with a cute design makes grooming more pleasant for both parents and babies.\nAn essential baby care set ideal for everyday use or as a thoughtful baby gift</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Complete 5‑piece grooming set for babies</li>\n  <li>Made from gentle and baby‑safe materials</li>\n  <li>Soft brushes suitable for delicate baby skin</li>\n  <li>Helps maintain daily baby hygiene and grooming</li>\n  <li>Bright yellow color with cute design</li>\n  <li>Ideal for everyday use or baby gifting</li>\n</ul>',
	},
	{
		sku: '100152',
		title: 'BABY BRUSH SET 5PCS PINK MINITREE',
		description:
			'<p>The Baby Brush Set 5PCS Pink Minitree is specially designed to take care of a baby’s daily grooming and hygiene needs.\nThis complete 5‑piece set includes soft and baby‑friendly brushes suitable for delicate hair and sensitive skin.\nMade from gentle and safe materials, it helps keep baby clean and well‑groomed without causing irritation.\nThe soft pink color with a cute design makes grooming a pleasant experience for both parents and babies.\nAn essential baby care set ideal for everyday use or as a thoughtful baby gift.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Complete 5‑piece grooming set for babies</li>\n  <li>Made from gentle and baby‑safe materials</li>\n  <li>Soft brushes suitable for delicate baby skin</li>\n  <li>Helps maintain daily baby hygiene and grooming</li>\n  <li>Soft pink color with cute design</li>\n  <li>Ideal for everyday use or baby gifting</li>\n</ul>',
	},
	{
		sku: '100163',
		title: 'BABY PLAY GYM AEROPLANE BLUE',
		description:
			'<p>The Baby Play Gym Aeroplane Blue is designed to provide a fun and engaging play environment for babies.\nIt features a soft padded mat with an attractive aeroplane theme that keeps babies comfortable during playtime.\nHanging toys help stimulate baby’s senses and encourage reaching, grabbing, and movement.\nMade from baby‑friendly and safe materials, it supports early motor skill development.\nEasy to assemble and portable, making it ideal for tummy time and early play at home.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Soft padded mat with attractive aeroplane theme</li>\n  <li>Hanging toys for sensory stimulation and engagement</li>\n  <li>Encourages early motor skill development</li>\n  <li>Made from safe and baby‑friendly materials</li>\n  <li>Easy to assemble and portable design</li>\n  <li>Ideal for tummy time and early baby play</li>\n</ul>',
	},
	{
		sku: '100165',
		title: 'BABY FEEDING BOTTLE ELEPHANT BLUE 90ML MAQ',
		description:
			'<p>The Baby Feeding Bottle Elephant Blue 90ML MAQ is specially designed to provide safe and convenient feeding for newborns and infants.\nIts compact 90ml capacity is ideal for small feedings, making it perfect for early feeding stages.\nMade from baby‑safe materials, the bottle ensures gentle and comfortable feeding.\nThe cute elephant design in blue color attracts baby’s attention and makes feeding time enjoyable.\nLightweight and easy to hold, it is suitable for both home use and travel.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>90ml capacity ideal for newborn feeding</li>\n  <li>Made from baby‑safe and durable materials</li>\n  <li>Cute elephant design in attractive blue color</li>\n  <li>Lightweight and easy‑to‑hold bottle</li>\n  <li>Comfortable feeding experience for babies</li>\n  <li>Suitable for daily use at home or travel</li>\n</ul>',
	},
	{
		sku: '100166',
		title: 'BABY FEEDING BOTTLE ELEPHANT ORANGE 90ML MAQ',
		description:
			'<p>The Baby Feeding Bottle Elephant Orange 90ML MAQ is specially designed to provide safe and convenient feeding for newborns and infants.\nIts compact 90ml capacity makes it ideal for small feedings during early stages.\nMade from baby‑safe and durable materials, it ensures a gentle and comfortable feeding experience.\nThe cute elephant design in bright orange color attracts baby’s attention and makes feeding time enjoyable.\nLightweight and easy to hold, it is suitable for both home use and travel.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>90ml capacity ideal for newborn feeding</li>\n  <li>Made from baby‑safe and durable materials</li>\n  <li>Cute elephant design in attractive orange color</li>\n  <li>Lightweight and easy‑to‑hold bottle</li>\n  <li>Comfortable feeding experience for babies</li>\n  <li>Suitable for daily use at home or travel</li>\n</ul>',
	},
	{
		sku: '100167',
		title: 'BABY FEEDING BOTTLE ELEPHANT PINK 90ML MAQ',
		description:
			'<p>The Baby Feeding Bottle Elephant Pink 90ML MAQ is specially designed to provide safe and convenient feeding for newborns and infants.\nIts compact 90ml capacity makes it ideal for small feedings during early stages.\nMade from baby‑safe and durable materials, it ensures a gentle and comfortable feeding experience.\nThe cute elephant design in soft pink color attracts baby’s attention and makes feeding time enjoyable.\nLightweight and easy to hold, it is suitable for both home use and travel.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>90ml capacity ideal for newborn feeding</li>\n  <li>Made from baby‑safe and durable materials</li>\n  <li>Cute elephant design in soft pink color</li>\n  <li>Lightweight and easy‑to‑hold bottle</li>\n  <li>Comfortable feeding experience for babies</li>\n  <li>Suitable for daily use at home or travel</li>\n</ul>',
	},
	{
		sku: '100168',
		title: 'BABY FEEDING BOTTLE ELEPHANT PURPLE 90ML MAQ',
		description:
			'<p>The Baby Feeding Bottle Elephant Purple 90ML MAQ is specially designed to provide safe and convenient feeding for newborns and infants.\nIts compact 90ml capacity makes it ideal for small feedings during early stages.\nMade from baby‑safe and durable materials, it ensures a gentle and comfortable feeding experience.\nThe cute elephant design in attractive purple color keeps babies engaged and makes feeding time enjoyable.\nLightweight and easy to hold, it is suitable for both home use and travel.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>90ml capacity ideal for newborn feeding</li>\n  <li>Made from baby‑safe and durable materials</li>\n  <li>Cute elephant design in attractive purple color</li>\n  <li>Lightweight and easy‑to‑hold bottle</li>\n  <li>Comfortable feeding experience for babies</li>\n  <li>Suitable for daily use at home or travel</li>\n</ul>',
	},
	{
		sku: '100169',
		title: 'BABY FEEDING BOTTLE ELEPHANT SKY BLUE 90ML MAQ',
		description:
			'<p>The Baby Feeding Bottle Elephant Sky Blue 90ML MAQ is specially designed to provide safe and convenient feeding for newborns and infants.\nIts compact 90ml capacity makes it ideal for small feedings during early stages.\nMade from baby‑safe and durable materials, it ensures a gentle and comfortable feeding experience.\nThe cute elephant design in sky blue color attracts baby’s attention and makes feeding time enjoyable.\nLightweight and easy to hold, it is suitable for both home use and travel.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>90ml capacity ideal for newborn feeding</li>\n  <li>Made from baby‑safe and durable materials</li>\n  <li>Cute elephant design in sky blue color</li>\n  <li>Lightweight and easy‑to‑hold bottle</li>\n  <li>Comfortable feeding experience for babies</li>\n  <li>Suitable for daily use at home or travel</li>\n</ul>',
	},
	{
		sku: '100170',
		title: 'BABY FEEDING BOTTLE DOLPHIN PINK 75ML MAQ',
		description:
			'<p>The Baby Feeding Bottle Dolphin Pink 75ML MAQ is specially designed to provide safe and gentle feeding for newborns and infants.\nIts compact 75ml capacity makes it ideal for small feedings during early stages.\nMade from baby‑safe and durable materials, it ensures a smooth and comfortable feeding experience.\nThe cute dolphin design in soft pink color keeps babies engaged and makes feeding time enjoyable.\nLightweight and easy to hold, it is suitable for both home use and travel.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>75ml capacity ideal for newborn feeding</li>\n  <li>Made from baby‑safe and durable materials</li>\n  <li>Cute dolphin design in soft pink color</li>\n  <li>Lightweight and easy‑to‑hold bottle</li>\n  <li>Comfortable feeding experience for babies</li>\n  <li>Suitable for daily use at home or travel</li>\n</ul>',
	},
	{
		sku: '100171',
		title: 'BABY FEEDING BOTTLE DOLPHIN BABY PINK 75ML MAQ',
		description:
			'<p>The Baby Feeding Bottle Dolphin Baby Pink 75ML MAQ is specially designed to provide safe and gentle feeding for newborns and infants.\nIts compact 75ml capacity is ideal for small feedings during the early feeding stages.\nMade from baby‑safe and durable materials, it ensures a smooth and comfortable feeding experience.\nThe cute dolphin design in baby pink color keeps babies engaged and makes feeding time enjoyable.\nLightweight and easy to hold, it is suitable for both home use and travel.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>75ml capacity ideal for newborn feeding</li>\n  <li>Made from baby‑safe and durable materials</li>\n  <li>Cute dolphin design in baby pink color</li>\n  <li>Lightweight and easy‑to‑hold bottle</li>\n  <li>Comfortable feeding experience for babies</li>\n  <li>Suitable for daily use at home or travel</li>\n</ul>',
	},
	{
		sku: '100172',
		title: 'BABY FEEDING BOTTLE DOLPHIN CYAN 75ML MAQ',
		description:
			'<p>The Baby Feeding Bottle Dolphin Cyan 75ML MAQ is specially designed to provide safe and gentle feeding for newborns and infants.\nIts compact 75ml capacity makes it ideal for small feedings during early feeding stages.\nMade from baby‑safe and durable materials, it ensures a smooth and comfortable feeding experience.\nThe cute dolphin design in attractive cyan color keeps babies engaged and makes feeding time enjoyable.\nLightweight and easy to hold, it is suitable for both home use and travel.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>75ml capacity ideal for newborn feeding</li>\n  <li>Made from baby‑safe and durable materials</li>\n  <li>Cute dolphin design in attractive cyan color</li>\n  <li>Lightweight and easy‑to‑hold bottle</li>\n  <li>Comfortable feeding experience for babies</li>\n  <li>Suitable for daily use at home or travel</li>\n</ul>',
	},
	{
		sku: '100173',
		title: 'BABY FEEDING BOTTLE DOLPHIN ORANGE 75ML MAQ',
		description:
			'<p>The Baby Feeding Bottle Dolphin Orange 75ML MAQ is specially designed to provide safe and gentle feeding for newborns and infants.\nIts compact 75ml capacity makes it ideal for small feedings during early feeding stages.\nMade from baby‑safe and durable materials, it ensures a smooth and comfortable feeding experience.\nThe cute dolphin design in bright orange color keeps babies engaged and makes feeding time enjoyable.\nLightweight and easy to hold, it is suitable for both home use and travel.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>75ml capacity ideal for newborn feeding</li>\n  <li>Made from baby‑safe and durable materials</li>\n  <li>Cute dolphin design in bright orange color</li>\n  <li>Lightweight and easy‑to‑hold bottle</li>\n  <li>Comfortable feeding experience for babies</li>\n  <li>Suitable for daily use at home or travel</li>\n</ul>',
	},
	{
		sku: '100174',
		title: 'BABY FEEDING BOTTLE DOLPHIN BLUE 75ML MAQ',
		description:
			'<p>The Baby Feeding Bottle Dolphin Blue 75ML MAQ is specially designed to provide safe and gentle feeding for newborns and infants.\nIts compact 75ml capacity makes it ideal for small feedings during early feeding stages.\nMade from baby‑safe and durable materials, it ensures a smooth and comfortable feeding experience.\nThe cute dolphin design in blue color keeps babies engaged and makes feeding time enjoyable.\nLightweight and easy to hold, it is suitable for both home use and travel.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>75ml capacity ideal for newborn feeding</li>\n  <li>Made from baby‑safe and durable materials</li>\n  <li>Cute dolphin design in blue color</li>\n  <li>Lightweight and easy‑to‑hold bottle</li>\n  <li>Comfortable feeding experience for babies</li>\n  <li>Suitable for daily use at home or travel</li>\n</ul>',
	},
	{
		sku: '100175',
		title: 'BABY FEEDING BOTTLE DOLPHIN RED 75ML MAQ',
		description:
			'<p>The Baby Feeding Bottle Dolphin Red 75ML MAQ is specially designed to provide safe and gentle feeding for newborns and infants.\nIts compact 75ml capacity makes it ideal for small feedings during early feeding stages.\nMade from baby‑safe and durable materials, it ensures a smooth and comfortable feeding experience.\nThe cute dolphin design in bright red color keeps babies engaged and makes feeding time enjoyable.\nLightweight and easy to hold, it is suitable for both home use and travel.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>75ml capacity ideal for newborn feeding</li>\n  <li>Made from baby‑safe and durable materials</li>\n  <li>Cute dolphin design in bright red color</li>\n  <li>Lightweight and easy‑to‑hold bottle</li>\n  <li>Comfortable feeding experience for babies</li>\n  <li>Suitable for daily use at home or travel</li>\n</ul>',
	},
	{
		sku: '100176',
		title: 'BABY FEEDING BOTTLE WIDE NECK BLUE 60ML MAQ',
		description:
			'<p>The Baby Feeding Bottle Wide Neck Blue 60ML MAQ is specially designed to provide safe and comfortable feeding for newborns and young infants.\nIts 60ml capacity is ideal for small feedings during the early feeding stage.\nThe wide neck design allows easy filling, cleaning, and hygienic use.\nMade from baby‑safe and durable materials, it ensures a gentle feeding experience.\nThe attractive blue color and lightweight design make it convenient for daily home use and travel.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>60ml capacity ideal for newborn feeding</li>\n  <li>Wide neck design for easy filling and cleaning</li>\n  <li>Made from baby‑safe and durable materials</li>\n  <li>Lightweight and easy‑to‑hold bottle</li>\n  <li>Comfortable and gentle feeding experience</li>\n  <li>Suitable for daily use at home or travel</li>\n</ul>',
	},
	{
		sku: '100177',
		title: 'BABY FEEDING BOTTLE WIDE NECK PINK 60ML MAQ',
		description:
			'<p>The Baby Feeding Bottle Wide Neck Pink 60ML MAQ is specially designed to provide safe and comfortable feeding for newborns and young infants.\nIts 60ml capacity is ideal for small feedings during the early feeding stage.\nThe wide neck design allows easy filling, cleaning, and hygienic use.\nMade from baby‑safe and durable materials, it ensures a gentle and smooth feeding experience.\nThe soft pink color and lightweight design make it perfect for daily home use and travel.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>60ml capacity ideal for newborn feeding</li>\n  <li>Wide neck design for easy filling and cleaning</li>\n  <li>Made from baby‑safe and durable materials</li>\n  <li>Lightweight and easy‑to‑hold bottle</li>\n  <li>Comfortable and gentle feeding experience</li>\n  <li>Suitable for daily use at home or travel</li>\n</ul>',
	},
	{
		sku: '100178',
		title: 'BABY FEEDING BOTTLE WIDE NECK PURPLE 60ML MAQ',
		description:
			'<p>The Baby Feeding Bottle Wide Neck Purple 60ML MAQ is specially designed to provide safe and comfortable feeding for newborns and young infants.\nIts 60ml capacity is ideal for small feedings during the early feeding stage.\nThe wide neck design allows easy filling, cleaning, and hygienic use.\nMade from baby‑safe and durable materials, it ensures a gentle and smooth feeding experience.\nThe attractive purple color and lightweight design make it suitable for daily home use and travel.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>60ml capacity ideal for newborn feeding</li>\n  <li>Wide neck design for easy filling and cleaning</li>\n  <li>Made from baby‑safe and durable materials</li>\n  <li>Lightweight and easy‑to‑hold bottle</li>\n  <li>Comfortable and gentle feeding experience</li>\n  <li>Suitable for daily use at home or travel</li>\n</ul>',
	},
	{
		sku: '100179',
		title: 'BABY FEEDING BOTTLE WIDE NECK RED 60ML MAQ',
		description:
			'<p>The Baby Feeding Bottle Wide Neck Red 60ML MAQ is specially designed to provide safe and comfortable feeding for newborns and young infants.\nIts 60ml capacity is ideal for small feedings during the early feeding stage.\nThe wide neck design allows easy filling, cleaning, and hygienic use.\nMade from baby‑safe and durable materials, it ensures a gentle and smooth feeding experience.\nThe bright red color and lightweight design make it suitable for daily home use and travel.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>60ml capacity ideal for newborn feeding</li>\n  <li>Wide neck design for easy filling and cleaning</li>\n  <li>Made from baby‑safe and durable materials</li>\n  <li>Lightweight and easy‑to‑hold bottle</li>\n  <li>Comfortable and gentle feeding experience</li>\n  <li>Suitable for daily use at home or travel</li>\n</ul>',
	},
	{
		sku: '100180',
		title: 'BABY FEEDING BOTTLE WIDE NECK CYAN 60ML MAQ',
		description:
			'<p>The Baby Feeding Bottle Wide Neck Cyan 60ML MAQ is specially designed to provide safe and comfortable feeding for newborns and young infants.\nIts 60ml capacity is ideal for small feedings during the early feeding stage.\nThe wide neck design allows easy filling, cleaning, and hygienic use.\nMade from baby‑safe and durable materials, it ensures a gentle and smooth feeding experience.\nThe attractive cyan color and lightweight design make it suitable for daily home use and travel.</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>60ml capacity ideal for newborn feeding</li>\n  <li>Wide neck design for easy filling and cleaning</li>\n  <li>Made from baby‑safe and durable materials</li>\n  <li>Lightweight and easy‑to‑hold bottle</li>\n  <li>Comfortable and gentle feeding experience</li>\n  <li>Suitable for daily use at home or travel</li>\n  <li>.</li>\n</ul>',
	},
	{
		sku: '100181',
		title: 'BABY FEEDING BOTTLE WIDE NECK YELLOW 60ML MAQ',
		description: '',
	},
	{
		sku: '100182',
		title: 'BABY FEEDING BOTTLE BEAR RED BASEBALL CAP 90ML MAQ',
		description: '',
	},
	{
		sku: '100183',
		title: 'BABY FEEDING BOTTLE BEAR PURPLE BASEBALL CAP 90ML MAQ',
		description: '',
	},
	{
		sku: '100184',
		title: 'BABY FEEDING BOTTLE BEAR PINK BASEBALL CAP 90ML MAQ',
		description: '',
	},
	{
		sku: '100185',
		title: 'BABY FEEDING BOTTLE BEAR CYAN BASEBALL CAP 90ML MAQ',
		description: '',
	},
	{
		sku: '100186',
		title: 'BABY FEEDING BOTTLE BEAR ORANGE BASEBALL CAP 90ML MAQ',
		description: '',
	},
	{
		sku: '100187',
		title: 'BABY FEEDING MINI BOTTLE RED 60ML MAQ',
		description: '',
	},
	{
		sku: '100188',
		title: 'BABY FEEDING MINI BOTTLE PINK 60ML MAQ',
		description: '',
	},
	{
		sku: '100189',
		title: 'BABY FEEDING MINI BOTTLE BLUE 60ML MAQ',
		description: '',
	},
	{
		sku: '100190',
		title: 'BABY FEEDING MINI BOTTLE PURPLE 60ML MAQ',
		description: '',
	},
	{
		sku: '100191',
		title: 'BABY FEEDING MINI BOTTLE ORANGE 60ML MAQ',
		description: '',
	},
	{
		sku: '100192',
		title: 'BABY FEEDING MINI BOTTLE CYAN 60ML MAQ',
		description: '',
	},
	{
		sku: '100193',
		title: 'BABY FEEDING BOTTLE RATTLE CAP RED 60ML MAQ',
		description: '',
	},
	{
		sku: '100194',
		title: 'BABY FEEDING BOTTLE RATTLE CAP PINK 60ML MAQ',
		description: '',
	},
	{
		sku: '100195',
		title: 'BABY FEEDING BOTTLE RATTLE CAP CYAN 60ML MAQ',
		description: '',
	},
	{
		sku: '100196',
		title: 'BABY FEEDING BOTTLE RATTLE CAP BLUE 60ML MAQ',
		description: '',
	},
	{
		sku: '100197',
		title: 'BABY FEEDING BOTTLE RATTLE CAP ORANGE 60ML MAQ',
		description: '',
	},
	{
		sku: '100198',
		title: 'BABY FEEDING BOTTLE RATTLE CAP PURPLE 60ML MAQ',
		description: '',
	},
	{
		sku: '100199',
		title: 'BABY FEEDING GLASS BOTTLE BEAR ORANGE 120ML MAQ',
		description: '',
	},
	{
		sku: '100200',
		title: 'BABY FEEDING GLASS BOTTLE BEAR CYAN 120ML MAQ',
		description: '',
	},
	{
		sku: '100201',
		title: 'BABY FEEDING GLASS BOTTLE BEAR PINK 120ML MAQ',
		description: '',
	},
	{
		sku: '100202',
		title: 'BABY FEEDING GLASS BOTTLE BEAR RED 120ML MAQ',
		description: '',
	},
	{
		sku: '100203',
		title: 'BABY FEEDING GLASS BOTTLE BEAR BLUE 120ML MAQ',
		description: '',
	},
	{
		sku: '100204',
		title: 'BABY FEEDING GLASS BOTTLE BEAR PURPLE 120ML MAQ',
		description: '',
	},
	{
		sku: '100205',
		title: 'BABY FEEDING GLASS BOTTLE BEAR PINK 240ML MAQ',
		description: '',
	},
	{
		sku: '100206',
		title: 'BABY FEEDING GLASS BOTTLE BEAR ORANGE 240ML MAQ',
		description: '',
	},
	{
		sku: '100207',
		title: 'BABY FEEDING GLASS BOTTLE BEAR PURPLE 240ML MAQ',
		description: '',
	},
	{
		sku: '100208',
		title: 'BABY FEEDING GLASS BOTTLE BEAR CYAN 240ML MAQ',
		description: '',
	},
	{
		sku: '100209',
		title: 'BABY SIPPER PINK 240ML MAQ',
		description: '',
	},
	{
		sku: '100210',
		title: 'BABY SIPPER CYAN 240ML MAQ',
		description: '',
	},
	{
		sku: '100211',
		title: 'BABY SIPPER PURPLE 240ML MAQ',
		description: '',
	},
	{
		sku: '100212',
		title: 'BABY SIPPER RED 240ML MAQ',
		description: '',
	},
	{
		sku: '100213',
		title: 'BABY SIPPER BLUE 240ML MAQ',
		description: '',
	},
	{
		sku: '100214',
		title: 'BABY GLASS FEEDER PINK 70ML YES',
		description: '',
	},
	{
		sku: '100215',
		title: 'BABY GLASS FEEDER PURPLE 70ML YES',
		description: '',
	},
	{
		sku: '100216',
		title: 'BABY GLASS FEEDER GREEN 70ML YES',
		description: '',
	},
	{
		sku: '100217',
		title: 'BABY GLASS FEEDER BROWN 70ML YES',
		description: '',
	},
	{
		sku: '100218',
		title: 'BABY GLASS FEEDER RED 70ML YES',
		description: '',
	},
	{
		sku: '100219',
		title: 'BABY GLASS FEEDER DARK BLUE 70ML YES',
		description: '',
	},
	{
		sku: '100220',
		title: 'BABY GLASS FEEDER BABY PINK 70ML YES',
		description: '',
	},
	{
		sku: '100221',
		title: 'BABY GLASS FEEDER GREY 70ML YES',
		description: '',
	},
	{
		sku: '100222',
		title: 'BABY GLASS FEEDER DARK GREEN 70ML YES',
		description: '',
	},
	{
		sku: '100223',
		title: 'BABY GLASS FEEDER PURPLE RATTLE CAP 70ML YES',
		description: '',
	},
	{
		sku: '100224',
		title: 'BABY GLASS FEEDER DARK PURPLE RATTLE CAP 70ML YES',
		description: '',
	},
	{
		sku: '100225',
		title: 'BABY GLASS FEEDER GREEN RATTLE CAP 70ML YES',
		description: '',
	},
	{
		sku: '100226',
		title: 'BABY GLASS FEEDER PINK RATTLE CAP 70ML YES',
		description: '',
	},
	{
		sku: '100227',
		title: 'BABY GLASS FEEDER BROWN RATTLE CAP 70ML YES',
		description: '',
	},
	{
		sku: '100228',
		title: 'BABY GLASS FEEDER SKIN BROWN RATTLE CAP 70ML YES',
		description: '',
	},
	{
		sku: '100229',
		title: 'BABY GLASS FEEDER BEAR PURPLE 70ML YES',
		description: '',
	},
	{
		sku: '100230',
		title: 'BABY GLASS FEEDER BEAR DARK PURPLE 70ML YES',
		description: '',
	},
	{
		sku: '100231',
		title: 'BABY GLASS FEEDER BEAR PINK 70ML YES',
		description: '',
	},
	{
		sku: '100232',
		title: 'BABY GLASS FEEDER BEAR BROWN 70ML YES',
		description: '',
	},
	{
		sku: '100233',
		title: 'BABY GLASS FEEDER BEAR ORANGE 70ML YES',
		description: '',
	},
	{
		sku: '100234',
		title: 'BABY GLASS FEEDER STAR CAP DARK PURPLE 120ML YES',
		description: '',
	},
	{
		sku: '100235',
		title: 'BABY GLASS FEEDER STAR CAP PURPLE 120ML YES',
		description: '',
	},
	{
		sku: '100236',
		title: 'BABY GLASS FEEDER STAR CAP GREEN 120ML YES',
		description: '',
	},
	{
		sku: '100237',
		title: 'BABY GLASS FEEDER STAR CAP PINK 120ML YES',
		description: '',
	},
	{
		sku: '100238',
		title: 'BABY GLASS FEEDER STAR CAP BROWN 120ML YES',
		description: '',
	},
	{
		sku: '100239',
		title: 'BABY GLASS FEEDER FAN CAP DARK PURPLE 120ML YES',
		description: '',
	},
	{
		sku: '100240',
		title: 'BABY GLASS FEEDER FAN CAP PURPLE 120ML YES',
		description: '',
	},
	{
		sku: '100241',
		title: 'BABY GLASS FEEDER FAN CAP GREEN 120ML YES',
		description: '',
	},
	{
		sku: '100242',
		title: 'BABY GLASS FEEDER FAN CAP PINK 120ML YES',
		description: '',
	},
	{
		sku: '100243',
		title: 'BABY GLASS FEEDER MICKEYMOUSE PINK 240ML YES',
		description: '',
	},
	{
		sku: '100244',
		title: 'BABY GLASS FEEDER MICKEYMOUSE PURPLE 240ML YES',
		description: '',
	},
	{
		sku: '100245',
		title: 'BABY GLASS FEEDER MICKEYMOUSE DARK PURPLE 240ML YES',
		description: '',
	},
	{
		sku: '100246',
		title: 'BABY GLASS FEEDER MICKEYMOUSE GREEN 240ML YES',
		description: '',
	},
	{
		sku: '100247',
		title: 'BABY GLASS FEEDER MICKEYMOUSE ORANGE 240ML YES',
		description: '',
	},
	{
		sku: '100248',
		title: 'BABY GLASS FEEDER RATTLE CAP PINK 300ML YES',
		description: '',
	},
	{
		sku: '100249',
		title: 'BABY GLASS FEEDER RATTLE CAP PURPLE 300ML YES',
		description: '',
	},
	{
		sku: '100250',
		title: 'BABY GLASS FEEDER RATTLE CAP GREEN 300ML YES',
		description: '',
	},
	{
		sku: '100251',
		title: 'BABY GLASS FEEDER RATTLE CAP SKIN BROWN 300ML YES',
		description: '',
	},
	{
		sku: '100252',
		title: 'BABY GLASS FEEDER MICKEYMOUSE PURPLE 100ML YES',
		description: '',
	},
	{
		sku: '100253',
		title: 'BABY GLASS FEEDER MICKEYMOUSE DARK PURPLE 100ML YES',
		description: '',
	},
	{
		sku: '100254',
		title: 'BABY GLASS FEEDER MICKEYMOUSE BROWN 100ML YES',
		description: '',
	},
	{
		sku: '100255',
		title: 'BABY GLASS FEEDER MICKEYMOUSE PINK 100ML YES',
		description: '',
	},
	{
		sku: '100256',
		title: 'BABY GLASS FEEDER UNICORN PURPLE 300ML YES',
		description: '',
	},
	{
		sku: '100257',
		title: 'BABY GLASS FEEDER UNICORN DARK PURPLE 300ML YES',
		description: '',
	},
	{
		sku: '100258',
		title: 'BABY GLASS FEEDER UNICORN PINK 300ML YES',
		description: '',
	},
	{
		sku: '100259',
		title: 'BABY GLASS FEEDER UNICORN GREEN 300ML YES',
		description: '',
	},
	{
		sku: '100260',
		title: 'BABY GLASS FEEDER UNICORN ORANGE 300ML YES',
		description: '',
	},
	{
		sku: '100261',
		title: 'BABY FEEDING BOTTLE UNICORN PINK 240ML FISH',
		description: '',
	},
	{
		sku: '100262',
		title: 'BABY FEEDING BOTTLE UNICORN GREEN 240ML FISH',
		description: '',
	},
	{
		sku: '100263',
		title: 'BABY FEEDING BOTTLE UNICORN CYAN 240ML FISH',
		description: '',
	},
	{
		sku: '100264',
		title: 'BABY FEEDING BOTTLE UNICORN PINK 150ML FISH',
		description: '',
	},
	{
		sku: '100265',
		title: 'BABY FEEDING BOTTLE UNICORN PURPLE 150ML FISH',
		description: '',
	},
	{
		sku: '100266',
		title: 'BABY FEEDING BOTTLE UNICORN CYAN 150ML FISH',
		description: '',
	},
	{
		sku: '100267',
		title: 'BABY FEEDING BOTTLE UNICORN GREEN 150ML FISH',
		description: '',
	},
	{
		sku: '100268',
		title: 'BABY GLASS FEEDER CARTOON BEAR PURPLE 120ML FISH',
		description: '',
	},
	{
		sku: '100269',
		title: 'BABY GLASS FEEDER CARTOON BEAR PINK 120ML FISH',
		description: '',
	},
	{
		sku: '100270',
		title: 'BABY GLASS FEEDER CARTOON BEAR GREEN 120ML FISH',
		description: '',
	},
	{
		sku: '100271',
		title: 'BABY GLASS FEEDER CARTOON BEAR CYAN 120ML FISH',
		description: '',
	},
	{
		sku: '100272',
		title: 'BABY GLASS FEEDER UNICORN PURPLE 120ML FISH',
		description: '',
	},
	{
		sku: '100273',
		title: 'BABY GLASS FEEDER UNICORN CYAN 120ML FISH',
		description: '',
	},
	{
		sku: '100274',
		title: 'BABY GLASS FEEDER UNICORN GREEN 120ML FISH',
		description: '',
	},
	{
		sku: '100275',
		title: 'BABY GLASS FEEDER UNICORN PINK 120ML FISH',
		description: '',
	},
	{
		sku: '100276',
		title: 'BABY GLASS FEEDER UNICORN PURPLE 240ML FISH',
		description: '',
	},
	{
		sku: '100277',
		title: 'BABY GLASS FEEDER UNICORN GREEN 240ML FISH',
		description: '',
	},
	{
		sku: '100278',
		title: 'BABY GLASS FEEDER UNICORN CYAN 240ML FISH',
		description: '',
	},
	{
		sku: '100279',
		title: 'BABY GLASS FEEDER UNICORN PINK 240ML FISH',
		description: '',
	},
	{
		sku: '100280',
		title: 'BABY GLASS FEEDER BUNNY CYAN 240ML FISH',
		description: '',
	},
	{
		sku: '100281',
		title: 'BABY GLASS FEEDER BUNNY PINK 240ML FISH',
		description: '',
	},
	{
		sku: '100282',
		title: 'BABY GLASS FEEDER BUNNY GREEN 240ML FISH',
		description: '',
	},
	{
		sku: '100283',
		title: 'BABY GLASS FEEDER BUNNY PURPLE 240ML FISH',
		description: '',
	},
	{
		sku: '100284',
		title: 'BABY FEEDING BOTTLE ROCKET DESIGN ORANGE 330ML FISH',
		description: '',
	},
	{
		sku: '100285',
		title: 'BABY FEEDING BOTTLE ROCKET DESIGN PURPLE 330ML FISH',
		description: '',
	},
	{
		sku: '100286',
		title: 'BABY FEEDING BOTTLE ROCKET DESIGN GREEN 330ML FISH',
		description: '',
	},
	{
		sku: '100287',
		title: 'BABY FEEDING BOTTLE ROCKET DESIGN BLUE 330ML FISH',
		description: '',
	},
	{
		sku: '100288',
		title: 'BABY GLASS FEEDER BUNNY PURPLE 150ML FISH',
		description: '',
	},
	{
		sku: '100289',
		title: 'BABY GLASS FEEDER BUNNY CYAN 150ML FISH',
		description: '',
	},
	{
		sku: '100290',
		title: 'BABY GLASS FEEDER BUNNY PINK 150ML FISH',
		description: '',
	},
	{
		sku: '100291',
		title: 'BABY GLASS FEEDER BUNNY GREEN 150ML FISH',
		description: '',
	},
	{
		sku: '100292',
		title: 'BABY FEEDER BUNNY GREEN 250ML FISH',
		description: '',
	},
	{
		sku: '100293',
		title: 'BABY FEEDER BUNNY PURPLE 250ML FISH',
		description: '',
	},
	{
		sku: '100294',
		title: 'BABY FEEDER BUNNY CYAN 250ML FISH',
		description: '',
	},
	{
		sku: '100295',
		title: 'BABY FEEDING BOTTLE ROCKET DESIGN BLUE 260ML FISH',
		description: '',
	},
	{
		sku: '100296',
		title: 'BABY FEEDING BOTTLE ROCKET DESIGN GREEN 260ML FISH',
		description: '',
	},
	{
		sku: '100297',
		title: 'BABY FEEDING BOTTLE ROCKET DESIGN PURPLE 260ML FISH',
		description: '',
	},
	{
		sku: '100298',
		title: 'BABY FEEDING BOTTLE ROCKET DESIGN SKIN BROWN 260ML FISH',
		description: '',
	},
	{
		sku: '100299',
		title: 'BABY FEEDING BOTTLE UNICORN GREEN 60ML FISH',
		description: '',
	},
	{
		sku: '100300',
		title: 'BABY FEEDING BOTTLE UNICORN DARK GREEN 60ML FISH',
		description: '',
	},
	{
		sku: '100301',
		title: 'BABY FEEDING BOTTLE UNICORN SKIN BROWN 60ML FISH',
		description: '',
	},
	{
		sku: '100302',
		title: 'BABY FEEDING BOTTLE UNICORN PURPLE 60ML FISH',
		description: '',
	},
	{
		sku: '100303',
		title: 'BABY FEEDING BOTTLE CARTOON BEAR GREEN 150ML FISH',
		description: '',
	},
	{
		sku: '100304',
		title: 'BABY FEEDING BOTTLE CARTOON BEAR PURPLE 150ML FISH',
		description: '',
	},
	{
		sku: '100305',
		title: 'BABY FEEDING BOTTLE CARTOON BEAR PINK 150ML FISH',
		description: '',
	},
	{
		sku: '100306',
		title: 'BABY FEEDING BOTTLE CARTOON BEAR CYAN 150ML FISH',
		description: '',
	},
	{
		sku: '100307',
		title: 'BABY FEEDING BOTTLE ANIMAL BLUE RATTLE HANDLE 350ML FISH',
		description: '',
	},
	{
		sku: '100308',
		title: 'BABY FEEDING BOTTLE ANIMAL SKIN BROWN RATTLE HANDLE 350ML FISH',
		description: '',
	},
	{
		sku: '100309',
		title: 'BABY FEEDING BOTTLE ANIMAL GREEN RATTLE HANDLE 350ML FISH',
		description: '',
	},
	{
		sku: '100310',
		title: 'BABY FEEDING BOTTLE ANIMAL BLUE RATTLE HANDLE 250ML FISH',
		description: '',
	},
	{
		sku: '100311',
		title: 'BABY FEEDING BOTTLE ANIMAL SKIN BROWN RATTLE HANDLE 250ML FISH',
		description: '',
	},
	{
		sku: '100312',
		title: 'BABY FEEDING BOTTLE ANIMAL GREEN RATTLE HANDLE 250ML FISH',
		description: '',
	},
	{
		sku: '100313',
		title: 'BABY FEEDING BOTTLE CUTE ANIMAL BROWN 240ML FISH',
		description: '',
	},
	{
		sku: '100314',
		title: 'BABY FEEDING BOTTLE CUTE ANIMAL PURPLE 240ML FISH',
		description: '',
	},
	{
		sku: '100315',
		title: 'BABY FEEDING BOTTLE CUTE ANIMAL GREEN 240ML FISH',
		description: '',
	},
	{
		sku: '100316',
		title: 'BABY GLASS FEEDER UNICORN PURPLE 120ML YES',
		description: '',
	},
	{
		sku: '100317',
		title: 'BABY GLASS FEEDER UNICORN GREEN 120ML YES',
		description: '',
	},
	{
		sku: '100318',
		title: 'BABY GLASS FEEDER UNICORN LIGHT PURPLE 120ML YES',
		description: '',
	},
	{
		sku: '100319',
		title: 'BABY GLASS FEEDER UNICORN SKIN BROWN 120ML YES',
		description: '',
	},
	{
		sku: '100320',
		title: 'BABY FEEDER KING CAP PINK 60ML PREETY BABY',
		description: '',
	},
	{
		sku: '100321',
		title: 'BABY FEEDER KING CAP SEA GREEN 60ML PREETY BABY',
		description: '',
	},
	{
		sku: '100322',
		title: 'BABY FEEDER KING CAP GREY 60ML PREETY BABY',
		description: '',
	},
	{
		sku: '100323',
		title: 'BABY FEEDER BEE CAP GREEN 60ML FISH',
		description: '',
	},
	{
		sku: '100324',
		title: 'BABY FEEDER BEE CAP ORANGE 60ML FISH',
		description: '',
	},
	{
		sku: '100325',
		title: 'BABY FEEDER BEE CAP YELLOW 60ML FISH',
		description: '',
	},
	{
		sku: '100326',
		title: 'BABY FEEDER CUTE CHICK PURPLE 280ML FISH',
		description: '',
	},
	{
		sku: '100327',
		title: 'BABY FEEDER CUTE CHICK PINK 280ML FISH',
		description: '',
	},
	{
		sku: '100328',
		title: 'BABY FEEDER CUTE CHICK GREEN 280ML FISH',
		description: '',
	},
	{
		sku: '100329',
		title: 'BABY FEEDER CUTE CHICK CYAN 280ML FISH',
		description: '',
	},
	{
		sku: '100330',
		title: 'BABY FEEDER SIMPLE GREEN 150ML PREETY BABY',
		description: '',
	},
	{
		sku: '100331',
		title: 'BABY FEEDER SIMPLE PINK 150ML PREETY BABY',
		description: '',
	},
	{
		sku: '100332',
		title: 'BABY FEEDER SIMPLE BLUE 150ML PREETY BABY',
		description: '',
	},
	{
		sku: '100333',
		title: 'BABY FEEDER SIMPLE GREEN 280ML PREETY BABY',
		description: '',
	},
	{
		sku: '100334',
		title: 'BABY FEEDER SIMPLE PINK 280ML PREETY BABY',
		description: '',
	},
	{
		sku: '100335',
		title: 'BABY FEEDER SIMPLE BLUE 280ML PREETY BABY',
		description: '',
	},
	{
		sku: '100336',
		title: 'BABY FEEDER SIMPLE GREEN 60ML PREETY BABY',
		description: '',
	},
	{
		sku: '100337',
		title: 'BABY FEEDER SIMPLE PINK 60ML PREETY BABY',
		description: '',
	},
];
