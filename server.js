const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Подключение dotenv для работы с переменными окружения

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Подключение к базе данных MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Подключено к MongoDB'))
    .catch(err => console.error('Ошибка подключения к MongoDB:', err));

// Определение маршрутов (пути)
const authRoutes = require('./routes/auth'); // Маршруты для аутентификации (если есть)
const cardCollectionRoutes = require('./routes/collection'); // Подключение маршрутов коллекции карточек

// Использование маршрутов
app.use('/api/auth', authRoutes); // Если есть маршруты для аутентификации
app.use('/api/collection', cardCollectionRoutes); // Использование маршрутов для работы с коллекцией карточек

// Запуск сервера на указанном порту
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
