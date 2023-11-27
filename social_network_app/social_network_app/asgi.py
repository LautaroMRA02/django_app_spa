
import os
from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter,URLRouter
from django.urls import re_path
from website.consumers import SocialNetworkConsumer

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'social_network_app.settings')


application = get_asgi_application()


application = ProtocolTypeRouter(
    {
        # Django's ASGI application to handle traditional HTTP requests
        "http": get_asgi_application(),
        # WebSocket handler
        "websocket": AuthMiddlewareStack(
            URLRouter(
                [
                    re_path(r"^ws/social-network/$", SocialNetworkConsumer.as_asgi()),
                ]
            )
        ),
    }
)