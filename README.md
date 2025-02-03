Credit Card Approval Prediction 🚀  

A machine learning-powered web application that predicts credit card approvals based on user financial and personal details. Built with Flask, React.js, and Scikit-learn, the project includes data preprocessing, model training, API deployment, and frontend integration for real-time predictions.  

---

🔹 Features  
- 📊 Trained multiple ML models (*Logistic Regression, KNN, SVM, Decision Tree, Random Forest*) using existing credit approval data.  
- 🏛️ Applied SMOTE & feature scaling to balance the dataset and reduce bias toward income-based approvals.  
- 🌐 Built & deployed a full-stack application with a Flask REST API and React.js frontend for real-time predictions.  

---

🛠️ Tech Stack  
🔹 Machine Learning & Data Processing  
- Scikit-learn → Trained and optimized ML models.  
- SMOTE (imbalanced-learn) → Balanced class distribution to prevent bias.  
- StandardScaler (Scikit-learn) → Scaled numerical features for better model performance.  

🔹 Backend API & Deployment  
- Flask → Developed a REST API for processing credit applications.  
- Joblib → Serialized and loaded the trained model for real-time predictions.  
- Render → Hosted the Flask backend for public access.  

🔹 Frontend & User Interaction  
- React.js → Built a dynamic UI for users to input data and receive predictions.  
- Axios → Sent HTTP requests to the Flask API.  
- Vercel → Deployed the frontend for live access.  

---

🚀 How to Run Locally  
🔹 1. Clone the Repository  
```bash
git clone https://github.com/yourusername/credit-card-approval.git
cd credit-card-approval
```

🔹 2. Set Up the Backend  
```bash
cd backend
pip install -r requirements.txt
python app.py
```

🔹 3. Set Up the Frontend  
```bash
cd frontend
npm install
npm start
```

---

📌 Future Improvements  
- Add explainability features using SHAP for model interpretation.  
- Improve accuracy by fine-tuning hyperparameters and exploring ensemble models.  
- Enhance UI/UX with more interactive visualizations.  

---

📝 Author  
👤 Fahada Alathel 
📧 fahdahalathel@gmail.com 
🔗 https://www.linkedin.com/in/fahada-alathel/

---

