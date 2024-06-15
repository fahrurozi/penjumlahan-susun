from django.shortcuts import render
from django.conf import settings
from django.http import JsonResponse
import os
import json
from django.contrib.staticfiles.storage import staticfiles_storage
from django.core import serializers
from django.core.serializers import serialize

# Create your views here.

def home(request):
    file_path = staticfiles_storage.path('data/data.json')
    with open(file_path, 'r') as file:
        file_content = file.read()
        
    # Parse the JSON content to ensure it's valid JSON
        
    json_data = json.loads(file_content)

# Serialize the JSON data to a JSON string
    companies_json = json.dumps(json_data, ensure_ascii=False)
        
        
    return render(request, 'home.html', {'data': json.dumps(json_data)})
        # return JsonResponse(json_data, safe=False)