from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from .views import *
from . import views
from .views import RegistrationAPIView, ChangePasswordView, LoginAPIView

urlpatterns = [
    path('', views.home, name='home',),
    path('register/', views.registration_view, name='register'),
    path('api/register/', RegistrationAPIView.as_view(), name='api_register'),

    path('logout/', views.logout_view, name='logout_view'),
    path('login/', views.login_view, name='login'),
    path('api/login/', LoginAPIView.as_view(), name='api-login'),

    path('api/chpasswd/', ChangePasswordView.as_view(), name='api_chpasswd'),
    path('upload/<int:course_id>/<int:assignment_id>/',views.upload_file, name='upload_file'),
    path('signup/', views.UserView.as_view(), name='signup'),
    path('api/view_grades/<int:student_id>/<int:course_id>/', GradesView.as_view(), name='grades-api'),
    path('api/all_grades/<int:student_id>/',AllGradesView.as_view(), name='all-grades-api'),
    path('api/Student_course_list/<int:student_id>/',StudentCoursesView.as_view(), name='course_students'),

    path('api/Professor_course_list/<int:professor_id>/',ProfessorCoursesView.as_view(), name='course_professors'),

    path('api/prof/overview/<int:id>', views.get_prof_overview, name='api-prof-overview'),
    path('api/prof/profile/<int:id>',views.get_prof_profile, name='api-prof-profile'),
    path('api/prof/get_course_list/<int:id>',views.get_course_list, name='api-course-list'),
    path('api/prof/get_pending_upload/<int:id>', views.get_pending_upload, name='api-pending-upload'),
    path('api/prof/upload_testcase/',views.upload_testcase, name='api-upload-testcase'),
    path('api/prof/register-professor/', RegisterProfessor.as_view(), name='api-prof-register'),
    # path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('api/assignments/<int:course_id>/',AssignmentsView.as_view(), name='assignments-list'),
]
