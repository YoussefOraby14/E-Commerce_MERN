import express from "express";
import { register, login } from "../services/userService.js";
const router = express.Router();
// Register route
router.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const user = await register(firstname, lastname, email, password);
        res.status(201).json({ message: 'User registered successfully', user });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Login route
router.post('/login', async (req, res) => {
    console.log("🔑 /user/login called with body:", req.body);
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = await login(email, password);
        res.status(200).json({ message: 'Login successful', user });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
export default router;
