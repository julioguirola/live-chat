"use server";
import { createClient } from "@/utils/supabase/server";

export async function sendMessage(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const msg = formData.get("msg")?.toString();
  const userId = (await supabase.auth.getUser()).data.user?.id;
  console.log("form data", msg, userId);

  if (msg && userId) {
    const { error } = await supabase
      .from("message")
      .insert({ user_id: userId, msg: msg });
    if (error)
      return {
        message: error.details,
      };
  }
}
