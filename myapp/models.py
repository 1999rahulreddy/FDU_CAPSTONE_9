from django.db import models
from django.contrib.auth.models import AbstractBaseUser, User
#from django.contrib.auth.models import User



'''
class UserFile(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    file_name = models.CharField(max_length=255)
    file_location = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)'''

class Course(models.Model):
    course_id = models.AutoField(primary_key=True)
    course_name = models.CharField(max_length=255)

    def __str__(self):
        return self.course_name

class Professor(User):
    professor_id = models.AutoField(primary_key=True)
    professor_name = models.CharField(max_length=255)
    courses = models.ManyToManyField(Course)

    def __str__(self):
        return self.professor_name

class Student(User):
    student_id = models.AutoField(primary_key=True)
    student_name = models.CharField(max_length=255)
    #username = models.EmailField(unique=True)
    #password = models.CharField(max_length=255)
    courses = models.ManyToManyField(Course)

    #USERNAME_FIELD = 'user_id'

    def __str__(self):
        return self.student_name

class Code(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    assignment_no = models.PositiveIntegerField()
    description = models.CharField(max_length=255)
    language = models.CharField(max_length=255)
    #code_file =models.FileField(upload_to='uploadedcode/')
    code_file = models.CharField(max_length=255)
    due_date = models.DateTimeField()

    #file_name = models.TextField()

    def __str__(self):
        return f"{self.student.student_name}'s Code for Assignment {self.assignment_no} in {self.course.course_name}"

class TestCase(models.Model):
    assignment_no = models.PositiveIntegerField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE)
    input_data = models.TextField()
    output_data = models.TextField()
    problem_details = models.TextField(blank=True)  # allow blank values for problem_details


    def __str__(self):
        return f"Test Case for Assignment {self.assignment_no} in {self.course.course_name}"
    
class Grades(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    assignment_no = models.PositiveIntegerField()
    submission_date = models.DateTimeField(auto_now_add=True)
    #code = models.ForeignKey(Code, on_delete=models.CASCADE)
    grade = models.FloatField()

    def __str__(self):
        return f"Grades for Assignment {self.assignment_no} in {self.course.course_name} for {self.student.username}"
