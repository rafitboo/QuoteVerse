from django.shortcuts import render
from django.http import JsonResponse
from .models import Quote
import random
import os

def home(request):
    return render(request, 'main/home.html')

def get_random_quote(request):
    # Hardcoded quotes for Vercel deployment
    quotes = [
        {"text": "Be yourself; everyone else is already taken.", "author": "Oscar Wilde"},
        {"text": "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", "author": "Albert Einstein"},
        {"text": "You only live once, but if you do it right, once is enough.", "author": "Mae West"},
        {"text": "In three words I can sum up everything I've learned about life: it goes on.", "author": "Robert Frost"},
    ]
    
    if os.environ.get('VERCEL'):
        random_quote = random.choice(quotes)
        return JsonResponse({
            'success': True,
            'quote': random_quote
        })
    
    # For local development, use database
    db_quotes = list(Quote.objects.all())
    if db_quotes:
        random_quote = random.choice(db_quotes)
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
