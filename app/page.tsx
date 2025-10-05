"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Sparkles, Users, Camera, BarChart3, Calendar, MessageCircle, HeartIcon, Mail, Phone, MapPin, Twitter, Instagram, Map, Home, Zap, MessageCircleMore, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useLanguage } from "@/contexts/language-context"
import dynamic from 'next/dynamic';

const SilkBackground = dynamic(() => import('@/components/silk-background'), {
  ssr: false,
});

// Smooth scroll to element helper
const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
  e.preventDefault();
  const element = document.getElementById(sectionId);
  if (element) {
    const headerOffset = 80; // Height of your header
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// Navigation Link Component
interface NavLinkProps {
  href: string;
  sectionId?: string;
  isActive?: boolean;
  children: React.ReactNode;
}

const NavLink = ({ href, sectionId, children, isActive = false }: NavLinkProps) => (
  <a
    href={href}
    onClick={(e) => sectionId ? scrollToSection(e, sectionId) : null}
    className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer group overflow-hidden after:content-[''] after:absolute after:left-4 after:right-4 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-gradient-to-r after:from-pink-200 after:to-rose-200 after:opacity-0 after:scale-x-0 group-hover:after:opacity-100 group-hover:after:scale-x-100 after:transition after:duration-300 ${
      isActive 
        ? 'text-white bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 after:opacity-100 after:scale-x-100' 
        : 'text-gray-700 hover:text-pink-600'
    }`}
  >
    <span className="relative z-10 flex items-center gap-2">
      {children}
    </span>
    {!isActive && (
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-100 to-rose-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 rounded-full"></span>
    )}
    {isActive && (
      <span className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-300 -z-10"></span>
    )}
    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-100 to-rose-100 opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10 rounded-full"></span>
  </a>
);

// Mobile Navigation Component
const MobileNav = () => {
  const [activeSection, setActiveSection] = React.useState('home');

  // Update active section on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'features', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-lg rounded-full shadow-xl border border-pink-100/50 p-1.5 z-50">
      <div className="flex items-center bg-white/80 rounded-full p-1.5 gap-1">
        {[
          { id: 'hero', icon: Home, label: 'Home' },
          { id: 'features', icon: Zap, label: 'Features' },
          { id: 'contact', icon: MessageCircleMore, label: 'Contact' }
        ].map(({ id, icon: Icon, label }) => {
          const isActive = activeSection === id;
          return (
            <a 
              key={id}
              href={`#${id}`}
              onClick={(e) => handleMobileNavClick(e, id)}
              className={`p-3 rounded-full flex flex-col items-center justify-center transition-all duration-300 ${
                isActive 
                  ? 'text-white bg-gradient-to-r from-pink-500 to-rose-500 shadow-md' 
                  : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
              }`}
              title={label}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : 'scale-100'} transition-transform`} />
              {isActive && (
                <span className="text-[10px] font-medium mt-0.5">{label}</span>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default function LandingPage() {
  const { t } = useLanguage()
  const [activeSection, setActiveSection] = React.useState('hero')

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'features', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Global cursor-reactive background variables (smooth via rAF)
  React.useEffect(() => {
    let raf = 0 as number | 0
    let lastX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0
    let lastY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0

    const apply = () => {
      raf = 0
      const root = document.documentElement
      root.style.setProperty('--mx', `${lastX}px`)
      root.style.setProperty('--my', `${lastY}px`)
    }

    const onMove = (e: MouseEvent) => {
      lastX = e.clientX
      lastY = e.clientY
      if (!raf) raf = requestAnimationFrame(apply)
    }

    apply()
    window.addEventListener('mousemove', onMove as any, { passive: true } as any)
    return () => {
      window.removeEventListener('mousemove', onMove as any)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
  
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-pink-50 to-amber-50 overflow-hidden">
      <SilkBackground 
        color="#FFD6E8" 
        scale={1.8} 
        speed={1.5} 
        noiseIntensity={0.4}
        className="opacity-30"
      />
      {/* Cursor-reactive background overlay spanning the whole page */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        {/* Primary pink glow following cursor */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(650px circle at var(--mx) var(--my), rgba(244,114,182,0.18), transparent 60%)',
          }}
        />
        {/* Rose accent offset glow */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(900px circle at calc(var(--mx) + 200px) calc(var(--my) + 100px), rgba(251,113,133,0.12), transparent 70%)',
          }}
        />
        {/* Soft blush layer for depth */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(700px circle at calc(var(--mx) - 150px) calc(var(--my) + 150px), rgba(253,164,175,0.10), transparent 70%)',
          }}
        />
      </div>
      {/* Decorative elements */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-pink-100/50 shadow-md transition-all duration-300 hover:shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center gap-3 hover:opacity-90 transition-opacity"
            >
              <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-1.5 rounded-xl shadow-lg transform transition-transform duration-500 group-hover:scale-105">
                <div className="bg-white/10 rounded-lg p-1 relative overflow-hidden">
                  <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent"></span>
                  <Image
                    src="/brand/logo.png"
                    alt="Clini-Q logo"
                    width={40}
                    height={40}
                    className="rounded-[10px] drop-shadow-sm transition-transform duration-500 group-hover:rotate-1"
                    priority
                  />
                </div>
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-600">
                Clini-Q
              </span>
            </a>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1">
              <NavLink 
                href="#" 
                sectionId="hero"
                isActive={activeSection === 'hero'}
              >
                Home
              </NavLink>
              <NavLink 
                href="#features"
                sectionId="features"
                isActive={activeSection === 'features'}
              >
                Features
              </NavLink>
              <NavLink 
                href="#contact"
                sectionId="contact"
                isActive={activeSection === 'contact'}
              >
                Get in Touch
              </NavLink>
            </nav>
            
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <Button
                variant="outline"
                className="border-pink-200 text-pink-600 hover:bg-pink-50 hover:border-pink-300 rounded-full px-6 shadow-sm transition-all duration-200"
                asChild
              >
                <Link href="/login">
                <span className="font-medium">Login</span>
              </Link>
            </Button>
            <Button
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full px-6 shadow-lg hover:shadow-xl transition-all duration-200"
              asChild
            >
              <Link href="/signup">
                <span className="font-medium">Sign Up</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      </header>
      <MobileNav />

      {/* Hero Section */}
      <section id="hero" className="min-h-[80vh] flex items-center justify-center container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center relative group">
          {/* Hero content placed directly on page */}
          <div className="flex justify-center mb-4">
            <Badge className="bg-white/30 backdrop-blur-sm text-pink-700 border border-white/30 hover:bg-white/40 px-4 py-1.5 rounded-full shadow-sm transition-colors duration-300">
              <Sparkles className="w-4 h-4 mr-1.5 text-pink-600" />
              AI-Powered Dermatology
            </Badge>
          </div>
          <div className="flex justify-center mb-6">
            <div className="relative inline-block animate-tilt hover:scale-[1.02] transition-transform duration-700">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-200/40 to-rose-200/40 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <Image
                src="/brand/logo.png"
                alt="Clini-Q logo"
                width={160}
                height={160}
                className="relative z-10 drop-shadow-lg rounded-2xl"
                priority
              />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-600 mb-6 drop-shadow-sm">
            {t('home.title')}
          </h1>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto leading-relaxed font-medium">
            {t('home.subtitle')}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              className="group relative bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 overflow-hidden border-2 border-white/20 hover:border-white/30"
              asChild
            >
              <Link href="/signup">
                <span className="relative z-10">{t('home.startJourney')}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-pink-200 text-pink-600 hover:bg-pink-50 rounded-full px-8 py-6 text-lg font-semibold"
              asChild
            >
              <a href="#features" onClick={(e) => scrollToSection(e, 'features')}>
                {t('home.learnMore')}
              </a>
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center justify-center gap-2 rounded-full bg-white/50 backdrop-blur-sm px-3 py-2 border border-white/30 text-gray-700">
              <Shield className="w-4 h-4 text-pink-600" />
              <span className="text-sm font-medium">{t('home.trustSecure')}</span>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-full bg-white/50 backdrop-blur-sm px-3 py-2 border border-white/30 text-gray-700">
              <Users className="w-4 h-4 text-pink-600" />
              <span className="text-sm font-medium">{t('home.trustUsers')}</span>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-full bg-white/50 backdrop-blur-sm px-3 py-2 border border-white/30 text-gray-700">
              <Sparkles className="w-4 h-4 text-pink-600" />
              <span className="text-sm font-medium">{t('home.trustReviewed')}</span>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href="#features"
              onClick={(e) => scrollToSection(e, 'features')}
              className="group inline-flex flex-col items-center text-pink-600 hover:text-rose-600"
            >
              <span className="sr-only">Scroll to features</span>
              <span className="animate-bounce rounded-full border border-pink-200 bg-white/70 backdrop-blur-sm p-2 shadow-sm">
                <ChevronDown className="w-5 h-5" />
              </span>
            </a>
          </div>
        </div>
      </section>

      <section id="features" className="container mx-auto px-4 py-16 relative z-10 scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-600">
            {t('home.features')}
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            {t('home.featuresDesc')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Skin Dashboard */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-400 to-rose-400 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500 group-hover:duration-200 animate-tilt"></div>
            <Card className="relative bg-white/80 backdrop-blur-sm border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 group-hover:scale-[1.02]">
              <Link href="/login" className="block h-full">
                <CardHeader className="text-center pb-4">
                  <div className="relative w-16 h-16 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="absolute inset-0 bg-white/30 rounded-2xl backdrop-blur-sm"></div>
                    <BarChart3 className="w-8 h-8 text-pink-600 relative z-10" />
                  </div>
                  <CardTitle className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-600">
                    Skin Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-700 leading-relaxed">
                    Track your skin health progress with personalized insights and detailed analytics over time.
                  </CardDescription>
                </CardContent>
              </Link>
            </Card>
          </div>

          {/* Skin Analyzer */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 to-pink-400 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500 group-hover:duration-200 animate-tilt"></div>
            <Card className="relative bg-white/80 backdrop-blur-sm border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 group-hover:scale-[1.02]">
              <Link href="/login" className="block h-full">
                <CardHeader className="text-center pb-4">
                  <div className="relative w-16 h-16 bg-gradient-to-br from-amber-50 to-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="absolute inset-0 bg-white/30 rounded-2xl backdrop-blur-sm"></div>
                    <Camera className="w-8 h-8 text-amber-600 relative z-10" />
                  </div>
                  <CardTitle className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-pink-600">
                    Skin Analyzer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-700 leading-relaxed">
                    AI-powered skin analysis using your photos to identify concerns and recommend treatments.
                  </CardDescription>
                </CardContent>
              </Link>
            </Card>
          </div>

          {/* Smart Scheduling */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500 group-hover:duration-200 animate-tilt"></div>
            <Card className="relative bg-white/80 backdrop-blur-sm border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 group-hover:scale-[1.02]">
              <Link href="/login" className="block h-full">
                <CardHeader className="text-center pb-4">
                  <div className="relative w-16 h-16 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="absolute inset-0 bg-white/30 rounded-2xl backdrop-blur-sm"></div>
                    <Calendar className="w-8 h-8 text-blue-600 relative z-10" />
                  </div>
                  <CardTitle className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
                    Smart Scheduling
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-700 leading-relaxed">
                    Book appointments with dermatologists and set reminders for your skincare routine.
                  </CardDescription>
                </CardContent>
              </Link>
            </Card>
          </div>

          {/* Chansey AI Chat */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500 group-hover:duration-200 animate-tilt"></div>
            <Card className="relative bg-white/80 backdrop-blur-sm border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 group-hover:scale-[1.02]">
              <Link href="/login" className="block h-full">
                <CardHeader className="text-center pb-4">
                  <div className="relative w-16 h-16 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="absolute inset-0 bg-white/30 rounded-2xl backdrop-blur-sm"></div>
                    <MessageCircle className="w-8 h-8 text-purple-600 relative z-10" />
                  </div>
                  <CardTitle className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    Chansey AI Chat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-700 leading-relaxed">
                    Chat with Chansey AI for personalized advice and instant answers to your skincare questions.
                  </CardDescription>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section - Horizontal Layout */}
      <section id="contact" className="relative py-16 overflow-hidden bg-gradient-to-br from-pink-50/50 to-amber-50/50">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-400/30 via-rose-400/30 to-amber-200/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 group-hover:duration-200 -z-10"></div>
              
              <Card className="border-white/20 shadow-2xl bg-white/60 backdrop-blur-md hover:bg-white/70 transition-all duration-500 hover:shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Left Side - Contact Form */}
                  <div className="p-8 md:p-12">
                    <div className="mb-8">
                      <h2 className="text-4xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-600">
                        Contact Us
                      </h2>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        Have questions or feedback? We'd love to hear from you! Send us a message and we'll respond as soon as possible.
                      </p>
                    </div>
                    
                    <form 
                      className="space-y-6"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const data = Object.fromEntries(formData.entries());
                        
                        // Here you would typically send the data to your backend
                        console.log('Form submitted:', data);
                        
                        // Show success message
                        alert('Thank you for your message! We will get back to you soon.');
                        
                        // Reset form
                        e.currentTarget.reset();
                      }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Your Name
                          </label>
                          <div className="relative group">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              required
                              className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm group-hover:shadow-lg group-hover:shadow-pink-100"
                              placeholder="John Doe"
                            />
                            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-pink-200 pointer-events-none transition-all duration-300"></div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                          </label>
                          <div className="relative group">
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm group-hover:shadow-lg group-hover:shadow-pink-100"
                              placeholder="you@example.com"
                            />
                            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-pink-200 pointer-events-none transition-all duration-300"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                          Your Message
                        </label>
                        <div className="relative group">
                          <textarea
                            id="message"
                            name="message"
                            rows={4}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm resize-none group-hover:shadow-lg group-hover:shadow-pink-100"
                            placeholder="How can we help you?"
                          ></textarea>
                          <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-pink-200 pointer-events-none transition-all duration-300"></div>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <Button
                          type="submit"
                          className="w-full group relative bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-xl px-6 py-6 text-lg font-semibold shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 overflow-hidden border-2 border-white/20 hover:border-white/30"
                        >
                          <span className="relative z-10">Send Message</span>
                          <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </Button>
                      </div>
                    </form>
                  </div>
                  
                  {/* Right Side - Contact Info */}
                  <div className="bg-gradient-to-br from-pink-400 to-rose-400 p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')] opacity-10"></div>
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold mb-8">Get in Touch</h3>
                      
                      <div className="space-y-6">
                        <div className="flex items-start group">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-4 group-hover:bg-white/30 transition-all duration-300">
                            <Mail className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white/90">Email Us</h4>
                            <a href="mailto:support@clini-q.com" className="text-white/80 hover:text-white transition-colors">support@clini-q.com</a>
                          </div>
                        </div>
                        
                        <div className="flex items-start group">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-4 group-hover:bg-white/30 transition-all duration-300">
                            <Phone className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white/90">Call Us</h4>
                            <a href="tel:+15551234567" className="text-white/80 hover:text-white transition-colors">+1 (555) 123-4567</a>
                          </div>
                        </div>
                        
                        <div className="flex items-start group">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-4 group-hover:bg-white/30 transition-all duration-300">
                            <MapPin className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white/90">Visit Us</h4>
                            <p className="text-white/80">123 Skincare St<br/>Beauty City, BC 12345</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-12 pt-8 border-t border-white/20">
                        <h4 className="font-medium text-white/90 mb-6">Follow Us</h4>
                        <div className="flex space-x-4">
                          <a 
                            href="https://twitter.com/cliniq"
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:shadow-lg hover:scale-105 group"
                            aria-label="Twitter"
                          >
                            <Twitter className="w-5 h-5 group-hover:text-[#1DA1F2] transition-colors" />
                          </a>
                          <a 
                            href="https://instagram.com/cliniq"
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:shadow-lg hover:scale-105 group"
                            aria-label="Instagram"
                          >
                            <Instagram className="w-5 h-5 group-hover:text-[#E1306C] transition-colors" />
                          </a>
                          <a 
                            href="https://maps.google.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:shadow-lg hover:scale-105 group"
                            aria-label="Google Maps"
                          >
                            <Map className="w-5 h-5 group-hover:text-[#4285F4] transition-colors" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-pink-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Image src="/brand/logo.png" alt="Clini-Q logo" width={24} height={24} className="rounded-md" />
            <span className="text-gray-600 dark:text-gray-400">© 2025 Clini-Q. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
            <Link href="#" className="hover:text-pink-600 transition-colors dark:hover:text-pink-400">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-pink-600 transition-colors dark:hover:text-pink-400">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-pink-600 transition-colors dark:hover:text-pink-400">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
