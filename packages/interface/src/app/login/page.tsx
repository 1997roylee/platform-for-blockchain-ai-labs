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
        className="flex flex-col gap-6"
      >
        <p className="text-2xl font-medium text-center">Login your account</p>
        <Button size="lg" type="submit" className="w-64">
          Login with Google
        </Button>
      </form>
    </div>
  );
}
