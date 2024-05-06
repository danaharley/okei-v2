import * as z from "zod";
import { User } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { RegisterSchema } from "./schema";

export type InputType = z.output<typeof RegisterSchema>;
export type ReturnType = ActionState<InputType, User>;
