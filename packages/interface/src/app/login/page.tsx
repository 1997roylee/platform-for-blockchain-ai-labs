import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth";

export default function SignIn() {
  return (
    <div className="mx-auto max-w-md flex items-center justify-center h-full">
      <form
        action={async () => {
          "use server";
          await signIn("google", {
            redirectTo: "/",
          });
        }}
        className="flex flex-col gap-3"
      >
        <p className="text-center">
          Talk to the best AI models like ChatGPT, GPT-4o, Claude 3.5 Sonnet,
          FLUX1.1, and millions of others - all on Poe.
        </p>
        <Button size="lg" type="submit">
          Login with Google
        </Button>
      </form>
    </div>
  );
}
