const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const database = require('./models/user')
const { MovieData } = require ('./models/movies.js');

const server_port = process.env.PORT || 5000;
const jwtSecret = process.env.JWT_SECRET;
const secret_jwt_code = 'fkuaroundandfindout';

const app = express();

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if(!token) {
      return res.status(401).json( { message: 'Unauthorized'} );
      
  }

  try{
      const decoded = jwt.verify(token, jwtSecret);
      req.userId = decoded.userId;
      next();
  }catch(error) {
      res.status(401).json( { message: 'Unauthorized'} );
  }
}

app.use(bodyParser.json())

app.use(express.json());

app.get('/movie',authMiddleware, async (req, res) => {
    const allMovies = await MovieData.find();
    return res.status(200).json(allMovies)
});

app.get('/movie/:id', async(req, res) => {
    const { id } = req.params;
    const movie = await MovieData.findById(id);
    return res.status(200).json(movie);
});

app.post("/movie",authMiddleware,async (req, res) => {
    const newMovie = new MovieData({ ...req.body });
    const addMovie = await newMovie.save();
    return res.status(201).json(addMovie)
});

app.post("/movie/user/signup", async (req, res) => {
  if(!req.body.username || !req.body.password_hash) {
    res.json({ success: false, error: "Enter users name and or password"})
    return
  }

    database.userDatabase.create({
    username: req.body.username,
    password_hash: bcrypt.hashSync(req.body.password_hash, 10),
  }).then((user) => {
    const token = jsonwebtoken.sign({ id: user._id, email: user.username }, secret_jwt_code)
    res.json({ success: true, token: token })
  }).catch((err) => {
    res.json({ success: false, error: err})
  })
})

app.post("/movie/user/login", async(req, res) => {
  if(!req.body.username || !req.body.password_hash) {
    res.json({ success: false, error: "Enter users name and or password"})
    return
  }

  database.userDatabase.findOne({ username: req.body.username })
   .then((user) => {
    if(!user){
      res.json({ success: false, error: "User does not exist"})
    } else {
        if (!bcrypt.compareSync(req.body.password_hash, user.password_hash)) {
            res.json({ success: false, error: "Incorrect password" })
        } else {
          const token = jsonwebtoken.sign({ id: user._id, username: user.username }, secret_jwt_code)
          res.json({ success: true, token: token, })
        }
    }

  })
  .catch((err) => {
    res.json({ success: false, error: err})
  })



  })

app.put("/movie/:id",authMiddleware,async (req, res) => {
    const { id } = req.params;
    await MovieData.updatedOne( { id }, req.body);
    const updatedMovie = await MovieData.findById(id)
    return res.status(200).json(updatedMovie)
});

app.delete('/movie/:id',authMiddleware, async (req, res) => {
    const { id } = req.params;
    const deleteMovie = await MovieData.findByIdAndDelete(id);
    return res.status(200).json(deleteMovie)
});



app.listen(server_port, () => console.log("Server started on port " + server_port));



