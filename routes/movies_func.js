import express from 'express';
import { v4 as uuidv4 } from 'uuid';
// import movies from '../movies.json'assert { type: 'json' }


const router = express.Router();

let movies = [
    // {
    //     "title":" ",
    //     "year": " ",
    //     "genre": " ",
    //     "director": " ",
    //     "id": " ",
    // }
]



router.get('/', (req, res) => {
    console.log(movies);
    res.send(movies);
});


router.post('/',(req,res)=>{
    const movie = req.body;

    movies.push({ ...movie, id: uuidv4() })

    res.send(`Movie with the name ${movie.title} added to the database!`)


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
});

/* i could only get this far. unfortunately this code adds the updates to the database */
// router.put('/:id', (req, res) => {
//     const movie = req.body
//     const movieId = req.params.id;
//     movies.push({ ...movie})
//     res.send(`Update movie with title ${movie.Title} and the ID ${movie.id} `);
// });

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedMovie = req.body;

    movies = movies.map((movie) => {
        if (movie.id === id) {
            return { ...movie, ...updatedMovie };
        } else {
            return movie;
        }
    });

    res.send(`Updated movie with ID ${id}`);
});






export default router;