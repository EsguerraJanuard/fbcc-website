import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

// Create a supabase client with the service role to ensure insert works server-side
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Execute database insert and email send concurrently
    const dbPromise = supabase.from('contacts').insert([{ sender_name: name, sender_email: email, message: message }]);
    
    const emailPromise = process.env.RESEND_API_KEY 
      ? new Resend(process.env.RESEND_API_KEY).emails.send({
          from: 'FBCC Website <onboarding@resend.dev>',
          to: ['frstbccabalantian@gmail.com'], // Primary recipient
          cc: ['esguerrajanuarddd@gmail.com'], // CC additional admins here
          subject: `New Contact Form Submission from ${name}`,
          replyTo: email,
          text: `You have received a new message from the FBCC Website contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        })
      : Promise.resolve({ error: null });

    const [dbResult, emailResult] = await Promise.allSettled([dbPromise, emailPromise]);

    const dbFailed = dbResult.status === 'rejected' || (dbResult.status === 'fulfilled' && dbResult.value.error);
    const emailFailed = emailResult.status === 'rejected' || (emailResult.status === 'fulfilled' && emailResult.value.error);

    if (dbFailed && emailFailed) {
      return NextResponse.json({ error: 'Failed to save and send message' }, { status: 500 });
    } else if (dbFailed) {
      return NextResponse.json({ success: true, warning: 'Email sent but failed to save to database' });
    } else if (emailFailed) {
      return NextResponse.json({ success: true, warning: 'Saved to database but failed to send email' });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
