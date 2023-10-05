from django.shortcuts import render, redirect
from django.views.generic.edit import CreateView
from django.contrib.auth.forms import UserCreationForm

'''
class SignUpView(CreateView):
    form_class = UserCreationForm
    template_name = 'signup.html'
    success_url = 'login'
    def get(self, request):
        return render(CreateView, 'signup.html', {})
'''

def SignUpView(request):
    return render(request, 'Signup.html', {})
def home(request):
    return render(request, 'home.html', {})