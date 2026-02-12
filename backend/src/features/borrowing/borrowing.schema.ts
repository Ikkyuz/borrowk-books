import { t } from "elysia";

export const borrowingSchema = {
    id: t.Number(),
    memberId: t.Number(),
    bookId: t.Number(),
    borrowDate: t.Date(),
    returnDate: t.Optional(t.Date()),
}

export const borrowingCreateSchema = {
    memberId: t.Number(),
    bookId: t.Number(),
    borrowDate: t.Date(),
    returnDate: t.Optional(t.Date()),
}

export const borrowingUpdateSchema = {
    memberId: t.Optional(t.Number()),
    bookId: t.Optional(t.Number()),
    borrowDate: t.Optional(t.Date()),
    returnDate: t.Optional(t.Date()),
}

export type Borrowing = typeof borrowingSchema;
export type BorrowingCreate = typeof borrowingCreateSchema;
export type BorrowingUpdate = typeof borrowingUpdateSchema;