import { Elysia, t } from "elysia";
import { BookService } from "./book.service";
import { bookCreateUpdateSchema } from "./book.schema";

export namespace BookController {
    export const routes = new Elysia({ prefix: "/books" })
        .get("/", () => BookService.getBooks())
        .get("/:id", ({ params: { id } }) => BookService.getBookById(Number(id)), {
            params: t.Object({ id: t.String() })
        })
        .post("/", ({ body }) => BookService.createBook(body), {
            body: bookCreateUpdateSchema
        })
        .put("/:id", ({ params: { id }, body }) => BookService.updateBook(Number(id), body), {
            params: t.Object({ id: t.String() }),
            body: t.Partial(bookCreateUpdateSchema)
        })
        .delete("/:id", ({ params: { id } }) => BookService.deleteBook(Number(id)), {
            params: t.Object({ id: t.String() })
        });
}
