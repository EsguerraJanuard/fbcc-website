"use client";

import { useState } from "react";
import FadeIn from "@/components/FadeIn";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="py-20 flex-1 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <FadeIn delay={0.1} direction="up">
            <h2 className="text-sm font-bold tracking-widest uppercase text-fbcc-earth dark:text-emerald-400 mb-2">Get in Touch</h2>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-fbcc-navy dark:text-gray-100">Contact Us</h1>
          </FadeIn>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Contact Info */}
          <div className="lg:w-5/12 flex flex-col justify-center">
            <FadeIn delay={0.2} direction="left">
              <h3 className="text-3xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-6">We'd love to hear from you.</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Whether you have a question about our ministries, need prayer, or just want to say hello, our doors and inboxes are always open.
              </p>

              <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border-l-4 border-fbcc-ocean mb-10">
                <p className="font-serif italic text-gray-700 dark:text-gray-300 mb-2">
                  "Call unto me, and I will answer thee, and shew thee great and mighty things, which thou knowest not."
                </p>
                <p className="text-sm font-bold text-fbcc-ocean dark:text-blue-300 uppercase tracking-wider">— Jeremiah 33:3 (KJV)</p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-fbcc-ocean dark:text-blue-300 shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-1">Our Location</h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Purok 1, Bulaon<br/>City of San Fernando, Pampanga<br/>Philippines</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center text-fbcc-earth dark:text-emerald-400 shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">Email Us</h4>
                    <p className="text-gray-600 dark:text-gray-400">esguerrajanuarddd@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-[#1877F2] shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">Facebook Page</h4>
                    <a href="https://www.facebook.com/fbccabalantian" target="_blank" rel="noopener noreferrer" className="text-fbcc-ocean dark:text-blue-300 hover:underline font-medium">@fbccabalantian</a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:w-7/12">
            <FadeIn delay={0.3} direction="right" className="h-full">
              <div className="bg-white dark:bg-gray-900 p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden h-full">
                {/* Decorative blob */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-gradient-to-br from-fbcc-ocean/20 to-fbcc-earth/20 blur-2xl pointer-events-none"></div>
                
                {status === "success" ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-10">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Message Sent!</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-sm mx-auto">
                      Thank you for reaching out. Your message has been delivered securely, and we will get back to you shortly.
                    </p>
                    <button 
                      onClick={() => setStatus("idle")}
                      className="text-fbcc-ocean dark:text-blue-300 font-bold hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    {status === "error" && (
                      <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm border border-red-200 dark:border-red-800/50">
                        Something went wrong while sending your message. Please try again later or email us directly.
                      </div>
                    )}
                    
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-none ring-1 ring-gray-200 dark:ring-gray-700 focus:ring-2 focus:ring-fbcc-ocean text-gray-900 dark:text-white transition-shadow outline-none" 
                        placeholder="John Doe"
                        required 
                        disabled={status === "loading"}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-none ring-1 ring-gray-200 dark:ring-gray-700 focus:ring-2 focus:ring-fbcc-ocean text-gray-900 dark:text-white transition-shadow outline-none" 
                        placeholder="john@example.com"
                        required 
                        disabled={status === "loading"}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Your Message</label>
                      <textarea 
                        id="message" 
                        rows={5} 
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-none ring-1 ring-gray-200 dark:ring-gray-700 focus:ring-2 focus:ring-fbcc-ocean text-gray-900 dark:text-white transition-shadow outline-none resize-none" 
                        placeholder="How can we help you or pray for you today?"
                        required
                        disabled={status === "loading"}
                      ></textarea>
                    </div>
                    
                    <div className="pt-2">
                      <button 
                        type="submit" 
                        disabled={status === "loading"}
                        className="w-full flex justify-center items-center py-4 px-4 rounded-xl shadow-md text-base font-bold text-white bg-fbcc-earth hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fbcc-earth transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:transform-none"
                      >
                        {status === "loading" ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : "Send Message"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
