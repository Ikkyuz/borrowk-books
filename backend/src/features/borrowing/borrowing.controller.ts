import { Elysia, t } from "elysia";
import { BorrowingService } from "./borrowing.service";
import { borrowingCreateSchema, BorrowingSchema } from "./borrowing.schema";
import { authMiddleware } from "@/shared/middleware/auth";

export namespace BorrowingController {
    export const routes = new Elysia({ prefix: "/borrowings" })
        .get("/", async ({ isAdmin }) => {
            await isAdmin();
            return BorrowingService.getBorrowings();
        }, {
            response: t.Array(BorrowingSchema),
            detail: { tags: ["Borrowing"] }
        })
        .get("/active", async ({ isAdmin }) => {
            await isAdmin();
            return BorrowingService.getActiveBorrowings();
        }, {
            response: t.Array(BorrowingSchema),
            detail: { tags: ["Borrowing"] }
        })
        .get("/history/:memberId", async ({ params: { memberId }, isUser }) => {
            await isUser(Number(memberId));
            return BorrowingService.getMemberHistory(Number(memberId));
        }, {
            params: t.Object({ memberId: t.String() }),
            response: t.Array(BorrowingSchema),
            detail: { tags: ["Borrowing"] }
        })
        .get("/:id", async ({ params: { id }, checkAuth }) => {
            await checkAuth();
            return BorrowingService.getBorrowingById(Number(id));
        }, {
            params: t.Object({ id: t.String() }),
            response: BorrowingSchema,
            detail: { tags: ["Borrowing"] }
        })
        .post("/borrow", async ({ body, isUser }) => {
            await isUser(body.memberId);
            return BorrowingService.borrowBook(body);
        }, {
            body: borrowingCreateSchema,
            response: BorrowingSchema,
            detail: { tags: ["Borrowing"] }
        })
        .post("/return/:id", async ({ params: { id }, checkAuth }) => {
            await checkAuth();
            return BorrowingService.returnBook(Number(id));
        }, {
            params: t.Object({ id: t.String() }),
            response: BorrowingSchema,
            detail: { tags: ["Borrowing"] }
        });
}
