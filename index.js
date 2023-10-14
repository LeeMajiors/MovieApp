import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/movies.js'

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/movies', usersRoutes)

app.get('/', (req, res) => res.send('hello from home page.'));

app.listen(PORT, ()=> console.log(`Server Running on port: http://localhost:${PORT}`));