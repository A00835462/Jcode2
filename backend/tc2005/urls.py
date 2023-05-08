"""tc2005 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from tc2005.views.user_view import UserView
from tc2005.views.scoreboard_view import ScoreboardView
from tc2005.views.profile_view import ProfileView
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()

router.register("users", viewset=UserView)
router.register("scores", viewset=ScoreboardView)
router.register("profile", viewset=ProfileView)


urlpatterns = [
    path("api/", include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),


] + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

urlpatterns += [
    path("api/profile/update_password/", ProfileView.as_view({'post': 'update_password'})),
]
urlpatterns += [
    path("api/profile/update_image/", ProfileView.as_view({'post': 'update_image'})),
]

urlpatterns += [
    path("api/profile/save_riskescape/", ProfileView.as_view({'post': 'save_riskescape'})),
]
urlpatterns += [
    path("api/profile/register_score/", ScoreboardView.as_view({'post': 'register_score'})),
]