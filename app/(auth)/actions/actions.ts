"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ID } from "node-appwrite";
import { AuthActionState, signInSchema, signUpSchema } from "../types";

export async function signUpWithEmail(
  prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const result = signUpSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password, name } = result.data;

  try {
    const { account } = await createAdminClient();

    await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set(
      process.env.NEXT_PUBLIC_APPWRITE_SESSION_SECRET!,
      session.secret,
      {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      }
    );
  } catch (error) {
    console.error(error);
    return {
      errors: {
        _form: ["Failed to create account. Please try again."],
      },
    };
  }

  if (result.success) redirect("/dashboard");
  return { errors: {} };
}

export async function signInWithEmail(
  prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const result = signInSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) return { errors: result.error.flatten().fieldErrors };

  const { email, password } = result.data;

  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set(
      process.env.NEXT_PUBLIC_APPWRITE_SESSION_SECRET!,
      session.secret,
      {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      }
    );
  } catch (error) {
    console.error(error);
    return {
      errors: { _form: ["Invalid email or password. Please try again."] },
    };
  }

  if (result.success) redirect("/dashboard");
  return { errors: {} };
}

export async function signOut() {
  const { account } = await createSessionClient();

  (await cookies()).delete(process.env.NEXT_PUBLIC_APPWRITE_SESSION_SECRET!);
  await account.deleteSession("current");

  redirect("/");
}
