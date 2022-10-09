# Album API Project

## Just a barebones API used as an backend for a similarly simple web-based music player UI/UX study project, [which can be found here]('https://github.com/charlesmartinreed/design-study-side-panel-ux').

### How to use

- `/api/albums` - returns the full album object, including artist, track list, genre, etc.
- `/api/albums/?limit={limit_value}` - returns the requested number of albums from a pool of album objects, randomized.
- `/api/album/:albumId` - uses the passed albumID to find and return a specific album from the database.
