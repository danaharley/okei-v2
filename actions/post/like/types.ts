import * as z from "zod";
import { Like } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { LikePostSchema } from "./schema";

export type InputType = z.output<typeof LikePostSchema>;
export type ReturnType = ActionState<InputType, Like>;
