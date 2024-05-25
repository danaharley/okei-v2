import * as z from "zod";
import { Comment } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { CommentPostSchema } from "./schema";

export type InputType = z.output<typeof CommentPostSchema>;
export type ReturnType = ActionState<InputType, Comment>;
