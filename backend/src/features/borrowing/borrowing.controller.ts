import { Elysia, t } from "elysia";
import { BorrowingService } from "./borrowing.service";
import { borrowingCreateSchema } from "./borrowing.schema";

export namespace BorrowingController {
    export const routes = new Elysia({ prefix: "/borrowings" })
        .get("/", () => BorrowingService.getBorrowings())
        .get("/:id", ({ params: { id } }) => BorrowingService.getBorrowingById(Number(id)), {
            params: t.Object({ id: t.String() })
        })
        .post("/borrow", ({ body }) => BorrowingService.borrowBook(body), {
            body: borrowingCreateSchema
        })
        .post("/return/:id", ({ params: { id } }) => BorrowingService.returnBook(Number(id)), {
            params: t.Object({ id: t.String() })
        });
}
