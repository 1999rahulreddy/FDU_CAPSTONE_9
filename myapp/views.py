from django.shortcuts import render, redirect
from django.views.generic.edit import CreateView
from django.contrib.auth.forms import UserCreationForm
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import *
from .models import *
# from django.views.decorators.csrf import csrf_exempt
from pathlib import Path
import os
import subprocess

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
                  for output in User.objects.all()]
        return Response(output)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


def SignUpView(request):
    return render(request, 'Signup.html', {})


def home(request):
    return render(request, 'home.html', {})


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
<<<<<<< HEAD
=======

@login_required
def upload_file(request):
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
            user_file = UserFile(user=user, file_name=file_name, file_location=file_location, description=description)
            user_file.save()

            # Save the uploaded file to the specified location
            with open(file_location, 'wb') as file:
                for chunk in uploaded_file.chunks():
                    file.write(chunk)

            # Execute the Python script
            result = subprocess.run(['python', file_location], capture_output=True, text=True)

            # Access the script output using 'result.stdout'
            script_output = result.stdout

            return render(request, 'output.html', {'script_output': script_output})

        elif file_extension == '.c':
            # Handle C code compilation and execution
            user_file = UserFile(user=user, file_name=file_name, file_location=file_location, description=description)
            user_file.save()

            # Save the uploaded C file to the specified location
            with open(file_location, 'wb') as file:
                for chunk in uploaded_file.chunks():
                    file.write(chunk)

            # Compile the C code (assuming it's a single .c file)
            compile_command = ['gcc', file_location, '-o', f'{file_name}_compiled_file']
            compile_result = subprocess.run(compile_command, capture_ouyestput=True, text=True)

            if compile_result.returncode == 0:
                # Successfully compiled, execute the compiled binary
                execute_command = [f'./{file_name}_compiled_file']
                execution_result = subprocess.run(execute_command, capture_output=True, text=True)

                # Access the execution output using 'execution_result.stdout'
                script_output = execution_result.stdout

                return render(request, 'output.html', {'script_output': script_output})
            else:
                # Compilation failed
                return render(request, 'upload.html', {'error_message': 'Compilation failed'})

    return render(request, 'upload.html')



@login_required
def list_files(request):
    user_files= UserFile.objects.filter(user=request.user)
    return render(request, 'list.html',{'user_files':user_files})
>>>>>>> fe0a23d (only file no reg/sign)
