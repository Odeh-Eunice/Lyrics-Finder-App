const express = require("express");
const { search, song, artist, lyrics } = require("./fetch-lyrics");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('dist'));
//Routes

app.get("/", function(req, res){
    res.redirect("/search");
});

app.get("/search", function(req, res){
    res.send("Homepage!!!")
});

app.get("/search/:query", function (req, res) {
    search(req.params.query, function (results) {
        res.json(results);
    });
});

app.get("/song/:songId", function (req, res) {
    song(req.params.songId, function (results) {
        res.json(results);
    });
});

app.get("/artist/:artistId", function (req, res) {
    artist(req.params.artistId, function (results) {
        res.json(results);
    });
});

app.get("/lyrics/:path", function (req, res) {
    const url = `https://genius.com/${req.params.path}`;
    lyrics(url, (results) => {
        res.json(results)
    })
});

app.listen(port, function(){
    console.log("server running on port " + port);
})