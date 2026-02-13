import { t, Static } from "elysia";

export const BorrowingSchema = t.Object({
  id: t.Number(),
  memberId: t.Number(),
  bookId: t.Number(),
  borrowDate: t.String({ format: "date-time" }),
  returnDate: t.Optional(t.Nullable(t.String({ format: "date-time" }))),
});

export const borrowingCreateSchema = t.Omit(BorrowingSchema, [
  "id",
  "borrowDate",
  "returnDate",
]);
export const borrowingUpdateSchema = t.Partial(t.Omit(BorrowingSchema, ["id"]));

export type Borrowing = Static<typeof BorrowingSchema>;
export type BorrowingCreate = Static<typeof borrowingCreateSchema>;
export type BorrowingUpdate = Static<typeof borrowingUpdateSchema>;
