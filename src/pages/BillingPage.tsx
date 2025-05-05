
import React, { useState, useEffect } from 'react';
import { Search, Plus, X, ShoppingCart, Trash2, Download, Printer } from 'lucide-react';
import { medicines, customers, Medicine, Customer, CartItem } from '../data/mockData';
import { toast } from 'sonner';

const BillingPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [medicineSearchTerm, setMedicineSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showMedicineSearch, setShowMedicineSearch] = useState(false);
  const [discount, setDiscount] = useState<{ type: 'amount' | 'percentage', value: number }>({
    type: 'amount',
    value: 0
  });
  
  // New customer form state
  const [newCustomer, setNewCustomer] = useState<Omit<Customer, 'id'>>({
    name: '',
    phone: '',
    email: '',
    address: ''
  });
  
  // Calculate cart totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.cartQuantity), 0);
  
  // Calculate discount amount
  const discountAmount = discount.type === 'amount' 
    ? discount.value 
    : (subtotal * discount.value) / 100;
  
  // Calculate grand total
  const grandTotal = subtotal - discountAmount;
  
  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );
  
  // Filter medicines based on search term
  const filteredMedicines = medicines.filter(medicine => 
    medicine.name.toLowerCase().includes(medicineSearchTerm.toLowerCase()) ||
    medicine.batchNo.toLowerCase().includes(medicineSearchTerm.toLowerCase())
  );
  
  // Handle customer selection
  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setSearchTerm('');
  };
  
  // Handle adding medicine to cart
  const handleAddToCart = (medicine: Medicine) => {
    // Check if medicine is already in cart
    const existingItem = cart.find(item => item.id === medicine.id);
    
    if (existingItem) {
      // Update quantity if already in cart
      setCart(cart.map(item => 
        item.id === medicine.id 
          ? { ...item, cartQuantity: item.cartQuantity + 1 } 
          : item
      ));
    } else {
      // Add new item to cart
      setCart([...cart, { ...medicine, cartQuantity: 1 }]);
    }
    
    setMedicineSearchTerm('');
    setShowMedicineSearch(false);
    toast.success(`Added ${medicine.name} to cart`);
  };
  
  // Handle removing item from cart
  const handleRemoveFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
  };
  
  // Handle quantity change in cart
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    // Find medicine to check stock
    const medicine = medicines.find(med => med.id === itemId);
    
    if (medicine && newQuantity > medicine.quantity) {
      toast.error(`Only ${medicine.quantity} items available in stock`);
      return;
    }
    
    if (newQuantity <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === itemId 
        ? { ...item, cartQuantity: newQuantity } 
        : item
    ));
  };
  
  // Handle creating a new customer
  const handleCreateCustomer = () => {
    const id = Math.random().toString(36).substr(2, 9);
    const customer = { id, ...newCustomer };
    
    // In a real app, this would be added to the database
    // For this demo, we'll just select it
    setSelectedCustomer(customer);
    setShowCustomerForm(false);
    
    // Reset form
    setNewCustomer({
      name: '',
      phone: '',
      email: '',
      address: ''
    });
    
    toast.success('Customer added successfully');
  };
  
  // Handle discount input change
  const handleDiscountChange = (value: string, type: 'amount' | 'percentage') => {
    const numericValue = parseFloat(value) || 0;
    
    // Validate max percentage (100%)
    if (type === 'percentage' && numericValue > 100) {
      toast.error('Discount percentage cannot exceed 100%');
      return;
    }
    
    // Validate max amount (subtotal)
    if (type === 'amount' && numericValue > subtotal) {
      toast.error('Discount amount cannot exceed subtotal');
      return;
    }
    
    setDiscount({ type, value: numericValue });
  };
  
  // Handle generating bill
  const handleGenerateBill = () => {
    // In a real app, this would save the bill to a database and reset the cart
    toast.success('Bill generated successfully');
    
    // Reset cart and selections
    setCart([]);
    setSelectedCustomer(null);
    setDiscount({ type: 'amount', value: 0 });
  };
  
  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowMedicineSearch(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Customer selection and medicine search */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-card p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">Customer Information</h2>
            
            {selectedCustomer ? (
              <div className="border rounded-lg p-4 flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{selectedCustomer.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{selectedCustomer.phone}</p>
                  {selectedCustomer.email && (
                    <p className="text-sm text-gray-500">{selectedCustomer.email}</p>
                  )}
                  {selectedCustomer.address && (
                    <p className="text-sm text-gray-500">{selectedCustomer.address}</p>
                  )}
                </div>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => setSelectedCustomer(null)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <>
                {showCustomerForm ? (
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">New Customer</h3>
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        onClick={() => setShowCustomerForm(false)}
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          className="input-field"
                          value={newCustomer.name}
                          onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Phone
                        </label>
                        <input
                          type="text"
                          className="input-field"
                          value={newCustomer.phone}
                          onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          className="input-field"
                          value={newCustomer.email}
                          onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Address
                        </label>
                        <input
                          type="text"
                          className="input-field"
                          value={newCustomer.address}
                          onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        className="btn-primary"
                        onClick={handleCreateCustomer}
                        disabled={!newCustomer.name || !newCustomer.phone}
                      >
                        Add Customer
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search customers by name or phone..."
                        className="input-field pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    {searchTerm && filteredCustomers.length > 0 && (
                      <div className="border rounded-lg overflow-hidden">
                        <ul className="max-h-48 overflow-y-auto">
                          {filteredCustomers.map((customer) => (
                            <li
                              key={customer.id}
                              className="border-b last:border-b-0 p-3 cursor-pointer hover:bg-gray-50"
                              onClick={() => handleSelectCustomer(customer)}
                            >
                              <p className="font-medium">{customer.name}</p>
                              <p className="text-sm text-gray-500">{customer.phone}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <button
                      className="btn-primary flex items-center justify-center"
                      onClick={() => setShowCustomerForm(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Register New Customer
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
          
          <div className="bg-white rounded-xl shadow-card p-6">
            <h2 className="text-lg font-bold mb-4">Add Medicines</h2>
            
            <div className="mb-6 relative" onClick={(e) => e.stopPropagation()}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search medicines by name or batch..."
                  className="input-field pl-10"
                  value={medicineSearchTerm}
                  onChange={(e) => {
                    setMedicineSearchTerm(e.target.value);
                    setShowMedicineSearch(true);
                  }}
                  onClick={() => setShowMedicineSearch(true)}
                />
              </div>
              
              {showMedicineSearch && medicineSearchTerm && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg">
                  <ul className="max-h-60 overflow-y-auto">
                    {filteredMedicines.length > 0 ? (
                      filteredMedicines.map((medicine) => (
                        <li
                          key={medicine.id}
                          className="border-b last:border-b-0 p-3 cursor-pointer hover:bg-gray-50"
                          onClick={() => handleAddToCart(medicine)}
                        >
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">{medicine.name}</p>
                              <p className="text-xs text-gray-500">Batch: {medicine.batchNo}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${medicine.price.toFixed(2)}</p>
                              <p className="text-xs text-gray-500">Stock: {medicine.quantity}</p>
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="p-3 text-center text-gray-500">No medicines found</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="border rounded-lg">
              <div className="p-3 bg-gray-50 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <ShoppingCart className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-medium">Shopping Cart</h3>
                </div>
                <p className="text-sm">{cart.length} items</p>
              </div>
              
              {cart.length > 0 ? (
                <div>
                  <ul className="max-h-80 overflow-y-auto">
                    {cart.map((item) => (
                      <li key={item.id} className="p-3 border-b last:border-b-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-gray-500">Batch: {item.batchNo}</p>
                          </div>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center">
                            <button
                              className="px-2 py-1 border rounded-l-md"
                              onClick={() => handleQuantityChange(item.id, item.cartQuantity - 1)}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              max={item.quantity}
                              className="w-12 px-2 py-1 border-t border-b text-center"
                              value={item.cartQuantity}
                              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                            />
                            <button
                              className="px-2 py-1 border rounded-r-md"
                              onClick={() => handleQuantityChange(item.id, item.cartQuantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          <p className="font-medium">${(item.price * item.cartQuantity).toFixed(2)}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  <p>Your cart is empty</p>
                  <p className="text-sm mt-1">Search and add medicines to your cart</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Right column - Bill summary */}
        <div>
          <div className="bg-white rounded-xl shadow-card p-6 sticky top-6">
            <h2 className="text-lg font-bold mb-4">Bill Summary</h2>
            
            {cart.length > 0 ? (
              <>
                <div className="border-b pb-4 mb-4">
                  <h3 className="font-medium mb-2">Items</h3>
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-1 text-sm">
                      <div>
                        <p>{item.name} x {item.cartQuantity}</p>
                      </div>
                      <p>${(item.price * item.cartQuantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                
                <div className="border-b pb-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Discount</h3>
                    <div className="flex space-x-2">
                      <button
                        className={`px-2 py-1 text-xs rounded-md ${
                          discount.type === 'amount' ? 'bg-primary text-white' : 'bg-gray-100'
                        }`}
                        onClick={() => setDiscount({ ...discount, type: 'amount' })}
                      >
                        Amount
                      </button>
                      <button
                        className={`px-2 py-1 text-xs rounded-md ${
                          discount.type === 'percentage' ? 'bg-primary text-white' : 'bg-gray-100'
                        }`}
                        onClick={() => setDiscount({ ...discount, type: 'percentage' })}
                      >
                        Percentage
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {discount.type === 'percentage' && <span className="mr-2">%</span>}
                    {discount.type === 'amount' && <span className="mr-2">$</span>}
                    <input
                      type="number"
                      min="0"
                      step={discount.type === 'percentage' ? '1' : '0.01'}
                      max={discount.type === 'percentage' ? '100' : subtotal}
                      className="input-field"
                      value={discount.value}
                      onChange={(e) => handleDiscountChange(e.target.value, discount.type)}
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between py-2">
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between py-2 text-red-500">
                    <p>Discount</p>
                    <p>-${discountAmount.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between py-2 text-lg font-bold">
                    <p>Total</p>
                    <p>${grandTotal.toFixed(2)}</p>
                  </div>
                </div>
                
                <button
                  className="btn-primary w-full mb-3"
                  onClick={handleGenerateBill}
                  disabled={!selectedCustomer || cart.length === 0}
                >
                  Generate Bill
                </button>
                
                <div className="flex space-x-3">
                  <button className="btn-secondary flex-1 flex justify-center items-center">
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </button>
                  <button className="btn-secondary flex-1 flex justify-center items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Save as PDF
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <ShoppingCart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>Add items to cart to generate bill</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
