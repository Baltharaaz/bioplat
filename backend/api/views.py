from django.shortcuts import render
from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets, generics
from ete3 import PhyloTree
import matplotlib, networkx
import subprocess, os
from .models import Job


from api.serializers import GroupSerializer, UserSerializer, JobSerializer


class JobListCreate(generics.ListCreateAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Job.objects.filter(author=user).order_by("-created_at")

    def perform_create(self, serializer):
        if serializer.is_valid():
            to_align = serializer.validated_data['unaligned']
            name = serializer.validated_data['name']
            aligned = False
            tree_path = False

            with open(f"./jobfiles/{name}.fasta", "w") as f:
                f.write(to_align)
                f.close()
            cmd = f"clustalw2.exe -infile=./jobfiles/{name}.fasta"
            assert os.path.isfile(f"./jobfiles/{name}.fasta"), f"{name}.fasta does not exist"
            try:
                results = subprocess.run(cmd, shell=True, stdout=subprocess.PIPE, text=True)
            except subprocess.CalledProcessError as e:
                print(e)


            tree = PhyloTree(f"./jobfiles/{name}.dnd")
            tree.render(f"./jobfiles/{name}.png")
            tree_path = os.path.abspath(f"./jobfiles/{name}.png")
            with open(f"./jobfiles/{name}.aln", "r") as f:
                aligned = f.read()
                f.close()

            serializer.save(author=self.request.user, aligned=aligned, phylo=tree_path)
            os.remove(f"./jobfiles/{name}.aln")
            os.remove(f"./jobfiles/{name}.fasta")
            os.remove(f"./jobfiles/{name}.dnd")

        else:
            print(serializer.errors)

class JobDelete(generics.DestroyAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Job.objects.filter(author=user).order_by("-created_at")

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all().order_by('name')
    serializer_class = GroupSerializer
    permission_classes = [permissions.AllowAny]
