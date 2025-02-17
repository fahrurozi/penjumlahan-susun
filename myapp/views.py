import os
import json
from django.shortcuts import render
from django.conf import settings

def home(request):
    file_path = os.path.join(settings.BASE_DIR, 'myapp', 'static', 'data', 'data.json')

    if not os.path.exists(file_path):
        return render(request, 'home.html', {'error': 'File data.json tidak ditemukan'})

    with open(file_path, 'r', encoding='utf-8') as file:
        json_data = json.load(file)

    return render(request, 'home.html', {'data': json.dumps(json_data, ensure_ascii=False)})
