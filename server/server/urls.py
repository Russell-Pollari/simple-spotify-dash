from django.contrib import admin
from django.urls import path
from api import views


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.index),
    path("spotify/callback", views.spotify_callback),
    path("api/auth-url", views.get_auth_url),
    path("api/spotify-token", views.get_token),
    path("api/top-artists", views.get_top_items),
]
