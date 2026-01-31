from django.urls import path
from .views import CreateOrderView, MyOrdersView, OrderDetailView, CancelOrderView

# create your orders requests here

urlpatterns = [
    path("create/", CreateOrderView.as_view()),
    path("my/", MyOrdersView.as_view()),
    path("<int:pk>/", OrderDetailView.as_view()),
    path("<int:pk>/cancel/", CancelOrderView.as_view()),
]
