import { useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "RONALD RICHAR",
    email: "ronald.richards@gmail.com",
    mobile: "+971 354123678",
    avatar: "https://res.cloudinary.com/munkee/image/upload/v1689371378/instasize-website/learn/headshot-red-woman.webp",
  });

  const [editingField, setEditingField] = useState(null);
  const [tempValues, setTempValues] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });

  const handleEdit = (field) => {
    setEditingField(field);
    setTempValues(prev => ({ ...prev, [field]: user[field] }));
  };

  const handleUpdate = (field) => {
    setUser(prev => ({ ...prev, [field]: tempValues[field] }));
    setEditingField(null);
  };

  const handleCancel = (field) => {
    setTempValues(prev => ({ ...prev, [field]: user[field] }));
    setEditingField(null);
  };

  const handleInputChange = (field, value) => {
    setTempValues(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-blue-600 px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-white">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-white font-medium">Personal Information</h1>
        <button onClick={() => navigate(-1)} className="text-white">
          <X size={20} />
        </button>
      </div>

      {/* Profile Banner */}
      <div className="relative h-48 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative h-full flex flex-col items-center justify-center">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <h2 className="text-white font-medium mt-2">{user.name}</h2>
          <p className="text-white/90 text-sm">{user.email}</p>
        </div>
      </div>

      {/* Information Fields */}
      <div className="px-4 py-6 space-y-6">
        {/* Full Name */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <div className="relative">
            <input
              type="text"
              value={editingField === 'name' ? tempValues.name : user.name}
              onChange={(e) => editingField === 'name' && handleInputChange('name', e.target.value)}
              disabled={editingField !== 'name'}
              className={`w-full px-3 py-2 border rounded-lg ${
                editingField === 'name' 
                  ? 'border-blue-500 bg-white' 
                  : 'border-gray-300 bg-gray-50'
              }`}
            />
            <button
              onClick={() => handleEdit('name')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 text-sm font-medium"
            >
              EDIT
            </button>
          </div>
          {editingField === 'name' && (
            <div className="flex space-x-3">
              <button
                onClick={() => handleUpdate('name')}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium"
              >
                Update
              </button>
              <button
                onClick={() => handleCancel('name')}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <div className="relative">
            <input
              type="email"
              value={editingField === 'email' ? tempValues.email : user.email}
              onChange={(e) => editingField === 'email' && handleInputChange('email', e.target.value)}
              disabled={editingField !== 'email'}
              className={`w-full px-3 py-2 border rounded-lg ${
                editingField === 'email' 
                  ? 'border-blue-500 bg-white' 
                  : 'border-gray-300 bg-gray-50'
              }`}
            />
            <button
              onClick={() => handleEdit('email')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 text-sm font-medium"
            >
              EDIT
            </button>
          </div>
          {editingField === 'email' && (
            <div className="flex space-x-3">
              <button
                onClick={() => handleUpdate('email')}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-medium"
              >
                Update
              </button>
              <button
                onClick={() => handleCancel('email')}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Mobile Number */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Mobile Number</label>
          <div className="relative">
            <input
              type="tel"
              value={editingField === 'mobile' ? tempValues.mobile : user.mobile}
              onChange={(e) => editingField === 'mobile' && handleInputChange('mobile', e.target.value)}
              disabled={editingField !== 'mobile'}
              className={`w-full px-3 py-2 border rounded-lg ${
                editingField === 'mobile' 
                  ? 'border-blue-500 bg-white' 
                  : 'border-gray-300 bg-gray-50'
              }`}
            />
            <button
              onClick={() => handleEdit('mobile')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 text-sm font-medium"
            >
              EDIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile; 