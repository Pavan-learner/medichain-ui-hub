
import React, { useState } from 'react';
import { Download, Filter, Calendar, RefreshCw } from 'lucide-react';
import { salesReports, SalesReport } from '../data/mockData';

const ReportsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>({
    startDate: '2023-05-01',
    endDate: '2023-05-07'
  });
  const [filteredReports, setFilteredReports] = useState<SalesReport[]>(salesReports);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Handle date range change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDateRange({
      ...dateRange,
      [name]: value
    });
  };
  
  // Handle applying date filter
  const handleFilterApply = () => {
    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const filtered = salesReports.filter(report => {
        const reportDate = new Date(report.date);
        const startDate = new Date(dateRange.startDate);
        const endDate = new Date(dateRange.endDate);
        
        return reportDate >= startDate && reportDate <= endDate;
      });
      
      setFilteredReports(filtered);
      setIsGenerating(false);
    }, 800);
  };
  
  // Calculate totals
  const totalSales = filteredReports.reduce((sum, report) => sum + report.totalSales, 0);
  const totalOrders = filteredReports.reduce((sum, report) => sum + report.totalOrders, 0);
  const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="animate-fade-in">
      <div className="bg-white rounded-xl shadow-card p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-lg font-bold mb-2 md:mb-0">Sales Reports</h2>
          
          <div className="flex flex-wrap gap-3">
            <button className="btn-secondary flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </button>
            <button className="btn-primary flex items-center">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </button>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 text-gray-500 mr-2" />
            <h3 className="font-medium">Filter by Date Range</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Start Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="date"
                  name="startDate"
                  className="input-field pl-10"
                  value={dateRange.startDate}
                  onChange={handleDateChange}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                End Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="date"
                  name="endDate"
                  className="input-field pl-10"
                  value={dateRange.endDate}
                  onChange={handleDateChange}
                />
              </div>
            </div>
            
            <div className="flex items-end">
              <button
                className="btn-primary w-full"
                onClick={handleFilterApply}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </div>
                ) : (
                  'Apply Filter'
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Total Sales</p>
            <h3 className="text-2xl font-bold text-primary">${totalSales.toFixed(2)}</h3>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Total Orders</p>
            <h3 className="text-2xl font-bold text-primary">{totalOrders}</h3>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Average Order Value</p>
            <h3 className="text-2xl font-bold text-primary">${averageOrderValue.toFixed(2)}</h3>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left font-medium text-gray-500">Date</th>
                <th className="py-3 px-4 text-left font-medium text-gray-500">Orders</th>
                <th className="py-3 px-4 text-left font-medium text-gray-500">Sales</th>
                <th className="py-3 px-4 text-left font-medium text-gray-500">Avg. Order Value</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => {
                  const avgOrderValue = report.totalOrders > 0 
                    ? report.totalSales / report.totalOrders 
                    : 0;
                  
                  return (
                    <tr key={report.id} className="border-t hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{formatDate(report.date)}</td>
                      <td className="py-3 px-4">{report.totalOrders}</td>
                      <td className="py-3 px-4">${report.totalSales.toFixed(2)}</td>
                      <td className="py-3 px-4">${avgOrderValue.toFixed(2)}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-500">
                    No reports found for the selected date range
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
