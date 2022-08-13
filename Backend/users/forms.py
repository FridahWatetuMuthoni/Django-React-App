from allauth.account.adapter import get_adapter
from allauth.account.forms import ResetPasswordForm
from allauth.account.utils import user_pk_to_url_str
from django.utils import translation


class CustomResetPasswordForm(ResetPasswordForm):
    def save(self, request, **kwargs):
        email = self.cleaned_data['email']
        token_generator = kwargs.get('token_generator')
        template = kwargs.get("email_template")
        extra = kwargs.get("extra_email_context", {})

        for user in self.users:
            uid = user_pk_to_url_str(user)
            token = token_generator.make_token(user)
            reset_url = f"http://127.0.0.1:3000/users/password-reset-confirm/{uid}/{token}/"
            context = {"user": user, "request": request,
                       "email": email, "reset_url": reset_url}
            context.update(extra)
            get_adapter(request).send_mail(
                "account/email/password_reset_key", email, context)
        return email
