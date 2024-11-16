import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth";

export default function SignIn() {
  return (
    <div className="container mx-auto flex items-center justify-center">
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <Button size="lg" type="submit">
          Login with Google
        </Button>
      </form>
    </div>
  );
}
