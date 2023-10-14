import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import movies from '../movies.json'assert { type: 'json' }


const router = express.Router();

// let movies = []



router.get('/', (req, res) => {
    console.log(movies);
    res.send(movies);
});


router.post('/',(req,res)=>{
    const movie = req.body;

    movies.push({ ...movie, id: uuidv4() })

    res.send(`Movie with the name ${movie.Title} added to the database!`)


});

router.get('/:id',(req, res) =>{
    const { id } = req.params;

    const foundMovie = movies.find((movie) => movie.id === id);

    res.send(foundMovie);
});

router.delete('/:id',(req,res) => {
    const { id } = req.params;

    movies = movies.filter((movie)=> movie.id != id);

    res.send(`Movie with the id ${id} is now deleted from the data base`)
})

export default router;