import React from 'react';
import { View, Text } from 'react-native';

interface BorrowingCardProps {
  borrowing: any;
}

export default function BorrowingCard({ borrowing }: BorrowingCardProps) {
  const isReturned = !!borrowing.returnDate;

  return (
    <View className="mb-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <View className="mb-4 flex-row items-center justify-between border-b border-slate-50 pb-3">
        <Text className="text-xs font-bold uppercase tracking-widest text-slate-400">
          ID: #{borrowing.id}
        </Text>
        <View className={`rounded-full px-3 py-1 ${isReturned ? 'bg-green-50' : 'bg-orange-50'}`}>
          <Text
            className={`text-[10px] font-bold uppercase ${isReturned ? 'text-green-600' : 'text-orange-600'}`}>
            {isReturned ? 'คืนแล้ว' : 'ยังไม่คืน'}
          </Text>
        </View>
      </View>

      <View className="flex-row flex-wrap">
        <View className="mb-4 w-1/2 pr-2">
          <Text className="mb-1 text-[10px] font-bold uppercase text-slate-400">หนังสือ</Text>
          <Text className="text-sm font-bold text-slate-900" numberOfLines={1}>
            {borrowing.book?.title || 'Unknown Book'}
          </Text>
        </View>
        <View className="mb-4 w-1/2 pl-2">
          <Text className="mb-1 text-[10px] font-bold uppercase text-slate-400">ผู้ยืม</Text>
          <Text className="text-sm font-medium text-slate-900">
            {borrowing.member?.fullName || 'Unknown User'}
          </Text>
        </View>

        <View className="w-1/2 pr-2">
          <Text className="mb-1 text-[10px] font-bold uppercase text-slate-400">วันที่ยืม</Text>
          <Text className="text-sm text-slate-600">
            {new Date(borrowing.borrowDate).toLocaleDateString()}
          </Text>
        </View>
        <View className="w-1/2 pl-2">
          <Text className="mb-1 text-[10px] font-bold uppercase text-slate-400">สถานะคืน</Text>
          <Text className={`text-sm ${isReturned ? 'text-slate-600' : 'font-bold text-orange-500'}`}>
            {isReturned ? new Date(borrowing.returnDate).toLocaleDateString() : 'รอการคืน'}
          </Text>
        </View>
      </View>
    </View>
  );
}
