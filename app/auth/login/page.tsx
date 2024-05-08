import Link from "next/link";

import { FormLogin } from "@/components/form/form-login";
import { Logo } from "@/components/logo";

const LoginPage = () => {
  return (
    <div className="flex w-full max-w-96 flex-col items-center">
      <Logo className="h-16 w-16" />
      <div className="w-full space-y-2.5 p-5">
        <p className="pb-1 text-center text-base font-semibold text-okei-primary">
          Log in to your account
        </p>
        <FormLogin />
        <div className="text-sm font-light text-okei-secondary">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-okei-primary underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
