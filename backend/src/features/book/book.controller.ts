import { Elysia, t } from "elysia";
import { BookService } from "./book.service";
import { bookCreateUpdateSchema, BookSchema } from "./book.schema";
import { verifyAdmin } from "@/shared/middleware/auth";

export namespace BookController {
    export const routes = new Elysia({ prefix: "/books" })
        .get("/", () => BookService.getBooks(), {
            response: t.Array(BookSchema),
            detail: { tags: ["Book"] }
        })
        .get("/available", () => BookService.getAvailableBooks(), {
            response: t.Array(BookSchema),
            detail: { tags: ["Book"] }
        })
        .get("/:id", ({ params: { id } }) => BookService.getBookById(Number(id)), {
            params: t.Object({ id: t.String() }),
            response: BookSchema,
            detail: { tags: ["Book"] }
        })
        .post("/", async ({ body, jwt, request: { headers } }) => {
            await verifyAdmin(jwt, headers);
            return BookService.createBook(body);
        }, {
            body: bookCreateUpdateSchema,
            response: BookSchema,
            detail: { tags: ["Book"] }
        })
        .put("/:id", async ({ params: { id }, body, jwt, request: { headers } }) => {
            await verifyAdmin(jwt, headers);
            return BookService.updateBook(Number(id), body);
        }, {
            params: t.Object({ id: t.String() }),
            body: t.Partial(bookCreateUpdateSchema),
            response: BookSchema,
            detail: { tags: ["Book"] }
        })
        .delete("/:id", async ({ params: { id }, jwt, request: { headers } }) => {
            await verifyAdmin(jwt, headers);
            return BookService.deleteBook(Number(id));
        }, {
            params: t.Object({ id: t.String() }),
            response: BookSchema,
            detail: { tags: ["Book"] }
        });
}
