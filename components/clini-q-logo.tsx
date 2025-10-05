import React from "react"
import Image from "next/image"

interface CliniQLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function CliniQLogo({ size = "md", className = "" }: CliniQLogoProps) {
  const sizeMap = {
    sm: { w: 32, h: 32 },
    md: { w: 48, h: 48 },
    lg: { w: 64, h: 64 },
    xl: { w: 96, h: 96 },
  } as const

  const { w, h } = sizeMap[size]

  return (
    <Image 
      src="/brand/logo.png"
      alt="Clini-Q logo"
      width={w}
      height={h}
      className={className}
      priority
    />
  )
}
