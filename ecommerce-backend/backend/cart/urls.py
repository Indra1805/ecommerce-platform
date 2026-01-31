from django.urls import path
from .views import CartView

# create your cart requests here

urlpatterns = [
    path("cart/", CartView.as_view()),
]
