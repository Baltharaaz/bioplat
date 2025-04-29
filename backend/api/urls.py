from django.urls import include, path
from . import views


urlpatterns = [
    path("jobs/", views.JobListCreate.as_view(), name="user-notes"),
    path("jobs/delete/<int:pk>/", views.JobDelete.as_view(), name="job-delete")
]
