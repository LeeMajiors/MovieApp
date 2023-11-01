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
    res.send(movies);
    // res.send(`Movie with the name ${movie.title} added to the database!`)

});

router.get('/:id',(req, res) =>{
    const { id } = req.params;

    const foundMovie = movies.find((movie) => movie.id === id);
    
    if (foundMovie !== id) {
        res.send(foundMovie); 
    } else {
        res.status(404)
        res.send('404 not found');        
    }
});


router.delete('/:id',(req,res) => {
    const { id } = req.params;

    movies = movies.filter((movie)=> movie.id != id);
    // res.send(`Movie with the id ${id} is now deleted from the data base`)
    res.send(movies.id);

});



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

    // res.send(`Updated movie with ID ${id}`);
    res.send(movies);

});

router.use('*',(req,res)=>{
    res.type('text/plain')
    res.status(404)
    res.send('404 not found')
})






export default router;