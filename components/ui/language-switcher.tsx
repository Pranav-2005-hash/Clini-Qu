"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-700 hover:text-pink-600 transition-all duration-200 hover:scale-105 hover:bg-white/10 rounded-full"
        >
          <Globe className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40 bg-white/10 backdrop-blur-md ring-1 ring-white/20 border-none rounded-xl shadow-lg shadow-rose-200/30"
      >
        <DropdownMenuItem
          onClick={() => setLanguage('en')}
          className={`text-gray-800 hover:bg-white/10 hover:text-pink-600 rounded-lg transition-colors cursor-pointer ${
            language === 'en' ? 'bg-pink-100/20 text-pink-600' : ''
          }`}
        >
          🇺🇸 English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage('kn')}
          className={`text-gray-800 hover:bg-white/10 hover:text-pink-600 rounded-lg transition-colors cursor-pointer ${
            language === 'kn' ? 'bg-pink-100/20 text-pink-600' : ''
          }`}
        >
          🇮🇳 ಕನ್ನಡ
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
