"use client"

import { useState } from "react"
import axios from "axios"

export default function HospitalRatingForm() {
  const [formData, setFormData] = useState({
    hospital_name: "",
    Location: "",
    Nearby_Amenities: "",
    Condition: "",
    Number_of_Beds: "",
    Number_of_Doctors: "",
    Size: "",
    year_built: "",
    Parking_Spaces: "",
  })

  const [predictedRating, setPredictedRating] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  console.log("Form data before sending:", formData);

  // One-hot encode categorical data manually here or use a library if possible
  const encodedFormData = encodeData(formData);  // Implement your own encoding function or use an encoder

  try {
    const response = await axios.post("http://127.0.0.1:6001/predict", encodedFormData);
    setPredictedRating(response.data.predicted_rating);
  } catch (error) {
    console.error("Error predicting hospital rating:", error);
    setError("Error predicting hospital rating. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        <div className="text-white space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-[#E08543]"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 3v2"></path>
              <path d="M16 3v2"></path>
              <path d="M21 12h-3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4Z"></path>
              <path d="M11 12h-3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4Z"></path>
              <path d="M16 21h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v4Z"></path>
              <path d="M6 21h-2a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1Z"></path>
            </svg>
            <h1 className="text-3xl font-bold">HospitalRater</h1>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-[#E08543]">Evaluate</span> Your Hospital's
            <span className="text-[#E08543]"> Excellence</span>
          </h2>

          <p className="text-xl text-gray-200">
            Our advanced algorithm analyzes key metrics to provide an accurate prediction of your hospital's rating.
            Make data-driven decisions to enhance patient care and facility management.
          </p>

          {predictedRating && (
            <div className="bg-white/10 backdrop-blur-md border border-[#E08543]/20 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <h3 className="text-white text-center text-xl font-semibold">Your Predicted Rating</h3>
              </div>
              <div className="p-6 flex flex-col items-center">
                <div className="flex items-center gap-2 text-4xl font-bold text-[#E08543]">
                  {predictedRating}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 fill-[#E08543] text-[#E08543]"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <p className="text-gray-200 mt-2 text-center">
                  Based on the information provided, this is the predicted rating for your hospital.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden">
          <div className="p-5 border-b border-white/10">
            <h3 className="text-white text-xl font-semibold">Hospital Assessment</h3>
            <p className="text-gray-200 text-sm mt-1">
              Fill in the details below to get your hospital's predicted rating
            </p>
          </div>
          <div className="p-5">
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md text-white">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="hospital_name" className="text-white text-sm font-medium block">
                    Hospital Name
                  </label>
                  <input
                    id="hospital_name"
                    name="hospital_name"
                    value={formData.hospital_name}
                    onChange={handleChange}
                    placeholder="Enter hospital name"
                    className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E08543] focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="Location" className="text-white text-sm font-medium block">
                    Location
                  </label>
                  <input
                    id="Location"
                    name="Location"
                    value={formData.Location}
                    onChange={handleChange}
                    placeholder="City, State"
                    className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E08543] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="Nearby_Amenities" className="text-white text-sm font-medium block">
                  Nearby Amenities
                </label>
                <input
                  id="Nearby_Amenities"
                  name="Nearby_Amenities"
                  value={formData.Nearby_Amenities}
                  onChange={handleChange}
                  placeholder="Pharmacy, Restaurant, Park, etc."
                  className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E08543] focus:border-transparent"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="Condition" className="text-white text-sm font-medium block">
                    Facility Condition
                  </label>
                  <select
                    id="Condition"
                    name="Condition"
                    value={formData.Condition}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#E08543] focus:border-transparent appearance-none"
                  >
                    <option value="" disabled className="bg-gray-800">
                      Select condition
                    </option>
                    <option value="Excellent" className="bg-gray-800">
                      New
                    </option>
                    <option value="Good" className="bg-gray-800">
                      Good
                    </option>
                    <option value="Fair" className="bg-gray-800">
                      Old
                    </option>
                    <option value="Poor" className="bg-gray-800">
                      Poor
                    </option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="year_built" className="text-white text-sm font-medium block">
                    Year Built
                  </label>
                  <input
                    id="year_built"
                    name="year_built"
                    type="number"
                    value={formData.year_built}
                    onChange={handleChange}
                    placeholder="e.g. 2005"
                    className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E08543] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="Number_of_Beds" className="text-white text-sm font-medium block">
                    Number of Beds
                  </label>
                  <input
                    id="Number_of_Beds"
                    name="Number_of_Beds"
                    type="number"
                    value={formData.Number_of_Beds}
                    onChange={handleChange}
                    placeholder="e.g. 250"
                    className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E08543] focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="Number_of_Doctors" className="text-white text-sm font-medium block">
                    Number of Doctors
                  </label>
                  <input
                    id="Number_of_Doctors"
                    name="Number_of_Doctors"
                    type="number"
                    value={formData.Number_of_Doctors}
                    onChange={handleChange}
                    placeholder="e.g. 75"
                    className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E08543] focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="Parking_Spaces" className="text-white text-sm font-medium block">
                    Parking Spaces
                  </label>
                  <input
                    id="Parking_Spaces"
                    name="Parking_Spaces"
                    type="number"
                    value={formData.Parking_Spaces}
                    onChange={handleChange}
                    placeholder="e.g. 300"
                    className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E08543] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="Size" className="text-white text-sm font-medium block">
                  Facility Size (sq ft)
                </label>
                <input
                  id="Size"
                  name="Size"
                  type="number"
                  value={formData.Size}
                  onChange={handleChange}
                  placeholder="e.g. 50000"
                  className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E08543] focus:border-transparent"
                />
              </div>
            </form>
          </div>
          <div className="p-5 border-t border-white/10">
            <button
              onClick={handleSubmit}
              className="w-full py-2.5 px-4 bg-[#E08543] hover:bg-[#E08543]/90 text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#E08543]/50"
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Predict Hospital Rating"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

