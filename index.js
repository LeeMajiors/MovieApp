const express = require('express');
const mongoose = require('mongoose');
const { MovieData } = require ("./movies.js")


const app = express();
app.use(express.json());


app.get('/movie', async (req, res) => {
    const allMovies = await MovieData.find();
    return res.status(200).json(allMovies)
});

app.get('/movie/:id', async(req, res) => {
    const { id } = req.params;
    const movie = await MovieData.findById(id);
    return res.status(200).json(movie);
});

app.post("/movie", async (req, res) => {
    const newMovie = new MovieData({ ...req.body });
    const addMovie = await newMovie.save();
    return res.status(201).json(addMovie)
});

app.put("/movie/:id", async (req, res) => {
    const { id } = req.params;
    await MovieData.updatedOne( { id }, req.body);
    const updatedMovie = await MovieData.findById(id)
    return res.status(200).json(updatedMovie)
});

app.delete('/movie/:id', async (req, res) => {
    const { id } = req.params;
    const deleteMovie = await MovieData.findByIdAndDelete(id);
    return res.status(200).json(deleteMovie)
});

const start = async () => {
    try {
      await mongoose.connect('mongodb+srv://Leem:(password-removed)@cluster0.3hembv8.mongodb.net/?retryWrites=true&w=majority');
      app.listen(5000, () => console.log("Server started on port 5000"));
    } catch (error) {
      console.error(error);
      process.exit(1);
    
    }
  };


start()


//const PORT = 5000;
// import movieRoutes from './routes/movies_func.mjs';
// app.use('/movie', movieRoutes)
// app.listen(PORT, ()=> console.log(`Server Running on port: http://localhost:${PORT}`));
