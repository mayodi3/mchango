import { signOut } from "@/app/(auth)/actions/actions";
import { Button } from "@/components/ui/button";
import { getLoggedInUser } from "@/lib/appwrite";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

const SignOut = async () => {
  const user = await getLoggedInUser();

  if (!user) redirect("/");

  return (
    <form action={signOut}>
      <Button type="submit">
        <span>Sign Out</span>
        <LogOut />
      </Button>
    </form>
  );
};

export default SignOut;
