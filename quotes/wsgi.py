import os
from django.core.wsgi import get_wsgi_application

os.environ['DJANGO_SETTINGS_MODULE'] = 'quotes.settings'

app = get_wsgi_application()
application = app
