"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

interface Sermon {
  id: string;
  title: string;
  preacher: string;
  date: string;
  drive_link: string;
  transcript: string | null;
}

export default function AdminSermonsPage() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  // Form State
  const [title, setTitle] = useState("");
  const [preacher, setPreacher] = useState("");
  const [date, setDate] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const [transcript, setTranscript] = useState("");

  const fetchSermons = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("sermons")
        .select("*")
        .order("date", { ascending: false });
      
      if (!error && data) {
        setSermons(data);
      } else if (error) {
        console.error("Supabase Error:", error);
      }
    } catch (err) {
      console.error("Fetch Failed:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSermons();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const { error: insertError } = await supabase
      .from("sermons")
      .insert([
        {
          title,
          preacher,
          date,
          drive_link: driveLink,
          transcript: transcript || null,
        }
      ]);

    if (insertError) {
      setError(insertError.message);
    } else {
      // Reset form and refetch
      setTitle("");
      setPreacher("");
      setDate("");
      setDriveLink("");
      setTranscript("");
      fetchSermons();
    }
    
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the sermon "${title}"?`)) return;
    
    const { error } = await supabase.from("sermons").delete().eq("id", id);
    if (!error) {
      fetchSermons();
    } else {
      alert("Failed to delete: " + error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-gray-100">Manage Sermons</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Upload and organize the audio sermon archive.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Column: Existing Sermons List */}
        <div className="w-full lg:w-7/12 order-2 lg:order-1">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-gray-800/50">
              <h2 className="text-lg font-bold text-fbcc-navy dark:text-blue-300 flex items-center gap-2">
                <svg className="w-5 h-5 text-fbcc-ocean dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                Sermon Archive
              </h2>
              <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold px-3 py-1 rounded-full">{sermons.length} Total</span>
            </div>
            
            {loading ? (
              <div className="p-12 text-center text-gray-400 animate-pulse">Loading archive...</div>
            ) : sermons.length === 0 ? (
              <div className="p-12 text-center text-gray-400 flex flex-col items-center">
                <svg className="w-12 h-12 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                <p>No sermons have been uploaded yet.</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100 dark:divide-gray-800 max-h-[600px] overflow-y-auto custom-scrollbar">
                {sermons.map(sermon => (
                  <li key={sermon.id} className="p-6 hover:bg-gray-50 dark:bg-gray-800/80 transition-colors group">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xs font-bold text-fbcc-earth dark:text-emerald-400 uppercase tracking-wider bg-green-50 px-2 py-1 rounded text-green-700">
                            {new Date(sermon.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">By {sermon.preacher}</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-fbcc-ocean dark:text-blue-400 dark:group-hover:text-blue-300 dark:hover:text-blue-300 dark:text-blue-300 transition-colors">{sermon.title}</h3>
                      </div>
                      
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <a href={sermon.drive_link} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none text-center px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:bg-gray-800 hover:text-fbcc-ocean dark:text-blue-400 dark:hover:text-blue-300 dark:text-blue-300 transition-colors">
                          Listen
                        </a>
                        <button onClick={() => handleDelete(sermon.id, sermon.title)} className="px-3 py-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" aria-label="Delete Sermon">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right Column: Add Sermon Form (Sticky) */}
        <div className="w-full lg:w-5/12 order-1 lg:order-2 lg:sticky lg:top-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-serif font-bold mb-6 text-gray-900 dark:text-gray-100">Upload New Sermon</h2>
            {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">{error}</div>}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide text-xs">Sermon Title</label>
                <input type="text" required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. The Power of Faith" className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:bg-white dark:bg-gray-900 focus:ring-2 focus:ring-fbcc-ocean/20 focus:border-fbcc-ocean transition-all outline-none" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide text-xs">Preacher</label>
                  <input type="text" required value={preacher} onChange={e => setPreacher(e.target.value)} placeholder="Pastor Joel" className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:bg-white dark:bg-gray-900 focus:ring-2 focus:ring-fbcc-ocean/20 focus:border-fbcc-ocean transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide text-xs">Date</label>
                  <input type="date" required value={date} onChange={e => setDate(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:bg-white dark:bg-gray-900 focus:ring-2 focus:ring-fbcc-ocean/20 focus:border-fbcc-ocean transition-all outline-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide text-xs">Google Drive Link</label>
                <input type="url" required value={driveLink} onChange={e => setDriveLink(e.target.value)} placeholder="https://drive.google.com/..." className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:bg-white dark:bg-gray-900 focus:ring-2 focus:ring-fbcc-ocean/20 focus:border-fbcc-ocean transition-all outline-none" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide text-xs">Description / Key Verse (Optional)</label>
                <textarea rows={3} value={transcript} onChange={e => setTranscript(e.target.value)} placeholder="A brief summary of the message..." className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:bg-white dark:bg-gray-900 focus:ring-2 focus:ring-fbcc-ocean/20 focus:border-fbcc-ocean transition-all outline-none resize-none"></textarea>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-fbcc-navy hover:bg-fbcc-ocean text-white font-bold py-3.5 px-6 rounded-xl transition-colors disabled:opacity-50 flex justify-center items-center gap-2 mt-2">
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                )}
                {isSubmitting ? "Uploading..." : "Publish Sermon"}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
