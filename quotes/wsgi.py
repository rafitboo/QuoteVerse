"""
WSGI config for quotes project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application
from pathlib import Path

# Add the project directory to the Python path
app_path = Path(__file__).resolve().parent.parent
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'quotes.settings')
os.environ.setdefault('PYTHONPATH', str(app_path))

application = get_wsgi_application()
app = application
