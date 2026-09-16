"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  is_recurring: boolean;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });
      
      if (!error && data) {
        setEvents(data);
      } else if (error) {
        console.error("Supabase Error:", error);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const { error: insertError } = await supabase
      .from("events")
      .insert([
        {
          title,
          description: description || null,
          event_date: eventDate,
          is_recurring: isRecurring,
        }
      ]);

    if (!insertError) {
      setTitle("");
      setDescription("");
      setEventDate("");
      setIsRecurring(false);
      fetchEvents();
    } else {
      setError(insertError.message);
    }
    
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the event "${title}"?`)) return;
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (!error) {
      fetchEvents();
    } else {
      alert("Failed to delete event: " + error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-gray-100">Manage Events</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Schedule and organize upcoming church activities.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Column: Events List */}
        <div className="w-full lg:w-7/12 order-2 lg:order-1">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-gray-800/50">
              <h2 className="text-lg font-bold text-fbcc-ocean dark:text-blue-300 flex items-center gap-2">
                <svg className="w-5 h-5 text-fbcc-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Event Calendar
              </h2>
              <span className="bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1 rounded-full">{events.length} Upcoming</span>
            </div>
            
            {loading ? (
              <div className="p-12 text-center text-gray-400 animate-pulse">Loading events...</div>
            ) : events.length === 0 ? (
              <div className="p-12 text-center text-gray-400 flex flex-col items-center">
                <svg className="w-12 h-12 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <p>No upcoming events scheduled.</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100 dark:divide-gray-800 max-h-[600px] overflow-y-auto custom-scrollbar">
                {events.map(event => (
                  <li key={event.id} className="p-6 hover:bg-gray-50 dark:bg-gray-800/80 transition-colors group">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xs font-bold text-fbcc-ocean dark:text-blue-300 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded text-blue-700">
                            {new Date(event.event_date).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}
                          </span>
                          {event.is_recurring && (
                            <span className="text-xs font-medium bg-purple-50 text-purple-700 px-2 py-1 rounded-full flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                              Recurring
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-fbcc-ocean dark:group-hover:text-blue-300 dark:hover:text-blue-300 dark:text-blue-300 transition-colors">{event.title}</h3>
                        {event.description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{event.description}</p>}
                      </div>
                      
                      <button onClick={() => handleDelete(event.id, event.title)} className="px-3 py-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0" aria-label="Delete Event">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right Column: Add Event Form (Sticky) */}
        <div className="w-full lg:w-5/12 order-1 lg:order-2 lg:sticky lg:top-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-serif font-bold mb-6 text-gray-900 dark:text-gray-100">Create New Event</h2>
            {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">{error}</div>}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5 uppercase tracking-wide text-xs">Event Title</label>
                <input type="text" required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Wednesday Prayer Meeting" className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:bg-white dark:bg-gray-900 focus:ring-2 focus:ring-fbcc-ocean/20 focus:border-fbcc-ocean transition-all outline-none" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5 uppercase tracking-wide text-xs">Date & Time</label>
                <input type="datetime-local" required value={eventDate} onChange={e => setEventDate(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:bg-white dark:bg-gray-900 focus:ring-2 focus:ring-fbcc-ocean/20 focus:border-fbcc-ocean transition-all outline-none" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5 uppercase tracking-wide text-xs">Description (Optional)</label>
                <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} placeholder="Event details, location, what to bring..." className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:bg-white dark:bg-gray-900 focus:ring-2 focus:ring-fbcc-ocean/20 focus:border-fbcc-ocean transition-all outline-none resize-none"></textarea>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setIsRecurring(!isRecurring)}>
                <input type="checkbox" checked={isRecurring} onChange={e => setIsRecurring(e.target.checked)} className="w-5 h-5 text-fbcc-ocean dark:text-blue-300 rounded focus:ring-fbcc-ocean border-gray-300 pointer-events-none" />
                <label className="text-sm font-bold text-gray-700 pointer-events-none select-none">This is a recurring weekly event</label>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-fbcc-ocean hover:bg-[#00557A] text-white font-bold py-3.5 px-6 rounded-xl transition-colors disabled:opacity-50 flex justify-center items-center gap-2 mt-2">
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                )}
                {isSubmitting ? "Saving..." : "Schedule Event"}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
