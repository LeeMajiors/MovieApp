import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

// import movies from '../movies.json'assert { type: 'json' }

const app = express();

app.use(bodyParser.urlencoded({ extended: true}))


MongoClient.connect(
    'mongodb+srv://Leem:(password-removed)@cluster0.3hembv8.mongodb.net/?retryWrites=true&w=majority', 
    { useUnifiedTopology: true },
    
    )
    .then((client => {
        const db = client.db('movies_db');
        const movieCollection = db.collection('joints')



        router.post('/',(req,res)=>{
            const movie = req.body;
            movieCollection
            .insertOne(movie)
            .then(() => {
                res.redirect('/')
            })
            .catch((error) => {
                console.error(error)
                res.status(500).send('Internal Server Error');
                res.send(`Movie with the name ${movie.title} added to the database!`);
        });
    });

        router.get('/', (req, res) => {
        movieCollection
            .find()
            .toArray()
            .then((movies) =>{
                res.json(movies);
            })
            .catch(error => {
                console.error(error)
                res.status(500).send('Internal Server Error');
                res.send(`Movie with the name ${movie.title} added to the database!`)
        });
    });

        router.get('/:id',(req, res) =>{
            const { id } = req.params;
            movieCollection
            .findOne({_id: id})
            .then((movie)=> {
                if (movie) {
                    res.json(movie);
                } else{
                    res.status(404).send('Movie not found')
                }
            })
            .catch((error)=>{
                console.error(error);
                res.status(500).send('internal Server Error')
            });


    });

        router.delete('/:id', (req, res) => {
            const { id } = req.params;
            movieCollection
              .deleteOne({ _id: id })
              .then(() => {
                res.send(`Movie with the id ${id} is now deleted from the database`);
              })
              .catch((error) => {
                console.error(error);
                res.status(500).send('Internal Server Error');
        });
    });

        router.put('/:id', (req, res) => {
            const { id } = req.params;
            const updatedMovie = req.body;
          
            movieCollection
              .updateOne({ _id: id }, { $set: updatedMovie })
              .then(() => {
                res.send(`Updated movie with ID ${id}`);
              })
              .catch((error) => {
                console.error(error);
                res.status(500).send('Internal Server Error');
              });
    });
          

        router.use('*',(req,res)=>{
            res.type('text/plain');
            res.status(404);
            res.send('404 not found');
         });
        }))
        const router = express.Router();
        export default router;