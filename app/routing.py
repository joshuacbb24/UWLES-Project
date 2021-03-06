from django.urls import re_path, path

from channels.http import AsgiHandler
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

from app.consumers import ChatConsumer

#from app.consumers import CalConsumer

"""
# The channel routing defines what connections get handled by what consumers,
# selecting on either the connection type (ProtocolTypeRouter) or properties
# of the connection's scope (like URLRouter, which looks at scope["path"])
# For more, see http://channels.readthedocs.io/en/latest/topics/routing.html
application = ProtocolTypeRouter({
    # Channels will do this for you automatically. It's included here as an example.
    # "http": AsgiHandler,
    # Route all WebSocket requests to our custom chat handler.
    # We actually don't need the URLRouter here, but we've put it in for
    # illustration. Also note the inclusion of the AuthMiddlewareStack to
    # add users and sessions - see http://channels.readthedocs.io/en/latest/topics/authentication.html
    "websocket": AuthMiddlewareStack(
        URLRouter([
            # URLRouter just takes standard Django path() or url() entries.
            path("chat/stream/", ChatConsumer),
        ]),
    ),
})
"""

websocket_urlpatterns = [
    path("chat/stream/", ChatConsumer.as_asgi()),
    #path("ws/app/", consumers.ChatConsumer.as_asgi()),
    #re_path(r'ws/app/(?P<room_name>\w+)/$', ChatConsumer.as_asgi()),


    #path("cal/stream/", CalConsumer.as_asgi()),
]