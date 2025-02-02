from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS 


# Load the trained Logistic Regression model
model = joblib.load("credit_approval_model.pkl")

app = Flask(__name__)

CORS(app) 

@app.route("/")
def home():
    return "Credit Approval Model API is running!"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json  # Get input data
        df = pd.DataFrame([data])  # Convert to DataFrame

        # Ensure correct feature order (same as training)
        feature_order = ["Car_Owner", "Propert_Owner", "Annual_income", "EDUCATION"]
        df = df[feature_order]

        # Make a prediction using Logistic Regression
        prediction = model.predict(df)

        # Return result
        return jsonify({"approval": "Approved" if prediction[0] == 1 else "Rejected"})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
