from django.urls import include, path
from . import views


urlpatterns = [
    path("jobs/", views.JobListCreate.as_view(), name="user-jobs"),
    path("jobs/<int:pk>", views.JobDetail.as_view(), name="user-job-get"),
    path("jobs/delete/<int:pk>/", views.JobDelete.as_view(), name="job-delete")
]
