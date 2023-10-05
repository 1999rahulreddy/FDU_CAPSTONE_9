from django.urls import path
from .views import SignUpView
from .views import UserView
from . import views

urlpatterns = [
    #path('signup', views.SignUpView.as_view(), name='signup'),
    # path('signup/', views.SignUpView, name='signup'),
    path('signup/', views.SignUpView, name='signup'),
    path('', views.home, name='home',),
    # path('upload', views.upload_file, name='upload'),
    path('upload/', views.upload_script, name='upload-script')
    # Add other URLs as needed
]