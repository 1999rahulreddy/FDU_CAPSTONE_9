from django.urls import path
from .views import *
from . import views

urlpatterns = [
    # path('signup', views.SignUpView.as_view(), name='signup'),
    # path('signup/', views.SignUpView, name='signup'),
    path('signup/', views.SignUpView, name='signup'),

    path('', views.home, name='home',),
    # path('upload', views.upload_file, name='upload'),
    #path('upload/', views.upload_script, name='upload-script'),
    #path('', views.home, name='home',),
    path('upload/', views.upload_file, name='upload_file'),
    #path('upload/', views.upload_script, name='upload-script'),
    # Add other URLs as needed
    path('register/', views.registration_view, name='register'),
    path('logout/', views.logout_view, name='logout_view'),
    path('login/', views.login_view, name='login'),
]
