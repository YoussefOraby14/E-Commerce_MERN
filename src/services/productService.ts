import Product from '../models/productModel.js';


export async function getAllProducts() {
    try {
        const products = await Product.find();
        return products;
    } catch (error) {
        throw new Error('Failed to fetch products');
    }
}

export async function seedProducts() {
    const dummyProducts = [
        {
            title: "Wireless Mouse",
            image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.ubuy.com.eg%2Fen%2Fproduct%2F4VUZB20-logitech-wireless-silent-mouse%3Fsrsltid%3DAfmBOoohlJ6yXbnjVEPiz1eKuLlZteQ3X37dFh6Gh6e0SKM_A4WawH0c&psig=AOvVaw26xE0GOlgaaLB1Y-w5D3pk&ust=1755949631819000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKjjoaGsno8DFQAAAAAdAAAAABAE",
            price: 19.99,
            stock: 100
        }
    ];
    

    try {
        
        await Product.deleteMany({});
        const products = await Product.insertMany(dummyProducts);
        console.log("✅ Products seeded:", products);
        return products;
    } catch (error) {
        throw new Error('Failed to seed products');
    }
}