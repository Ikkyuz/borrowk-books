import prisma from "@/provider/database/database.provider";
import { BorrowingCreate, BorrowingUpdate } from "./borrowing.schema";

export namespace BorrowingRepository {
  export async function findAll() {
    return await prisma.borrowing.findMany({
      include: {
        member: true,
        book: true,
      },
    });
  }

  export async function findById(id: number) {
    return await prisma.borrowing.findUnique({
      where: { id },
      include: {
        member: true,
        book: true,
      },
    });
  }

  export async function findByMemberId(memberId: number) {
    return await prisma.borrowing.findMany({
      where: { memberId },
      include: {
        book: true,
      },
      orderBy: { borrowDate: "desc" },
    });
  }

  export async function findActive() {
    return await prisma.borrowing.findMany({
      where: { returnDate: null },
      include: {
        member: true,
        book: true,
      },
      orderBy: { borrowDate: "desc" },
    });
  }

  export async function create(data: BorrowingCreate) {
    return await prisma.borrowing.create({
      data: {
        memberId: data.memberId,
        bookId: data.bookId,
        borrowDate: new Date(),
      },
    });
  }

  export async function update(id: number, data: BorrowingUpdate) {
    return await prisma.borrowing.update({
      where: { id },
      data: {
        ...data,
        borrowDate: data.borrowDate ? new Date(data.borrowDate) : undefined,
        returnDate: data.returnDate ? new Date(data.returnDate) : undefined,
      },
    });
  }

  export async function remove(id: number) {
    return await prisma.borrowing.delete({ where: { id } });
  }
}
