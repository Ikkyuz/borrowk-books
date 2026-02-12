import { Member } from './../../provider/database/prismabox/Member';
import { t } from "elysia";
import { Role } from "@/provider/database/prismabox/Role";

export const memberSchema = {
    id: t.Number(),
    username: t.String(),
    password: t.String(),
    fullName: t.String(),
    role: t.Enum(Role),
}

export const memberCreateSchema = {
    username: t.String(),
    password: t.String(),
    fullName: t.String(),
    role: t.Enum(Role),
}

export const memberUpdateSchema = {
    username: t.Optional(t.String()),
    password: t.Optional(t.String()),
    fullName: t.Optional(t.String()),
    role: t.Optional(t.Enum(Role)),
}

export const memberLoginSchema = {
    username: t.String(),
    password: t.String(),
}

export type Member = typeof memberSchema;
export type MemberCreate = typeof memberCreateSchema;
export type MemberUpdate = typeof memberUpdateSchema;