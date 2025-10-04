import React from "react"

interface CliniQLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function CliniQLogo({ size = "md", className = "" }: CliniQLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg 
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Main gradient for the logo */}
          <radialGradient id="mainGradient" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFB6C1" />
            <stop offset="30%" stopColor="#FFA07A" />
            <stop offset="60%" stopColor="#FA8072" />
            <stop offset="100%" stopColor="#F08080" />
          </radialGradient>
          
          {/* Secondary gradient for yin-yang sections */}
          <radialGradient id="yinGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE4E1" />
            <stop offset="50%" stopColor="#FFC0CB" />
            <stop offset="100%" stopColor="#FFB6C1" />
          </radialGradient>
          
          <radialGradient id="yangGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#CD919E" />
            <stop offset="50%" stopColor="#BC8F8F" />
            <stop offset="100%" stopColor="#A0522D" opacity="0.8" />
          </radialGradient>
          
          {/* Circuit pattern gradient */}
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" opacity="0.9" />
            <stop offset="50%" stopColor="#FFE4E1" opacity="0.7" />
            <stop offset="100%" stopColor="#FFC0CB" opacity="0.8" />
          </linearGradient>
        </defs>
        
        {/* Outer circle background */}
        <circle 
          cx="100" 
          cy="100" 
          r="95" 
          fill="url(#mainGradient)"
        />
        
        {/* Inner circle for yin-yang */}
        <circle 
          cx="100" 
          cy="100" 
          r="75" 
          fill="url(#yinGradient)"
        />
        
        {/* Yin section (left half) */}
        <path 
          d="M 100 25 A 75 75 0 0 1 100 175 A 37.5 37.5 0 0 1 100 100 A 37.5 37.5 0 0 0 100 25 Z"
          fill="url(#yangGradient)"
        />
        
        {/* Yang dot (white circle in dark section) */}
        <circle 
          cx="100" 
          cy="62.5" 
          r="12" 
          fill="url(#yinGradient)"
        />
        
        {/* Yin dot (dark circle in light section) */}
        <circle 
          cx="100" 
          cy="137.5" 
          r="12" 
          fill="url(#yangGradient)"
        />
        
        {/* Circuit pattern overlay */}
        <g fill="none" stroke="url(#circuitGradient)" strokeWidth="1.5" opacity="0.6">
          {/* Outer circuit ring */}
          <circle cx="100" cy="100" r="85" strokeDasharray="5,3" />
          
          {/* Circuit nodes */}
          <circle cx="100" cy="35" r="3" fill="url(#circuitGradient)" />
          <circle cx="165" cy="100" r="3" fill="url(#circuitGradient)" />
          <circle cx="100" cy="165" r="3" fill="url(#circuitGradient)" />
          <circle cx="35" cy="100" r="3" fill="url(#circuitGradient)" />
          
          {/* Circuit connections */}
          <path d="M 100 35 L 120 55 L 140 45 M 165 100 L 145 120 L 155 140" strokeLinecap="round" />
          <path d="M 100 165 L 80 145 L 60 155 M 35 100 L 55 80 L 45 60" strokeLinecap="round" />
          
          {/* Inner circuit elements */}
          <circle cx="130" cy="70" r="2" fill="url(#circuitGradient)" opacity="0.8" />
          <circle cx="70" cy="130" r="2" fill="url(#circuitGradient)" opacity="0.8" />
          <circle cx="130" cy="130" r="2" fill="url(#circuitGradient)" opacity="0.8" />
          <circle cx="70" cy="70" r="2" fill="url(#circuitGradient)" opacity="0.8" />
          
          {/* Connecting lines for inner circuit */}
          <line x1="70" y1="70" x2="100" y2="62.5" strokeWidth="1" opacity="0.4" />
          <line x1="130" y1="70" x2="100" y2="62.5" strokeWidth="1" opacity="0.4" />
          <line x1="70" y1="130" x2="100" y2="137.5" strokeWidth="1" opacity="0.4" />
          <line x1="130" y1="130" x2="100" y2="137.5" strokeWidth="1" opacity="0.4" />
        </g>
        
        {/* Central highlight */}
        <circle 
          cx="100" 
          cy="100" 
          r="8" 
          fill="#FFFFFF" 
          opacity="0.9"
        />
        
        <circle 
          cx="100" 
          cy="100" 
          r="4" 
          fill="url(#mainGradient)" 
          opacity="0.8"
        />
      </svg>
    </div>
  )
}
