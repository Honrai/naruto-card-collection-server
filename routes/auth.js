const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Регистрация
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Проверяем, существует ли пользователь
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: 'Пользователь с таким email уже существует' });

        // Хэшируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создаем пользователя
        const user = new User({
            username,
            email,
            password: hashedPassword,
            cards: [],
        });

        await user.save();

        res.status(201).json({ message: 'Пользователь успешно создан' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Вход
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Находим пользователя
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: 'Неверный email или пароль' });

        // Проверяем пароль
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: 'Неверный email или пароль' });

        // Создаем токен
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token, username: user.username });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;
