web: npm run deploy
web: cd server && python manage.py migrate && python -m uvicorn server.asgi:application --host=0.0.0.0 --port=${PORT}
```