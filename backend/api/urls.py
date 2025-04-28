from django.urls import include, path
from . import views


urlpatterns = [
    path("jobs/", views.JobListCreate.as_view(), name="note-list")
]
