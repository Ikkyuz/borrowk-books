import { BookRepository } from "./book.repository";
import { BookCreateUpdate } from "./book.schema";

export namespace BookService {
  export async function getBooks() {
    return await BookRepository.findAll();
  }

  export async function getAvailableBooks() {
    return await BookRepository.findAvailable();
  }

  export async function getBookById(id: number) {
    const book = await BookRepository.findById(id);
    if (!book) throw new Error("Book not found");
    return book;
  }

  export async function createBook(data: BookCreateUpdate) {
    return await BookRepository.create(data);
  }

  export async function updateBook(
    id: number,
    data: Partial<BookCreateUpdate>,
  ) {
    await getBookById(id); // Ensure exists
    return await BookRepository.update(id, data);
  }

  export async function deleteBook(id: number) {
    await getBookById(id); // Ensure exists
    return await BookRepository.remove(id);
  }
}
