import * as z from "zod";
import { Comment } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { DeleteCommentSchema } from "./schema";

export type InputType = z.output<typeof DeleteCommentSchema>;
export type ReturnType = ActionState<InputType, Comment>;
