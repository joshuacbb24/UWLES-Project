"""
Definition of urls for tryDjango.
"""

from datetime import datetime
from django.urls import path
from django.contrib import admin
from django.contrib.auth.views import LoginView, LogoutView, PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, PasswordResetCompleteView
from app import forms, views
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import include


urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('createevents/', views.createevents, name='createevents'),
    #path('contact/', views.contact, name='contact'),
    #path('about/', views.about, name='about'),
    path('login/',
         LoginView.as_view
         (
             template_name='app/login.html',
             authentication_form=forms.BootstrapAuthenticationForm,
             extra_context=
             {
                 'title': 'Log in',
                 'year' : datetime.now().year,
             }
         ),
         name='login'),
    path('logout/', LogoutView.as_view(next_page='/'), name='logout'),
    path('admin/', admin.site.urls),
    path('signup/', views.signup, name='signup'),
    path('userinfo/', views.user_information, name='userinfo'),
    path('profile/', views.profile, name='profile'),
    path('clientlist/', views.clientlist, name='clientlist'),
    #path('addclients/', views.add_clients, name='addclients'),
    #path('removeclients/', views.remove_clients, name='removeclients'),
    path('clientsprofile/<int:client_id>/', views.client_profile, name='clientsprofile'),
    #path('clientsinformation/<int:client_id>/', views.client_information, name='clientsinformation'),
    #path('resourcedirectory/', views.resource_directory, name='resourcedirectory'),
    #path('directorylist/<int:pk>/', views.load_directory, name="directorylist"),
    #path('resourcelist/' , views.resourcelist, name= "resourcelist"),
    path('makeclientaccount/', views.make_client_account, name='makeclientaccount'),

    path('full_directory/', views.full_directory, name='fulldirectory'),
    path('sub_directory/<int:pk>/<int:option>', views.sub_directory, name='subdirectory'),

    path('org_directory/', views.org_directory, name='orgdirectory'),
    path('org_sub_directory/<int:pk>/', views.org_sub_directory, name='orgsubdirectory'),

    path('document_directory', views.document_directory, name='documentdirectory'),
    path('document_folder_directory/<int:pk>/<int:option>', views.document_directory_folder, name='document_folder_directory'),

    path('app/', include('app.urls')),
    path('reset_password/', PasswordResetView.as_view(template_name='app/reset_password.html'), name="reset_password"),
    path('reset_password_sent/', PasswordResetDoneView.as_view(template_name='app/reset_password_done.html'), name="password_reset_done"),
    path('reset/<uidb64>/<token>/', PasswordResetConfirmView.as_view(template_name='app/reset_password_confirm.html'), name="password_reset_confirm"), #encodes user ID in base 64, then uses the token to check if the password is valid, part of PasswordResetConfirmView documentation
    path('reset_password_complete/', PasswordResetCompleteView.as_view(template_name='app/reset_password_complete.html'), name="password_reset_complete"),
    path('upload/', views.BasicUploadView.as_view(), name='upload'),

    path('validateOrganization/', views.validate_org, name='validateOrganization'),
    path('validateAccount', views.validate_account, name='validateAccount'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)