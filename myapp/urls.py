from django.urls import path
from .views import SignUpView
from . import views

urlpatterns = [
    #path('signup', views.SignUpView.as_view(), name='signup'),
    path('signup/', views.SignUpView, name='signup'),
    path('', views.home, name='home',)
    # Add other URLs as needed
]
