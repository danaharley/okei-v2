import * as z from "zod";
import { User } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { LoginSchema } from "./schema";

export type InputType = z.output<typeof LoginSchema>;
export type ReturnType = ActionState<InputType, User>;
