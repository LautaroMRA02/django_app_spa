from django.db import models

# Create your models here.
class Message(models.Model):
    
    author = models.CharField(max_length=100)
    text = models.TextField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.author}: {self.text[:10] + '...'}"
    