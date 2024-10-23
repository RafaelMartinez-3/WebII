

from datetime import datetime
from django.urls import path
from django.contrib import admin
from django.contrib.auth.views import LoginView, LogoutView
from app import forms, views


app_name = 'app' 
urlpatterns = [
    # path('', views.index, name='public'),
    # path('index', views.index, name='index'),
    # path("<int:question_id>/", views.detail, name='detail'),
    # path("<int:question_id>/results/", views.results, name='results'),
    # path("<int:question_id>/vote/", views.vote, name='vote')
    
    path('', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('login/', LoginView.as_view(
            template_name='app/login.html',
            authentication_form=forms.BootstrapAuthenticationForm,
            extra_context=
            {
                'title': 'Log in',
                'year' : datetime.now().year,
            },
            next_page="app/"
            ),
            name="login"
        ),
    path('logout/', LogoutView.as_view(next_page='app:about'), name='logout'),
    path('admin/', admin.site.urls),
]
