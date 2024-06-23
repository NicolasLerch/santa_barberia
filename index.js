const express = require('express');
const app = express();
const path = require('path')
const indexRouter = require('./src/routes/index.routes');
const calendlyrouter = require('./src/routes/calendly.routes');
const userRouter = require('./src/routes/user.routes');
const session = require('express-session');
const PORT = require('./src/config').PORT;
const sessionMiddleware = require('./src/middlewares/sessionUser');
const authMiddleware = require('./src/middlewares/authMiddleware');
const authRoutes = require('./src/routes/authRoutes');
const sheetsRoutes = require('./src/routes/sheetsRoutes');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
    secret: 'barbita97',
    resave: true,
    saveUninitialized: true
}));

app.set('view engine', 'ejs')
    .set('views', path.join(__dirname, 'src/views'))

app.use('/',sessionMiddleware, indexRouter);
app.use('/turnos',sessionMiddleware, authMiddleware, calendlyrouter);
app.use('/users',sessionMiddleware, userRouter);

// Uso de rutas
app.use('/', authRoutes);
app.use('/sheets', sheetsRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})