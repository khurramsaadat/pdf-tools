'use client'

import Link from 'next/link'
import { 
  FiTarget, 
  FiUsers, 
  FiShield, 
  FiZap, 
  FiGlobe,
  FiTrendingUp,
  FiAward,
  FiHeart,
  FiCode,
  FiStar,
  FiClock,
  FiLock,
  FiSmartphone,
  FiCloud,
  FiCheckCircle
} from 'react-icons/fi'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AboutPage() {
  const stats = [
    { number: "1M+", label: "Documents Processed", icon: FiTrendingUp },
    { number: "50k+", label: "Happy Users", icon: FiUsers },
    { number: "99.9%", label: "Uptime", icon: FiZap },
    { number: "15+", label: "PDF Tools", icon: FiTarget }
  ]

  const features = [
    {
      icon: FiShield,
      title: "Privacy First",
      description: "Your files are automatically deleted after 1 hour. We never store or access your documents."
    },
    {
      icon: FiZap,
      title: "Lightning Fast",
      description: "Process PDF files in seconds with our optimized cloud infrastructure."
    },
    {
      icon: FiSmartphone,
      title: "Works Everywhere",
      description: "Use our tools on any device - desktop, tablet, or mobile. No downloads required."
    },
    {
      icon: FiLock,
      title: "Secure Processing",
      description: "All file transfers use SSL encryption and secure processing environments."
    },
    {
      icon: FiGlobe,
      title: "Always Available",
      description: "24/7 availability with 99.9% uptime. Access your tools whenever you need them."
    },
    {
      icon: FiHeart,
      title: "Completely Free",
      description: "All core features are free forever. No hidden costs or subscription requirements."
    }
  ]

  const team = [
    {
      name: "Development Team",
      role: "Full-Stack Engineers",
      description: "Experienced developers focused on creating intuitive, high-performance PDF processing tools."
    },
    {
      name: "Security Team", 
      role: "Privacy & Security",
      description: "Dedicated to ensuring your data remains private and secure throughout the processing pipeline."
    },
    {
      name: "Support Team",
      role: "Customer Success",
      description: "Available to help you get the most out of our tools and resolve any technical issues."
    }
  ]

  const timeline = [
    {
      year: "2024",
      title: "Advanced Features Launch",
      description: "Released selective page merging, advanced compression, and security features."
    },
    {
      year: "2023",
      title: "Mobile Optimization",
      description: "Redesigned interface for seamless mobile and tablet experience."
    },
    {
      year: "2022",
      title: "Platform Launch",
      description: "Launched with core PDF tools: merge, split, convert, and compress."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      {/* Header Section */}
      <section className="bg-gradient-to-br from-gray-800 via-gray-700 to-blue-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">


          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About PDF Tools Online
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We&apos;re on a mission to make PDF processing simple, fast, and accessible to everyone. 
            Our comprehensive suite of online tools helps millions of users manage their documents 
            efficiently without compromising on security or quality.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-4">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                In today&apos;s digital world, PDF documents are everywhere - from business contracts 
                and academic papers to personal documents and creative projects. Yet managing these 
                files often requires expensive software or complex technical knowledge.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                We believe everyone should have access to powerful, professional-grade PDF tools 
                without barriers. That&apos;s why we created PDF Tools Online - a comprehensive 
                platform that combines ease of use with enterprise-level capabilities.
              </p>
              <div className="flex items-center space-x-4">
                <div className="bg-blue-600 rounded-lg p-3">
                  <FiTarget className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Our Goal</h3>
                  <p className="text-gray-400">Democratize PDF processing for everyone</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-700 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Why Choose Us?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FiCheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">No software installation required</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Works on any device with internet</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Enterprise-grade security and privacy</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Professional results in seconds</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Comprehensive tool suite</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What Sets Us Apart</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We&apos;ve built our platform with your needs in mind, focusing on speed, security, and simplicity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors">
                  <div className="bg-blue-600 rounded-lg p-3 w-fit mb-4">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-700 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <FiCode className="h-8 w-8 text-blue-500 mr-3" />
                <h3 className="text-2xl font-bold text-white">Built with Modern Technology</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Our platform is built using cutting-edge web technologies to ensure fast, reliable, 
                and secure PDF processing. We use industry-standard libraries and frameworks that 
                are trusted by millions of developers worldwide.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Frontend</h4>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Next.js & React</li>
                    <li>• TypeScript</li>
                    <li>• Tailwind CSS</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">PDF Processing</h4>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• PDF-lib</li>
                    <li>• PDF.js</li>
                    <li>• Sharp & Canvas</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Security & Privacy</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Your privacy is our top priority. We&apos;ve designed our system with security-first 
                principles to ensure your documents remain confidential and protected throughout 
                the entire processing pipeline.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <FiClock className="h-5 w-5 text-green-500 mr-3 mt-1" />
                  <div>
                    <h4 className="text-white font-medium">Auto-Deletion</h4>
                    <p className="text-gray-400 text-sm">Files automatically deleted after 1 hour</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FiShield className="h-5 w-5 text-green-500 mr-3 mt-1" />
                  <div>
                    <h4 className="text-white font-medium">SSL Encryption</h4>
                    <p className="text-gray-400 text-sm">All data transfers use 256-bit SSL encryption</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FiCloud className="h-5 w-5 text-green-500 mr-3 mt-1" />
                  <div>
                    <h4 className="text-white font-medium">Secure Processing</h4>
                    <p className="text-gray-400 text-sm">Isolated processing environments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Team</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We&apos;re a dedicated team of developers, designers, and security experts passionate about 
              creating the best PDF processing experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 text-center">
                <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FiUsers className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-blue-400 text-sm mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-gray-300">
              From a simple idea to a comprehensive PDF processing platform
            </p>
          </div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center mr-6 flex-shrink-0">
                  <FiStar className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mr-4">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join millions of users who trust PDF Tools Online for their document processing needs. 
            Try our tools today and experience the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/merge"
              className="inline-flex items-center bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start with PDF Merge
            </Link>
            <Link 
              href="/knowledge-base"
              className="inline-flex items-center bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-900 transition-colors"
            >
              Browse Documentation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
