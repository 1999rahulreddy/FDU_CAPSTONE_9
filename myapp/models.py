from django.db import models
from django.contrib.auth.models import User


class UserFile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    file_name = models.CharField(max_length=255)
    file_location = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

class Professor(models.Model):

    prof_name = models.CharField(max_length=255)
    prof_family = models.CharField(max_length=255)
    prof_email = models.CharField(max_length=255)
    prof_password = models.CharField(max_length=255)

    # one-to-many relation with class should be specified in class Model

    def __str__(self):
        return f"{self.prof_name} {self.prof_family}"
