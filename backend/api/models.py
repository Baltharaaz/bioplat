from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Job(models.Model):
    unaligned = models.TextField()
    aligned = models.TextField()
    phylo = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='jobs')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.unaligned
