from rest_framework import serializers
from .models import Product, Category

# create your products serializers here

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source="category.name")

    class Meta:
        model = Product
        fields = [
            "id",
            "title",
            "description",
            "price",
            "image",
            "category",
        ]
