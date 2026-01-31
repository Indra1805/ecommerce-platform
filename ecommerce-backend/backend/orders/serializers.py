from rest_framework import serializers
from .models import Order, OrderItem

# create your orders serializers here

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["id", "product_title", "product_price", "quantity"]

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ["id", "total_amount", "status", "created_at", "items"]
