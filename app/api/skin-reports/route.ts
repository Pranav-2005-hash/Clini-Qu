import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { ObjectId } from "mongodb"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { db } = await connectToDatabase()
    
    // Get user data
    const user = await db.collection("users").findOne({ email: session.user.email })
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const body = await request.json()
    const { conditions, recommendations, urgentNotes, imageData, reportName } = body

    // Validate required fields
    if (!conditions || !recommendations) {
      return NextResponse.json({ 
        error: "Missing required fields: conditions and recommendations" 
      }, { status: 400 })
    }

    // Create the report document
    const reportDocument = {
      userId: user._id,
      userEmail: user.email,
      userName: user.name,
      reportName: reportName || `Skin Analysis - ${new Date().toLocaleDateString()}`,
      conditions,
      recommendations,
      urgentNotes: urgentNotes || [],
      imageData, // Store the base64 image data (optional)
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Save to database
    const result = await db.collection("skinReports").insertOne(reportDocument)
    
    return NextResponse.json({
      success: true,
      reportId: result.insertedId,
      message: "Report saved successfully"
    })

  } catch (error) {
    console.error("Error saving skin report:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { db } = await connectToDatabase()
    
    // Get user data
    const user = await db.collection("users").findOne({ email: session.user.email })
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Get all reports for the user
    const reports = await db.collection("skinReports")
      .find({ userId: user._id })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({
      success: true,
      reports: reports.map(report => ({
        id: report._id,
        reportName: report.reportName,
        conditions: report.conditions,
        recommendations: report.recommendations,
        urgentNotes: report.urgentNotes,
        createdAt: report.createdAt,
        updatedAt: report.updatedAt
      }))
    })

  } catch (error) {
    console.error("Error fetching skin reports:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const reportId = searchParams.get('id')

    if (!reportId) {
      return NextResponse.json({ error: "Report ID required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()
    
    // Get user data
    const user = await db.collection("users").findOne({ email: session.user.email })
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Delete the report (only if it belongs to the user)
    const result = await db.collection("skinReports").deleteOne({
      _id: new ObjectId(reportId),
      userId: user._id
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Report not found or unauthorized" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Report deleted successfully"
    })

  } catch (error) {
    console.error("Error deleting skin report:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}