import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY || 'placeholder');

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, message, _t } = await request.json();

    // Reject if submitted faster than 3 seconds after page load
    if (typeof _t === 'number' && Date.now() - _t < 3000) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const subject = `New Contact Message from ${name}`;
    const emailContent = `
Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}

Message:
${message}
    `.trim();

    const result = await resend.emails.send({
      from: 'Contact Form <noreply@ciccarel.li>',
      to: ['m@ciccarel.li'],
      subject,
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
