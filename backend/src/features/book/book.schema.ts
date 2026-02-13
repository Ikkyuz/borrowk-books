import { t, Static } from "elysia";
import { BookStatus } from "@/provider/database/generated/enums";

export const BookSchema = t.Object({
  id: t.Number(),
  title: t.String(),
  author: t.Optional(t.Nullable(t.String())),
  status: t.Enum(BookStatus),
});

export const bookCreateUpdateSchema = t.Omit(BookSchema, ["id"]);

export type Book = Static<typeof BookSchema>;
export type BookCreateUpdate = Static<typeof bookCreateUpdateSchema>;
