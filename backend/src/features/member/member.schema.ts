import { t, Static } from "elysia";
import { Role } from "@/provider/database/generated/enums";

export const MemberSchema = t.Object({
    id: t.Number(),
    username: t.String(),
    password: t.String(),
    fullName: t.String(),
    role: t.Enum(Role),
});

export const memberCreateSchema = t.Omit(MemberSchema, ["id"]);
export const memberUpdateSchema = t.Partial(t.Omit(MemberSchema, ["id"]));
export const memberLoginSchema = t.Pick(MemberSchema, ["username", "password"]);

export type Member = Static<typeof MemberSchema>;
export type MemberCreate = Static<typeof memberCreateSchema>;
export type MemberUpdate = Static<typeof memberUpdateSchema>;
export type MemberLogin = Static<typeof memberLoginSchema>;
