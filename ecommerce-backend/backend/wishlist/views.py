from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import WishlistItem
from .serializers import WishlistItemSerializer
from products.models import Product

# Create your views here.

class WishlistView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        items = WishlistItem.objects.filter(user=request.user)
        serializer = WishlistItemSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):
        product_id = request.data.get("product_id")

        if not product_id:
            return Response(
                {"error": "product_id is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response(
                {"error": "Product not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        item, created = WishlistItem.objects.get_or_create(
            user=request.user, product=product
        )

        if not created:
            return Response(
                {"message": "Already in wishlist"},
                status=status.HTTP_200_OK,
            )

        serializer = WishlistItemSerializer(item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request):
        product_id = request.data.get("product_id")

        WishlistItem.objects.filter(
            user=request.user, product_id=product_id
        ).delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
