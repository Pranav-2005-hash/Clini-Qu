"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import RoutineTab from "@/components/RoutineTab"
import Link from "next/link"
import { AlertTriangle, RefreshCw, Stethoscope } from "lucide-react"

export default function RoutineGeneratorPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [latestDiagnosis, setLatestDiagnosis] = useState<{ name: string; confidence?: number } | null>(null)
  const [allDiagnoses, setAllDiagnoses] = useState<Array<{ name: string; confidence?: number }>>([])
  const [initialRoutine, setInitialRoutine] = useState<{ morning: string[]; evening: string[]; note: string } | null>(null)

  // Fetch latest skin report to get diagnosis
  useEffect(() => {
    const fetchLatestReport = async () => {
      try {
        const res = await fetch('/api/skin-reports')
        if (!res.ok) {
          return
        }
        const data = await res.json()
        const latest = (data.reports || [])[0]
        if (latest && Array.isArray(latest.conditions) && latest.conditions.length) {
          // pick highest confidence
          const sorted = [...latest.conditions].sort((a: any, b: any) => (b.confidence || 0) - (a.confidence || 0))
          setLatestDiagnosis({ name: sorted[0].name, confidence: sorted[0].confidence })
          setAllDiagnoses(sorted.map((c: any) => ({ name: c.name, confidence: c.confidence })))
        } else {
          setLatestDiagnosis(null)
        }
      } catch (e) {
        // ignore
      }
    }
    fetchLatestReport()
  }, [])

  const generateFromDiagnosis = async () => {
    setLoading(true)
    setError(null)
    try {
      // Fetch user profile for context
      const profileRes = await fetch('/api/user/profile')
      let profile: any = {}
      if (profileRes.ok) {
        const p = await profileRes.json()
        profile = p?.profile || {}
      }

      const payload = {
        skinType: profile.skinType || "",
        score: profile.sensitivity ? Number(profile.sensitivity) : 50,
        climate: profile.location || "",
        skinConcerns: profile.concerns || [],
        steps: 5,
        times: 2,
        diagnosedDisease: latestDiagnosis?.name || "",
        diagnosisDetails: allDiagnoses,
      }

      const res = await fetch('/api/skincare-routine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'Failed to generate routine')
      }

      const data = await res.json()
      setInitialRoutine({
        morning: data.morningRoutine || [],
        evening: data.eveningRoutine || [],
        note: data.motivationalNote || ''
      })

      // Save as template for persistence
      try {
        await fetch('/api/dashboard/routines/template', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            morning: data.morningRoutine || [],
            evening: data.eveningRoutine || [],
            note: data.motivationalNote || '',
          })
        })
      } catch {}
    } catch (e: any) {
      setError(e.message || 'Generation failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Skincare Routine Generator</h1>
          <p className="text-gray-600">Generate a routine tailored to your latest AI diagnosis and profile.</p>
        </div>

        <Card className="border-pink-100 mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Latest Diagnosis</CardTitle>
            <CardDescription>
              {latestDiagnosis ? (
                <span>
                  {latestDiagnosis.name}
                  {typeof latestDiagnosis.confidence === 'number' && ` — ${latestDiagnosis.confidence}% confidence`}
                </span>
              ) : (
                <span>No saved diagnosis found. Run an analysis first.</span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            {!latestDiagnosis && (
              <Link href="/analyze-skin" className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 inline-flex items-center gap-2">
                <Stethoscope className="w-4 h-4" /> Analyze Skin Now
              </Link>
            )}
            <Button onClick={generateFromDiagnosis} disabled={loading || !latestDiagnosis} className="bg-pink-100 hover:bg-pink-200 text-pink-700 inline-flex items-center gap-2">
              {loading ? (<><RefreshCw className="w-4 h-4 animate-spin" /> Generating...</>) : 'Generate From Latest Diagnosis'}
            </Button>
            {error && (
              <span className="text-red-600 text-sm inline-flex items-center gap-1"><AlertTriangle className="w-4 h-4" /> {error}</span>
            )}
          </CardContent>
        </Card>

        {/* Show RoutineTab when ready, otherwise a hint */}
        {initialRoutine ? (
          <RoutineTab initialRoutine={initialRoutine} />
        ) : (
          <Card className="border-yellow-100">
            <CardContent className="p-6 text-center text-gray-600">
              The generated routine will appear here. You can edit, save as a template, and track completion.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}