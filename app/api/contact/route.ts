import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY || 'placeholder');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type = 'contact', name, email, company, message, ...projectFields } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    let emailContent = '';
    let subject = '';

    if (type === 'project') {
      const { projectType, budget, timeline, description, goals, techRequirements, audience } =
        projectFields;

      // Validate project-specific required fields
      if (!projectType || !budget || !description) {
        return NextResponse.json(
          { error: 'Project type, budget, and description are required for project inquiries' },
          { status: 400 },
        );
      }

      subject = `New Project Inquiry: ${projectType} - ${name}`;
      emailContent = `
New Project Inquiry from ${name}

CONTACT INFORMATION:
Name: ${name}
Email: ${email}
Company: ${company || 'Not specified'}

PROJECT DETAILS:
Project Type: ${projectType}
Budget Range: ${budget}
Timeline: ${timeline || 'Not specified'}

PROJECT DESCRIPTION:
${description}

BUSINESS GOALS:
${goals || 'Not specified'}

TARGET AUDIENCE:
${audience || 'Not specified'}

TECHNICAL REQUIREMENTS:
${techRequirements || 'Not specified'}
      `.trim();
    } else {
      // Contact form
      if (!message) {
        return NextResponse.json(
          { error: 'Message is required for contact forms' },
          { status: 400 },
        );
      }

      subject = `New Contact Message from ${name}`;
      emailContent = `
Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}

Message:
${message}
      `.trim();
    }

    const result = await resend.emails.send({
      from: 'Contact Form <noreply@ciccarel.li>',
      to: ['m@ciccarel.li'],
      subject: subject,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>'),
      replyTo: email,
    });

    if (result.error) {
      console.error('Resend error:', result.error);
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
