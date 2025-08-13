import React from "react";
import profileImage from "./profile.jpeg"; // Adjust the path if needed

const Profile: React.FC = () => {
  const user = {
    firstName: "Thaiseelan",
    lastName: "Chinnasamy",
    email: "thaiseelan@gmail.com",
    phone: "+91 1234567890",
    dob: "12-10-1990",
    role: "Admin",
    country: "India",
    city: "Erode, Sathyamangalam",
    pinCode: "638402",
    lastLogin: "2025-07-20 03:36 PM",
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-6 mb-8">
          <img
            src={profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
          />
          <div>
            <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
            <p className="text-blue-400">{user.role}</p>
            <p className="text-gray-400">{user.city}, {user.country}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">Personal Information</h3>
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Date of Birth:</strong> {user.dob}</p>
            <p><strong>Last Login:</strong> {user.lastLogin}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2 invisible">.</h3>
            <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
          <div className="col-span-2">
            <h3 className="text-xl font-semibold mt-4 mb-4 border-b border-gray-600 pb-2">Address</h3>
            <p><strong>Country:</strong> {user.country}</p>
            <p><strong>City:</strong> {user.city}</p>
            <p><strong>Postal Code:</strong> {user.pinCode}</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Work Done</h3>
          <textarea
            placeholder="Describe the work done recently..."
            className="w-full p-4 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
