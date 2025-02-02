"use client"
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    Car_Owner: "",
    Propert_Owner: "",
    Annual_income: "",
    EDUCATION: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData);
      setResult(response.data.approval);
    } catch (error) {
      console.error(error);
      setResult("Error processing request");
    }
  };

  return (
    <div>
      <h2>Credit Card Approval Predictor</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Car Owner (0 = No, 1 = Yes):
          <input type="number" name="Car_Owner" value={formData.Car_Owner} onChange={handleChange} required />
        </label>
        <label>
          Property Owner (0 = No, 1 = Yes):
          <input type="number" name="Propert_Owner" value={formData.Propert_Owner} onChange={handleChange} required />
        </label>
        <label>
          Annual Income:
          <input type="number" name="Annual_income" value={formData.Annual_income} onChange={handleChange} required />
        </label>
        <label>
          Education Level (0 = None, 1 = High School, 2 = College):
          <input type="number" name="EDUCATION" value={formData.EDUCATION} onChange={handleChange} required />
        </label>
        <button type="submit">Check Approval</button>
      </form>
      {result && <h3>Result: {result}</h3>}
    </div>
  );
}

export default App;


