"use client"

import type { FormEvent } from "react"
import { CliniQLogo } from "@/components/clini-q-logo"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { signIn, SignInResponse } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import dynamic from 'next/dynamic';
import { useLanguage } from "@/contexts/language-context"

const SilkBackground = dynamic(() => import('@/components/silk-background'), {
  ssr: false,
});

export default function LoginPage() {
  const { t } = useLanguage()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const router = useRouter()
  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!formData.email || !formData.password) {
      toast.error("Please enter both email and password")
      setIsLoading(false)
      return
    }

    try {
      const result = await signIn("credentials", {
        email: formData.email.trim(),
        password: formData.password,
        redirect: false
      }) as SignInResponse | undefined

      if (result?.error) {
        console.error('Sign in error:', result.error)
        toast.error(result.error === 'CredentialsSignin' 
          ? "Invalid email or password" 
          : "Failed to sign in. Please try again.")
      } else if (result?.ok) {
        toast.success("Login successful!")
        router.push("/dashboard")
      } else {
        throw new Error('Unexpected response from server')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error("An error occurred during login. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-gradient-to-br from-pink-50 to-amber-50">
      <SilkBackground 
        color="#FFD6E8" 
        scale={1.8} 
        speed={1.5} 
        noiseIntensity={0.3}
        className="opacity-30"
      />
      {/* Decorative elements */}
      <div className="absolute -right-20 top-1/3 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute -left-20 bottom-1/4 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="w-full max-w-md relative z-10">
        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 mb-6 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">{t('auth.backToHome')}</span>
        </Link>

        <Card className="border-pink-100/50 shadow-2xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
          <CardHeader className="text-center pb-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-200 to-rose-200 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <CliniQLogo size="lg" className="relative z-10" />
              </div>
              <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-600 mb-2">
                {t('auth.welcomeBack')}
              </CardTitle>
              <CardDescription className="text-gray-700 text-center">
                {t('auth.loginDesc')}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  {t('auth.email')}
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 border-pink-200 focus:border-pink-400 focus:ring-pink-400 bg-white/50"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    {t('auth.password')}
                  </Label>
                  <Link href="/forgot-password" className="text-sm text-pink-600 hover:text-pink-700 font-medium">
                    {t('auth.forgotPassword')}
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-10 border-pink-200 focus:border-pink-400 focus:ring-pink-400 bg-white/50"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  className="border-pink-300 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  {t('auth.rememberMe')}
                </Label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('auth.signingIn')}
                  </span>
                ) : t('auth.signIn')}
              </Button>
            </form>

            {/* Social login section temporarily removed - add Google OAuth credentials to enable */}

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {t('auth.noAccount')}{" "}
                <Link href="/signup" className="text-pink-600 hover:text-pink-700 font-semibold">
                  {t('auth.signUpFree')}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
