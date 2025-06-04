from django.db import models

class Quote(models.Model):
    text = models.TextField()
    author = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.text[:50]}... - {self.author}"
