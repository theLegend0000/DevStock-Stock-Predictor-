from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Stock
from .serializers import StockSerializer
from .main_model import analyze_stock


@method_decorator(csrf_exempt, name='dispatch')
class NotesView(APIView):
    """
    Placeholder view for notes API
    """
    def get(self, request):
        return Response({'message': 'Notes API endpoint'})


@method_decorator(csrf_exempt, name='dispatch')
class StockView(APIView):

    def get(self, request):
        # Get choice from query parameters (e.g., ?choice=1)
        try:
            choice = int(request.query_params.get('choice', 0))
        except (ValueError, TypeError):
            return Response({'error': 'Invalid choice parameter'}, status=400)
        
        # Map choice to stock CSV and company name
        stock_map = {
            1: ('TSLA.csv', 'Tesla'),
            2: ('Amazon.csv', 'Amazon'),
            3: ('GOOGL.csv', 'Google'),
            4: ('Facebook.xls', 'Facebook'),
            5: ('Netflix.xls', 'Netflix'),
            6: ('Apple.xls', 'Apple')
        }
        
        if choice not in stock_map:
            return Response({'error': 'Invalid choice. Please select 1-6'}, status=400)
        
        csv_file, company_name = stock_map[choice]
        
        try:
            result = analyze_stock(csv_filename=csv_file, company_name=company_name)
            if not result:
                return Response({'error': f'Could not analyze {company_name}'}, status=400)
            return Response(result)
        except Exception as e:
            return Response({'error': str(e)}, status=500)


@method_decorator(csrf_exempt, name='dispatch')
class StocksListView(APIView):
    """
    List all available stocks or search stocks
    GET /api/stocks/ - List all stocks
    GET /api/stocks/search?q=query - Search stocks
    """
    def get(self, request):
        query = request.query_params.get('q', None)
        
        # Stock symbols and data with complete information
        stocks = [
            {'symbol': 'TSLA', 'name': 'Tesla', 'price': 248.50, 'change': 5.2, 'changePercent': 2.1, 'volume': '89.4M', 'marketCap': '790.2B'},
            {'symbol': 'AMZN', 'name': 'Amazon', 'price': 180.2, 'change': 2.5, 'changePercent': 1.4, 'volume': '45.2M', 'marketCap': '1.86T'},
            {'symbol': 'GOOGL', 'name': 'Google', 'price': 145.8, 'change': 3.1, 'changePercent': 2.2, 'volume': '24.1M', 'marketCap': '1.78T'},
            {'symbol': 'META', 'name': 'Meta', 'price': 520.0, 'change': 12.5, 'changePercent': 2.4, 'volume': '15.3M', 'marketCap': '1.23T'},
            {'symbol': 'NFLX', 'name': 'Netflix', 'price': 450.3, 'change': -8.2, 'changePercent': -1.8, 'volume': '2.1M', 'marketCap': '188.5B'},
            {'symbol': 'AAPL', 'name': 'Apple', 'price': 185.92, 'change': 3.45, 'changePercent': 1.89, 'volume': '52.3M', 'marketCap': '2.89T'},
        ]
        
        if query:
            # Filter stocks by query
            filtered = [s for s in stocks if query.lower() in s['name'].lower() or query.upper() in s['symbol']]
            return Response(filtered)
        
        return Response(stocks)


@method_decorator(csrf_exempt, name='dispatch')
class StockDetailView(APIView):
    """
    Get stock details or history
    GET /api/stocks/{symbol}/ - Get stock details
    GET /api/stocks/{symbol}/history?range=1m - Get price history
    """
    def get(self, request, symbol=None):
        if not symbol:
            return Response({'error': 'Symbol parameter required'}, status=400)
        
        # Get range from query params
        range_param = request.query_params.get('range', '1m')
        
        # Check if it's a history request
        if 'history' in request.path:
            # Return mock historical data
            return Response({
                'symbol': symbol.upper(),
                'range': range_param,
                'data': [
                    {'date': '2024-01-01', 'price': 180.5, 'volume': 1000000},
                    {'date': '2024-01-02', 'price': 185.2, 'volume': 1100000},
                    {'date': '2024-01-03', 'price': 182.8, 'volume': 950000},
                ]
            })
        
        # Return stock details
        try:
            result = analyze_stock(csv_filename=f'{symbol.upper()}.csv', company_name=symbol.upper())
            return Response(result)
        except Exception as e:
            return Response({
                'symbol': symbol.upper(),
                'name': symbol,
                'price': 100.0,
                'change': 0.0,
                'error': str(e)
            })


@method_decorator(csrf_exempt, name='dispatch')
class PredictionsListView(APIView):
    """
    List predictions
    GET /api/predictions/ - List all predictions
    GET /api/predictions/top?limit=5 - Get top predictions
    """
    def get(self, request):
        limit = request.query_params.get('limit', 5)
        try:
            limit = int(limit)
        except ValueError:
            limit = 5
        
        predictions = [
            {'symbol': 'TSLA', 'name': 'Tesla', 'nextPrice': 265.3, 'confidence': 85},
            {'symbol': 'AMZN', 'name': 'Amazon', 'nextPrice': 185.1, 'confidence': 78},
            {'symbol': 'GOOGL', 'name': 'Google', 'nextPrice': 150.2, 'confidence': 82},
            {'symbol': 'META', 'name': 'Meta', 'nextPrice': 535.8, 'confidence': 75},
            {'symbol': 'NFLX', 'name': 'Netflix', 'nextPrice': 440.5, 'confidence': 80},
        ]
        
        return Response(predictions[:limit])


@method_decorator(csrf_exempt, name='dispatch')
class PredictionDetailView(APIView):
    """
    Get prediction for specific stock
    GET /api/predictions/{symbol}/ - Get prediction
    """
    def get(self, request, symbol=None):
        if not symbol:
            return Response({'error': 'Symbol parameter required'}, status=400)
        
        # Map of stocks with their predictions
        stock_prices = {
            'TSLA': 248.50,
            'AMZN': 180.2,
            'GOOGL': 145.8,
            'META': 520.0,
            'NFLX': 450.3,
            'AAPL': 185.92,
        }
        
        predictions = {
            'TSLA': {
                'symbol': 'TSLA',
                'name': 'Tesla',
                'currentPrice': 248.50,
                'nextPrice': 265.3,
                'confidence': 85,
                'trend': 'bullish'
            },
            'AMZN': {
                'symbol': 'AMZN',
                'name': 'Amazon',
                'currentPrice': 180.2,
                'nextPrice': 185.1,
                'confidence': 78,
                'trend': 'neutral'
            },
            'GOOGL': {
                'symbol': 'GOOGL',
                'name': 'Google',
                'currentPrice': 145.8,
                'nextPrice': 150.2,
                'confidence': 82,
                'trend': 'bullish'
            },
            'META': {
                'symbol': 'META',
                'name': 'Meta',
                'currentPrice': 520.0,
                'nextPrice': 535.8,
                'confidence': 75,
                'trend': 'neutral'
            },
            'NFLX': {
                'symbol': 'NFLX',
                'name': 'Netflix',
                'currentPrice': 450.3,
                'nextPrice': 440.5,
                'confidence': 80,
                'trend': 'bullish'
            },
            'AAPL': {
                'symbol': 'AAPL',
                'name': 'Apple',
                'currentPrice': 185.92,
                'nextPrice': 205.2,
                'confidence': 79,
                'trend': 'bullish'
            },
        }
        
        symbol_upper = symbol.upper()
        prediction = predictions.get(symbol_upper)
        if not prediction:
            return Response({'error': 'Prediction not found'}, status=404)
        return Response(prediction)


@method_decorator(csrf_exempt, name='dispatch')
class NewsListView(APIView):
    """
    Get news articles
    GET /api/news/ - List all news
    GET /api/news?category=technology - Filter by category
    """
    def get(self, request):
        category = request.query_params.get('category', None)
        
        news = [
            {'id': 1, 'title': 'Tesla Stock Surges on New Product Launch', 'category': 'stocks', 'date': '2024-01-15', 'source': 'Financial Times'},
            {'id': 2, 'title': 'Amazon Announces Q4 Earnings Beat', 'category': 'stocks', 'date': '2024-01-14', 'source': 'Reuters'},
            {'id': 3, 'title': 'Google Cloud Revenue Increases 26%', 'category': 'technology', 'date': '2024-01-13', 'source': 'TechCrunch'},
            {'id': 4, 'title': 'Market Volatility Expected in Spring', 'category': 'market', 'date': '2024-01-12', 'source': 'Bloomberg'},
        ]
        
        if category:
            news = [n for n in news if n['category'].lower() == category.lower()]
        
        return Response(news)


@method_decorator(csrf_exempt, name='dispatch')
class NewsDetailView(APIView):
    """
    Get specific news article
    GET /api/news/{id}/ - Get article by ID
    """
    def get(self, request, id=None):
        if not id:
            return Response({'error': 'ID parameter required'}, status=400)
        
        news_articles = {
            '1': {'id': 1, 'title': 'Tesla Stock Surges on New Product Launch', 'category': 'stocks', 'date': '2024-01-15', 'content': 'Full article content...'},
            '2': {'id': 2, 'title': 'Amazon Announces Q4 Earnings Beat', 'category': 'stocks', 'date': '2024-01-14', 'content': 'Full article content...'},
        }
        
        article = news_articles.get(id)
        if not article:
            return Response({'error': 'Article not found'}, status=404)
        return Response(article)


@method_decorator(csrf_exempt, name='dispatch')
class MarketIndicesView(APIView):
    """
    Get market indices
    GET /api/market/indices/ - Get indices
    """
    def get(self, request):
        return Response({
            'indices': [
                {'symbol': '^GSPC', 'name': 'S&P 500', 'value': 4890.5, 'change': 0.8},
                {'symbol': '^IXIC', 'name': 'NASDAQ', 'value': 15320.2, 'change': 1.2},
                {'symbol': '^DJI', 'name': 'Dow Jones', 'value': 38500.8, 'change': 0.5},
            ]
        })


@method_decorator(csrf_exempt, name='dispatch')
class MarketStatusView(APIView):
    """
    Get market status
    GET /api/market/status/ - Get status
    """
    def get(self, request):
        return Response({
            'status': 'open',
            'time': '2024-01-15 14:30:00',
            'timezone': 'EST'
        })


@method_decorator(csrf_exempt, name='dispatch')
class MarketMoversView(APIView):
    """
    Get top market movers
    GET /api/market/movers?type=gainers&limit=5 - Get gainers/losers
    """
    def get(self, request):
        mover_type = request.query_params.get('type', 'gainers')
        limit = request.query_params.get('limit', 5)
        
        try:
            limit = int(limit)
        except ValueError:
            limit = 5
        
        gainers = [
            {'symbol': 'TSLA', 'price': 250.5, 'change': 5.2, 'changePercent': 2.1},
            {'symbol': 'META', 'price': 520.0, 'change': 12.5, 'changePercent': 2.4},
            {'symbol': 'NFLX', 'price': 450.3, 'change': 8.2, 'changePercent': 1.8},
        ]
        
        losers = [
            {'symbol': 'AMZN', 'price': 180.2, 'change': -2.1, 'changePercent': -1.2},
            {'symbol': 'GOOGL', 'price': 145.8, 'change': -1.5, 'changePercent': -1.0},
        ]
        
        movers = gainers if mover_type.lower() == 'gainers' else losers
        return Response({'type': mover_type, 'movers': movers[:limit]})

    

















    
    # def post(self, request):

    #     #data lena hai
    #     data = request.data
    #     serializer = NoteSerializer(data = request.data)

    #     #validation karni hai

    #     if serializer.is_valid():       #agar sahi hai tou save karwado model mai aur return bhi karwado
            
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    #     print("ERRORS:", serializer.errors)
    #     # agar data sahi nahi hai
    #     return Response(status=status.HTTP_400_BAD_REQUEST)