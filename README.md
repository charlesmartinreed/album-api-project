# Album API Project

## Just a barebones API used as an backend for a similarly simple web-based music player UI/UX study project, [which can be found here]('https://github.com/charlesmartinreed/design-study-side-panel-ux').

### How to use

- `/api/albums` - returns the full album object, including artist, track list, genre, etc.
- `/api/albums/?limit={limit_value}` - returns the requested number of albums from a pool of album objects, randomized.
- `/api/albums/trending` - returns albums that are trending, as well as where they are trending (local, region, global).
- `/api/album/:albumId` - returns a specific album from the database, using the URL param for albumID.
