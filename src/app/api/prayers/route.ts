import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const author_name = formData.get("author_name") as string;
    const content = formData.get("content") as string;

    if (!author_name || !content) {
      return NextResponse.redirect(new URL("/prayer-wall?error=Missing+fields", request.url), { status: 303 });
    }

    const supabase = await createClient();

    // Insert prayer request (is_approved defaults to false in DB schema, or we can explicitly set it)
    const { error } = await supabase
      .from("prayers")
      .insert([
        {
          author_name,
          content,
          is_approved: false // Explicitly set to false so it requires moderation
        }
      ]);

    if (error) {
      console.error("Error submitting prayer:", error);
      return NextResponse.redirect(new URL("/prayer-wall?error=Submission+failed", request.url), { status: 303 });
    }

    return NextResponse.redirect(new URL("/prayer-wall?success=true", request.url), { status: 303 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.redirect(new URL("/prayer-wall?error=Unexpected+error", request.url), { status: 303 });
  }
}
