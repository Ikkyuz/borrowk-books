import { Elysia } from "elysia";
import { BookController } from "./book/book.controller";
import { MemberController } from "./member/member.controller";
import { BorrowingController } from "./borrowing/borrowing.controller";

export const appFeatures = new Elysia({ prefix: "/api" })
    .use(BookController.routes)
    .use(MemberController.routes)
    .use(BorrowingController.routes);
