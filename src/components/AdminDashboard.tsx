import React, { useState } from 'react';
import {
  X,
  Package,
  ShoppingCart,
  Users,
  Plus,
  Trash2,
  Edit2,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Truck,
  Tag,
  Search,
  SlidersHorizontal,
  DollarSign,
  ChevronDown
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, ProductCategory, ProductSize, OrderStatus, Coupon } from '../types/store';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    orders,
    updateOrderStatus,
    coupons,
    addCoupon,
    loyaltyPoints,
    showNotification
  } = useStore();

  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'loyalty'>('inventory');

  // Search & Filters in Admin
  const [inventorySearch, setInventorySearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');

  // Add Product Form Modal State
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<ProductCategory>('Suits & Blazers');
  const [newPrice, setNewPrice] = useState(2999);
  const [newMRP, setNewMRP] = useState(4999);
  const [newFabric, setNewFabric] = useState('100% Combed Cotton');
  const [newFit, setNewFit] = useState('Tailored Slim Fit');
  const [newStock, setNewStock] = useState(25);
  const [newDesc, setNewDesc] = useState('');
  const [newImage, setNewImage] = useState('/src/assets/images/product_italian_blazer_1793274808222.jpg');
  const [newSizes, setNewSizes] = useState<ProductSize[]>(['M', 'L', 'XL']);

  // New Coupon State
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDesc, setNewCouponDesc] = useState('');
  const [newCouponValue, setNewCouponValue] = useState(500);
  const [newCouponMin, setNewCouponMin] = useState(2500);

  if (!isAdminOpen) return null;

  // Analytics Metrics
  const totalRevenue = orders.reduce((sum, o) => o.orderStatus !== 'Cancelled' ? sum + o.totalAmount : sum, 0);
  const totalStockItems = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= 5).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;

  const filteredInventory = products.filter(p => {
    if (!inventorySearch.trim()) return true;
    const q = inventorySearch.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
  });

  const filteredOrders = orders.filter(o => {
    const matchStatus = orderStatusFilter === 'All' || o.orderStatus === orderStatusFilter;
    if (!matchStatus) return false;
    if (!orderSearch.trim()) return true;
    const q = orderSearch.toLowerCase();
    return (
      o.id.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.phone.includes(q) ||
      o.city.toLowerCase().includes(q)
    );
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addProduct({
      sku: `ZT-${Math.floor(100 + Math.random() * 900)}`,
      name: newTitle.trim(),
      category: newCategory,
      price: Number(newPrice),
      originalPrice: Number(newMRP),
      image: newImage,
      description: newDesc.trim() || 'Premium menswear crafted for Delhi boutique collection.',
      details: ['Hand-finished tailoring', 'Premium color fastness', 'Brahumpuri store warranty'],
      fabric: newFabric,
      fit: newFit,
      sizes: newSizes,
      stock: Number(newStock),
      rating: 5.0,
      reviewCount: 1,
      color: 'Classic Black'
    });

    setIsAddProductOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    addCoupon({
      code: newCouponCode.trim().toUpperCase(),
      description: newCouponDesc.trim() || 'Seasonal Delhi customer offer',
      discountType: 'fixed',
      discountValue: Number(newCouponValue),
      minOrder: Number(newCouponMin),
      active: true
    });

    setNewCouponCode('');
    setNewCouponDesc('');
  };

  const toggleSize = (size: ProductSize) => {
    if (newSizes.includes(size)) {
      if (newSizes.length > 1) {
        setNewSizes(newSizes.filter(s => s !== size));
      }
    } else {
      setNewSizes([...newSizes, size]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-zinc-950 border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden my-4 text-zinc-200">
        
        {/* Admin Header Bar */}
        <div className="p-4 sm:p-6 border-b border-zinc-800 bg-zinc-900/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif-luxury text-xl font-bold text-white tracking-wide">
                  Zara Traders Operations Portal
                </h2>
                <span className="text-[10px] font-mono uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded">
                  Admin
                </span>
              </div>
              <p className="text-xs text-zinc-400">Brahumpuri Main Road Showroom & Online Store Management</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Tab Buttons */}
            <div className="flex items-center p-1 bg-zinc-900 border border-zinc-800 rounded-lg text-xs">
              <button
                onClick={() => setActiveTab('inventory')}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  activeTab === 'inventory' ? 'bg-amber-400 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Inventory ({products.length})
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  activeTab === 'orders' ? 'bg-amber-400 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Orders ({orders.length})
              </button>
              <button
                onClick={() => setActiveTab('loyalty')}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  activeTab === 'loyalty' ? 'bg-amber-400 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Loyalty & Retention
              </button>
            </div>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer border border-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Executive Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-4 sm:px-6 bg-zinc-900/30 border-b border-zinc-800/80 text-xs">
          <div className="p-3 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <span className="text-zinc-400 block">Total Store Sales</span>
            <span className="text-lg font-mono font-bold text-amber-300 tabular-nums">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-zinc-500 block">Across online & Delhi orders</span>
          </div>

          <div className="p-3 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <span className="text-zinc-400 block">Active Orders</span>
            <span className="text-lg font-mono font-bold text-white tabular-nums">
              {orders.length} Orders
            </span>
            <span className="text-[11px] text-zinc-500 block">
              {orders.filter(o => o.orderStatus === 'New' || o.orderStatus === 'Processing').length} pending dispatch
            </span>
          </div>

          <div className="p-3 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <span className="text-zinc-400 block">Total Units In Stock</span>
            <span className="text-lg font-mono font-bold text-zinc-200 tabular-nums">
              {totalStockItems} Pieces
            </span>
            <span className="text-[11px] text-zinc-500 block">{products.length} catalog styles</span>
          </div>

          <div className="p-3 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <span className="text-zinc-400 block">Inventory Health</span>
            <span className="text-lg font-mono font-bold text-amber-400 tabular-nums">
              {lowStockCount} Low · {outOfStockCount} Sold Out
            </span>
            <span className="text-[11px] text-zinc-500 block">Real-time Brahumpuri alerts</span>
          </div>
        </div>

        {/* Tab 1: Inventory Management */}
        {activeTab === 'inventory' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            
            {/* Search & Add Action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Filter inventory by name, SKU, or category..."
                  value={inventorySearch}
                  onChange={e => setInventorySearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                onClick={() => setIsAddProductOpen(true)}
                className="px-4 py-2 bg-gold-gradient text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-500/10"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Design</span>
              </button>
            </div>

            {/* Inventory Table */}
            <div className="overflow-x-auto border border-zinc-800 rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-zinc-900 text-amber-400 font-mono uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Item & SKU</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price / MRP</th>
                    <th className="py-3 px-4">Available Stock</th>
                    <th className="py-3 px-4">Stock Control</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 bg-zinc-950">
                  {filteredInventory.map(prod => (
                    <tr key={prod.id} className="hover:bg-zinc-900/40 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-10 h-12 object-cover rounded bg-zinc-900 border border-zinc-800"
                          />
                          <div>
                            <span className="font-semibold text-zinc-100 block line-clamp-1">{prod.name}</span>
                            <span className="font-mono text-zinc-500 text-[11px]">{prod.sku}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-zinc-300 font-medium">
                        {prod.category}
                      </td>
                      <td className="py-3 px-4 font-mono">
                        <span className="text-amber-300 font-bold tabular-nums">₹{prod.price.toLocaleString('en-IN')}</span>
                        <span className="text-zinc-500 line-through ml-1.5 tabular-nums">₹{prod.originalPrice.toLocaleString('en-IN')}</span>
                      </td>
                      <td className="py-3 px-4 font-mono">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          prod.stock === 0
                            ? 'bg-rose-950/80 text-rose-300 border border-rose-800'
                            : prod.stock <= 5
                            ? 'bg-amber-950/80 text-amber-300 border border-amber-800'
                            : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
                        }`}>
                          {prod.stock === 0 ? 'Out of Stock' : `${prod.stock} units`}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 font-mono">
                          <button
                            onClick={() => updateStock(prod.id, prod.stock - 1)}
                            className="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center justify-center cursor-pointer"
                            title="Decrease stock"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min={0}
                            value={prod.stock}
                            onChange={e => updateStock(prod.id, parseInt(e.target.value, 10) || 0)}
                            className="w-12 text-center py-0.5 bg-zinc-900 border border-zinc-700 rounded text-xs text-white"
                          />
                          <button
                            onClick={() => updateStock(prod.id, prod.stock + 1)}
                            className="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center justify-center cursor-pointer"
                            title="Increase stock"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => deleteProduct(prod.id)}
                          className="p-1.5 rounded text-zinc-500 hover:text-rose-400 hover:bg-zinc-900 transition-colors cursor-pointer"
                          title="Remove product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* Tab 2: Orders & Shipment Tracking */}
        {activeTab === 'orders' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            
            {/* Order Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search by Order ID, customer name, phone, city..."
                  value={orderSearch}
                  onChange={e => setOrderSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400">Status:</span>
                <select
                  value={orderStatusFilter}
                  onChange={e => setOrderStatusFilter(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Processing">Processing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Orders Cards / Table */}
            <div className="space-y-3">
              {filteredOrders.length === 0 ? (
                <div className="p-8 text-center text-zinc-500 bg-zinc-900/30 rounded-xl border border-zinc-800 text-xs">
                  No orders match your filter criteria.
                </div>
              ) : (
                filteredOrders.map(order => (
                  <div
                    key={order.id}
                    className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-3 hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-3 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-amber-300 text-sm">{order.id}</span>
                        <span className="text-zinc-500">·</span>
                        <span className="text-zinc-300 font-semibold">{order.customerName}</span>
                        <span className="text-zinc-500 font-mono">{order.phone}</span>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-400 text-[11px]">Update Status:</span>
                        <select
                          value={order.orderStatus}
                          onChange={e => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className={`font-mono text-xs font-semibold px-2.5 py-1 rounded-md border cursor-pointer ${
                            order.orderStatus === 'Delivered'
                              ? 'bg-emerald-950 border-emerald-700 text-emerald-300'
                              : order.orderStatus === 'Dispatched'
                              ? 'bg-blue-950 border-blue-700 text-blue-300'
                              : order.orderStatus === 'Processing'
                              ? 'bg-amber-950 border-amber-700 text-amber-300'
                              : 'bg-zinc-800 border-zinc-700 text-zinc-200'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Processing">Processing</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    {/* Order Details Body */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-zinc-500 block mb-1">Destination Address:</span>
                        <p className="text-zinc-300">{order.address}</p>
                        <p className="text-zinc-400">{order.city}, {order.state} - {order.pincode}</p>
                        {order.landmark && <p className="text-zinc-500 text-[11px]">Landmark: {order.landmark}</p>}
                      </div>

                      <div>
                        <span className="text-zinc-500 block mb-1">Items Ordered ({order.items.length}):</span>
                        <div className="space-y-1">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="text-zinc-300 flex justify-between">
                              <span className="line-clamp-1">{it.product.name} (Size {it.size}) × {it.quantity}</span>
                              <span className="font-mono text-zinc-400 tabular-nums ml-2">
                                ₹{(it.product.price * it.quantity).toLocaleString('en-IN')}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-zinc-950/60 p-3 rounded-lg border border-zinc-800 space-y-1 font-mono">
                        <div className="flex justify-between text-zinc-400">
                          <span>Payment Method:</span>
                          <span className="uppercase text-zinc-200 font-bold">{order.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between text-zinc-400">
                          <span>Payment Status:</span>
                          <span className="text-amber-400 font-semibold">{order.paymentStatus}</span>
                        </div>
                        <div className="flex justify-between text-zinc-400">
                          <span>Dispatch Code:</span>
                          <span className="text-zinc-300">{order.trackingCode}</span>
                        </div>
                        <div className="flex justify-between text-white font-bold pt-1 border-t border-zinc-800 text-sm">
                          <span>Total Amount:</span>
                          <span className="text-amber-300">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* Tab 3: Customer Loyalty & Retention Engine */}
        {activeTab === 'loyalty' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-xs">
            
            {/* Retention Strategy Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-1.5">
                <span className="font-semibold text-amber-300">Zara Gold Privilege Club</span>
                <p className="text-zinc-400">
                  Customers earn 10 points per ₹100 spent. Points can be redeemed on subsequent purchases at the Brahumpuri showroom or online store.
                </p>
                <div className="pt-2 font-mono text-lg text-white font-bold">
                  {loyaltyPoints} Active Member Points
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-1.5">
                <span className="font-semibold text-amber-300">Repeat Patron Rate</span>
                <p className="text-zinc-400">
                  38.6% of verified buyers make a second purchase within 60 days, driven by wedding season sherwani fittings and festive kurta drops.
                </p>
                <div className="pt-2 font-mono text-lg text-emerald-400 font-bold">
                  +38.6% Retention
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-1.5">
                <span className="font-semibold text-amber-300">WhatsApp Re-Engagement</span>
                <p className="text-zinc-400">
                  Automated dispatch updates and size-matching support for Delhi customers via direct WhatsApp integration.
                </p>
                <div className="pt-2 font-mono text-lg text-blue-400 font-bold">
                  94.2% Open Rate
                </div>
              </div>
            </div>

            {/* Coupon Manager */}
            <div className="p-5 bg-zinc-900/40 rounded-xl border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif-luxury text-sm font-bold text-white">Active Promotional Coupons</h4>
                  <p className="text-[11px] text-zinc-400">Provide targeted codes to incentivize cart checkouts</p>
                </div>
              </div>

              {/* Existing Coupons List */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {coupons.map(c => (
                  <div key={c.code} className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-amber-300">{c.code}</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">Active</span>
                    </div>
                    <p className="text-zinc-400 text-[11px]">{c.description}</p>
                    <p className="text-zinc-500 font-mono text-[10px]">Min Order: ₹{c.minOrder.toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>

              {/* Create New Coupon Form */}
              <form onSubmit={handleCreateCoupon} className="pt-3 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                <input
                  type="text"
                  required
                  placeholder="Coupon Code (e.g. DELHI20)"
                  value={newCouponCode}
                  onChange={e => setNewCouponCode(e.target.value)}
                  className="px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 uppercase font-mono"
                />
                <input
                  type="text"
                  placeholder="Description (e.g. Flat ₹500 off)"
                  value={newCouponDesc}
                  onChange={e => setNewCouponDesc(e.target.value)}
                  className="px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100"
                />
                <input
                  type="number"
                  placeholder="Discount ₹ (e.g. 500)"
                  value={newCouponValue}
                  onChange={e => setNewCouponValue(Number(e.target.value))}
                  className="px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gold-gradient text-zinc-950 font-bold uppercase rounded-lg hover:brightness-110 cursor-pointer"
                >
                  Create Code
                </button>
              </form>
            </div>

          </div>
        )}

      </div>

      {/* Add Product Modal */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto text-zinc-200 text-xs">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-serif-luxury text-base font-bold text-white">Add New Menswear Piece to Catalog</h3>
              <button onClick={() => setIsAddProductOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3">
              <div>
                <label className="block text-zinc-300 font-medium mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Midnight Royal Tuxedo with Satin Shawl"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as ProductCategory)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-amber-400"
                  >
                    <option value="Suits & Blazers">Suits & Blazers</option>
                    <option value="Regal Ethnic">Regal Ethnic</option>
                    <option value="Linen & Shirts">Linen & Shirts</option>
                    <option value="Urban Streetwear">Urban Streetwear</option>
                    <option value="Trousers & Chinos">Trousers & Chinos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    min={1}
                    value={newStock}
                    onChange={e => setNewStock(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={e => setNewPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Original MRP (₹)</label>
                  <input
                    type="number"
                    required
                    value={newMRP}
                    onChange={e => setNewMRP(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Fabric Specification</label>
                  <input
                    type="text"
                    value={newFabric}
                    onChange={e => setNewFabric(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Fit Profile</label>
                  <input
                    type="text"
                    value={newFit}
                    onChange={e => setNewFit(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Available Sizes</label>
                <div className="flex gap-2">
                  {(['S', 'M', 'L', 'XL', 'XXL'] as ProductSize[]).map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSize(s)}
                      className={`px-3 py-1 rounded font-mono cursor-pointer ${
                        newSizes.includes(s)
                          ? 'bg-amber-400 text-zinc-950 font-bold'
                          : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Product Description</label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  placeholder="Tailored with exquisite finish for Zara Traders boutique..."
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100"
                />
              </div>

              <div className="pt-3 border-t border-zinc-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 bg-zinc-900 text-zinc-400 hover:text-white rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gold-gradient text-zinc-950 font-bold uppercase rounded-lg hover:brightness-110 cursor-pointer"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
