from django.db import models


# TODO: store type of item (track, album, artist)
class Favourite(models.Model):
    spotify_item_id = models.CharField(max_length=255)
    spotify_user_id = models.CharField(max_length=255)
    order = models.IntegerField(default=0)
