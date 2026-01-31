from django.urls import path
from .views import ProductListView, ProductDetailView, CategoryListView

# create your products requests here

urlpatterns = [
    path("products/", ProductListView.as_view()),
    path("product/<int:pk>/", ProductDetailView.as_view()),
    path("categories/", CategoryListView.as_view()),
]
