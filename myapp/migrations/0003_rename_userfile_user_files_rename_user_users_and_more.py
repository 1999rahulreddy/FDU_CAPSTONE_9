# Generated by Django 4.2.5 on 2023-10-09 04:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('myapp', '0002_alter_user_id'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='UserFile',
            new_name='user_files',
        ),
        migrations.RenameModel(
            old_name='User',
            new_name='users',
        ),
        migrations.AlterField(
            model_name='user_files',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
