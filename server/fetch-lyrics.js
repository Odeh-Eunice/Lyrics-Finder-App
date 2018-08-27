const api = require("genius-api");
const { get } = require("axios");
const { load } = require("cheerio");
const { ACCESS_TOKEN } = require("./credentials");
const genius = new api(ACCESS_TOKEN);

function search(query, callback) {
    genius.search(query)
        .then(res => {
            let items = res.hits.map(hit => ({
                title: hit.result.title,
                song_id: hit.result.id,
                artist_name: hit.result.primary_artist.name,
                song_art: hit.result.song_art_image_thumbnail_url
            }));
            return callback(items);
        })
        .catch(err => {
            console.log("search:", err);
        });
}

function getArtist(id, callback) {
    genius.artist(id)
        .then(res => {
            return callback(res.artist);
        })
        .catch(err => {
            console.log("artist:", err);
        })
}

function getSong(id, callback) {
    genius.song(id)
        .then((res) => {
            return callback(res.song);
        })
        .catch((err) => {
            console.log(`can't find (${id})`, err);
        })
}

function getLyrics(url, callback) {
    get(url)
        .then((res) => {
            let $ = load(res.data);
            let lyrics = $('.lyrics  p').text();
            return callback(lyrics);
        })
        .catch((err) => {
            console.log('lyrics:', err);
        })
}
module.exports = {
    song: getSong,
    artist: getArtist,
    search: search,
    lyrics: getLyrics
};