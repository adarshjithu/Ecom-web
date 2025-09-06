import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Home,
  Briefcase,
  Search,
  ChevronRight,
  Navigation,
  HousePlus,
  Edit,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddressForm from "./AddressForm";
import LocationForm from "./LocationForm";
import "./address.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddressRequest, fetchAddressesRequest } from "@/store/actions";

const AddressScreen = ({ dektop }) => {
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLocationFormOpen, setIsLocationFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const dispatch = useDispatch();
  const addresses = useSelector(state=>state.Address.addresses);
  const loading = useSelector(state=>state.Address.loading)

  useEffect(()=>{
    dispatch(fetchAddressesRequest())
  },[])

  const handleAddAddress = () => {
    setEditingAddress(null);
    setIsFormOpen(true);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setIsFormOpen(true);
  };

  const handleDeleteAddress = (address) => {
    setAddressToDelete(address);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (addressToDelete) {
      console.log(addressToDelete._id);
      dispatch(deleteAddressRequest(addressToDelete._id));
      setDeleteModalOpen(false);
      setAddressToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setAddressToDelete(null);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingAddress(null);
  };

  const handleCloseLocationForm = () => {
    setIsLocationFormOpen(false);
  };

  const handleUseCurrentLocation = () => {
    setIsLocationFormOpen(true);
  };

  const handleLocationSave = (locationData) => {
    setIsLocationFormOpen(false);
    // The global context will be updated by the LocationForm
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative">
      {dektop && (
        <div className="bg-white border-b border-[var(--border)] p-4">
          <div className="flex items-center space-x-4 max-w-md mx-auto">
            <button
              className="p-2 rounded-full border border-[var(--border] hover:bg-gray-50"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={20} className="text-[var(--icon)]" />
            </button>
            <h1 className="text-lg font-semibold text-[var(--primary)]">
              Enter Your Appartment Name
            </h1>
          </div>
        </div>
      )}

      {/* <div className="px-4 py-4">
        <div className="flex items-center w-full rounded-lg border border-[var(--border] px-3 py-4">
          <span className="text-gray-400 mr-2">
            <Search className="w-6 h-6 text-gray-800" />
          </span>
          <input
            type="text"
            placeholder="Whitefield, Bengaluru, Karnataka etc...."
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>
      </div> */}

      <div className="space-y-2">
        <div className="border-b px-4 py-2 border-b-[var(--border)]  ">
          <button 
            onClick={handleUseCurrentLocation}
            className="flex items-center w-full text-[#0D2C8D] py-1 text-base font-medium"
          >
            <Navigation className="w-5 h-5 mr-2 fill-[#0D2C8D] text-[#0D2C8D]" />
            Use my current location
            <ChevronRight className="w-5 h-5 ml-auto text-[#0D2C8D]" />
          </button>
        </div>
        <div className="border-b px-4 py-2 border-b-[var(--border)]">
          <button 
            onClick={handleAddAddress}
            className="flex items-center w-full text-[#0D2C8D] py-1 text-base font-medium"
          >
            <HousePlus className="w-5 h-5 mr-2 text-[#0D2C8D]" />
            Add new address
          </button>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="text-sm text-[var(--secondary)] mb-2">
          SAVED ADDRESSES
        </div>
        {addresses?.map((addr, idx) => (
          <div key={addr.id} className="mb-4 p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-base mr-2 font-bold text-[var(--primary)]">
                  {addr?.saveAs}
                </span>
                {addr.isDefault && (
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded ml-1">
                    Currently Selected
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEditAddress(addr)}
                  className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteAddress(addr)}
                  className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="text-sm text-[var(--primary)] mt-1">
              {addr?.apartment+', '+addr?.building+', '+addr?.landmark+', '+addr?.street +', '+ addr?.city+ ', '+addr?.emirate}
            </div>
          </div>
        ))}
      </div>

      {/* Address Form Sidebar */}
      <AddressForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        editData={editingAddress}
        isEditing={!!editingAddress}
      />

      {/* Location Form Sidebar */}
      <LocationForm
        isOpen={isLocationFormOpen}
        onClose={handleCloseLocationForm}
        onSave={handleLocationSave}
      />

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <>
          <div
            className="absolute inset-0  z-50 pointer-events-auto"
            style={{backgroundColor: "rgba(0,0,0,0.5)"}}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 p-3 sm:p-4 md:p-6 max-w-[280px] sm:max-w-sm md:max-w-md w-[85%] sm:w-[90%]">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-900 mb-2">
                Delete Address
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 md:mb-6">
                Are you sure you want to delete this address? This action cannot be undone.
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 md:space-x-3">
                <button
                  onClick={cancelDelete}
                  className="flex-1 px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddressScreen;
