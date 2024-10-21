const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Получаем токен из заголовка
    const token = req.header('Authorization')?.split(' ')[1];

    // Проверяем наличие токена
    if (!token) {
        return res.status(401).json({ message: 'Нет токена, доступ запрещен' });
    }

    // Проверяем токен
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Токен недействителен' });
    }
};
