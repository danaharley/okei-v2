import * as z from "zod";
import { Comment } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { CreateCommentSchema } from "./schema";

export type InputType = z.output<typeof CreateCommentSchema>;
export type ReturnType = ActionState<InputType, Comment>;
