from django.shortcuts import render
from django.http import JsonResponse
from .models import Quote
import random

def home(request):
    return render(request, 'main/home.html')

def get_random_quote(request):
    quotes = list(Quote.objects.all())
    if quotes:
        random_quote = random.choice(quotes)
        return JsonResponse({
            'success': True,
            'quote': {
                'text': random_quote.text,
                'author': random_quote.author
            }
        })
    return JsonResponse({
        'success': False,
        'quote': {
            'text': 'No quotes available',
            'author': 'System'
        }
    })
