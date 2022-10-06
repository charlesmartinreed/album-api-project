const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const albums = [
  {
    name: "hold the girl",
    artist: "rina sawayama",
    genre: "indie rock",
    tracks: [
      { title: "minor feelings", length: "2:00" },
      { title: "hold the girl", length: "4:05" },
      { title: "this hell", length: "3:56" },
      { title: "catch me in the air", length: "3:35" },
      { title: "forgiveness", length: "4:20" },
      { title: "holy (till you let me go)", length: "3:19" },
      { title: "your age", length: "2:54" },
      { title: "imagining", length: "3:32" },
      { title: "frankenstein", length: "3:12" },
      { title: "hurricanes", length: "3:22" },
      { title: "send my love to john", length: "3:25" },
      { title: "phantom", length: "4:25" },
      { title: "to be alive", length: "3:54" },
    ],
    albumLength: "46 minutes, 4 seconds",
    releaseDate: Date("September 16, 2022"),
    recordLabel: "Dirty Hit",
    imageURL:
      "https://i.discogs.com/-gbgGKkabh9ewsvH7mtqYxva_lxum8upMLfV0OWFplk/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI0Njcz/MTYwLTE2NjQ2MDQw/NjUtNTQ3OS5qcGVn.jpeg",
  },
  {
    name: "radiate like this",
    artist: "warpaint",
    genre: "dream pop",
    tracks: [
      { title: "champion", length: "4:39" },
      { title: "hips", length: "3:20" },
      { title: "hard to tell you", length: "5:00" },
      { title: "stevie", length: "4:03" },
      { title: "like sweetness", length: "3:50" },
      { title: "trouble", length: "3:41" },
      { title: "proof", length: "4:24" },
      { title: "altar", length: "4:06" },
      { title: "melting", length: "5:08" },
      { title: "send nudes", length: "3:19" },
    ],
    albumLength: "41 minutes, 35 seconds",
    releaseDate: Date("May 6, 2022"),
    recordLabel: "Heirlooms",
    imageURL:
      "https://i.discogs.com/nDIk8qtoJqYOLKwa4gHOQR90GGlpkSf6FGTx_rYygus/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIzMTI3/MjQ4LTE2NTE3OTgy/NjMtMTc2Mi5qcGVn.jpeg",
  },
  {
    name: "grit.",
    artist: "luke vibert",
    genre: "breakbeat",
    tracks: [
      { title: "surrounded by neighbors", length: "5:31" },
      { title: "decay hole", length: "3:52" },
      { title: "patron", length: "5:59" },
      { title: "gas logs", length: "6:02" },
      { title: "grit", length: "4:38" },
      { title: "swingeing cuts", length: "5:34" },
      { title: "weed killah", length: "4:54" },
      { title: "disco derriere", length: "7:14" },
      { title: "afterning", length: "4:51" },
      { title: "mornoon", length: "5:15" },
      { title: "xanalog", length: "6:39" },
      { title: "screwfix typeface", length: "7:04" },
    ],
    albumLength: "1 hour, 7 minutes",
    releaseDate: Date("July 1, 2022"),
    recordLabel: "Hypercolor",
    imageURL:
      "https://i.discogs.com/9rLCK1mJ4pO5wVlEH_PwXh2d53QO8ZOiwGC3BE_vws4/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIzNzY3/NTQ0LTE2NTY4MzQw/MDYtMzQ5MS5qcGVn.jpeg",
  },
  {
    name: "the girls are back in town",
    artist: "chapel hart",
    genre: "country",
    tracks: [
      { title: "nearly over you", length: "3:16" },
      { title: "4 mississippi", length: "3:21" },
      { title: "i will follow", length: "2:50" },
      { title: "just say i love you", length: "4:02" },
      { title: "grown ass woman", length: "3:33" },
      { title: "you can have him jolene", length: "3:12" },
      { title: "tailgate trophy", length: "3:15" },
      { title: "angel", length: "3:38" },
      { title: "jacqui's song", length: "4:00" },
      { title: "jesus & alcohol", length: "4:12" },
      { title: "that's a redneck summer night", length: "4:07" },
      { title: "the girls are back in town", length: "3:17" },
    ],
    albumLength: "42 minutes, 48 seconds",
    releaseDate: Date("August 28, 2021"),
    recordLabel: "Chapel Hart",
    imageURL:
      "https://i.discogs.com/3o47buIn1y6356shFpdhE5vJQgwBjwdS6xzGn_j61HI/rs:fit/g:sm/q:90/h:450/w:450/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI0MTkz/NTI2LTE2NjA0MzMx/MjItNjgzMC5qcGVn.jpeg",
  },
];

// DEFAULT ROUTE, return all albums
// app.get("/api", (req, res) => {
//   res.status(200).json(albums);
// });

// ROUTE - return specified number of albums
app.get("/api", (req, res) => {
  const { limit } = req.query;

  //   console.log(limit);
  let returnedAlbums = returnPartialAlbumList(limit);
  res.status(200).json(returnedAlbums);
  //   res.status(200).send("hello");
});

function returnPartialAlbumList(limit) {
  if (limit === albums.length || limit > albums.length) return albums;

  let returnedAlbums = [];
  let idx = Math.round(Math.random() * limit);
  let albumToAdd = albums[idx];

  while (checkForDuplicates(returnedAlbums, albumToAdd) === false) {
    addAlbumToReturnedAlbumsList(returnedAlbums, albumToAdd);

    idx = Math.floor(Math.random() * limit);
    albumToAdd = albums[idx];
    console.log(idx);

    if (returnedAlbums.length === limit) {
      break;
    }
  }

  // For funsies, let's randomize which albums are returned

  function checkForDuplicates(existingAlbums, albumToAdd) {
    return existingAlbums.includes(albumToAdd);
  }

  function addAlbumToReturnedAlbumsList(albumCollection, albumToAdd) {
    albumCollection.push(albumToAdd);
  }

  return returnedAlbums;
}

app.listen(3000, () => {
  console.log("server now running");
});
