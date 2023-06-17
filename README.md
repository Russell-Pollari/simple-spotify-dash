# Simple Spotify

An ongoing effort to build a Spotify UI that I don't hate.

In particular, I want to:

- See the genres of each artist, album, and song
- Quickly view an artist's discography in chronological order
- Have manual control over the layout of the UI and featured items

And eventually:

- View all the lpodcast episodes I'm partway through
- Invite friends to share recommendations

Live demo here: https://simple-spotify-fbd54b7de1c4.herokuapp.com/

## Development

> Requires a postgres database and a spotify app.

Create a virtual env and install python requirements

`$ python3 -m venv venv`

`$ source venv/bin/activate`

`$ pip install -r requirements.txt`

Create .env file with spotify credentials and django settings

```
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REDIRECT_URI=
DJANGO_SECRET_KEY=
DJANGO_ENV=development
DJANGO_ALLOWED_HOSTS=["127.0.0.1","localhost"]

DATABASE_NAME=
DATABASE_USER=
DATABASE_SCHEMA=
DATABASE_PASSWORD=
DATABASE_HOST=
DATABASE_PORT=
```

Install npm packages

`$ npm install`

Run db migrations

`$ python server/manage.py migrate`

Start the app in dev mode

`$ npm run dev`

Both client and server will auto detect changes and re-build but you will have to refresh the browser to see the changes in the client reflected.

## Deployment

### Heroku

Create a heroku app

`$ heroku create:app <app-name>`

Add buildpacks

`$ heroku buildpacks:add --index 1 heroku/nodejs`

`$ heroku buildpacks:add --index 2 heroku/python`

Set heroku config variables (using appropriate env variables from above)

Deploy app

`$ git push heroku main`

### Using Postgres 15

If using postgres 15, you may need to create a new schema and set the `DATABASE_SCHEMA` env var to the new schema name.

See (this link)[https://gist.github.com/axelbdt/74898d80ceee51b69a16b575345e8457] for more context
