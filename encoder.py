from sklearn.preprocessing import OneHotEncoder
import joblib
import pandas as pd
from sklearn.ensemble import RandomForestRegressor

# Sample data for training (replace with your actual data)
data = pd.read_csv("hospital_data.csv")
categorical_features = ['hospital_name', 'Location', 'Nearby_Amenities', 'Condition']

# Initialize the encoder
encoder = OneHotEncoder(sparse_output=False)  # Change to sparse_output=False to get a dense matrix

# Fit the encoder on the categorical columns
encoded_features = encoder.fit_transform(data[categorical_features])

# Convert the encoded features into a DataFrame with the appropriate column names
encoded_df = pd.DataFrame(encoded_features, columns=encoder.get_feature_names_out(categorical_features))

# Concatenate the encoded features with numerical columns
numerical_features = data.drop(columns=categorical_features)
features = pd.concat([encoded_df, numerical_features], axis=1)

# Ensure all column names are strings
features.columns = features.columns.astype(str)

# Train the model (using a random forest as an example)
model = RandomForestRegressor(random_state=42)
model.fit(features, data['Number_of_Beds'])  # Replace with your target column

# Save the encoder and model to files
joblib.dump(encoder, 'encoder.pkl')
joblib.dump(model, 'model.pkl')

print("Model and encoder saved successfully!")
