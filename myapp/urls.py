from django.urls import path
from .views import *
from . import views
from .views import RegistrationAPIView, ChangePasswordView, LoginAPIView

urlpatterns = [
    # path('signup', views.SignUpView.as_view(), name='signup'),
    # path('signup/', views.SignUpView, name='signup'),
    path('signup/', views.UserView.as_view(), name='signup'),

    path('', views.home, name='home',),
    # path('upload', views.upload_file, name='upload'),
    # path('upload/', views.upload_script, name='upload-script'),
    # path('', views.home, name='home',),
    path('upload/', views.upload_file, name='upload_file'),
    # path('upload/', views.upload_script, name='upload-script'),
    # Add other URLs as needed
    path('register/', views.registration_view, name='register'),
    path('api/register/', RegistrationAPIView.as_view(), name='api_register'),
    path('api/chpasswd/', ChangePasswordView.as_view(), name='api_chpasswd'),
    path('logout/', views.logout_view, name='logout_view'),
    path('login/', views.login_view, name='login'),
    path('api/login/', LoginAPIView.as_view(), name='api-login'),


    path('prof/overview/', views.get_prof_overview, name='api-prof-overview'),
    path('prof/profile/<int:id>', views.get_prof_profile, name='api-prof-profile'),
    path('prof/listresults/', views.get_list_results, name='api-list-results'),
    path('prof/classesinfo/', views.get_classes_info, name='api-classes-info'),

]
