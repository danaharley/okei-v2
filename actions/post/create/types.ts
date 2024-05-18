import * as z from "zod";
import { Post } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { CreatePostSchema } from "./schema";

export type InputType = z.output<typeof CreatePostSchema>;
export type ReturnType = ActionState<InputType, Post>;
