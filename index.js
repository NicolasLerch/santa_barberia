const express = require('express');
const app = express();
const path = require('path')
const indexRouter = require('./src/routes/index.routes');


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
// app.set('views', 'src/views')
    .set('views', path.join(__dirname, 'src/views'))

app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})