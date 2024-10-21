const express = require('express');
const router = express.Router();

// Пример маршрута для получения всех карточек коллекции
router.get('/', (req, res) => {
    res.send('Получить все карточки коллекции');
});

// Пример маршрута для добавления карточки в коллекцию
router.post('/add', (req, res) => {
    const card = req.body.card; // Например, объект карточки
    // Здесь должна быть логика для добавления карточки в базу данных
    res.send(`Добавить карточку: ${card}`);
});

// Пример маршрута для удаления карточки из коллекции
router.delete('/delete/:id', (req, res) => {
    const cardId = req.params.id;
    // Логика для удаления карточки по ID
    res.send(`Удалить карточку с ID: ${cardId}`);
});

// Пример маршрута для обновления карточки в коллекции
router.put('/update/:id', (req, res) => {
    const cardId = req.params.id;
    const updatedData = req.body; // Например, обновлённые данные карточки
    // Логика для обновления карточки по ID
    res.send(`Обновить карточку с ID: ${cardId}`);
});

module.exports = router;
