import { NextResponse } from "next/server";

type VerifyResponse = {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
  score?: number;
  action?: string;
};

export async function POST(request: Request) {
  try {
    const { token } = (await request.json()) as { token?: string };
    if (!token) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      // Misconfiguration: no secret present
      return NextResponse.json({ success: false }, { status: 500 });
    }

    const params = new URLSearchParams();
    params.set("secret", secret);
    params.set("response", token);

    const googleRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      // Avoid caching
      next: { revalidate: 0 },
    });

    const verify: VerifyResponse = await googleRes.json();
    let ok = !!verify.success;

    // For v3, optionally evaluate score and action when provided
    if (ok && typeof verify.score === "number") {
      ok = verify.score >= 0.5; // basic threshold
    }
    if (ok && verify.action) {
      ok = verify.action === "whatsapp_submit";
    }

    return NextResponse.json({ success: ok });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}


