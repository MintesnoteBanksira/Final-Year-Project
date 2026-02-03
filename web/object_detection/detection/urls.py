from django.urls import path
from .views import DetectView, RegisterView, CustomLoginView, CoffeeDiseaseClassificationView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView 

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('detect/', DetectView.as_view(), name='detect'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('classify/', CoffeeDiseaseClassificationView.as_view(), name='classify_coffee_disease'),
]