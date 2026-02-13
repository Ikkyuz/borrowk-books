import { Elysia, t } from "elysia";
import { BorrowingService } from "./borrowing.service";
import { borrowingCreateSchema, BorrowingSchema } from "./borrowing.schema";

export namespace BorrowingController {
    export const routes = new Elysia({ prefix: "/borrowings" })
        .get("/", () => BorrowingService.getBorrowings(), {
            response: t.Array(BorrowingSchema),
            detail: { tags: ["Borrowing"] }
        })
        .get("/:id", ({ params: { id } }) => BorrowingService.getBorrowingById(Number(id)), {
            params: t.Object({ id: t.String() }),
            response: BorrowingSchema,
            detail: { tags: ["Borrowing"] }
        })
        .post("/borrow", ({ body }) => BorrowingService.borrowBook(body), {
            body: borrowingCreateSchema,
            response: BorrowingSchema,
            detail: { tags: ["Borrowing"] }
        })
        .post("/return/:id", ({ params: { id } }) => BorrowingService.returnBook(Number(id)), {
            params: t.Object({ id: t.String() }),
            response: BorrowingSchema,
            detail: { tags: ["Borrowing"] }
        });
}
