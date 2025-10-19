import { useState, useEffect, useCallback } from 'react';
import { Home, FileText, CreditCard, MessageSquare, User, Building2, Calendar, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';
import './HostelDashboard.css';
import axios from "../../axios"
import DetailsPage from './DetailsPage';

export default function HostelDashboard() {
  const [rooms, setRooms] = useState([]);
  const [activeTab, setActiveTab] = useState('home');
  const [query, setQuery] = useState('');
  const [totalFee, setTotalFee] = useState(12000);




  const handleQuerySubmit = (e) => {
    e.preventDefault();
    alert('Query submitted successfully! We will respond soon.');
    setQuery('');
  };



  const Sidebar = () => {
    const [studentInfo, setStudentInfo] = useState({});
    const fetchData = async () => {
      // Fetch data from API
      const userstr = localStorage.getItem('user');
      if (!userstr) {
        alert('User not found. Please login again.');
        return;
      }
      const user = JSON.parse(userstr);
      const userId = user.userId || user.id || user._id;
      const res = await axios.get(`user/${userId}/data`);
      console.log("Student Data", res.data);
      // Handle response
      if (res.status === 200) {
        // Update state with user data
        setStudentInfo(res.data.user);
      }
    }

    useEffect(() => {
      fetchData();
    }, [])



    return (
      <div className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white h-screen fixed left-0 top-0 shadow-2xl">
        <div className="p-6 border-b border-blue-700">
          <div className="flex items-center space-x-3">
            <Building2 className="w-8 h-8" />
            <div>
              <h2 className="text-xl font-bold">{studentInfo.name}</h2>
              <p className="text-xs text-blue-200">Student Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="mt-6">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'details', icon: FileText, label: 'Fill All Details' },
            { id: 'payment', icon: CreditCard, label: 'Payment Details' },
            { id: 'query', icon: MessageSquare, label: 'Query Rise' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-6 py-4 transition-all duration-200 ${activeTab === item.id
                ? 'bg-blue-700 border-l-4 border-white'
                : 'hover:bg-blue-800'
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    )
  };

  const HomePage = () => {
    const [studentInfo, setStudentInfo] = useState({});
    const fetchData = async () => {
      // Fetch data from API
      const userstr = localStorage.getItem('user');
      if (!userstr) {
        alert('User not found. Please login again.');
        return;
      }
      const user = JSON.parse(userstr);
      const userId = user.userId || user.id || user._id;
      const res = await axios.get(`user/${userId}/data`);
      console.log("Student Data", res.data);
      // Handle response
      if (res.status === 200) {
        // Update state with user data
        setStudentInfo(res.data.user);
      }
    }

    useEffect(() => {
      fetchData();
    }, [])


    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back, {studentInfo.name}!</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
            <div className="flex items-center space-x-3 mb-4">
              <User className="w-8 h-8 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
            </div>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-semibold">Name:</span> {studentInfo.name}</p>
              <p><span className="font-semibold">Roll No:</span> {studentInfo.rollNo}</p>
              <p><span className="font-semibold">Email:</span> {studentInfo.email}</p>
              <p><span className="font-semibold">Phone:</span> {studentInfo.phone}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
            <div className="flex items-center space-x-3 mb-4">
              <DollarSign className="w-8 h-8 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-800">Payment Status</h2>
            </div>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-semibold">Total Fee:</span> ₹{studentInfo.totalFee}</p>
              <p><span className="font-semibold">Paid Amount:</span> ₹{studentInfo.paidAmount}</p>
              <p><span className="font-semibold">Remaining:</span> ₹{studentInfo.remainingAmount}</p>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(studentInfo.paidAmount / studentInfo.totalFee) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertCircle className="w-8 h-8 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setActiveTab('details')}
              className="bg-white hover:bg-blue-50 text-blue-700 font-semibold py-3 px-4 rounded-lg shadow transition-all duration-200"
            >
              Complete Your Profile
            </button>
            <button
              onClick={() => setActiveTab('payment')}
              className="bg-white hover:bg-green-50 text-green-700 font-semibold py-3 px-4 rounded-lg shadow transition-all duration-200"
            >
              Make Payment
            </button>
            <button
              onClick={() => setActiveTab('query')}
              className="bg-white hover:bg-purple-50 text-purple-700 font-semibold py-3 px-4 rounded-lg shadow transition-all duration-200"
            >
              Submit Query
            </button>
          </div>
        </div>
      </div>
    )
  };



  const PaymentPage = () => {

    const [totalFee, setTotalFee] = useState(12000);
    const [paymentData, setPaymentData] = useState({
      paidAmount: 0,
    });

    const handleSubmit = async () => {
      try {
        // Validate payment amount
        if (!paymentData.paidAmount || paymentData.paidAmount <= 0) {
          alert('Please enter a valid payment amount');
          return;
        }

        const userStr = localStorage.getItem('user');
        if (!userStr) {
          alert('User not found. Please login again.');
          return;
        }

        const user = JSON.parse(userStr);
        const userId = user.userId || user.id || user._id;

        if (!userId) {
          alert('User ID not found. Please login again.');
          return;
        }

        // Correct syntax: combine paymentData and totalFee into one object
        const paymentPayload = {
          userId: userId,
          paidAmount: Number(paymentData.paidAmount),
          totalFee: totalFee,
          // paymentDate: new Date().toISOString()
        };

        console.log('Submitting payment:', paymentPayload);

        const res = await axios.put(`user/${userId}/payment`, paymentPayload);

        console.log('Payment response:', res.data);
        alert('Payment submitted successfully!');

        // Optionally reset the form or update UI
        // setPaymentData({ paidAmount: 0 });

      } catch (err) {
        console.error("Payment submission error:", err);

        if (err.response) {
          const errorMsg = err.response.data?.message || err.response.data?.error || 'Payment failed';
          alert(`Error: ${errorMsg}`);
        } else if (err.request) {
          alert('Network error. Please check your connection.');
        } else {
          alert('Error submitting payment. Please try again.');
        }
      }
    };

    const remainingAmount = totalFee - paymentData.paidAmount;

    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Payment Details</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-left">Set Your Total Fee</h3>
            <div className="bg-blue-50 rounded-lg p-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">Total Fee Amount (₹)</label>
              <input
                type="number"
                value={totalFee}
                onChange={(e) => setTotalFee(Number(e.target.value))}
                className="w-full px-4 py-3 text-black border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
                placeholder="Enter total fee"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Fee Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Fee:</span>
                  <span className="font-bold text-gray-800">₹{totalFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Paid Amount:</span>
                  <span className="font-bold text-green-600">₹{paymentData.paidAmount}</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="text-gray-600 font-semibold">Remaining:</span>
                  <span className="font-bold text-red-600">₹{remainingAmount}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-semibold text-gray-800">
                    {totalFee > 0 ? ((paymentData.paidAmount / totalFee) * 100).toFixed(0) : 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                    style={{ width: `${totalFee > 0 ? (paymentData.paidAmount / totalFee) * 100 : 0}%` }}
                  >
                    <span className="text-xs text-white font-bold">
                      {totalFee > 0 ? ((paymentData.paidAmount / totalFee) * 100).toFixed(0) : 0}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Make Payment</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Amount to Pay</label>
                <input
                  type="number"
                  className="w-full px-4 text-black py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter amount"
                  max={remainingAmount}
                  value={paymentData.paidAmount}
                  onChange={(e) => setPaymentData({ ...paymentData, paidAmount: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Method</label>
                <select className="w-full px-4 text-black py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option>UPI</option>
                  <option>Credit/Debit Card</option>
                  <option>Net Banking</option>
                  <option>Cash</option>
                </select>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200">
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const QueryPage = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Submit Query</h1>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Query Subject</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter subject"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Query Type</label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option>Room Related</option>
            <option>Payment Related</option>
            <option>Maintenance Issue</option>
            <option>Food & Mess</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Describe Your Query</label>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-40"
            placeholder="Please describe your query in detail..."
          ></textarea>
        </div>

        <button
          onClick={handleQuerySubmit}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <MessageSquare className="w-5 h-5" />
          <span>Submit Query</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="ml-64 p-8">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'details' && <DetailsPage setActiveTab={setActiveTab} />}
        {activeTab === 'payment' && <PaymentPage />}
        {activeTab === 'query' && <QueryPage />}
      </div>
    </div>
  );
}