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
        return Job.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            to_align = serializer.data['unaligned']
            id = serializer.data['id']
            aligned = False
            tree_path = False

            with open(f"{id}.fasta", "w") as f:
                f.write(to_align)
                exe_location = r"C:\Program Files (x86)\ClustalW2\clustalw2.exe"
                cmd = exe_location +  " -infile=temp.fasta"
                assert os.path.isfile(f"./jobfiles/{id}.fasta"), f"{id}.fasta does not exist"
                try:
                    results = subprocess.run(cmd, shell=True, stdout=subprocess.PIPE, text=True)
                    tree_path = os.path.abspath("./jobfiles/{id}.dnd")
                except subprocess.CalledProcessError as e:
                    print(e)
                finally:
                    f.close()


            tree = PhyloTree(f"{id}.dnd")
            with open(f"./jobfiles/{id}.aln", "r") as f:
                aligned = f.read()


            serializer.save(author=self.request.user, aligned=aligned, phylo=tree_path)

        else:
            print(serializer.errors)

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
