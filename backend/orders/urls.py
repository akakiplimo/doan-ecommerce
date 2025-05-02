from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CartItemViewSet, CartView, OrderViewSet

router = DefaultRouter()
router.register('items', CartItemViewSet, basename='cart-item')
router.register('orders', OrderViewSet, basename='order')

urlpatterns = [
    path('cart/', CartView.as_view(), name='cart'),
    path('cart/', include(router.urls)),
    path('', include(router.urls)),
]