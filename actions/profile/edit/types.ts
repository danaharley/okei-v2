import * as z from "zod";
import { User } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { EditProfileSchema } from "./schema";

export type InputType = z.output<typeof EditProfileSchema>;
export type ReturnType = ActionState<InputType, User>;
