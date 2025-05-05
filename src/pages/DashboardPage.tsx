
import React from 'react';
import { 
  Package, 
  DollarSign, 
  AlertTriangle, 
  Layers, 
  TrendingUp
} from 'lucide-react';
import { medicines, topSellingMedicines } from '../data/mockData';

const DashboardPage: React.FC = () => {
  // Calculate relevant dashboard metrics
  const totalInventoryItems = medicines.length;
  const totalInventoryValue = medicines.reduce((total, medicine) => 
    total + (medicine.price * medicine.quantity), 0);
  
  // Get medicines that expire in the next 30 days
  const today = new Date();
  const thirtyDaysLater = new Date();
  thirtyDaysLater.setDate(today.getDate() + 30);
  
  const nearExpiryMedicines = medicines.filter(medicine => {
    const expiryDate = new Date(medicine.expiry);
    return expiryDate > today && expiryDate <= thirtyDaysLater;
  });
  
  // Mock today's revenue
  const todaysRevenue = 2450.75;
  
  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Inventory Items */}
        <div className="dashboard-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Inventory Items</p>
              <h3 className="text-2xl font-bold mt-2">{totalInventoryItems}</h3>
            </div>
            <div className="p-3 rounded-lg bg-primary-50 text-primary">
              <Package className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm flex items-center text-gray-600">
              Total Value: <span className="font-medium ml-1">${totalInventoryValue.toFixed(2)}</span>
            </p>
          </div>
        </div>
        
        {/* Today's Revenue */}
        <div className="dashboard-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Today's Revenue</p>
              <h3 className="text-2xl font-bold mt-2">${todaysRevenue.toFixed(2)}</h3>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm flex items-center text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>12% increase from yesterday</span>
            </p>
          </div>
        </div>
        
        {/* Near Expiry Alert */}
        <div className="dashboard-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Near Expiry Items</p>
              <h3 className="text-2xl font-bold mt-2">{nearExpiryMedicines.length}</h3>
            </div>
            <div className="p-3 rounded-lg bg-amber-50 text-amber-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-amber-600">
              Expiring in the next 30 days
            </p>
          </div>
        </div>
        
        {/* Total Categories */}
        <div className="dashboard-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Categories</p>
              <h3 className="text-2xl font-bold mt-2">
                {new Set(medicines.map(medicine => medicine.category)).size}
              </h3>
            </div>
            <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600">
              <Layers className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600">
              Most popular: Pain Relief
            </p>
          </div>
        </div>
      </div>
      
      {/* Top Selling Medicines */}
      <div className="dashboard-card mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Top Selling Medicines</h2>
          <span className="text-sm text-primary">Today</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-2 px-4 text-left font-medium text-gray-500">Item Name</th>
                <th className="py-2 px-4 text-left font-medium text-gray-500">Sales Count</th>
                <th className="py-2 px-4 text-left font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {topSellingMedicines.map((medicine) => (
                <tr key={medicine.id} className="border-t">
                  <td className="py-3 px-4">{medicine.name}</td>
                  <td className="py-3 px-4">{medicine.sales}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">In Stock</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Near Expiry Medicines */}
      <div className="dashboard-card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Near Expiry Medicines</h2>
          <span className="text-sm text-amber-600">Next 30 days</span>
        </div>
        {nearExpiryMedicines.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-2 px-4 text-left font-medium text-gray-500">Item Name</th>
                  <th className="py-2 px-4 text-left font-medium text-gray-500">Batch</th>
                  <th className="py-2 px-4 text-left font-medium text-gray-500">Expiry Date</th>
                  <th className="py-2 px-4 text-left font-medium text-gray-500">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {nearExpiryMedicines.map((medicine) => (
                  <tr key={medicine.id} className="border-t">
                    <td className="py-3 px-4">{medicine.name}</td>
                    <td className="py-3 px-4">{medicine.batchNo}</td>
                    <td className="py-3 px-4">
                      <span className="text-amber-600">{medicine.expiry}</span>
                    </td>
                    <td className="py-3 px-4">{medicine.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No medicines expiring in the next 30 days</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
