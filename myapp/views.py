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
