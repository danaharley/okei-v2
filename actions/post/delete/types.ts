import * as z from "zod";
import { Post } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { DeletePost } from "./schema";

export type InputType = z.output<typeof DeletePost>;
export type ReturnType = ActionState<InputType, Post>;
