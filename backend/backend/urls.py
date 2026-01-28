"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from core.views import StockView, StocksListView, StockDetailView, PredictionsListView, PredictionDetailView, NewsListView, NewsDetailView, MarketIndicesView, MarketStatusView, MarketMoversView
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    # Legacy endpoint
    path("api/stock/", StockView.as_view(), name="StockView"),
    
    # Stocks endpoints
    path('api/stocks/', StocksListView.as_view(), name='stocks-list'),
    path('api/stocks/<str:symbol>/', StockDetailView.as_view(), name='stock-detail'),
    path('api/stocks/<str:symbol>/history/', StockDetailView.as_view(), name='stock-history'),
    path('api/stocks/search/', StocksListView.as_view(), name='stocks-search'),
    
    # Predictions endpoints
    path('api/predictions/', PredictionsListView.as_view(), name='predictions-list'),
    path('api/predictions/<str:symbol>/', PredictionDetailView.as_view(), name='prediction-detail'),
    path('api/predictions/top/', PredictionsListView.as_view(), name='predictions-top'),
    
    # News endpoints
    path('api/news/', NewsListView.as_view(), name='news-list'),
    path('api/news/<str:id>/', NewsDetailView.as_view(), name='news-detail'),
    
    # Market endpoints
    path('api/market/indices/', MarketIndicesView.as_view(), name='market-indices'),
    path('api/market/status/', MarketStatusView.as_view(), name='market-status'),
    path('api/market/movers/', MarketMoversView.as_view(), name='market-movers'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

