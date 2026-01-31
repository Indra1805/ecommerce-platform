from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer

# Create your views here.


class ProductListView(ListAPIView):
    queryset = Product.objects.select_related("category").all()
    serializer_class = ProductSerializer


class ProductDetailView(RetrieveAPIView):
    queryset = Product.objects.select_related("category").all()
    serializer_class = ProductSerializer


class CategoryListView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer