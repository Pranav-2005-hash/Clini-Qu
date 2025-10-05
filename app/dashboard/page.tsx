"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Camera,
  MessageCircle,
  Calendar,
  Bell,
  Settings,
  BarChart3,
  TrendingUp,
  Bot,
  Stethoscope,
} from "lucide-react"
import Link from "next/link"
import { CliniQLogo } from "@/components/clini-q-logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import { ProfileDropdown } from "@/components/profile"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useLanguage } from "@/contexts/language-context"

import { useOnboarding } from "@/hooks/use-onboarding"

export default function DashboardPage() {
  const { data: session } = useSession()
  const { t } = useLanguage()

  const { isChecking } = useOnboarding()

  // Immediately redirect to onboarding if user is authenticated but onboarding check is still pending
  // This prevents the dashboard from showing briefly
  if (session?.user && isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500 mx-auto mb-4"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 overflow-hidden">
      {/* Background Video */}
      <video
        className="pointer-events-none fixed inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>
      {/* Header */}
      <header className="bg-transparent backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <CliniQLogo size="sm" />
              <h1 className="text-xl font-bold text-gray-800">Clini-Q</h1>
            </Link>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-700 hover:text-pink-600 transition-all duration-200 hover:scale-105 hover:bg-white/10 rounded-full"
              >
                <Bell className="w-5 h-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-700 hover:text-pink-600 transition-all duration-200 hover:scale-105 hover:bg-white/10 rounded-full"
                  >
                    <Settings className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-white/10 backdrop-blur-md ring-1 ring-white/20 border-none rounded-xl shadow-lg shadow-rose-200/30"
                >
                  <DropdownMenuLabel className="text-gray-700">Menu</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/20" />
                  <DropdownMenuItem
                    asChild
                    className="text-gray-800 hover:bg-white/10 hover:text-pink-600 rounded-lg transition-colors"
                  >
                    <Link href="/profile">{t('nav.editProfile')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/20" />
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="text-gray-800 hover:bg-white/10 hover:text-pink-600 rounded-lg transition-colors"
                  >
                    {t('nav.signOut')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              

              
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 dark:text-gray-100">
            {t('dashboard.welcome')}, {session?.user?.name?.split(" ")[0] || "User"}! 👋
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
            {t('dashboard.subtitle')}
          </p>
        </div>

        {/* Main Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Dashboard Card */}
          <Card className="group relative overflow-hidden bg-white/10 backdrop-blur-md ring-1 ring-white/20 hover:ring-rose-300/40 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-rose-200/40 rounded-2xl">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-200/70 to-pink-200/70 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-200/40 transition-transform duration-300 group-hover:scale-105">
                <BarChart3 className="w-8 h-8 text-pink-600" />
              </div>
              <CardTitle className="text-2xl text-gray-800 dark:text-gray-100">{t('nav.dashboard')}</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                View your complete skin health overview, progress tracking, and detailed analytics
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-4 p-3 bg-pink-50 rounded-lg">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span>+12% improvement this week</span>
                </div>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-full py-3 font-semibold shadow-lg transition-all duration-200 hover:shadow-rose-200/60 hover:-translate-y-0.5"
                asChild
              >
                <Link href="/full-dashboard">{t('dashboard.viewFull')}</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Skin Analyzer Card */}
          <Card className="group relative overflow-hidden bg-white/10 backdrop-blur-md ring-1 ring-white/20 hover:ring-rose-300/40 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-rose-200/40 rounded-2xl">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-200/70 to-pink-200/70 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-200/40 transition-transform duration-300 group-hover:scale-105">
                <Camera className="w-8 h-8 text-pink-600" />
              </div>
              <CardTitle className="text-2xl text-gray-800 dark:text-gray-100">{t('nav.analyze')}</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                AI-powered skin analysis using your photos to identify concerns and get recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-4 p-3 bg-pink-50 rounded-lg">
                <p className="text-sm text-gray-600">Last analysis: 2 hours ago</p>
                <p className="text-xs text-gray-500">Results: Mild improvement detected</p>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-full py-3 font-semibold shadow-lg transition-all duration-200 hover:shadow-rose-200/60 hover:-translate-y-0.5"
                asChild
              >
                <Link href="/analyze-skin">
                  <Camera className="w-4 h-4 mr-2" />
                  {t('dashboard.analyzeSkin')}
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Routine Generator Card */}
          <Card className="group relative overflow-hidden bg-white/10 backdrop-blur-md ring-1 ring-white/20 hover:ring-rose-300/40 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-rose-200/40 rounded-2xl">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-200/70 to-pink-200/70 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-200/40 transition-transform duration-300 group-hover:scale-105">
                <Bot className="w-8 h-8 text-pink-600" />
              </div>
              <CardTitle className="text-2xl text-gray-800 dark:text-gray-100">Routine Generator</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Generate a skincare routine tailored to your latest diagnosis and profile
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-4 p-3 bg-pink-50 rounded-lg">
                <p className="text-sm text-gray-600">💡 Uses your most recent AI analysis</p>
                <p className="text-xs text-gray-500">Edit anytime on the generator page</p>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-full py-3 font-semibold shadow-lg transition-all duration-200 hover:shadow-rose-200/60 hover:-translate-y-0.5"
                asChild
              >
                <Link href="/routine-generator">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Open Routine Generator
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Book Appointment Card */}
          <Card className="group relative overflow-hidden bg-white/10 backdrop-blur-md ring-1 ring-white/20 hover:ring-rose-300/40 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-rose-200/40 rounded-2xl">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-200/70 to-pink-200/70 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-200/40 transition-transform duration-300 group-hover:scale-105">
                <Stethoscope className="w-8 h-8 text-pink-600" />
              </div>
              <CardTitle className="text-2xl text-gray-800 dark:text-gray-100">{t('nav.appointment')}</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Schedule consultations with certified dermatologists and skin care specialists
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-4 p-3 bg-pink-50 rounded-lg">
              <p className="text-sm text-gray-600">“Healthy skin is a reflection of overall wellness.”</p>
              <p className="text-xs text-gray-500">— Dermatology Wisdom</p>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-full py-3 font-semibold shadow-lg transition-all duration-200 hover:shadow-rose-200/60 hover:-translate-y-0.5"
                asChild
              >
                <Link href="/book-appointment">
                  <Calendar className="w-4 h-4 mr-2" />
                  {t('dashboard.bookAppointment')}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        
      </div>
      {/* Floating Chansey AI Button */}
      {/* <ChanseyFAB /> */}
    </div>
  )
}
