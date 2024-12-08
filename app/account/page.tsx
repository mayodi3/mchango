import { createSessionClient, getLoggedInUser } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

async function signOut() {
  "use server";

  const { account } = await createSessionClient();

  (await cookies()).delete(process.env.NEXT_PUBLIC_APPWRITE_SESSION_SECRET!);
  await account.deleteSession("current");

  redirect("/");
}

const AccountPage = async () => {
  const user = await getLoggedInUser();

  if (!user) redirect("/signup");

  return (
    <div>
      <ul>
        <li>
          <strong>Email:</strong> {user.email}
        </li>
        <li>
          <strong>Name:</strong> {user.name}
        </li>
        <li>
          <strong>ID: </strong> {user.$id}
        </li>
      </ul>

      <form action={signOut}>
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
};

export default AccountPage;
