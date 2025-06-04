from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .models import Quote
import random
import os
import json

def home(request):
    return render(request, 'main/home.html')

def get_random_quote(request):
    # Hardcoded quotes since we can't use a database on Vercel
    quotes = [
        {"text": "Be yourself; everyone else is already taken.", "author": "Oscar Wilde"},
        {"text": "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", "author": "Albert Einstein"},
        {"text": "You only live once, but if you do it right, once is enough.", "author": "Mae West"},
        {"text": "In three words I can sum up everything I've learned about life: it goes on.", "author": "Robert Frost"},
        {"text": "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", "author": "Ralph Waldo Emerson"},
        {"text": "It is never too late to be what you might have been.", "author": "George Eliot"}
    ]
    
    random_quote = random.choice(quotes)
    return JsonResponse({
        'success': True,
        'quote': random_quote
    })

def test_endpoint(request):
    data = {
        'status': 'ok',
        'message': 'Server is running',
        'path': request.path,
        'method': request.method,
        'is_secure': request.is_secure(),
        'host': request.get_host(),
    }
    return JsonResponse(data)
