from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('todos/', include('todos.urls')),
    path('users/', include('users.urls')),
    path('dj-rest-auth/', include('dj_rest_auth.urls'))

]

"""_summary_
Changing the domain above to localhost will ensure that the e-mails that users will 
receive from us bear the localhost name and not the default example.com or any other. 
When you deploy to production, ensure that the display name is the name of the site and not the default example.com.
"""
"""_summary_
The password-reset endpoint is where the user makes the request to reset their password. 
dj-rest-auth calls unto password-reset-confirm endpoint to which sends an email to the email address of the user. 
The email message body contains the password-reset-confirm that has a unique key to verify only that email address.
When the user opens the password-reset-confirm URL in the email message, they will be redirected to a new page to supply a new password for their account.
"""
