const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./models/user');
const { MovieData } = require('./models/movies.js');


const server_port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(express.json());

app.get('/movie', async (req, res) => {
    const allMovies = await MovieData.find();
    return res.status(200).json(allMovies);
});

app.get('/movie/:id', async (req, res) => {
    const { id } = req.params;
    const movie = await MovieData.findById(id);
    return res.status(200).json(movie);
});

app.post("/movie", async (req, res) => {
    const newMovie = new MovieData({ ...req.body });
    const addMovie = await newMovie.save();
    return res.status(201).json(addMovie);
});

app.post("/movie/user/signup", async (req, res) => {
    if (!req.body.username || !req.body.password_hash) {
        res.json({ success: false, error: "Enter users name and or password" });
        return;
    }

    const hashedPassword = bcrypt.hashSync(req.body.password_hash, 10);

    const newUser = new User({ username: req.body.username, password_hash: hashedPassword });

    try {
        const savedUser = await newUser.save();
        res.json({ success: true, user: savedUser });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

app.post("/movie/user/login", async (req, res) => {
    if (!req.body.username || !req.body.password_hash) {
        res.json({ success: false, error: "Enter users name and or password" });
        return;
    }

    const user = await User.findOne({ username: req.body.username });

    if (!user) {
        res.json({ success: false, error: "User does not exist" });
        return;
    }

    const passwordMatch = bcrypt.compareSync(req.body.password_hash, user.password_hash);

    if (!passwordMatch) {
        res.json({ success: false, error: "Incorrect password" });
        return;
    }

    res.json({ success: true, user });
});

app.put("/movie/:id", async (req, res) => {
    const { id } = req.params;
    await MovieData.updateOne({ _id: id }, req.body);
    const updatedMovie = await MovieData.findById(id);
    return res.status(200).json(updatedMovie);
});

app.delete('/movie/:id', async (req, res) => {
    const { id } = req.params;
    const deleteMovie = await MovieData.findByIdAndDelete(id);
    return res.status(200).json(deleteMovie);
});

app.listen(server_port, () => console.log("Server started on port " + server_port));
