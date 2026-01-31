from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import CartItem
from .serializers import CartItemSerializer
from products.models import Product

# create your cart views here

class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        items = CartItem.objects.filter(user=request.user)
        serializer = CartItemSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):
        product_id = request.data.get("product_id")

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response(
                {"error": "Product not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        item, created = CartItem.objects.get_or_create(
            user=request.user,
            product=product,
        )

        if not created:
            return Response(
                {"message": "Item already in cart"},
                status=status.HTTP_200_OK,
            )

        serializer = CartItemSerializer(item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def patch(self, request):
        item_id = request.data.get("item_id")
        quantity = request.data.get("quantity")

        try:
            item = CartItem.objects.get(id=item_id, user=request.user)
        except CartItem.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        item.quantity = max(1, quantity)
        item.save()
        return Response(CartItemSerializer(item).data)

    def delete(self, request):
        item_id = request.data.get("item_id")
        CartItem.objects.filter(
            id=item_id, user=request.user
        ).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
