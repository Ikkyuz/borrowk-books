import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { borrowings, books, members } from '../../data/library';
import BorrowingCard from '../../components/BorrowingCard';

export default function BorrowedListScreen() {
  const activeBorrowings = borrowings.filter(b => b.status === 'borrowed' || !b.return_date);

  return (
    <View className="flex-1 bg-slate-50">
      <View className="bg-slate-900 pt-16 pb-8 px-6">
        <View className="max-w-5xl mx-auto w-full">
          <Text className="text-white text-4xl font-extrabold tracking-tight">รายการที่ถูกยืม</Text>
          <Text className="text-slate-400 mt-2 text-lg">ติดตามสถานะหนังสือที่สมาชิกกำลังยืมอยู่</Text>
        </View>
      </View>

      <View className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-10">
        <View className="mb-10 px-2">
          <Text className="text-4xl font-black text-slate-900 tracking-tighter">รายการที่ถูกยืม</Text>
          <View className="h-1.5 w-20 bg-blue-600 mt-2 rounded-full" />
        </View>

        {/* Table Container */}
        <View className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">
          {/* Table Header Row */}
          <View className="flex-row items-center px-6 py-4 bg-slate-50 border-b border-slate-200">
            <View className="flex-[4] pr-4">
              <Text className="text-xs font-bold text-slate-500 uppercase tracking-wider">หนังสือ / ผู้ยืม</Text>
            </View>
            <View className="flex-[3] px-2">
              <Text className="text-xs font-bold text-slate-500 uppercase tracking-wider text-left">วันที่ยืม</Text>
            </View>
            <View className="flex-[3] px-2 items-center">
              <Text className="text-xs font-bold text-slate-500 uppercase tracking-wider">สถานะ</Text>
            </View>
            <View className="flex-[2] items-end">
              <Text className="text-xs font-bold text-slate-500 uppercase tracking-wider">จัดการ</Text>
            </View>
          </View>

          <FlatList
            data={activeBorrowings}
            keyExtractor={(item) => item.borrow_id.toString()}
            renderItem={({ item }) => {
              const book = books.find(b => b.book_id === item.book_id);
              const member = members.find(m => m.member_id === item.member_id);
              return (
                <View className="flex-row items-center px-6 py-5 border-b border-slate-100">
                  {/* Col-span-4: Book & Member */}
                  <View className="flex-[4] pr-4">
                    <Text className="text-sm font-bold text-slate-900 leading-snug" numberOfLines={1}>
                      {book?.title || 'ไม่พบข้อมูล'}
                    </Text>
                    <Text className="text-xs text-slate-500 mt-1 font-medium">ผู้ยืม: {member?.full_name || 'ไม่พบข้อมูล'}</Text>
                  </View>

                  {/* Col-span-3: Dates */}
                  <View className="flex-[3] px-2">
                    <Text className="text-sm text-slate-600 font-medium">{item.borrow_date}</Text>
                  </View>

                  {/* Col-span-3: Status */}
                  <View className="flex-[3] items-center">
                    <View className="px-4 py-1 rounded-full bg-orange-100">
                      <Text className="text-[10px] font-black uppercase tracking-widest text-orange-700">ถูกยืม</Text>
                    </View>
                  </View>

                  {/* Col-span-2: Action */}
                  <TouchableOpacity className="flex-[2] items-end">
                    <View className="bg-slate-900 px-4 py-2 rounded-xl">
                      <Text className="text-white text-xs font-bold">จัดการ</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListEmptyComponent={
              <View className="items-center mt-20 p-10">
                <Text className="text-slate-400 text-lg font-medium">ไม่มีหนังสือที่ถูกยืมอยู่ในขณะนี้</Text>
              </View>
            }
          />
        </View>
      </View>
    </View>
  );
}
