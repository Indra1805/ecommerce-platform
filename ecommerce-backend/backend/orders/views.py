from rest_framework.views import APIView
from decimal import Decimal
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView
from .serializers import OrderSerializer
from .models import Order, OrderItem
from rest_framework.exceptions import PermissionDenied
from cart.models import CartItem

# Create your views here.

class CreateOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        cart = request.data.get("cart", [])

        if not cart:
            return Response(
                {"error": "Cart is empty"},
                status=status.HTTP_400_BAD_REQUEST
            )

        total = Decimal("0.00")

        for item in cart:
            price = Decimal(str(item["product"]["price"]))
            quantity = int(item["quantity"])
            total += price * quantity

        order = Order.objects.create(
            user=request.user,
            total_amount=total
        )

        for item in cart:
            OrderItem.objects.create(
                order=order,
                product_id=item["product"]["id"],
                product_title=item["product"]["title"],
                product_price=Decimal(str(item["product"]["price"])),
                product_image=item["product"]["image"],
                product_description=item["product"]["description"],
                quantity=int(item["quantity"]),
            )

        # ✅ CLEAR CART AFTER ORDER
        CartItem.objects.filter(user=request.user).delete()

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)



class MyOrdersView(ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by("-created_at")



class OrderDetailView(RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


class CancelOrderView(UpdateAPIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        try:
            order = Order.objects.get(pk=pk, user=request.user)
        except Order.DoesNotExist:
            raise PermissionDenied("Order not found")

        if order.status != "PLACED":
            return Response(
                {"error": "Order cannot be cancelled"},
                status=400
            )

        order.status = "CANCELLED"
        order.save()

        return Response({"status": "cancelled"})
