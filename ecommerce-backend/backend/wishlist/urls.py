from django.urls import path
from .views import WishlistView

# create your wishlist requests here

urlpatterns = [
    path("wishlist/", WishlistView.as_view()),
]
