from django.db import models

# Create your models here.


class Job(models.Model):
    id = models.AutoField(primary_key=True)
    unaligned = models.JSONField()
    aligned = models.CharField(max_length=1024)
    account = models.ForeignKey()
    type = models.CharField(max_length=1024)
