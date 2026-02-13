import prisma from "@/provider/database/database.provider";
import { BookCreateUpdate } from "./book.schema";

export namespace BookRepository {
  export async function findAll() {
    return await prisma.book.findMany();
  }

  export async function findById(id: number) {
    return await prisma.book.findUnique({ where: { id } });
  }

  export async function findAvailable() {
    return await prisma.book.findMany({
      where: { status: "available" },
    });
  }

  export async function create(data: BookCreateUpdate) {
    return await prisma.book.create({ data });
  }

  export async function update(id: number, data: Partial<BookCreateUpdate>) {
    return await prisma.book.update({
      where: { id },
      data,
    });
  }

  export async function remove(id: number) {
    return await prisma.book.delete({ where: { id } });
  }
}
