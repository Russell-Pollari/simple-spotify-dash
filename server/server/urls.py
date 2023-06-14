from django.contrib import admin
from django.urls import path
from api import views


urlpatterns = [
    # views
    path("admin/", admin.site.urls),
    path("", views.index),
    # TODO: better solution for this, use regex?
    path("artists/<artist_id>", views.index),  # use client side routing
    path("dashboard", views.index),  # use client side routing
    path("top-artists", views.index),  # use client side routing
    # api
    path("spotify/callback", views.spotify_callback),
    path("api/auth-url", views.get_auth_url),
    path("api/spotify-token", views.get_token),
    path("api/top-artists", views.top_artists),
    path("api/artists/<artist_id>", views.artist),
    path("api/artist-albums/<artist_id>", views.artist_albums),
    path("api/logout", views.logout),
    path("api/favourite/<spotify_item_id>", views.favourite),
    path("api/favourites", views.favourites),
]
