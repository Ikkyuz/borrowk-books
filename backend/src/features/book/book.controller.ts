import { Elysia, t } from "elysia";
import { BookService } from "./book.service";
import { bookCreateUpdateSchema, BookSchema } from "./book.schema";

export namespace BookController {
    export const routes = new Elysia({ prefix: "/books" })
        .get("/", () => BookService.getBooks(), {
            response: t.Array(BookSchema),
            detail: { tags: ["Book"] }
        })
        .get("/:id", ({ params: { id } }) => BookService.getBookById(Number(id)), {
            params: t.Object({ id: t.String() }),
            response: BookSchema,
            detail: { tags: ["Book"] }
        })
        .post("/", ({ body }) => BookService.createBook(body), {
            body: bookCreateUpdateSchema,
            response: BookSchema,
            detail: { tags: ["Book"] }
        })
        .put("/:id", ({ params: { id }, body }) => BookService.updateBook(Number(id), body), {
            params: t.Object({ id: t.String() }),
            body: t.Partial(bookCreateUpdateSchema),
            response: BookSchema,
            detail: { tags: ["Book"] }
        })
        .delete("/:id", ({ params: { id } }) => BookService.deleteBook(Number(id)), {
            params: t.Object({ id: t.String() }),
            response: BookSchema,
            detail: { tags: ["Book"] }
        });
}
