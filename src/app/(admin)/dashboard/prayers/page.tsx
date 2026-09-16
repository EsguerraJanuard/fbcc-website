"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

interface Prayer {
  id: string;
  author_name: string;
  content: string;
  is_approved: boolean;
  created_at: string;
}

export default function PrayersModeratorPage() {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  
  const supabase = createClient();

  const fetchPrayers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("prayers")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (!error && data) {
        setPrayers(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPrayers();
  }, []);

  const handleToggleApproval = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("prayers")
      .update({ is_approved: !currentStatus })
      .eq("id", id);
      
    if (!error) {
      setPrayers(prayers.map(p => p.id === id ? { ...p, is_approved: !currentStatus } : p));
    } else {
      alert("Failed to update status.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this prayer request?")) return;
    
    const { error } = await supabase.from("prayers").delete().eq("id", id);
    if (!error) {
      setPrayers(prayers.filter(p => p.id !== id));
    } else {
      alert("Failed to delete prayer.");
    }
  };

  const startEditing = (prayer: Prayer) => {
    setEditingId(prayer.id);
    setEditContent(prayer.content);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditContent("");
  };

  const saveEdit = async (id: string) => {
    const { error } = await supabase
      .from("prayers")
      .update({ content: editContent })
      .eq("id", id);

    if (!error) {
      setPrayers(prayers.map(p => p.id === id ? { ...p, content: editContent } : p));
      setEditingId(null);
    } else {
      alert("Failed to save changes.");
    }
  };

  const pendingPrayers = prayers.filter(p => !p.is_approved);
  const approvedPrayers = prayers.filter(p => p.is_approved);

  const renderPrayerItem = (prayer: Prayer) => (
    <li key={prayer.id} className="p-6 hover:bg-gray-50/80 transition-colors group">
      {editingId === prayer.id ? (
        <div className="mb-4 space-y-3 animate-in fade-in duration-300">
          <textarea 
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-4 bg-white border border-fbcc-ocean rounded-xl focus:ring-4 focus:ring-fbcc-ocean/20 focus:border-fbcc-ocean transition-all outline-none resize-none"
            rows={4}
          />
          <div className="flex justify-end gap-2">
            <button onClick={cancelEditing} className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
            <button onClick={() => saveEdit(prayer.id)} className="px-5 py-2 bg-fbcc-ocean hover:bg-[#00557A] text-white text-sm font-bold rounded-lg transition-colors shadow-sm">Save Changes</button>
          </div>
        </div>
      ) : (
        <div className="mb-4 relative">
          <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 italic text-gray-700 text-[15px] leading-relaxed relative group-hover:border-gray-200 transition-colors">
            "{prayer.content}"
            <button 
              onClick={() => startEditing(prayer)}
              className="absolute -top-3 -right-3 bg-white border border-gray-200 hover:border-fbcc-ocean text-gray-400 hover:text-fbcc-ocean dark:hover:text-blue-300 dark:text-blue-300 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110"
              title="Edit Prayer Content"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </button>
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-3 mb-5">
        <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-sm">
          {prayer.author_name.charAt(0).toUpperCase()}
        </span>
        <div>
          <p className="text-sm font-bold text-gray-900">{prayer.author_name}</p>
          <p className="text-xs font-medium text-gray-500">{new Date(prayer.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button 
          onClick={() => handleToggleApproval(prayer.id, prayer.is_approved)} 
          className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            prayer.is_approved 
              ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-200' 
              : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
          }`}
        >
          {prayer.is_approved ? (
            <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg> Hide from Public</>
          ) : (
            <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Approve & Publish</>
          )}
        </button>
        <button onClick={() => handleDelete(prayer.id)} className="px-4 py-2.5 bg-white border border-gray-200 text-gray-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200 rounded-lg text-sm font-bold transition-all" aria-label="Delete">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>
    </li>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-gray-900">Prayer Wall Moderation</h1>
        <p className="text-gray-500 mt-2 max-w-2xl">
          Review, edit, and approve prayer requests submitted by the congregation before they appear on the public prayer wall.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Pending Column */}
        <div className="bg-white rounded-3xl shadow-sm border border-yellow-200 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400"></div>
          <div className="px-8 py-6 border-b border-yellow-100 bg-yellow-50/50 flex justify-between items-center">
            <h2 className="text-lg font-bold text-yellow-800 flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              Pending Approval
            </h2>
            <span className="bg-yellow-200 text-yellow-800 py-1 px-3 rounded-full text-xs font-bold">{pendingPrayers.length}</span>
          </div>
          
          {loading ? (
            <div className="p-12 text-center text-gray-400 animate-pulse">Loading requests...</div>
          ) : pendingPrayers.length === 0 ? (
            <div className="p-12 text-center text-gray-400 flex flex-col items-center">
              <svg className="w-12 h-12 mb-4 opacity-30 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" /></svg>
              <p>You're all caught up! No pending requests.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100 max-h-[700px] overflow-y-auto custom-scrollbar">
              {pendingPrayers.map(renderPrayerItem)}
            </ul>
          )}
        </div>

        {/* Approved Column */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-fbcc-navy"></div>
          <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
            <h2 className="text-lg font-bold text-fbcc-navy flex items-center gap-2">
              <svg className="w-5 h-5 text-fbcc-ocean dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Publicly Visible
            </h2>
            <span className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-xs font-bold">{approvedPrayers.length}</span>
          </div>
          
          {loading ? (
            <div className="p-12 text-center text-gray-400 animate-pulse">Loading requests...</div>
          ) : approvedPrayers.length === 0 ? (
            <div className="p-12 text-center text-gray-400 flex flex-col items-center">
              <p>No prayers have been approved yet.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100 max-h-[700px] overflow-y-auto custom-scrollbar">
              {approvedPrayers.map(renderPrayerItem)}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}
