from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np

app = Flask(__name__)

# Load the model and encoder
model = joblib.load('model.pkl')
encoder = joblib.load('encoder.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data from the request
        input_data = request.get_json()

        # Convert input data to a DataFrame
        input_df = pd.DataFrame([input_data])

        # Drop the 'ID' and 'Rating' columns as they should not be used for prediction
        input_df = input_df.drop(columns=['ID', 'Rating'], errors='ignore')

        # Apply one-hot encoding to categorical columns
        encoded_features = encoder.transform(input_df[['hospital_name', 'Location', 'Nearby_Amenities', 'Condition']])

        # Check if the result is a sparse matrix or dense
        if isinstance(encoded_features, np.ndarray):
            encoded_df = pd.DataFrame(encoded_features, columns=encoder.get_feature_names_out(['hospital_name', 'Location', 'Nearby_Amenities', 'Condition']))
        else:
            encoded_df = pd.DataFrame(encoded_features.toarray(), columns=encoder.get_feature_names_out(['hospital_name', 'Location', 'Nearby_Amenities', 'Condition']))

        # Remove the categorical columns from the original input data
        input_df = input_df.drop(columns=['hospital_name', 'Location', 'Nearby_Amenities', 'Condition'])

        # Concatenate the encoded features with the numerical columns
        input_df = pd.concat([encoded_df, input_df], axis=1)

        # Check if we are missing any columns from the training data
        missing_cols = set(model.feature_names_in_) - set(input_df.columns)
        if missing_cols:
            for col in missing_cols:
                input_df[col] = 0  # Add missing columns with value 0

        # Ensure the input features are in the same order as the model expects
        input_df = input_df[model.feature_names_in_]

        # Make the prediction
        prediction = model.predict(input_df)[0]

        return jsonify({"prediction": prediction})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True,port=6001)
