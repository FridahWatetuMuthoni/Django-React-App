from django.urls import path, re_path
from dj_rest_auth.views import LoginView, LogoutView, PasswordChangeView, PasswordResetView, PasswordResetConfirmView
from dj_rest_auth.registration.views import VerifyEmailView, ConfirmEmailView

from .views import RegistrationView

urlpatterns = [
    # always have it at the beggining of the urlpatterns
    path('account-confirm-email/<str:key>/', ConfirmEmailView.as_view()),
    # login,logout,register urls
    path('register/', RegistrationView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    # email verification urls
    path('verify-email/',
         VerifyEmailView.as_view(), name='rest_verify_email'),
    path('account-confirm-email/',
         VerifyEmailView.as_view(), name='account_email_verification_sent'),
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$',
            VerifyEmailView.as_view(), name='account_confirm_email'),
    # password reset
    path('password-reset/', PasswordResetView.as_view(), name='password_reset'),
    # password change
    path('password/change/', PasswordChangeView.as_view(), name="change"),

    path('password-reset-confirm/<uidb64>/<token>/',
         PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]
"""_summary_
After a successful signup request, dj-rest-auth reaches out to the verify-email/ endpoint which processes the email verification and ensures that an email is sent via the account-confirm-email/ endpoint to the email address supplied by the user. 
A URL is sent along with the email message. 
The URL sent consists of the re_path to account-confirm-email/ and a unique key. 
The user can then verify the email address with the URL. re_path allows us to use regular expressions in our URL.
However, we want the verification process to be automatic once the user opens the URL received in the email.
So, we will specify an endpoint to receive the unique key of account-confirm-email then verify the user.
"""

"""_summary_
Adding Password Reset Feature
Now, we will allow our users to perform password reset when they forget their passwords.
We will be adding the password-reset, and the password-reset-confirm' endpoints in the global urls.py file of the project for them to be active.
"""
