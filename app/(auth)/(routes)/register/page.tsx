import Link from "next/link";

import { RegisterForm } from "@/components/form/register-form";
import { Logo } from "@/components/logo";

const RegisterPage = () => {
  return (
    <div className="flex w-full max-w-96 flex-col items-center">
      <Logo className="h-16 w-16" />
      <div className="w-full space-y-2.5 p-5">
        <p className="pb-1 text-center text-base font-semibold text-okei-primary">
          Create your account
        </p>
        <RegisterForm />
        <div className="text-sm font-light text-okei-secondary">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-okei-primary underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
