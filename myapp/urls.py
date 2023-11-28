from django.urls import path
from .views import *
from . import views
from .views import RegistrationAPIView, ChangePasswordView, LoginAPIView

urlpatterns = [
    # path('signup', views.SignUpView.as_view(), name='signup'),
    # path('signup/', views.SignUpView, name='signup'),
    

    path('', views.home, name='home',),
    # path('upload', views.upload_file, name='upload'),
    # path('upload/', views.upload_script, name='upload-script'),
    # path('', views.home, name='home',),
    
    # path('upload/', views.upload_script, name='upload-script'),
    # Add other URLs as needed
    path('register/', views.registration_view, name='register'),
    path('api/register/', RegistrationAPIView.as_view(), name='api_register'),
    
    path('logout/', views.logout_view, name='logout_view'),
    path('login/', views.login_view, name='login'),
    path('api/login/', LoginAPIView.as_view(), name='api-login'),

    path('api/chpasswd/', ChangePasswordView.as_view(), name='api_chpasswd'),
    path('upload/', views.upload_file, name='upload_file'),
    path('signup/', views.UserView.as_view(), name='signup'),
    path('api/view_grades/<int:student_id>/<int:course_id>/', GradesView.as_view(), name='grades-api'),
    path('api/course_list/<int:student_id>/', StudentCoursesView.as_view(), name='course_students'),

    path('api/courses_list/<int:professor_id>/', ProfessorCoursesView.as_view(), name='course_professors'),
]
