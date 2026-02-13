import { t, Static } from "elysia";
import { BookSchema } from "../book/book.schema";
import { MemberResponseSchema } from "../member/member.schema";

export const BorrowingSchema = t.Object({
  id: t.Number(),
  memberId: t.Number(),
  bookId: t.Number(),
  borrowDate: t.Date(),
  returnDate: t.Optional(t.Nullable(t.Date())),
  book: t.Optional(BookSchema),
  member: t.Optional(MemberResponseSchema),
});

export const borrowingCreateSchema = t.Omit(BorrowingSchema, [
  "id",
  "borrowDate",
  "returnDate",
  "book",
  "member"
]);
export const borrowingUpdateSchema = t.Partial(t.Omit(BorrowingSchema, ["id"]));

export type Borrowing = Static<typeof BorrowingSchema>;
export type BorrowingCreate = Static<typeof borrowingCreateSchema>;
export type BorrowingUpdate = Static<typeof borrowingUpdateSchema>;
