
import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, X, Filter } from 'lucide-react';
import { medicines as initialMedicines, Medicine } from '../data/mockData';

const InventoryPage: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState<Medicine | null>(null);
  const [filterByNearExpiry, setFilterByNearExpiry] = useState(false);
  
  // Form fields
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    batchNo: '',
    quantity: 0,
    expiry: '',
    price: 0,
    category: ''
  });
  
  // Filter medicines by search term and expiry
  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       medicine.batchNo.toLowerCase().includes(searchTerm.toLowerCase());
    
    // If filter by near expiry is active, check if medicine expires in 30 days
    if (filterByNearExpiry) {
      const today = new Date();
      const expiryDate = new Date(medicine.expiry);
      const thirtyDaysLater = new Date();
      thirtyDaysLater.setDate(today.getDate() + 30);
      
      return matchesSearch && expiryDate <= thirtyDaysLater;
    }
    
    return matchesSearch;
  });
  
  // Handle opening the edit modal
  const handleEditClick = (medicine: Medicine) => {
    setCurrentMedicine(medicine);
    setFormData(medicine);
    setIsEditModalOpen(true);
  };
  
  // Handle opening the add modal
  const handleAddClick = () => {
    setFormData({
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      batchNo: '',
      quantity: 0,
      expiry: '',
      price: 0,
      category: ''
    });
    setIsAddModalOpen(true);
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'quantity' || name === 'price' ? parseFloat(value) : value
    });
  };
  
  // Handle adding a new medicine
  const handleAddMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    setMedicines([...medicines, formData]);
    setIsAddModalOpen(false);
  };
  
  // Handle updating an existing medicine
  const handleUpdateMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    setMedicines(medicines.map(medicine => 
      medicine.id === formData.id ? formData : medicine
    ));
    setIsEditModalOpen(false);
    setCurrentMedicine(null);
  };
  
  // Handle deleting a medicine
  const handleDeleteMedicine = (id: string) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      setMedicines(medicines.filter(medicine => medicine.id !== id));
    }
  };
  
  // Format expiry date
  const formatExpiryClass = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    
    if (expiry < today) {
      return 'text-red-500 font-medium';
    }
    
    const thirtyDaysLater = new Date();
    thirtyDaysLater.setDate(today.getDate() + 30);
    
    if (expiry <= thirtyDaysLater) {
      return 'text-amber-500 font-medium';
    }
    
    return 'text-green-500';
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search medicines..."
            className="input-field pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-4">
          <button
            className="btn-secondary flex items-center"
            onClick={() => setShowFilter(!showFilter)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          
          <button
            className="btn-primary flex items-center"
            onClick={handleAddClick}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Medicine
          </button>
        </div>
      </div>
      
      {/* Filter options */}
      {showFilter && (
        <div className="bg-white p-4 rounded-lg mb-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Filter Options</h3>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setShowFilter(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-primary rounded"
              checked={filterByNearExpiry}
              onChange={() => setFilterByNearExpiry(!filterByNearExpiry)}
            />
            <span className="ml-2">Show only near expiry items (next 30 days)</span>
          </label>
        </div>
      )}
      
      {/* Inventory Table */}
      <div className="table-container mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left font-medium text-gray-500">Name</th>
                <th className="py-3 px-4 text-left font-medium text-gray-500">Batch No.</th>
                <th className="py-3 px-4 text-left font-medium text-gray-500">Category</th>
                <th className="py-3 px-4 text-left font-medium text-gray-500">Quantity</th>
                <th className="py-3 px-4 text-left font-medium text-gray-500">Expiry Date</th>
                <th className="py-3 px-4 text-left font-medium text-gray-500">Price</th>
                <th className="py-3 px-4 text-left font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.length > 0 ? (
                filteredMedicines.map((medicine) => (
                  <tr key={medicine.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{medicine.name}</td>
                    <td className="py-3 px-4">{medicine.batchNo}</td>
                    <td className="py-3 px-4">{medicine.category}</td>
                    <td className="py-3 px-4">{medicine.quantity}</td>
                    <td className={`py-3 px-4 ${formatExpiryClass(medicine.expiry)}`}>
                      {medicine.expiry}
                    </td>
                    <td className="py-3 px-4">${medicine.price.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          className="p-1 text-blue-600 hover:text-blue-800"
                          onClick={() => handleEditClick(medicine)}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="p-1 text-red-600 hover:text-red-800"
                          onClick={() => handleDeleteMedicine(medicine.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-4 text-center text-gray-500">
                    No medicines found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Add Medicine Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Medicine</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsAddModalOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddMedicine}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Medicine Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="input-field"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Batch No.
                  </label>
                  <input
                    type="text"
                    name="batchNo"
                    className="input-field"
                    value={formData.batchNo}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    className="input-field"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    className="input-field"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    className="input-field"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Expiry Date
                </label>
                <input
                  type="date"
                  name="expiry"
                  className="input-field"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Add Medicine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Edit Medicine Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Medicine</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsEditModalOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleUpdateMedicine}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Medicine Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="input-field"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Batch No.
                  </label>
                  <input
                    type="text"
                    name="batchNo"
                    className="input-field"
                    value={formData.batchNo}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    className="input-field"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    className="input-field"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    className="input-field"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Expiry Date
                </label>
                <input
                  type="date"
                  name="expiry"
                  className="input-field"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Update Medicine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
