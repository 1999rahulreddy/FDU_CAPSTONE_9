from django.shortcuts import render, redirect, get_object_or_404
from django import forms
from django.views.generic.edit import CreateView
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import get_user, login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password, make_password
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status, permissions
from rest_framework.authtoken.models import Token
from .serializer import *
from .models import *
from .forms import RegistrationForm
# from django.views.decorators.csrf import csrf_exempt
from pathlib import Path
import os
import subprocess
import logging
from .data import *
from .serializer import ProfSerializer
from django.http import JsonResponse
'''
class SignUpView(CreateView):
    form_class = UserCreationForm
    template_name = 'signup.html'
    success_url = 'login'
    def get(self, request):
        return render(CreateView, 'signup.html', {})
'''


class UserView(APIView):
    serializer_class = UserSerializer

    def get(self, request):
        output = [{"username": output.username, "email": output.email}
                  #for output in UserFile.objects.all()]
                  for output in Code.objects.all()]
        return Response(output)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


def SignUpView(request):
    return render(request, 'Signup.html', {})


@login_required
def logout_view(request):
    logout(request)
    # return redirect('home.html')  # Redirect to the login page (replace with your login URL)
    return render(request, 'home.html')


def home(request):
    return render(request, 'public/index.html', {})


def upload_script(request):
    if request.method == 'POST':
        uploaded_file = request.FILES['file']
        BASE_DIR = Path(__file__).resolve().parent
        file_path = os.path.join(BASE_DIR, 'uploadedcode/a.py')
        with open(file_path, 'wb+') as f:
            for chunk in uploaded_file.chunks():
                f.write(chunk)

        # Execute the Python script using subprocess
        result = subprocess.run(['python', file_path],
                                capture_output=True, text=True)

        # Access the script output using 'result.stdout'
        script_output = result.stdout

        return render(request, 'output.html', {'output': script_output})

    return render(request, 'upload.html')


@login_required
def upload_file(request):
    user = request.user
    if request.method == 'POST':
        user = request.user
        uploaded_file = request.FILES['file']
        BASE_DIR = Path(__file__).resolve().parent
        file_name = uploaded_file.name
        file_location = os.path.join(BASE_DIR, f'uploadedcode/{file_name}')
        description = request.POST.get('description', '')

        # Check the file extension
        file_extension = os.path.splitext(file_name)[-1].lower()

        if file_extension == '.py':
            # Handle Python script execution
            #user_file = UserFile(user=user, file_name=file_name,file_location=file_location, description=description)
            user_file = Code(user=user, file_name=file_name,file_location=file_location, description=description)
            user_file.save()

            # Save the uploaded file to the specified location
            with open(file_location, 'wb') as file:
                for chunk in uploaded_file.chunks():
                    file.write(chunk)

            # Execute the Python script
            result = subprocess.run(
                ['python', file_location], capture_output=True, text=True)

            # Access the script output using 'result.stdout'
            script_output = result.stdout

            return render(request, 'output.html', {'output': script_output})

        elif file_extension == '.c':
            # Handle C code compilation and execution
            #user_file = UserFile(user=user, file_name=file_name,file_location=file_location, description=description)
            user_file = Code(user=user, file_name=file_name,file_location=file_location, description=description)
            user_file.save()

            # Save the uploaded C file to the specified location
            with open(file_location, 'wb') as file:
                for chunk in uploaded_file.chunks():
                    file.write(chunk)

            # Compile the C code (assuming it's a single .c file)
            compile_command = ['gcc', file_location,
                               '-o', f'{file_name}_compiled_file']
            compile_result = subprocess.run(
                compile_command, capture_ouyestput=True, text=True)

            if compile_result.returncode == 0:
                # Successfully compiled, execute the compiled binary
                execute_command = [f'./{file_name}_compiled_file']
                execution_result = subprocess.run(
                    execute_command, capture_output=True, text=True)

                # Access the execution output using 'execution_result.stdout'
                script_output = execution_result.stdout

                return render(request, 'output.html', {'script_output': script_output})
            else:
                # Compilation failed
                return render(request, 'upload.html', {'error_message': 'Compilation failed'})

    return render(request, 'upload.html')


@login_required
def list_files(request):
    user_files = user_files.objects.filter(user=request.user)
    return render(request, 'list.html', {'user_files': user_files})


logger = logging.getLogger(__name__)


def login_view(request):
    if request.method == 'POST':
        print(request.POST)
        form = AuthenticationForm(request, request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')
            else:
                logger.error(
                    f"Login failed for user '{username}'. User is None.")
        else:
            logger.error("Invalid form data.")
            # Add this line to log form validation errors
            logger.error(form.errors)
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})

def registration_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(request, username=username, password=password)
            login(request, user)
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'register.html', {'form': form})


class RegistrationAPIView(generics.CreateAPIView):
    #queryset = User.objects.all()
    queryset = Student.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegistrationSerializer

class Assign_Test_Case(APIView):
    serializer_class = TestCaseSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            # Assuming you have a model named YourTestCaseModel, adjust it accordingly
            testcase_instance = TestCase.objects.create(
                # Extract fields from the serializer data
                field1=serializer.validated_data['field1'],
                field2=serializer.validated_data['field2'],
                # ... (repeat for other fields)
            )

            # You can associate the test case with a specific user if needed
            # testcase_instance.user = request.user
            # testcase_instance.save()

            return Response({'message': 'Test case assigned successfully'}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


        

class ChangePasswordView(APIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = (IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'Password changed successfully'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

'''
class LoginAPIView(APIView):
    serializer_class = LoginSerializer      
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            print(password)

            user = User.objects.get(username=username)
            print(user)
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)

                # Get or create a token for the user
                token, _ = Token.objects.get_or_create(user=user)   

                # Return the token in the response
                return Response({'token': token.key}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

'''

logger = logging.getLogger(__name__)

class LoginAPIView(APIView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']

            # Debugging: Print received username and password
            #logger.info(f"Received username: {username}")
            #logger.info(f"Received password: {password}")

            #hashed_password = make_password(password)
            #print(hashed_password)
            #print(check_password(password,hashed_password))


            #print(Student.objects.get_by_natural_key(username))

            # Authenticate the user
            user = authenticate(request, username=username, password=password)

            # Debugging: Print authenticated user
            #logger.info(f"Authenticated user: {user}")

            if user is not None:
                login(request, user)

                # Get or create a token for the user
                token, _ = Token.objects.get_or_create(user=user)

                # Return the token in the response
                return Response({'token': token.key}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class LoginAPIView(APIView):
#     serializer_class = LoginSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.serializer_class(data=request.data)
#         if serializer.is_valid():
#             username = serializer.validated_data['username']
#             password = serializer.validated_data['password']
#             user = authenticate(request, username=username, password=password)
#             if user is not None:
#                 login(request, user)
#                 return Response({'status': 'login successful'}, status=status.HTTP_200_OK)
#             else:
#                 return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_file(request):
    if request.method == 'POST':
        user = request.user
        print(user)
        student_instance = get_object_or_404(Student, username=user)
        print(student_instance)
        uploaded_file = request.FILES.get('file')
        print(uploaded_file.name)

        if not uploaded_file:
            return Response({'error': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)

        description = request.POST.get('description', '')
        BASE_DIR = Path(__file__).resolve().parent
        file_name = uploaded_file.name
        file_location = os.path.join(BASE_DIR, f'uploadedcode/{file_name}')
        file_extension = os.path.splitext(file_name)[-1].lower()

        if file_extension == '.py':
            # Handle Python script execution
            #result = data(uploaded_file, student_instance, file_name, file_location, description, 'python')
            result = data(uploaded_file, student_instance, file_location, description, 'python')

        elif file_extension == '.c':
            # Handle C code compilation and execution
            #result = data(uploaded_file, student_instance, file_name, file_location, description, 'c')
            result = data(uploaded_file, student_instance, file_location, description, "c")

            if 'error' in result:
                return Response({'error': result['error']}, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({'error': 'Invalid file type'}, status=status.HTTP_400_BAD_REQUEST)

        # return Response({'output': script_output}, status=status.HTTP_200_OK)
        # return Response({'Test_Cases':result['test_cases'],'Results': result['results'],'Score':result['score']}, status=status.HTTP_200_OK)
        return Response(result, status=status.HTTP_200_OK)

    return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


'''
def data(uploaded_file, user, file_name, file_location, description, language):
    user_file = UserFile(user=user, file_name=file_name, file_location=file_location, description=description)
    user_file.save()

    # Save the uploaded file to the specified location
    with open(file_location, 'wb+') as file:
        for chunk in uploaded_file.chunks():
            file.write(chunk)

    if language == 'python':
        result = subprocess.run(['python', file_location], capture_output=True, text=True)
        script_output = result.stdout  # Set the script_output here
        os.remove(f'{file_location}')

    elif language == 'c':
        # Compile the C code (assuming it's a single .c file)
        compile_command = ['gcc', file_location, '-o', f'{file_location}_compiled_file']
        compile_result = subprocess.run(compile_command, capture_output=True, text=True)

        if compile_result.returncode == 0:
            # Successfully compiled, execute the compiled binary
            execute_command = [f'{file_location}_compiled_file']
            execution_result = subprocess.run(execute_command, capture_output=True, text=True)
            script_output = execution_result.stdout
            # Delete the file after compilation and getting the final result
            os.remove(f'{file_location}_compiled_file')
            os.remove(f'{file_location}')

        else:
            # Compilation failed
            return {'error': 'Compilation failed'}

    return {'output': script_output}
'''



@api_view(['GET'])
def get_prof_overview(request):
    return Response()


@api_view(['GET'])
def get_prof_profile(request, id):
    try:
        profile = Professor.objects.get(id=id)
        serializer = ProfSerializer(profile)
        return Response(serializer.data)
    except Professor.DoesNotExist:
        return JsonResponse({'error': 'Professor not found'}, status=404)


@api_view(['GET'])
def get_list_results(request):
    return Response()


@api_view(['GET'])
def get_classes_info(request):
    return Response()

