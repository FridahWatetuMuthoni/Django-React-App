from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import GENDER
from dj_rest_auth.registration.serializers import RegisterSerializer
from .forms import CustomResetPasswordForm
from dj_rest_auth.serializers import PasswordResetSerializer


User = get_user_model()


class RegistrationSerializer(RegisterSerializer):
    gender = serializers.ChoiceField(choices=GENDER, required=False)
    phone_number = serializers.CharField(max_length=30, required=False)

    def custom_signup(self, request, user):
        user.gender = self.validated_data.get('gender', '')
        user.phone_number = self.validated_data.get('phone_number', '')
        user.save(update_fields=['gender', 'phone_number'])


class CustomPasswordResetSerializer(PasswordResetSerializer):

    @property
    def password_reset_form_class(self):
        return CustomResetPasswordForm

    def get_email_options(self):
        # Return a dictionary of email options
        email_template = "account/email/password_reset_key_message.txt"

        return {
            'domain_override': 'localhost:3000',
            "html_email_template_name": email_template,
            "from_email": "Operations Accounts <accounts@herrings.co.ke>",
        }
