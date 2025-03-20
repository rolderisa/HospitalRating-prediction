import joblib  # Ensure joblib is imported
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

# Load the dataset
data = pd.read_csv("hospital_data.csv")  # Replace with your actual CSV file name

# Define features and target variable
features = [
    "Number_of_Beds", "Number_of_Doctors", "Size", "hospital_name",
    "year_built", "Location", "Nearby_Amenities", "Condition", "Parking_Spaces"
]
target = "Rating"

# Prepare the input (X) and target (y) variables
X = data[features]
y = data[target]

# Perform one-hot encoding for categorical variables
X = pd.get_dummies(X, columns=["hospital_name", "Location", "Nearby_Amenities", "Condition"], drop_first=True)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestRegressor(random_state=42)
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, "hospital_rating_model.pkl")

# Print success message
print("Model trained and saved successfully!")
