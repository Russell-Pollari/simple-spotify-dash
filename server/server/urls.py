from django.contrib import admin
from django.urls import path
from api import views


urlpatterns = [
    # views
    path("admin/", admin.site.urls),
    path("", views.index),
    path("artists/<artist_id>", views.index),  # use client side routing
    # api
    path("spotify/callback", views.spotify_callback),
    path("api/auth-url", views.get_auth_url),
    path("api/spotify-token", views.get_token),
    path("api/top-artists", views.get_top_items),
    path("api/artists/<artist_id>", views.artist),
    path("api/artist-albums/<artist_id>", views.artist_albums),
    path("api/logout", views.logout),
]
