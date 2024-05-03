# views.py
import requests, json, os
from django.http import JsonResponse
from dotenv import load_dotenv, dotenv_values

# load .env file
load_dotenv()

# retrieve Places api
places_api = os.getenv("GOOGLE_PLACES_API")

def get_visitor_ip(request):
    response = requests.get('https://api.ipify.org')
    ip = response.text
    
    return ip

def nearby_pharmacies(request):
    if request.method == 'GET':
        try:
            # Retrieve user's IP address from request, or use the client's IP
            user_ip = get_visitor_ip(request)

            # Use IP address to get user's location
            location_response = requests.get(f'http://ip-api.com/json/{user_ip}')
            location_data = location_response.json()

            # Extract latitude and longitude from location data
            latitude = location_data.get('lat')
            longitude = location_data.get('lon')

            # Fetch nearby pharmacies using the retrieved location
            place_type = "pharmacy"
            
            response = requests.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', params={
                'location': f'{latitude},{longitude}',
                'radius': 1000,  # Radius in meters (adjust as needed)
                'type': {place_type},  # Type of place (e.g., pharmacy, hospital)
                'key': {places_api},
            })

            # Process the response and extract relevant information
            data = response.json()

            # Return the nearby pharmacies as JSON response
            return JsonResponse(data)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

def nearby_hospitals(request):
    if request.method == 'GET':
        try:
            # Retrieve user's IP address from request, or use the client's IP
            user_ip = get_visitor_ip(request)

            # Use IP address to get user's location
            location_response = requests.get(f'http://ip-api.com/json/{user_ip}')
            location_data = location_response.json()

            # Extract latitude and longitude from location data
            latitude = location_data.get('lat')
            longitude = location_data.get('lon')

            # Fetch nearby hospitals using the retrieved location
            place_type = "hospital"
            
            response = requests.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', params={
                'location': f'{latitude},{longitude}',
                'radius': 1000,  # Radius in meters (adjust as needed)
                'type': {place_type},  # Type of place (e.g., pharmacy, hospital)
                'key': {places_api},
            })

            # Process the response and extract relevant information
            data = response.json()

            # Return the nearby hospitals as JSON response
            return JsonResponse(data)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
