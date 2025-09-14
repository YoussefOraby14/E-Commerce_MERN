import Product from '../models/productModel.js';
export async function getAllProducts() {
    try {
        const products = await Product.find();
        return products;
    }
    catch (error) {
        throw new Error('Failed to fetch products');
    }
}
export async function seedProducts() {
    const dummyProducts = [
        {
            title: "Dell Laptop",
            image: "https://m.media-amazon.com/images/I/61+9ew81AfL._AC_UF1000,1000_QL80_.jpg",
            price: 15000,
            stock: 10,
        },
        {
            title: "Asus Laptop",
            image: "https://dlcdnwebimgs.asus.com/gain/4cc342ab-c4fa-42a9-8619-a340f6119bec/w800",
            price: 25000,
            stock: 20,
        },
        {
            title: "HP Laptop",
            image: "https://www.hp.com/gb-en/shop/Html/Merch/Images/c06723377_1750x1285.jpg",
            price: 40000,
            stock: 8,
        }
    ];
    try {
        await Product.deleteMany({});
        const products = await Product.insertMany(dummyProducts);
        console.log("✅ Products seeded:", products);
        return products;
    }
    catch (error) {
        throw new Error('Failed to seed products');
    }
}
//# sourceMappingURL=productService.js.map