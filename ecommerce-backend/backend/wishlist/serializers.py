from rest_framework import serializers
from .models import WishlistItem
from products.serializers import ProductSerializer

# create your wishlist serializers here

class WishlistItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = WishlistItem
        fields = ["id", "product", "created_at"]
