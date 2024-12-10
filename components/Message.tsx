"use client";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface MsgProps {
  id: number;
  user_id: string;
  msg: string;
}

export default function Message({ id, user_id, msg }: MsgProps) {
  const [userInfo, setUserInfo] = useState<{
    full_name: string;
    avatar_url: string;
  }>();
  const supabase = createClient();
  useEffect(() => {
    const req = supabase
      .from("profiles")
      .select()
      .eq("id", user_id)
      .then((res) => {
        const props = res.data![0];
        setUserInfo({
          full_name: props.full_name,
          avatar_url: props.avatar_url,
        });
      });
  }, []);

  return userInfo ? (
    <div className={"flex flex-col bg-gray-300 gap-1 rounded-md w-fit p-3"}>
      <div className="flex justify-start gap-2 items-center">
        <Image
          src={userInfo.avatar_url}
          width={30}
          height={30}
          className="rounded-full"
          alt={`${userInfo.full_name} avatar`}
        />
        <span className="font-bold">{userInfo.full_name}</span>
      </div>
      <p>{msg}</p>
    </div>
  ) : (
    <></>
  );
}
