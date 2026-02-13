import { BorrowingRepository } from "./borrowing.repository";
import { BookRepository } from "../book/book.repository";
import { BorrowingCreate } from "./borrowing.schema";

export namespace BorrowingService {
  export async function getBorrowings() {
    return await BorrowingRepository.findAll();
  }

  export async function getBorrowingById(id: number) {
    const borrowing = await BorrowingRepository.findById(id);
    if (!borrowing) throw new Error("Borrowing record not found");
    return bor rowing;
  }

  export async function borrowBook(data: BorrowingCreate) {
    const book = await BookRepository.findById(data.bookId);
    if (!book) throw new Error("Book not found");
    if (book.status === "borrowed") throw new Error("Book is already borrowed");

    const borrowing = await BorrowingRepository.create(data);
    await BookRepository.update(data.bookId, { status: "borrowed" });

    return borrowing;
  }

  export async function returnBook(id: number) {
    const borrowing = await getBorrowingById(id);
    if (borrowing.returnDate) throw new Error("Book already returned");

    const updated = await BorrowingRepository.update(id, {
      returnDate: new Date().toISOString(),
    });
    await BookRepository.update(borrowing.bookId, { status: "available" });

    return updated;
  }
}
