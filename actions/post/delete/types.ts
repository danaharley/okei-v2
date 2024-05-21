import * as z from "zod";
import { Post } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { DeletePostSchema } from "./schema";

export type InputType = z.output<typeof DeletePostSchema>;
export type ReturnType = ActionState<InputType, Post>;
