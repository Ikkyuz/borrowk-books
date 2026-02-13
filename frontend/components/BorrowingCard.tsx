import React from 'react';
import { View, Text } from 'react-native';
import { Borrowing } from '../types/library';
import { members, books } from '../data/library';

interface BorrowingCardProps {
  borrowing: Borrowing;
}

export default function BorrowingCard({ borrowing }: BorrowingCardProps) {
  const member = members.find((m) => m.member_id === borrowing.member_id);
  const book = books.find((b) => b.book_id === borrowing.book_id);
  const isReturned = !!borrowing.return_date;

  return (
    <View className="mb-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      {/* Header Info */}
      <View className="mb-4 flex-row items-center justify-between border-b border-gray-50 pb-3">
        <Text className="text-xs font-bold uppercase tracking-widest text-gray-400">
          Transaction #{borrowing.borrow_id}
        </Text>
        <View className={`rounded-full px-3 py-1 ${isReturned ? 'bg-green-100' : 'bg-orange-100'}`}>
          <Text
            className={`text-[10px] font-bold uppercase ${isReturned ? 'text-green-700' : 'text-orange-700'}`}>
            {isReturned ? 'คืนแล้ว' : 'ยังไม่คืน'}
          </Text>
        </View>
      </View>

      {/* Grid Layout Content */}
      <View className="flex-row flex-wrap">
        {/* Group: Book & Borrower */}
        <View className="mb-4 w-1/2 pr-2">
          <Text className="mb-1 text-[10px] font-bold uppercase tracking-tighter text-gray-500">
            หนังสือ
          </Text>
          <Text className="text-sm font-bold text-gray-900" numberOfLines={1}>
            {book?.title || 'ไม่พบข้อมูล'}
          </Text>
        </View>
        <View className="mb-4 w-1/2 pl-2">
          <Text className="mb-1 text-[10px] font-bold uppercase tracking-tighter text-gray-500">
            ผู้ยืม
          </Text>
          <Text className="text-sm font-medium text-gray-900">
            {member?.full_name || 'ไม่พบข้อมูล'}
          </Text>
        </View>

        {/* Group: Dates */}
        <View className="w-1/2 pr-2">
          <Text className="mb-1 text-[10px] font-bold uppercase tracking-tighter text-gray-500">
            วันที่ยืม
          </Text>
          <Text className="text-sm text-gray-700">{borrowing.borrow_date}</Text>
        </View>
        <View className="w-1/2 pl-2">
          <Text className="mb-1 text-[10px] font-bold uppercase tracking-tighter text-gray-500">
            {isReturned ? 'วันที่คืน' : 'กำหนดคืน'}
          </Text>
          <Text className={`text-sm ${isReturned ? 'text-gray-700' : 'font-bold text-orange-600'}`}>
            {borrowing.return_date || 'รอการคืน'}
          </Text>
        </View>
      </View>
    </View>
  );
}
