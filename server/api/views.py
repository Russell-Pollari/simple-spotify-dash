from django.shortcuts import render, redirect
from rest_framework.decorators import (
    api_view,
)
from rest_framework.response import Response
import requests
import os
from dotenv import load_dotenv

load_dotenv()

CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI")
BASE_URL = "https://api.spotify.com/v1"
SCOPE = "user-read-private user-read-email user-top-read"


def spotify_request(request, endpoint):
    try:
        token = request.session["access_token"]
    except KeyError:
        return Response({"error": "No token"}, status=400)

    return requests.get(
        f"{BASE_URL}{endpoint}", headers={"Authorization": "Bearer " + token}
    )


def index(request, **kwargs):
    return render(request, "index.html")


@api_view(["GET"])
def get_auth_url(request):
    url = (
        "https://accounts.spotify.com/authorize?"
        + "response_type=code"
        + f"&client_id={CLIENT_ID}"
        + f"&scope={SCOPE}"
        + f"&redirect_uri={REDIRECT_URI}"
    )
    return Response({"url": url})


@api_view(["GET"])
def spotify_callback(request):
    code = request.GET.get("code")

    res = requests.post(
        "https://accounts.spotify.com/api/token",
        data={
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": REDIRECT_URI,
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
        },
    )
    try:
        request.session["access_token"] = res.json()["access_token"]
    except KeyError:
        return Response(res.json(), status=400)
    return redirect("/")


@api_view(["GET"])
def get_token(request):
    token = request.session.get("access_token")
    return Response({"token": token})


@api_view(["GET"])
def logout(request):
    request.session.clear()
    return redirect("/")


@api_view(["GET"])
def get_top_items(request):
    res = spotify_request(request, "/me/top/artists")
    return Response(res.json())


@api_view(["GET"])
def artist(request, artist_id):
    res = spotify_request(request, f"/artists/{artist_id}")
    return Response(res.json())
