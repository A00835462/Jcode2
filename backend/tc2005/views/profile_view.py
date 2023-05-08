from rest_framework import viewsets
from tc2005.models import Profile
from tc2005.serializers.profile_serializer import ProfileSerializer,ImageSerializer
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import  status
from ..models import User
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from tc2005.serializers.scoreboard_serializer import ScoreboardSerializer, ScoreSerializer
import pyodbc 
from tc2005.models import Scoreboard
class ProfileView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    authentication_classes = (SessionAuthentication, TokenAuthentication, )
    
    @action(methods=["GET"],  detail=False, permission_classes=[IsAuthenticated])
    def current_profile(self, request):
        user = User.objects.filter(email = request.user)[0]
        profile = Profile.objects.filter(user = user)
        print(user)
        serializer = ProfileSerializer(instance = profile,many = True, context = {'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK) 
    
    @action(methods=["GET"],  detail=True, permission_classes=[IsAuthenticated])
    def get_profile(self, request, pk):
        user = User.objects.filter(pk = pk)[0]
        profile = Profile.objects.filter(user = user)
        print(user)
        serializer = ProfileSerializer(instance = profile,many = True, context = {'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK) 

    @action(methods=["POST"], detail=False, serializer_class=ImageSerializer, permission_classes=[IsAuthenticated])
    def update_image(self, request):
        serializer = ImageSerializer(data=request.data)

        if serializer.is_valid():
            user = User.objects.get(email=request.user)
            profile = Profile.objects.get(user=user)
            profile.image = serializer.validated_data["image"]
            profile.save()

            return Response({"detail": "Image saved"}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @action(methods=["POST"], detail=False, permission_classes=[IsAuthenticated])
    def update_password(self, request):
        data = request.data

        if 'password' in data:
            user = request.user
            new_password = data['password']
            user.set_password(new_password)
            user.save()
            return Response({"success": True, "message": "Password updated."}, status=status.HTTP_200_OK)
        else:
            return Response({"success": False, "message": "Password not found in request."}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["POST"],  detail=False)
    def save_riskescape(self, request):
        user = User.objects.get(email=request.data['user'])
        score = Scoreboard.objects.create(
                user=user,
                score=request.data['score'],
                tasks=request.data['tasks'],
                time=request.data['time'],
                completed=request.data['completed']
        )
        score.save()
        return Response({"success": True, "message": "Score saved."}, status=status.HTTP_200_OK)