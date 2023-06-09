from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):

    def create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given email and password.
        """
        if not email:
            raise ValueError(_("The Email must be set"))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
      
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault("is_staff", True)
       
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=25, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    USERNAME_FIELD = "email"

    objects = UserManager()

    @property
    def total_score(self):
        from .scoreboad import Scoreboard
        scores = Scoreboard.objects.all().filter(user=self)
        total = 0
        for score in scores:
            total = total + score.score
        
        return total

    @property
    def average_score(self):
        from .scoreboad import Scoreboard
        scores = Scoreboard.objects.all().filter(user=self)
        if len(scores) == 0:
            return 0
        return self.total_score / len(scores)

    @property
    def best_score(self):
        from .scoreboad import Scoreboard
        scores = Scoreboard.objects.all().filter(user=self)
        if scores:
            return max(score.score for score in scores)
        return 0

    @property
    def worst_score(self):
        from .scoreboad import Scoreboard
        scores = Scoreboard.objects.all().filter(user=self)
        if scores:
            return min(score.score for score in scores)
        return 0

    @property
    def average_time(self):
        from .scoreboad import Scoreboard
        scores = Scoreboard.objects.all().filter(user=self)
        if scores and len(scores) > 0:
            total_time = sum(score.time for score in scores)
            return total_time / len(scores)
        return 0


    @property
    def number_of_times_completed(self):
        from .scoreboad import Scoreboard
        completed_scores = Scoreboard.objects.all().filter(user=self, completed=True)
        return len(completed_scores)



class SuperUser(User):
    class Meta:
        proxy = True

    def save(self, *args, **kwargs):
        self.is_staff = True
        self.is_superuser = True
        super().save(*args, **kwargs)
