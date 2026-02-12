import { t } from "elysia";
import { BookStatus } from "@/provider/database/prismabox/BookStatus";

export const bookSchema = {
    id: t.Number(),
    title: t.String(),
    author: t.Optional(t.String()),
    status: t.Enum(BookStatus),
}

export const bookCreateSchema = {
    title: t.String(),
    author: t.Optional(t.String()),
    status: t.Enum(BookStatus),
}

export const bookUpdateSchema = {
    title: t.Optional(t.String()),
    author: t.Optional(t.String()),
    status: t.Optional(t.Enum(BookStatus)),
}

export type Book = typeof bookSchema;
export type BookCreate = typeof bookCreateSchema;
export type BookUpdate = typeof bookUpdateSchema;