from rest_framework import serializers
from .models import Favourite


class FavouriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favourite
        fields = ["id", "spotify_item_id", "spotify_user_id", "order"]
