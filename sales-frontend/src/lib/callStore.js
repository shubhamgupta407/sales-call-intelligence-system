import { useState, useEffect } from 'react';
import { api } from './api';

export const useCallStore = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCalls = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.calls.list();
      setCalls(data);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch calls:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch if authenticated
    if (localStorage.getItem('synthex_auth_token')) {
      fetchCalls();
    }
  }, []);

  const addCall = async (analysisResult, metadata = {}) => {
    try {
      const newCallData = {
        prospect: metadata.prospect || "Unknown Prospect",
        duration: metadata.duration || "00:00",
        status: "Analyzed",
        intent: analysisResult.customer_intent || analysisResult.intent || "Unknown",
        revenue: metadata.revenue || 0,
        ...analysisResult
      };
      
      const createdCall = await api.calls.create(newCallData);
      setCalls(prev => [createdCall, ...prev]);
      return createdCall;
    } catch (err) {
      console.error("Failed to save call to backend:", err);
      // Fallback to local state if backend fails (optional)
      const localFallback = { id: `TEMP-${Date.now()}`, ...analysisResult, ...metadata };
      setCalls(prev => [localFallback, ...prev]);
      return localFallback;
    }
  };

  const getMetrics = () => {
    const totalRevenue = calls.reduce((acc, call) => acc + (call.revenue || 0), 0);
    const highIntentCount = calls.filter(c => c.intent?.toLowerCase() === 'high').length;
    const intentRate = calls.length ? (highIntentCount / calls.length) * 100 : 0;
    
    return {
      totalRevenue,
      totalCalls: calls.length,
      intentRate: intentRate.toFixed(1),
      objections: 14, // Trend-based placeholder
    };
  };

  const clearStore = () => {
    setCalls([]);
  };

  const exportToCSV = () => {
    const headers = ["ID", "Prospect", "Date", "Duration", "Intent", "Revenue", "Summary"];
    const rows = calls.map(c => [
      c.id, 
      c.prospect, 
      new Date(c.date).toLocaleDateString(), 
      c.duration, 
      c.intent, 
      c.revenue, 
      `"${c.summary?.replace(/"/g, '""')}"`
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `synthex_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return { calls, loading, error, addCall, fetchCalls, getMetrics, clearStore, exportToCSV };
};
