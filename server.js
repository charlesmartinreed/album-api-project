const express = require("express");
const app = express();

const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const PORT = process.env.PORT || 5000;
const path = require("path");
const { match } = require("assert");

/* DEFAULT CONFIG
{
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
*/

app.options("*", cors());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", ["GET", "POST"]);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// this is app.use(express.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const trendingStates = {
  local: "locally",
  region: "in your country",
  global: "worldwide",
};

let albums = [
  {
    id: uuidv4(),
    name: "hold the girl",
    artist: {
      artistName: "rina sawayama",
      artistImageURL:
        "https://i.discogs.com/y6hN4UJ6Pq5id10WnlrSzJEcH7UJG2dMYQkirKOY_N0/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTMzNzE0/NzItMTYwODg0MTU4/Mi00MDQwLmpwZWc.jpeg",
    },
    genre: "indie rock",
    tracks: [
      { title: "minor feelings", length: "2:00", isFavorited: false },
      { title: "hold the girl", length: "4:05", isFavorited: false },
      { title: "this hell", length: "3:56", isFavorited: false },
      { title: "catch me in the air", length: "3:35", isFavorited: false },
      { title: "forgiveness", length: "4:20", isFavorited: false },
      {
        title: "holy (till you let me go)",
        length: "3:19",
        isFavorited: false,
      },
      { title: "your age", length: "2:54", isFavorited: false },
      { title: "imagining", length: "3:32", isFavorited: false },
      { title: "frankenstein", length: "3:12", isFavorited: false },
      { title: "hurricanes", length: "3:22", isFavorited: false },
      { title: "send my love to john", length: "3:25", isFavorited: false },
      { title: "phantom", length: "4:25", isFavorited: false },
      { title: "to be alive", length: "3:54", isFavorited: false },
    ],
    albumLength: "46 minutes, 4 seconds",
    releaseDate: "September 16, 2022",
    recordLabel: "Dirty Hit",
    imageURL:
      "https://i.discogs.com/-gbgGKkabh9ewsvH7mtqYxva_lxum8upMLfV0OWFplk/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI0Njcz/MTYwLTE2NjQ2MDQw/NjUtNTQ3OS5qcGVn.jpeg",
    isFavorited: true,
    isTrending: { state: true, locale: trendingStates.global },
  },
  {
    id: uuidv4(),
    name: "radiate like this",
    artist: {
      artistName: "warpaint",
      artistImageURL:
        "https://i.discogs.com/GSGgYScwzrIvJ59JapoNtsHyD6U9PnxspIkERw3sRXQ/rs:fit/g:sm/q:90/h:360/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTE0NjA3/NzYtMTY2MTU5Nzg2/Ny0zNjI3LmpwZWc.jpeg",
    },
    genre: "dream pop",
    tracks: [
      { title: "champion", length: "4:39", isFavorited: false },
      { title: "hips", length: "3:20", isFavorited: false },
      { title: "hard to tell you", length: "5:00", isFavorited: false },
      { title: "stevie", length: "4:03", isFavorited: false },
      { title: "like sweetness", length: "3:50", isFavorited: false },
      { title: "trouble", length: "3:41", isFavorited: false },
      { title: "proof", length: "4:24", isFavorited: false },
      { title: "altar", length: "4:06", isFavorited: false },
      { title: "melting", length: "5:08", isFavorited: false },
      { title: "send nudes", length: "3:19", isFavorited: false },
    ],
    albumLength: "41 minutes, 35 seconds",
    releaseDate: "May 6, 2022",
    recordLabel: "Heirlooms",
    imageURL:
      "https://i.discogs.com/nDIk8qtoJqYOLKwa4gHOQR90GGlpkSf6FGTx_rYygus/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIzMTI3/MjQ4LTE2NTE3OTgy/NjMtMTc2Mi5qcGVn.jpeg",
    isFavorited: false,
    isTrending: { state: false, locale: null },
  },
  {
    id: uuidv4(),
    name: "grit.",
    artist: {
      artistName: "luke vibert",
      artistImageURL:
        "https://i.discogs.com/Yn5U7ysqpgsgKwrULjLQwYPNEQRIFxE5pQ1zTY0E4mQ/rs:fit/g:sm/q:90/h:399/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTI1My0x/NTExMjEzMDY3LTYz/MDMuanBlZw.jpeg",
    },
    genre: "breakbeat",
    tracks: [
      { title: "surrounded by neighbors", length: "5:31", isFavorited: false },
      { title: "decay hole", length: "3:52", isFavorited: false },
      { title: "patron", length: "5:59", isFavorited: false },
      { title: "gas logs", length: "6:02", isFavorited: false },
      { title: "grit", length: "4:38", isFavorited: false },
      { title: "swingeing cuts", length: "5:34", isFavorited: false },
      { title: "weed killah", length: "4:54", isFavorited: false },
      { title: "disco derriere", length: "7:14", isFavorited: false },
      { title: "afterning", length: "4:51", isFavorited: false },
      { title: "mornoon", length: "5:15", isFavorited: false },
      { title: "xanalog", length: "6:39", isFavorited: false },
      { title: "screwfix typeface", length: "7:04", isFavorited: false },
    ],
    albumLength: "1 hour, 7 minutes",
    releaseDate: "July 1, 2022",
    recordLabel: "Hypercolor",
    imageURL:
      "https://i.discogs.com/9rLCK1mJ4pO5wVlEH_PwXh2d53QO8ZOiwGC3BE_vws4/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIzNzY3/NTQ0LTE2NTY4MzQw/MDYtMzQ5MS5qcGVn.jpeg",
    isFavorited: false,
    isTrending: { state: false, locale: null },
  },
  {
    id: uuidv4(),
    name: "the girls are back in town",
    artist: {
      artistName: "chapel hart",
      artistImageURL:
        "https://i.discogs.com/Yrj5OTiBXRuPGokM3JDjXqYHkAE-hTKes-pp2z9Cj2Y/rs:fit/g:sm/q:90/h:400/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTc5MTk5/NDItMTY1OTM3MzY4/MC0zNzk0LmpwZWc.jpeg",
    },
    genre: "country",
    tracks: [
      { title: "nearly over you", length: "3:16", isFavorited: false },
      { title: "4 mississippi", length: "3:21", isFavorited: false },
      { title: "i will follow", length: "2:50", isFavorited: false },
      { title: "just say i love you", length: "4:02", isFavorited: false },
      { title: "grown ass woman", length: "3:33", isFavorited: false },
      { title: "you can have him jolene", length: "3:12", isFavorited: false },
      { title: "tailgate trophy", length: "3:15", isFavorited: false },
      { title: "angel", length: "3:38", isFavorited: false },
      { title: "jacqui's song", length: "4:00", isFavorited: false },
      { title: "jesus & alcohol", length: "4:12", isFavorited: false },
      {
        title: "that's a redneck summer night",
        length: "4:07",
        isFavorited: false,
      },
      {
        title: "the girls are back in town",
        length: "3:17",
        isFavorited: false,
      },
    ],
    albumLength: "42 minutes, 48 seconds",
    releaseDate: "August 28, 2021",
    recordLabel: "Chapel Hart",
    imageURL:
      "https://i.discogs.com/3o47buIn1y6356shFpdhE5vJQgwBjwdS6xzGn_j61HI/rs:fit/g:sm/q:90/h:450/w:450/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI0MTkz/NTI2LTE2NjA0MzMx/MjItNjgzMC5qcGVn.jpeg",
    isFavorited: false,
    isTrending: { state: true, locale: trendingStates.region },
  },
];

// TESTING PURPOSES -- FETCH BY ID
// for (const album of albums) {
//   console.log(album.id, album.name);
// }

// MIDDLEWARE

// ROUTE - landing/endpoint description page
app.get("/", (req, res) => {
  let options = {
    root: path.join(__dirname),
  };
  res.type("html").sendFile("index.html", options, null);
});

// ROUTE - return specified number of albums
app.get("/api/albums", (req, res) => {
  const { limit, search } = req.query;

  if (!limit && !search) {
    res.json(albums);
  }

  if (limit) {
    let returnedAlbums = returnPartialAlbumList(Number(limit));
    res.json(returnedAlbums);
  }

  if (search) {
    let returnedAlbums = returnMatchedAlbums(search);
    let returnedSongs = returnMatchedSongs(search);

    let data = [returnedAlbums, returnedSongs];
    res.json(data);
  }
});

app.get("/api/albums/trending", (req, res) => {
  let trendingAlbums = albums.filter(
    ({ isTrending }) => isTrending.state === true
  );

  res.json(trendingAlbums);
});

// song results gets artistImageURL
// album results get imageURL
app.get("/api/album/:albumId", (req, res) => {
  let album = albums.find((album) => album.id === req.params.albumId);
  res.json(album);
});

// ROUTE - POST - update the favorite status of an album
// params - albumId
app.post("/api/album/:albumId", (req, res) => {
  let { prop, value } = req.body;
  let id = req.params.albumId;

  // TODO: AWAIT THIS UPDATE WHEN THE BACKEND DB IS CONNECTED
  updateAlbumState(id, prop, value);

  return res.sendStatus(200);
});

app.delete("*", (req, res) => {
  return res.status(400).send({
    error: "Apologies, but that request is not allowed with this API.",
  });
});

function updateAlbumState(albumId, albumProp, updatedValue) {
  // an extremely naive implementation :/
  albums.find((album) => album.id === albumId).albumProp = updatedValue;
}

function returnMatchedAlbums(searchQuery) {
  return albums.filter(
    (album) => checkForMatch(searchQuery, album.name) === true
  );

  // return matchedAlbums;
}

function returnMatchedSongs(searchQuery) {
  let matchedTracks = [];

  for (const album of albums) {
    let trackMatches = [];

    for (const track of album.tracks) {
      if (checkForMatch(searchQuery, track.title) === true) {
        trackMatches = [track, ...trackMatches];
      }
    }

    if (trackMatches.length > 0) {
      matchedTracks = [
        ...matchedTracks,
        {
          albumId: album.id,
          matchedTrack: trackMatches,
          artistImageURL: album.artist.artistImageURL,
        },
      ];
    }
  }

  return matchedTracks;
}

function checkForMatch(searchQuery, testStr) {
  let testWords = testStr.toLowerCase().split(" ");

  for (const testWord of testWords) {
    for (let i = 0; i < testWord.length; i += searchQuery.length) {
      let testSlice = testWord.slice(i, searchQuery.length);
      if (searchQuery === testSlice) {
        return true;
      }
    }
  }
  return false;
}

function returnPartialAlbumList(limit) {
  if (limit === albums.length || limit > albums.length || limit <= 0)
    return albums;

  let returnedAlbums = [];

  let idx = Math.round(Math.random() * limit);
  let albumToAdd = albums[idx];

  while (returnedAlbums.length < limit) {
    if (checkForDuplicates(returnedAlbums, albumToAdd) === false) {
      addAlbumToReturnedAlbumsList(returnedAlbums, albumToAdd);
    }

    idx = Math.round(Math.random() * limit);
    albumToAdd = albums[idx];
  }

  function checkForDuplicates(existingAlbums, albumToAdd) {
    if (existingAlbums.length === 0) return false;

    let existingIDs = existingAlbums.map((albumObj) => albumObj.id);
    return existingIDs.includes(albumToAdd.id);
  }

  function addAlbumToReturnedAlbumsList(albumCollection, albumToAdd) {
    albumCollection.push(albumToAdd);
  }

  return returnedAlbums;
}

app.use((req, res, next) => {
  res.status(400).send({
    error:
      "Sorry but that's an invalid endpoint - please check your request and try again. Be sure to check the documentation on the home page to see all of the available endpoints.",
  });
});

app.listen(PORT, () => {
  console.log(`server now running on PORT ${PORT}`);
});
