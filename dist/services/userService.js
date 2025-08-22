import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
// Register function
export async function register(firstname, lastname, email, password) {
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
export async function login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }
    return generateToken({ email: user.email, id: user._id, firstname: user.firstname, lastname: user.lastname });
}
// Function to generate JWT token
export function generateToken(data) {
    return jwt.sign(data, 'RriWMjd7Q4CfkzTUE3NoZCJ0BQgzmioS', { expiresIn: '24h' } // Token expires in 1 hour
    );
}
//# sourceMappingURL=userService.js.map