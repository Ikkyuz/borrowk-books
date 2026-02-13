import { Elysia, t } from "elysia";
import { BorrowingService } from "./borrowing.service";
import { borrowingCreateSchema, BorrowingSchema } from "./borrowing.schema";
import { getAuthPayload, verifyAdmin, verifyUser } from "@/shared/middleware/auth";

export namespace BorrowingController {
    export const routes = new Elysia({ prefix: "/borrowings" })
        .get("/", async ({ jwt, request: { headers } }) => {
            await verifyAdmin(jwt, headers);
            return BorrowingService.getBorrowings();
        }, {
            response: t.Array(BorrowingSchema),
            detail: { tags: ["Borrowing"] }
        })
        .get("/active", async ({ jwt, request: { headers } }) => {
            await verifyAdmin(jwt, headers);
            return BorrowingService.getActiveBorrowings();
        }, {
            response: t.Array(BorrowingSchema),
            detail: { tags: ["Borrowing"] }
        })
        .get("/history/:memberId", async ({ params: { memberId }, jwt, request: { headers } }) => {
            await verifyUser(jwt, headers, Number(memberId));
            return BorrowingService.getMemberHistory(Number(memberId));
        }, {
            params: t.Object({ memberId: t.String() }),
            response: t.Array(BorrowingSchema),
            detail: { tags: ["Borrowing"] }
        })
        .get("/:id", async ({ params: { id }, jwt, request: { headers } }) => {
            await getAuthPayload(jwt, headers);
            return BorrowingService.getBorrowingById(Number(id));
        }, {
            params: t.Object({ id: t.String() }),
            response: BorrowingSchema,
            detail: { tags: ["Borrowing"] }
        })
        .post("/borrow", async ({ body, jwt, request: { headers } }) => {
            await verifyUser(jwt, headers, body.memberId);
            return BorrowingService.borrowBook(body);
        }, {
            body: borrowingCreateSchema,
            response: BorrowingSchema,
            detail: { tags: ["Borrowing"] }
        })
        .post("/return/:id", async ({ params: { id }, jwt, request: { headers } }) => {
            await getAuthPayload(jwt, headers);
            return BorrowingService.returnBook(Number(id));
        }, {
            params: t.Object({ id: t.String() }),
            response: BorrowingSchema,
            detail: { tags: ["Borrowing"] }
        });
}
