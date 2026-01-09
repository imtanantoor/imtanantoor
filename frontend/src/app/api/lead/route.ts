import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type LeadSubmission = {
  name: string;
  email: string;
  project_type: string;
  project_stage: string;
  project_goal: string;
};

// Validate email format
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validate required fields
function validateSubmission(data: Partial<LeadSubmission>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.name || !data.name.trim()) {
    errors.push("Name is required");
  }

  if (!data.email || !data.email.trim()) {
    errors.push("Email is required");
  } else if (!isValidEmail(data.email)) {
    errors.push("Invalid email format");
  }

  if (!data.project_type || !data.project_type.trim()) {
    errors.push("Project type is required");
  }

  if (!data.project_stage || !data.project_stage.trim()) {
    errors.push("Project stage is required");
  }

  if (!data.project_goal || !data.project_goal.trim()) {
    errors.push("Project goal is required");
  } else if (data.project_goal.trim().length < 10) {
    errors.push("Project goal must be at least 10 characters");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Format project type for display
function formatProjectType(type: string): string {
  const types: Record<string, string> = {
    web: "Website / Web Application",
    mobile: "Mobile Application",
    saas: "SaaS Platform",
    other: "Other",
  };
  return types[type] || type;
}

// Format project stage for display
function formatProjectStage(stage: string): string {
  const stages: Record<string, string> = {
    idea: "Idea / Concept",
    planning: "Planning / Requirements",
    in_progress: "In Progress / Needs Help",
    redesign: "Redesign / Improvement",
  };
  return stages[stage] || stage;
}

// Create email body
function createEmailBody(data: LeadSubmission): string {
  return `New Project Inquiry Received

Contact Information:
- Name: ${data.name}
- Email: ${data.email}

Project Details:
- Project Type: ${formatProjectType(data.project_type)}
- Project Stage: ${formatProjectStage(data.project_stage)}
- Project Goal:
${data.project_goal}

---
This inquiry was submitted through the portfolio contact form.`;
}

export async function POST(request: NextRequest) {
  // Only allow POST requests
  if (request.method !== "POST") {
    return NextResponse.json(
      { error: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    // Parse request body
    const body = await request.json();
    const submission: Partial<LeadSubmission> = {
      name: body.name,
      email: body.email,
      project_type: body.project_type,
      project_stage: body.project_stage,
      project_goal: body.project_goal,
    };

    // Validate submission
    const validation = validateSubmission(submission);
    if (!validation.valid) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400 }
      );
    }

    // Get SMTP configuration from environment variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM || smtpUser;
    const smtpTo = process.env.SMTP_TO;

    // Validate SMTP configuration
    if (!smtpHost || !smtpUser || !smtpPass || !smtpTo) {
      console.error("SMTP configuration missing. Required: SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_TO");
      return NextResponse.json(
        { error: "Email service configuration error" },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Verify transporter configuration
    await transporter.verify();

    // Prepare email
    const emailSubject = `New Project Inquiry: ${formatProjectType(submission.project_type!)}`;
    const emailBody = createEmailBody(submission as LeadSubmission);

    // Send email
    await transporter.sendMail({
      from: smtpFrom,
      to: smtpTo,
      subject: emailSubject,
      text: emailBody,
    });

    // Return success response
    return NextResponse.json(
      { success: true, message: "Lead submission received successfully" },
      { status: 200 }
    );
  } catch (error) {
    // Log error for debugging (server-side only)
    console.error("Lead submission error:", error);

    // Return generic error to client
    return NextResponse.json(
      { error: "Failed to process lead submission. Please try again later." },
      { status: 500 }
    );
  }
}


