"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'kn'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.analyze': 'Analyze Skin',
    'nav.chat': 'Chansey AI',
    'nav.appointment': 'Book Appointment',
    'nav.settings': 'Settings',
    'nav.editProfile': 'Edit Profile',
    'nav.signOut': 'Sign out',
    
    // Homepage
    'home.title': 'Join Clini-Q Today',
    'home.subtitle': 'Experience personalized skin care with our advanced AI technology. Meet Chansey AI, your friendly dermatology companion who provides expert insights and gentle guidance tailored just for you.',
    'home.signUp': 'Sign Up',
    'home.startJourney': 'Start Your Skin Journey',
    'home.features': 'Comprehensive Skin Care Features',
    'home.featuresDesc': 'Everything you need to maintain healthy, beautiful skin with the power of AI and expert dermatology guidance from Chansey AI.',
    'home.login': 'Login',
    'home.features1Title': 'Skin Dashboard',
    'home.features1Desc': 'Track your skin health progress with personalized insights and detailed analytics over time.',
    'home.features2Title': 'Skin Analyzer',
    'home.features2Desc': 'AI-powered skin analysis using your photos to identify concerns and recommend treatments.',
    'home.features3Title': 'Smart Scheduling',
    'home.features3Desc': 'Book appointments with dermatologists and set reminders for your skincare routine.',
    'home.features4Title': 'Chansey AI Chat',
    'home.features4Desc': 'Chat with Chansey AI for personalized advice and instant answers to your skincare questions.',
    'home.contactTitle': 'Contact Us',
    'home.contactDesc': 'Have questions or feedback? We\'d love to hear from you! Send us a message and we\'ll respond as soon as possible.',
    'home.contactName': 'Your Name',
    'home.contactEmail': 'Email Address',
    'home.contactMessage': 'Your Message',
    'home.contactSend': 'Send Message',
    'home.getInTouch': 'Get in Touch',
    'home.emailUs': 'Email Us',
    'home.callUs': 'Call Us',
    'home.visitUs': 'Visit Us',
    'home.followUs': 'Follow Us',
    
    // Authentication
    'auth.backToHome': 'Back to Home',
    'auth.welcomeBack': 'Welcome Back',
    'auth.loginDesc': 'Sign in to continue your skin health journey with Chansey AI',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.forgotPassword': 'Forgot password?',
    'auth.rememberMe': 'Remember me',
    'auth.signIn': 'Sign In',
    'auth.signingIn': 'Signing in...',
    'auth.continueWith': 'Or continue with',
    'auth.google': 'Google',
    'auth.facebook': 'Facebook',
    'auth.noAccount': 'Don\'t have an account?',
    'auth.signUpFree': 'Sign up for free',
    'auth.joinTitle': 'Join Clini-Q',
    'auth.joinDesc': 'Create your account and start your skin health journey with Chansey AI',
    'auth.firstName': 'First Name',
    'auth.lastName': 'Last Name',
    'auth.confirmPassword': 'Confirm Password',
    'auth.agreeTerms': 'I agree to the',
    'auth.terms': 'Terms',
    'auth.privacy': 'Privacy',
    'auth.createAccount': 'Create Account',
    'auth.creatingAccount': 'Creating Account...',
    'auth.haveAccount': 'Already have an account?',
    'auth.signInLink': 'Sign in',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.subtitle': 'Your personalized skin health companion is ready to help you on your wellness journey.',
    'dashboard.viewFull': 'View Full Dashboard',
    'dashboard.analyzeSkin': 'Analyze Skin',
    'dashboard.startChat': 'Start Chat',
    'dashboard.bookAppointment': 'Book Appointment',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.close': 'Close',
    'common.and': 'and',
  },
  kn: {
    // Navigation
    'nav.dashboard': 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    'nav.analyze': 'ಚರ್ಮ ವಿಶ್ಲೇಷಿಸಿ',
    'nav.chat': 'ಚಾನ್ಸೆ AI',
    'nav.appointment': 'ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ',
    'nav.settings': 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    'nav.editProfile': 'ಪ್ರೊಫೈಲ್ ಸಂಪಾದಿಸಿ',
    'nav.signOut': 'ಸೈನ್ ಔಟ್',
    
    // Homepage
    'home.title': 'ಇಂದು ಕ್ಲಿನಿ-Q ಯಲ್ಲಿ ಸೇರಿ',
    'home.subtitle': 'ನಮ್ಮ ಅತ್ಯಾಧುನಿಕ AI ತಂತ್ರಜ್ಞಾನದೊಂದಿಗೆ ವೈಯಕ್ತಿಕ ಚರ್ಮ ಸಂರಕ್ಷಣೆಯನ್ನು ಅನುಭವಿಸಿ. ಚಾನ್ಸೆ AI ಅನ್ನು ಭೇಟಿ ಮಾಡಿ, ನಿಮ್ಮ ಸ್ನೇಹಪರ ಚರ್ಮರೋಗ ಸಹಾಯಕ, ಅವರು ನಿಮಗಾಗಿ ವಿಶೇಷವಾಗಿ ಹೊಂದಿಸಿದ ತಜ್ಞ ಒಳನೋಟಗಳು ಮತ್ತು ಮೃದು ಮಾರ್ಗದರ್ಶನವನ್ನು ಒದಗಿಸುತ್ತಾರೆ.',
    'home.signUp': 'ಸೈನ್ ಅಪ್',
    'home.startJourney': 'ನಿಮ್ಮ ಚರ್ಮ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ',
    'home.features': 'ಸಮಗ್ರ ಚರ್ಮ ಸಂರಕ್ಷಣಾ ವೈಶಿಷ್ಟ್ಯಗಳು',
    'home.featuresDesc': 'ಚಾನ್ಸೆ AI ನಿಂದ AI ಮತ್ತು ತಜ್ಞ ಚರ್ಮರೋಗ ಮಾರ್ಗದರ್ಶನದ ಶಕ್ತಿಯೊಂದಿಗೆ ಆರೋಗ್ಯಕರ, ಸುಂದರ ಚರ್ಮವನ್ನು ನಿರ್ವಹಿಸಲು ನಿಮಗೆ ಬೇಕಾದ ಎಲ್ಲವೂ.',
    'home.login': 'ಲಾಗಿನ್',
    'home.features1Title': 'ಚರ್ಮ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    'home.features1Desc': 'ವೈಯಕ್ತಿಕ ಒಳನೋಟಗಳು ಮತ್ತು ವಿವರವಾದ ವಿಶ್ಲೇಷಣೆಗಳೊಂದಿಗೆ ನಿಮ್ಮ ಚರ್ಮ ಆರೋಗ್ಯದ ಪ್ರಗತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.',
    'home.features2Title': 'ಚರ್ಮ ವಿಶ್ಲೇಷಕ',
    'home.features2Desc': 'ಕಾಳಜಿಗಳನ್ನು ಗುರುತಿಸಲು ಮತ್ತು ಚಿಕಿತ್ಸೆಗಳನ್ನು ಶಿಫಾರಸು ಮಾಡಲು ನಿಮ್ಮ ಫೋಟೋಗಳನ್ನು ಬಳಸಿಕೊಂಡು AI-ಚಾಲಿತ ಚರ್ಮ ವಿಶ್ಲೇಷಣೆ.',
    'home.features3Title': 'ಸ್ಮಾರ್ಟ್ ಶೆಡ್ಯೂಲಿಂಗ್',
    'home.features3Desc': 'ಚರ್ಮರೋಗ ತಜ್ಞರೊಂದಿಗೆ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್‌ಗಳನ್ನು ಬುಕ್ ಮಾಡಿ ಮತ್ತು ನಿಮ್ಮ ಚರ್ಮ ಸಂರಕ್ಷಣಾ ದಿನಚರಿಗೆ ರಿಮೈಂಡರ್‌ಗಳನ್ನು ಹೊಂದಿಸಿ.',
    'home.features4Title': 'ಚಾನ್ಸೆ AI ಚಾಟ್',
    'home.features4Desc': 'ವೈಯಕ್ತಿಕ ಸಲಹೆ ಮತ್ತು ನಿಮ್ಮ ಚರ್ಮ ಸಂರಕ್ಷಣಾ ಪ್ರಶ್ನೆಗಳಿಗೆ ತ್ವರಿತ ಉತ್ತರಗಳಿಗಾಗಿ ಚಾನ್ಸೆ AI ಯೊಂದಿಗೆ ಚಾಟ್ ಮಾಡಿ.',
    'home.contactTitle': 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ',
    'home.contactDesc': 'ಪ್ರಶ್ನೆಗಳು ಅಥವಾ ಅಭಿಪ್ರಾಯಗಳಿವೆಯೇ? ನಿಮ್ಮಿಂದ ಕೇಳಲು ನಾವು ಇಷ್ಟಪಡುತ್ತೇವೆ! ನಮಗೆ ಸಂದೇಶವನ್ನು ಕಳುಹಿಸಿ ಮತ್ತು ನಾವು ಸಾಧ್ಯವಾದಷ್ಟು ಬೇಗ ಪ್ರತಿಕ್ರಿಯಿಸುತ್ತೇವೆ.',
    'home.contactName': 'ನಿಮ್ಮ ಹೆಸರು',
    'home.contactEmail': 'ಇಮೇಲ್ ವಿಳಾಸ',
    'home.contactMessage': 'ನಿಮ್ಮ ಸಂದೇಶ',
    'home.contactSend': 'ಸಂದೇಶ ಕಳುಹಿಸಿ',
    'home.getInTouch': 'ಸಂಪರ್ಕದಲ್ಲಿರಿ',
    'home.emailUs': 'ನಮಗೆ ಇಮೇಲ್ ಮಾಡಿ',
    'home.callUs': 'ನಮಗೆ ಕರೆ ಮಾಡಿ',
    'home.visitUs': 'ನಮ್ಮನ್ನು ಭೇಟಿ ಮಾಡಿ',
    'home.followUs': 'ನಮ್ಮನ್ನು ಫಾಲೋ ಮಾಡಿ',
    
    // Authentication
    'auth.backToHome': 'ಮುಖ್ಯಪುಟಕ್ಕೆ ಹಿಂದಿರುಗಿ',
    'auth.welcomeBack': 'ಮರಳಿ ಸ್ವಾಗತ',
    'auth.loginDesc': 'ಚಾನ್ಸೆ AI ಯೊಂದಿಗೆ ನಿಮ್ಮ ಚರ್ಮ ಆರೋಗ್ಯ ಪ್ರಯಾಣವನ್ನು ಮುಂದುವರಿಸಲು ಸೈನ್ ಇನ್ ಮಾಡಿ',
    'auth.email': 'ಇಮೇಲ್',
    'auth.password': 'ಪಾಸ್‌ವರ್ಡ್',
    'auth.forgotPassword': 'ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರುವೆ?',
    'auth.rememberMe': 'ನನ್ನನ್ನು ನೆನಪಿಸಿಕೊಳ್ಳಿ',
    'auth.signIn': 'ಸೈನ್ ಇನ್',
    'auth.signingIn': 'ಸೈನ್ ಇನ್ ಆಗುತ್ತಿದೆ...',
    'auth.continueWith': 'ಅಥವಾ ಇದರೊಂದಿಗೆ ಮುಂದುವರಿಯಿರಿ',
    'auth.google': 'ಗೂಗಲ್',
    'auth.facebook': 'ಫೇಸ್‌ಬುಕ್',
    'auth.noAccount': 'ಖಾತೆ ಇಲ್ಲವೇ?',
    'auth.signUpFree': 'ಉಚಿತವಾಗಿ ಸೈನ್ ಅಪ್ ಮಾಡಿ',
    'auth.joinTitle': 'ಕ್ಲಿನಿ-Q ಗೆ ಸೇರಿ',
    'auth.joinDesc': 'ನಿಮ್ಮ ಖಾತೆಯನ್ನು ರಚಿಸಿ ಮತ್ತು ಚಾನ್ಸೆ AI ಯೊಂದಿಗೆ ನಿಮ್ಮ ಚರ್ಮ ಆರೋಗ್ಯ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ',
    'auth.firstName': 'ಮೊದಲ ಹೆಸರು',
    'auth.lastName': 'ಕೊನೆಯ ಹೆಸರು',
    'auth.confirmPassword': 'ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ',
    'auth.agreeTerms': 'ನಾನು ಇದಕ್ಕೆ ಒಪ್ಪುತ್ತೇನೆ',
    'auth.terms': 'ನಿಯಮಗಳು',
    'auth.privacy': 'ಗೌಪ್ಯತೆ',
    'auth.createAccount': 'ಖಾತೆ ರಚಿಸಿ',
    'auth.creatingAccount': 'ಖಾತೆ ರಚಿಸಲಾಗುತ್ತಿದೆ...',
    'auth.haveAccount': 'ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?',
    'auth.signInLink': 'ಸೈನ್ ಇನ್',
    
    // Dashboard
    'dashboard.welcome': 'ಮರಳಿ ಸ್ವಾಗತ',
    'dashboard.subtitle': 'ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಚರ್ಮ ಆರೋಗ್ಯ ಸಹಾಯಕ ನಿಮ್ಮ ಕ್ಷೇಮ ಪ್ರಯಾಣದಲ್ಲಿ ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ಸಿದ್ಧವಾಗಿದೆ.',
    'dashboard.viewFull': 'ಪೂರ್ಣ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ವೀಕ್ಷಿಸಿ',
    'dashboard.analyzeSkin': 'ಚರ್ಮ ವಿಶ್ಲೇಷಿಸಿ',
    'dashboard.startChat': 'ಚಾಟ್ ಪ್ರಾರಂಭಿಸಿ',
    'dashboard.bookAppointment': 'ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ',
    
    // Common
    'common.loading': 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    'common.error': 'ದೋಷ',
    'common.save': 'ಉಳಿಸಿ',
    'common.cancel': 'ರದ್ದುಗೊಳಿಸಿ',
    'common.close': 'ಮುಚ್ಚಿ',
    'common.and': 'ಮತ್ತು',
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language
    if (saved && (saved === 'en' || saved === 'kn')) {
      setLanguage(saved)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
