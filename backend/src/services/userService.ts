import bcrypt from 'bcryptjs';
import User from '../models/userModel.js'; 
import jwt from 'jsonwebtoken';
import { Order } from '../models/orderModel.js';

// Register function
export async function register(firstname: string, lastname: string, email: string, password: string) {
    // check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new User({
        firstname,
        lastname,
        email,
        password: hashedPassword,
    });

    // save to MongoDB
    await newUser.save();

    console.log("✅ User saved:", newUser);

    return generateToken({
        email: newUser.email,
        id: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname
    });
}

// Login function
export async function login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    return generateToken({email: user.email, id: user._id, firstname: user.firstname, lastname: user.lastname});
}




// Function to generate JWT token
export function generateToken(data: any) {
    return jwt.sign(
        data,
        process.env.JWT_SECRET || "",
        { expiresIn: '24h' } // Token expires in 1 hour
    );
}


// Function to get my orders
export async function getMyOrders(userId: string) {
    try {
        const orders = await Order.find({ userId });
        
        return {data:orders, status:200};
    } catch (error) {
        throw new Error('Failed to get my orders');
    }
}
