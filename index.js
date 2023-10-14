import express from 'express';
import bodyParser from 'body-parser';
import movieRoutes from './routes/movies_func.js'

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use('/movies', movieRoutes)

app.get('/', (req, res) => res.send('hello from the movie home page.'));

app.listen(PORT, ()=> console.log(`Server Running on port: http://localhost:${PORT}`));


