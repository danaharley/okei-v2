import * as z from "zod";
import { Follow } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { FollowSchema } from "./schema";

export type InputType = z.output<typeof FollowSchema>;
export type ReturnType = ActionState<InputType, Follow>;
