
export interface Medicine {
  id: string;
  name: string;
  batchNo: string;
  quantity: number;
  expiry: string;
  price: number;
  category: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
}

export interface CartItem extends Medicine {
  cartQuantity: number;
}

export interface SalesReport {
  id: string;
  date: string;
  totalOrders: number;
  totalSales: number;
}

// Mock Medicines Data
export const medicines: Medicine[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    batchNo: 'B001',
    quantity: 150,
    expiry: '2025-12-31',
    price: 5.99,
    category: 'Pain Relief',
  },
  {
    id: '2',
    name: 'Amoxicillin 250mg',
    batchNo: 'B002',
    quantity: 80,
    expiry: '2025-11-15',
    price: 12.50,
    category: 'Antibiotics',
  },
  {
    id: '3',
    name: 'Ibuprofen 400mg',
    batchNo: 'B003',
    quantity: 200,
    expiry: '2025-10-20',
    price: 7.99,
    category: 'Pain Relief',
  },
  {
    id: '4',
    name: 'Cetirizine 10mg',
    batchNo: 'B004',
    quantity: 120,
    expiry: '2025-09-18',
    price: 8.50,
    category: 'Allergy',
  },
  {
    id: '5',
    name: 'Omeprazole 20mg',
    batchNo: 'B005',
    quantity: 90,
    expiry: '2023-08-10',
    price: 15.99,
    category: 'Digestive Health',
  },
  {
    id: '6',
    name: 'Aspirin 75mg',
    batchNo: 'B006',
    quantity: 250,
    expiry: '2024-06-22',
    price: 4.50,
    category: 'Pain Relief',
  },
  {
    id: '7',
    name: 'Metformin 500mg',
    batchNo: 'B007',
    quantity: 60,
    expiry: '2024-05-11',
    price: 18.75,
    category: 'Diabetes',
  },
  {
    id: '8',
    name: 'Atorvastatin 10mg',
    batchNo: 'B008',
    quantity: 45,
    expiry: '2023-07-14',
    price: 24.99,
    category: 'Cardiovascular',
  },
  {
    id: '9',
    name: 'Folic Acid 5mg',
    batchNo: 'B009',
    quantity: 180,
    expiry: '2025-04-30',
    price: 6.25,
    category: 'Vitamins',
  },
  {
    id: '10',
    name: 'Diazepam 5mg',
    batchNo: 'B010',
    quantity: 30,
    expiry: '2024-01-15',
    price: 22.50,
    category: 'Mental Health',
  },
];

// Mock Customers Data
export const customers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    phone: '555-123-4567',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown'
  },
  {
    id: '2',
    name: 'Jane Smith',
    phone: '555-987-6543',
    email: 'jane.smith@example.com',
    address: '456 Oak Ave, Somewhere'
  },
  {
    id: '3',
    name: 'Robert Johnson',
    phone: '555-567-8901',
    email: 'robert.j@example.com',
    address: '789 Pine Rd, Nowhere'
  },
  {
    id: '4',
    name: 'Lisa Anderson',
    phone: '555-234-5678',
    email: 'lisa.a@example.com',
    address: '101 Elm St, Everywhere'
  },
  {
    id: '5',
    name: 'Michael Brown',
    phone: '555-345-6789',
    email: 'michael.b@example.com',
    address: '202 Cedar Ln, Somewhere Else'
  }
];

// Mock Sales Reports
export const salesReports: SalesReport[] = [
  {
    id: '1',
    date: '2023-05-01',
    totalOrders: 32,
    totalSales: 1250.75
  },
  {
    id: '2',
    date: '2023-05-02',
    totalOrders: 28,
    totalSales: 980.50
  },
  {
    id: '3',
    date: '2023-05-03',
    totalOrders: 35,
    totalSales: 1450.25
  },
  {
    id: '4',
    date: '2023-05-04',
    totalOrders: 30,
    totalSales: 1120.00
  },
  {
    id: '5',
    date: '2023-05-05',
    totalOrders: 42,
    totalSales: 1680.75
  },
  {
    id: '6',
    date: '2023-05-06',
    totalOrders: 38,
    totalSales: 1520.50
  },
  {
    id: '7',
    date: '2023-05-07',
    totalOrders: 25,
    totalSales: 950.25
  }
];

// Today's top selling medicines
export const topSellingMedicines = [
  { id: '1', name: 'Paracetamol 500mg', sales: 45 },
  { id: '3', name: 'Ibuprofen 400mg', sales: 38 },
  { id: '4', name: 'Cetirizine 10mg', sales: 32 },
  { id: '9', name: 'Folic Acid 5mg', sales: 28 }
];
