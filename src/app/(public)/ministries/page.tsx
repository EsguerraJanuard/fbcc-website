import FadeIn from "@/components/FadeIn";
import Link from "next/link";

export default function MinistriesPage() {
  const sundaySchoolDepts = [
    { name: "Nursery & Beginners", icon: "🧸", desc: "A loving, foundational environment for our youngest members." },
    { name: "Primary", icon: "🌱", desc: "Teaching children the core stories and principles of the Bible." },
    { name: "Juniors", icon: "🧭", desc: "Guiding growing minds to understand and apply God's Word." },
    { name: "Youth", icon: "🔥", desc: "Equipping teenagers with strong biblical foundations for life." },
    { name: "Young Professionals", icon: "💼", desc: "A ministry for working young adults to grow in faith, fellowship, and serve the church." },
    { name: "Young Couples", icon: "💍", desc: "Building strong, Christ-centered marriages and families." },
    { name: "Adults", icon: "📖", desc: "In-depth Bible study, fellowship, and discipleship for men and women." },
  ];

  const ministries = [
    { 
      name: "Choir Ministry", 
      icon: "🎵", 
      desc: "Leading the congregation in worship through hymns and spiritual songs. Practice is every Saturday at 5:00 PM." 
    },
    { 
      name: "Prayer Warriors", 
      icon: "🙏", 
      desc: "Our dedicated senior citizens who intercede for the church, our community, and special requests." 
    },
    { 
      name: "Pastoral Care Ministry", 
      icon: "❤️", 
      desc: "A dedicated donation drive and support system providing practical and spiritual care for brethren in need, such as those undergoing dialysis." 
    },
    { 
      name: "Bethany Children Learning Center", 
      icon: "🏫", 
      desc: "Providing a strong, Christ-centered educational foundation for our young children to learn and grow in a loving environment." 
    },
    { 
      name: "Antioch Baptist Church", 
      icon: "⛪", 
      desc: "Our beloved daughter church, growing and serving alongside us to expand God's kingdom." 
    },
    { 
      name: "Vacation Bible School", 
      icon: "☀️", 
      desc: "An exciting, action-packed summer program dedicated to teaching children the Word of God through fun activities and fellowship." 
    },
    { 
      name: "AFP PNP Housing Outreach", 
      icon: "🏘️", 
      desc: "Bringing the Gospel and practical support to the families in the AFP PNP housing community." 
    },
    { 
      name: "San Luis Outreach", 
      icon: "🗺️", 
      desc: "A dedicated mission effort spreading the Word of God to the people of San Luis." 
    },
  ];

  return (
    <div className="py-20 flex-1 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <FadeIn delay={0.1} direction="up">
            <h2 className="text-sm font-bold tracking-widest uppercase text-fbcc-earth dark:text-emerald-400 mb-2">Serve & Grow</h2>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-fbcc-navy dark:text-gray-100 mb-6">Our Ministries</h1>
            
            <div className="max-w-2xl mx-auto bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border-l-4 border-fbcc-ocean mb-8 text-left">
              <p className="font-serif italic text-gray-700 dark:text-gray-300 mb-2 text-lg">
                "As every man hath received the gift, even so minister the same one to another, as good stewards of the manifold grace of God."
              </p>
              <p className="text-sm font-bold text-fbcc-ocean dark:text-blue-300 uppercase tracking-wider">— 1 Peter 4:10 (KJV)</p>
            </div>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              At First Baptist Church of Cabalantian, there is a place for everyone to grow in their faith and use their God-given gifts to serve others.
            </p>
          </FadeIn>
        </div>

        {/* Sunday School Section */}
        <div className="mb-24">
          <FadeIn delay={0.2} direction="up">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-serif font-bold text-fbcc-navy dark:text-gray-100 mb-4">Sunday School Departments</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Join us every Sunday at 8:30 AM. We have tailored classes for every age group to study God's Word effectively.
              </p>
            </div>
          </FadeIn>

          <div className="flex flex-wrap justify-center gap-6">
            {sundaySchoolDepts.map((dept, index) => (
              <FadeIn key={dept.name} delay={0.1 * (index % 4)} direction="up" className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex">
                <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow flex-1 flex flex-col items-start group w-full">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{dept.icon}</div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{dept.name}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{dept.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Ministries & Missions Section */}
        <div>
          <FadeIn delay={0.2} direction="up">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-serif font-bold text-fbcc-navy dark:text-gray-100 mb-4">Ministries & Missions</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Beyond Sunday mornings, our church family is actively involved in outreach, discipleship, and worship through various ministries.
              </p>
            </div>
          </FadeIn>

          <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
            {ministries.map((min, index) => (
              <FadeIn key={min.name} delay={0.1 * (index % 3)} direction="up" className="w-full md:w-[calc(50%-12px)] flex">
                <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-shadow flex-1 flex items-start gap-6 group w-full">
                  <div className="text-5xl group-hover:scale-110 transition-transform shrink-0">{min.icon}</div>
                  <div>
                    <h4 className="text-xl font-bold text-fbcc-ocean dark:text-blue-300 mb-2">{min.name}</h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{min.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-24 text-center">
          <FadeIn delay={0.3} direction="up">
            <div className="bg-gradient-to-br from-fbcc-navy to-fbcc-ocean rounded-3xl p-10 md:p-16 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 relative z-10">Want to get involved?</h3>
              <p className="text-gray-200 text-lg max-w-2xl mx-auto mb-10 relative z-10">
                If you feel called to serve in any of these ministries, or if you simply want to learn more about our church, we'd love to connect with you.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-fbcc-navy bg-white hover:bg-gray-100 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative z-10"
              >
                Reach Out To Us
              </Link>
            </div>
          </FadeIn>
        </div>

      </div>
    </div>
  );
}
