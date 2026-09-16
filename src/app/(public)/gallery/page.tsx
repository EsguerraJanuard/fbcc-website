import FadeIn from "@/components/FadeIn";
import Image from "next/image";

export default function GalleryPage() {
  // You can freely add as many photos as you want to this array. 
  // It supports multiple photos per ministry!
  const galleryPhotos = [
    { id: 1, url: "/imgs/fellowship.jpg", alt: "Church Fellowship", category: "Fellowship" },
    { id: 2, url: "/imgs/choir.jpg", alt: "Choir Ministry", category: "Music Ministry" },
    { id: 3, url: "/imgs/vesper service.jpg", alt: "Vesper Service", category: "Worship" },
    { id: 4, url: "/imgs/vesper service Lord's supper.jpg", alt: "Lord's Supper", category: "Worship" },
    
    // Add future photos here like this:
    // { id: 5, url: "/imgs/youth ministry 1.jpg", alt: "Youth Camp", category: "Youth" },
    // { id: 6, url: "/imgs/youth ministry 2.jpg", alt: "Youth Fellowship", category: "Youth" },
    // { id: 7, url: "/imgs/sunday school kids.jpg", alt: "Kids Sunday School", category: "Sunday School" },
  ];

  return (
    <div className="py-20 flex-1 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <FadeIn delay={0.1} direction="up">
            <h2 className="text-sm font-bold tracking-widest uppercase text-fbcc-earth dark:text-emerald-400 mb-2">Our Community</h2>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-fbcc-navy dark:text-gray-100 mb-6">Photo Gallery</h1>
            
            <div className="max-w-2xl mx-auto bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border-l-4 border-fbcc-ocean mb-8 text-left">
              <p className="font-serif italic text-gray-700 dark:text-gray-300 mb-2 text-lg">
                "Behold, how good and how pleasant it is for brethren to dwell together in unity!"
              </p>
              <p className="text-sm font-bold text-fbcc-ocean dark:text-blue-300 uppercase tracking-wider">— Psalm 133:1 (KJV)</p>
            </div>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Take a look at the life, worship, and fellowship of First Baptist Church of Cabalantian. We are a family united in Christ, growing and serving together.
            </p>
          </FadeIn>
        </div>
        
        {/* True Masonry Gallery Grid (Flexible Aspect Ratios) */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryPhotos.map((photo, index) => (
            <FadeIn 
              key={photo.id} 
              delay={0.1 * (index % 3)} 
              direction="up" 
              className="break-inside-avoid relative group overflow-hidden rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Standard img tag allows natural aspect ratio to dictate height */}
              <img 
                src={photo.url} 
                alt={photo.alt}
                loading="lazy"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 block"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-fbcc-navy/80 via-fbcc-navy/20 to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-6">
                <span className="text-emerald-400 font-bold tracking-wider uppercase text-xs mb-1 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                  {photo.category}
                </span>
                <span className="text-white font-serif text-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  {photo.alt}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
