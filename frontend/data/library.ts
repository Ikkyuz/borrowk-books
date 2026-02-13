import { Member, Book, Borrowing } from './library';

export const members: Member[] = [
  { member_id: 1, username: 'admin01', full_name: 'System Admin', role: 'admin' },
  { member_id: 2, username: 'user01', full_name: 'Somchai Jaidee', role: 'user' },
  { member_id: 3, username: 'user02', full_name: 'Somsak Rakdee', role: 'user' },
];

export const books: Book[] = [
  { book_id: 'B001', title: 'React Native Guide', author: 'John Doe', status: 'borrowed' },
  { book_id: 'B002', title: 'TypeScript Mastery', author: 'Jane Smith', status: 'available' },
  { book_id: 'B003', title: 'Expo Router Basics', author: 'Bob Builder', status: 'available' },
];

export const borrowings: Borrowing[] = [
  { borrow_id: 1, member_id: 2, book_id: 'B001', borrow_date: '2024-02-10' },
];
