from django.shortcuts import render, redirect  # type: ignore
from rest_framework.decorators import api_view  # type: ignore
from rest_framework.response import Response  # type: ignore
import requests
import os
from dotenv import load_dotenv

from django.http import HttpRequest, HttpResponse  # type: ignore
from .models import Favourite

load_dotenv()

CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI")
BASE_URL = "https://api.spotify.com/v1"
SCOPE = "user-read-private user-read-email user-top-read"


def spotify_request(request: HttpRequest, endpoint: str) -> requests.models.Response:
    token = request.session.get("access_token", "")

    # TODO handle error responses (401, 403, 429)
    response = requests.get(
        f"{BASE_URL}{endpoint}", headers={"Authorization": "Bearer " + token}
    )

    return response


def index(request: HttpRequest, **kwargs) -> HttpResponse:
    return render(request, "index.html")


@api_view(["GET"])
def get_auth_url(request: HttpRequest) -> Response:
    url = (
        "https://accounts.spotify.com/authorize?"
        + "response_type=code"
        + f"&client_id={CLIENT_ID}"
        + f"&scope={SCOPE}"
        + f"&redirect_uri={REDIRECT_URI}"
    )
    return Response({"url": url})


@api_view(["GET"])
def spotify_callback(request: HttpRequest) -> Response:
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
        profile_data = spotify_request(request, "/me")
        request.session["spotify_user_id"] = profile_data.json()["id"]
    except KeyError:
        return Response(res.json(), status=400)
    return redirect("/")


@api_view(["GET"])
def get_token(request: HttpRequest) -> Response:
    token = request.session.get("access_token")
    return Response({"token": token})


@api_view(["GET"])
def logout(request: HttpRequest) -> Response:
    request.session.clear()
    return redirect("/")


@api_view(["GET"])
def top_artists(request: HttpRequest) -> Response:
    time_range = request.GET.get("time_range")
    res = spotify_request(request, f"/me/top/artists?time_range={time_range}")
    return Response(res.json())


@api_view(["GET"])
def artist(request: HttpRequest, artist_id: str) -> Response:
    res = spotify_request(request, f"/artists/{artist_id}")
    return Response(res.json())


@api_view(["GET"])
def artist_albums(request: HttpRequest, artist_id: str) -> Response:
    res = spotify_request(request, f"/artists/{artist_id}/albums")
    return Response(res.json())


@api_view(["POST"])
def favourite(request: HttpRequest, spotify_item_id: str) -> Response:
    spotify_user_id = request.session.get("spotify_user_id")
    existing_favs = Favourite.objects.filter(
        spotify_item_id=spotify_item_id, spotify_user_id=spotify_user_id
    )
    if len(existing_favs) > 0:
        for fav in existing_favs:
            fav.delete()
        return Response({"message": "favourite removed"})

    Favourite.objects.create(
        spotify_item_id=spotify_item_id, spotify_user_id=spotify_user_id
    )
    return Response({"message": "favourite added"})


@api_view(["GET"])
def favourites(request: HttpRequest) -> Response:
    spotify_user_id = request.session.get("spotify_user_id")
    favourites = Favourite.objects.filter(spotify_user_id=spotify_user_id)
    if len(favourites) == 0:
        return Response({"artists": []})
    ids = ",".join([favourite.spotify_item_id for favourite in favourites])

    res = spotify_request(request, f"/artists?ids={ids}")
    return Response(res.json())
