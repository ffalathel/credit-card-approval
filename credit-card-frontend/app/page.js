"use client"
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    Car_Owner: "",
    Propert_Owner: "",
    Annual_income: "",
    EDUCATION_None: 0,
    EDUCATION_High_School: 0,
    EDUCATION_College: 0,
    EDUCATION_Higher_Education: 0,
    EDUCATION_Secondary_Special: 0,
    EDUCATION_Incomplete_Higher: 0,
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    // Update formData to set checkbox values to 1 (if checked) or 0 (if unchecked)
    setFormData({ ...formData, [name]: checked ? 1 : 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData);
      setResult(response.data.approval); // Assuming the response contains an 'approval' field
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
          <input
            type="number"
            name="Car_Owner"
            value={formData.Car_Owner}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Property Owner (0 = No, 1 = Yes):
          <input
            type="number"
            name="Propert_Owner"
            value={formData.Propert_Owner}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Annual Income:
          <input
            type="number"
            name="Annual_income"
            value={formData.Annual_income}
            onChange={handleChange}
            required
          />
        </label>
        <fieldset>
          <legend>Education Level:</legend>
          <label>
            <input
              type="checkbox"
              name="EDUCATION_None"
              checked={formData.EDUCATION_None === 1}
              onChange={handleChange}
            />
            None
          </label>
          <label>
            <input
              type="checkbox"
              name="EDUCATION_High_School"
              checked={formData.EDUCATION_High_School === 1}
              onChange={handleChange}
            />
            High School
          </label>
          <label>
            <input
              type="checkbox"
              name="EDUCATION_College"
              checked={formData.EDUCATION_College === 1}
              onChange={handleChange}
            />
            College
          </label>
          <label>
            <input
              type="checkbox"
              name="EDUCATION_Higher_Education"
              checked={formData.EDUCATION_Higher_Education === 1}
              onChange={handleChange}
            />
            Higher Education
          </label>
          <label>
            <input
              type="checkbox"
              name="EDUCATION_Secondary_Special"
              checked={formData.EDUCATION_Secondary_Special === 1}
              onChange={handleChange}
            />
            Secondary / Secondary Special
          </label>
          <label>
            <input
              type="checkbox"
              name="EDUCATION_Incomplete_Higher"
              checked={formData.EDUCATION_Incomplete_Higher === 1}
              onChange={handleChange}
            />
            Incomplete Higher
          </label>
        </fieldset>
        <button type="submit">Check Approval</button>
      </form>
      {result && <h3>Result: {result}</h3>}
    </div>
  );
}

export default App;
