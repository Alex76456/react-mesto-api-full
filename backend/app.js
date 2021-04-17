require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

const NotFoundError = require('./middlewares/errors/NotFoundError');

app.use(cors());

/*
const allowedCors = [
	'https://logvenkin.students.nomoredomains.icu',
	'https://api.logvenkin.students.nomoredomains.club'
];

app.use(
	cors({
		origin: allowedCors
	})
);
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(router);

app.use('*', () => {
	throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
	// если у ошибки нет статуса, выставляем 500
	const { statusCode = 500, message } = err;

	res.status(statusCode).send({
		// проверяем статус и выставляем сообщение в зависимости от него
		message: statusCode === 500 ? 'На сервере произошла ошибка' : message
	});
	next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
	runValidators: true
});

app.listen(PORT, () => {
	console.log(`App is running on port ${PORT}`);
});
