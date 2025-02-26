import requests
import json
import pandas as pd
import numpy as np
import sys

API_KEY = 'AIzaSyDsd8vDfzT7QWDQnjJGKnmj2v5NAlui8GU'

def get_multiple_routes(origin, destination, mode, api_key=API_KEY):
    url = "https://maps.googleapis.com/maps/api/directions/json"
    params = {
        "origin": origin,
        "destination": destination,
        "mode": mode,
        "alternatives": "true",  
        "key": api_key
    }
    
    response = requests.get(url, params=params)
    data = response.json()

    return data

def get_transit_data(origin, destination):
    data = get_multiple_routes(origin, destination, "transit")

    l_transit = {}
    if data["status"] == "OK":
        for i in range(len(data["routes"])):
            a = {}
            duration = data["routes"][i]["legs"][0]["duration"]["value"]
            distance = data["routes"][i]["legs"][0]["distance"]["value"]
            # print(data['routes'][i]['fare'])
            # cost = data["routes"][i]["fare"]["value"]
            changes = data["routes"][i]["legs"][0]["steps"]
            transit_distance = 0
            walk_distance = 0
            for each in changes:
                if each['travel_mode'] == 'TRANSIT':
                    transit_distance += each['distance']['value']
                if each['travel_mode'] == 'WALKING':
                    walk_distance += each['distance']['value']

            a['duration'] = duration
            # a['cost'] = cost
            a['transit_distance'] = transit_distance
            a['walk_distance'] = duration
            
            l_transit[i] = a
    else:
        print("No routes found")

    max_walk = sys.maxsize
    get_index = 0
    if l_transit:
        for key in l_transit:
            if l_transit[key]['walk_distance'] < max_walk:
                max_walk = l_transit[key]['walk_distance']
                get_index = key    
        l_transit = l_transit[get_index]

    return l_transit
