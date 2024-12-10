"use client";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/client";
import { useActionState, useEffect, useRef, useState } from "react";
import Message from "@/components/Message";
import { Button } from "@/components/ui/button";
import { sendMessage } from "@/lib/form-action";
import { useFormStatus } from "react-dom";
import Submit from "@/components/Submit";
import { time } from "console";

const initialState = {
  message: "",
};

export default function Index() {
  const [actualUserId, setActualUserId] = useState<string | undefined>();
  const [messages, setMessages] = useState<any[]>([]);
  const [state, formAction] = useActionState(sendMessage, initialState);
  const { pending } = useFormStatus();
  const chat = useRef<HTMLElement>(null);
  const supabase = createClient();
  useEffect(() => {
    supabase
      .from("message")
      .select()
      .limit(30)
      .order("id", { ascending: false })
      .then((res) => {
        setMessages(res.data!);
      });
    supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "message",
        },
        (payload) => {
          setMessages((prev) => {
            return [payload.new, ...prev];
          });
        },
      )
      .subscribe();
    supabase.auth.getUser().then((res) => setActualUserId(res.data.user?.id));
  }, []);

  return (
    <main className="h-dvh flex flex-col justify-center items-center gap-1">
      <header className="flex justify-between items-center w-[350px]">
        <h1 className="font-semibold text-4xl">Live Chat</h1>
        <AuthButton />
      </header>
      <section
        ref={chat}
        className="h-[70dvh] w-[350px] border rounded p-4 overflow-y-auto flex flex-col items-start gap-2 scroll-smooth"
      >
        {messages
          .toReversed()
          ?.map((m) => (
            <Message key={m.id} id={m.id} user_id={m.user_id} msg={m.msg} />
          ))}
      </section>
      {actualUserId ? (
        <form
          action={formAction}
          className={"flex justify-between items-center w-[350px] gap-2"}
        >
          <input
            name="msg"
            className="border rounded h-10 w-full"
            required
            maxLength={400}
          />
          <Submit />
        </form>
      ) : (
        <p>Sign In to send messages</p>
      )}
      <p aria-live="polite">{state?.message}</p>
    </main>
  );
}
