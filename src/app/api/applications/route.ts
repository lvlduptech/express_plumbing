import { NextRequest, NextResponse } from 'next/server'
import { createJobApplication } from '@/lib/jobs'
import { emailService } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['jobId', 'firstName', 'lastName', 'email', 'phone']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Create the job application with all the new fields
    const application = await createJobApplication({
      jobId: body.jobId,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      dateOfBirth: body.dateOfBirth,
      streetAddress: body.streetAddress,
      city: body.city,
      state: body.state,
      zipCode: body.zipCode,
      availabilityType: body.availabilityType,
      mondayAvailable: body.mondayAvailable || false,
      tuesdayAvailable: body.tuesdayAvailable || false,
      wednesdayAvailable: body.wednesdayAvailable || false,
      thursdayAvailable: body.thursdayAvailable || false,
      fridayAvailable: body.fridayAvailable || false,
      saturdayAvailable: body.saturdayAvailable || false,
      sundayAvailable: body.sundayAvailable || false,
      hasReliableTransportation: body.hasReliableTransportation || false,
      canTravel: body.canTravel || false,
      canRelocate: body.canRelocate || false,
      isAtLeast18: body.isAtLeast18 || false,
      canProvideWorkAuth: body.canProvideWorkAuth || false,
      canPerformJobFunctions: body.canPerformJobFunctions || false,
      coverLetter: body.coverLetter,
      resumeUrl: body.resumeUrl,
      resumeFileName: body.resumeFileName,
      digitalSignature: body.digitalSignature,
      agreementAccepted: body.agreementAccepted || false,
      status: 'PENDING',
    })

    // Send email notification to admin
    try {
      // Get job details for the email
      const jobResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/jobs/${body.jobId}`)
      const job = await jobResponse.json()
      
      await emailService.sendJobApplicationNotification(
        `${body.firstName} ${body.lastName}`,
        job.title || 'Unknown Position',
        body.email,
        body.phone,
        body.coverLetter,
        body.resumeUrl
      )
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError)
      // Don't fail the application creation if email fails
    }

    return NextResponse.json(application, { status: 201 })
  } catch (error) {
    console.error('Error creating job application:', error)
    return NextResponse.json({ error: 'Failed to create job application' }, { status: 500 })
  }
}

