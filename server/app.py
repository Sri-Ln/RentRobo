from flask import Flask, request, jsonify
import pandas as pd
from get_route_script import get_transit_data
from recommend_script import recommend  # Import the recommendation function
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"  # Allow all origins (Change this to restrict)
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

# Load data once to avoid reading it multiple times on each request
allData = pd.read_csv('updated_crime_rates.csv')
cleanedData = allData.dropna()
cleanedData = cleanedData[cleanedData['Northeastern University_driving'] <= 25000]

@app.route('/recommend', methods=['POST'])
def get_recommendations():
    """
    API endpoint to get house recommendations based on user input.
    """

    try:
        # Parse input JSON from frontend
        data = request.get_json()

        current_living_conditions = data.get("current_living_conditions", [])
        preference_of_future_house = data.get("preference_of_future_house", {})

        if not current_living_conditions or not preference_of_future_house:
            return jsonify({"error": "Invalid input. Please provide both current_living_conditions and preference_of_future_house"}), 400

        # Extract individual inputs
        address = current_living_conditions[0]
        location = current_living_conditions[1]
        rent = int(current_living_conditions[2])
        bed = int(current_living_conditions[3])
        bath = int(current_living_conditions[4])

        rent_pref = preference_of_future_house.get("Rent", 1)
        location_pref = preference_of_future_house.get("Location", 1)
        safety_pref = preference_of_future_house.get("Safety", 1)

        transit_data = get_transit_data(address, location)
        transit_distance = transit_data['transit_distance']

        # Dummy values for crime and transit (modify if needed)
        violent_crime = 0.3
        overall_crime = 2.0

        # Call recommendation function
        recommendations = recommend(
            cleanedData, address, location, rent, violent_crime, overall_crime, bed, bath, transit_distance,
            scaling_factors=[rent_pref, location_pref, safety_pref]
        )

        # Convert results to JSON
        recommendations_json = recommendations.head(10).to_dict(orient="records")

        # Return recommendations
        return jsonify({"recommendations": recommendations_json})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
