## Spotify Dash

An ongoing effort to build a Spotify UI that I don't hate.

### Development

This app runs django on the back-end and react on the front-end

Create a virtual env and activate

`python3 -m venv venv`

`source venv/bin/activate`

install python requirements

`pip install -r requirements.txt`

Create .env file with spotify credentials

```
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REDIRECT_URI=
```

Install npm packages

`npm install`

Build client and watch for changes

`npm run watch`

Start dev server

`python server/manage.py runserver`
