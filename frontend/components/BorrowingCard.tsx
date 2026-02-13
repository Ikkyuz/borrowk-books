import React from 'react';
import { View, Text } from 'react-native';
import { Borrowing, Member, Book } from '../types/library';
import { members, books } from '../data/library';

interface BorrowingCardProps {
  borrowing: Borrowing;
}

export default function BorrowingCard({ borrowing }: BorrowingCardProps) {
  const member = members.find(m => m.member_id === borrowing.member_id);
  const book = books.find(b => b.book_id === borrowing.book_id);
  const isReturned = !!borrowing.return_date;

  return (
    <View className="bg-white p-5 rounded-2xl mb-4 shadow-sm border border-gray-100">
      {/* Header Info */}
      <View className="flex-row justify-between items-center mb-4 pb-3 border-b border-gray-50">
        <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Transaction #{borrowing.borrow_id}
        </Text>
        <View className={`px-3 py-1 rounded-full ${isReturned ? 'bg-green-100' : 'bg-orange-100'}`}>
          <Text className={`text-[10px] font-bold uppercase ${isReturned ? 'text-green-700' : 'text-orange-700'}`}>
            {isReturned ? 'คืนแล้ว' : 'ยังไม่คืน'}
          </Text>
        </View>
      </View>

      {/* Grid Layout Content */}
      <View className="flex-row flex-wrap">
        {/* Group: Book & Borrower */}
        <View className="w-1/2 mb-4 pr-2">
          <Text className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter mb-1">หนังสือ</Text>
          <Text className="text-sm text-gray-900 font-bold" numberOfLines={1}>{book?.title || 'ไม่พบข้อมูล'}</Text>
        </View>
        <View className="w-1/2 mb-4 pl-2">
          <Text className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter mb-1">ผู้ยืม</Text>
          <Text className="text-sm text-gray-900 font-medium">{member?.full_name || 'ไม่พบข้อมูล'}</Text>
        </View>

        {/* Group: Dates */}
        <View className="w-1/2 pr-2">
          <Text className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter mb-1">วันที่ยืม</Text>
          <Text className="text-sm text-gray-700">{borrowing.borrow_date}</Text>
        </View>
        <View className="w-1/2 pl-2">
          <Text className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter mb-1">
            {isReturned ? 'วันที่คืน' : 'กำหนดคืน'}
          </Text>
          <Text className={`text-sm ${isReturned ? 'text-gray-700' : 'text-orange-600 font-bold'}`}>
            {borrowing.return_date || 'รอการคืน'}
          </Text>
        </View>
      </View>
    </View>
  );
}
