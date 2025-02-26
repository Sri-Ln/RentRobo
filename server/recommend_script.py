import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
import json

def scale(data, input):
    dataMin = np.min(data)
    dataMax = np.max(data)

    # Apply MinMax scaling to the single value
    scaledData = (data - dataMin) / (dataMax - dataMin)
    scaledInput = (input - dataMin) / (dataMax - dataMin)

    return scaledData, scaledInput

def recommend(data, address, location, rent, violent, overall, bed, bath, transitDistance, scaling_factors = [1, 1, 1]):
    rentFactor, distanceFactor, safetyFactor = scaling_factors
    rentScale = 2 / rentFactor
    distanceScale = 2 / distanceFactor

    # Calculate Rent/Distance Tradeoff
    dataRent = data['Rent']
    rooms = data['Bed'] + data['Bath'] * 0.5
    dataRent /= rooms
    rent /= (bed + bath * 0.5)

    rentTradeoff = ((dataRent - rent) / np.average(dataRent))
    rentTradeoff = np.exp(rentTradeoff * rentScale)

    data['rentTradeoff'] = (rentTradeoff)
    data['newRent'] = dataRent

    match location:
        case "Northeastern University":
            dataTransitDistance = data['Northeastern University_transit']
        case "Boston University":
            dataTransitDistance = data['Boston University_transit_distance']
        case "Boston College":
            dataTransitDistance = data['Boston College_transit_distance']


    distanceTradeoff = ((dataTransitDistance - transitDistance) / np.average(dataTransitDistance))
    distanceTradeoff = np.exp(distanceTradeoff * distanceScale)

    data['distanceTradeoff'] = distanceTradeoff
    dataTradeoff = rentTradeoff + distanceTradeoff


    # Calculate Base Tradeoff (Might be able to hard code as 2)
    tradeoff = np.exp((rent - rent) / np.average(dataRent)) + np.exp((transitDistance - transitDistance) / np.average(dataTransitDistance))

    # Scale Crime Data
    dataViolentCrime, violentScaled = scale(data['Violent CrimeRate'], violent)
    dataOverallCrime, overallScaled = scale(data['Overall CrimeRate'], overall)

    dataAggregatedCrime = 2 * dataViolentCrime + dataOverallCrime
    aggregatedCrime = 2 * violentScaled + overallScaled

    dataScaledCrime, scaledCrime = scale(dataAggregatedCrime, aggregatedCrime)
    dataScaledCrime *= 3

    data['Crime'] = dataScaledCrime

    # Create Feature Vectors
    scaledDataRent, scaledRent = scale(dataRent, rent)
    scaledDataTransit, scaledTransit = scale(dataTransitDistance, transitDistance)
    apartmentFeatures = list(zip(scaledDataTransit, scaledDataRent, dataTradeoff))
    


    # Original User Apartment Comparison
    input = np.array([scaledTransit, scaledRent, tradeoff])

    if safetyFactor == 1:
        apartmentFeatures = list(zip(scaledDataTransit, scaledDataRent, dataTradeoff, dataScaledCrime))
        input = np.array([scaledTransit, scaledRent, tradeoff, 0])

    elif safetyFactor == 2:
        # dataScaledCrime = [0 if val <= 1 else val for val in dataScaledCrime]
        apartmentFeatures = list(zip(scaledDataTransit, scaledDataRent, dataTradeoff, dataScaledCrime))
        input = np.array([scaledTransit, scaledRent, tradeoff, 1])

    apartmentVectors = np.array(apartmentFeatures)

    correlations = []

    # Loop through each vector in the array and compute the Pearson correlation
    for vector in apartmentVectors:
        diff = input - vector

        distance = np.linalg.norm(diff)
        correlation = 1 / (1 + distance)
        correlations.append(correlation)

    data['similarity'] = correlations
    data['dataTradeoff'] = dataTradeoff

    recommend = data.sort_values(by='similarity', ascending=False)
    recommend = recommend[recommend['Address'] != address]
    recommend = recommend[
        ((recommend['Bath'] == bath) | (recommend['Bath'] == bath + 1)) &
        ((recommend['Bed'] == bed) | (recommend['Bed'] == bed + 1))
    ]

    return recommend

if __name__ == "__main__":
    all_data = pd.read_csv('updated_crime_rates.csv')
    cleaned_data = all_data.dropna()
    cleaned_data = cleaned_data[cleaned_data['Northeastern University_driving'] <= 25000]

    example_result = recommend(
        cleaned_data, "Boston University", 2950, 0.2866, 1.86, 2.0, 1.0, 196.0
    )

    print(json.dumps(example_result.head(10).to_dict(orient="records"), indent=2))
