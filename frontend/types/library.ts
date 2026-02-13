export interface Member {
  member_id: number;
  username: string;
  password?: string;
  full_name: string;
  role: 'admin' | 'user';
}

export interface Book {
  book_id: string;
  title: string;
  author: string;
  status: 'available' | 'borrowed';
}

export interface Borrowing {
  borrow_id: number;
  member_id: number;
  book_id: string;
  borrow_date: string;
  return_date?: string;
}
