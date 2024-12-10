"use client";
import { signInWithGoogle } from "@/lib/auth-actions";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import { signout } from "@/lib/auth-actions";
import { useEffect, useState } from "react";

function GoogleLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-brand-google"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M20.945 11a9 9 0 1 1 -3.284 -5.997l-2.655 2.392a5.5 5.5 0 1 0 2.119 6.605h-4.125v-3h7.945z" />
    </svg>
  );
}

export default function () {
  const [user, setUser] = useState<any | null>(null);
  const supabase = createClient();
  useEffect(() => {
    supabase.auth.getUser().then((info) => {
      setUser(info.data.user);
    });
  }, []);

  return user ? (
    <>
      <Button type="button" variant="outline" onClick={signout}>
        Log Out
      </Button>
    </>
  ) : (
    <Button type="button" variant="outline" onClick={signInWithGoogle}>
      Sign In <GoogleLogo />
    </Button>
  );
}
