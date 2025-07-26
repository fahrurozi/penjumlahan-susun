from django.urls import path
from . import views

urlpatterns = [
    path("", views.cover, name="cover"),
    path("menu", views.menu, name="menu"),
    path("tujuan", views.tujuan, name="tujuan"),
    path("soal", views.soal, name="soal"),
]