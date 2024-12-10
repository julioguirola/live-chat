import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function () {
  const { pending } = useFormStatus();

  return <Button disabled={pending}>Send</Button>;
}
