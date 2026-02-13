import React from 'react';
import { View, Text, FlatList } from 'react-native';

// --- ข้อมูลจำลอง (Mock Data) ---
const books = [
  { book_id: 'B001', title: 'React Native Guide' },
  { book_id: 'B002', title: 'TypeScript Mastery' },
];

const borrowings = [
  { borrow_id: 1, book_id: 'B001', borrow_date: '2024-02-10', return_date: null }, // ยังไม่คืน
  { borrow_id: 2, book_id: 'B002', borrow_date: '2024-02-01', return_date: '2024-02-05' }, // คืนแล้ว
];

export default function HistoryScreen() {
  return (
    <View className="flex-1 bg-gray-50">
      
      {/* Main Container */}
      <View className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <View className="mb-10">
          <Text className="text-4xl font-black tracking-tighter text-gray-900">ประวัติการใช้งาน</Text>
          <View className="mt-2 h-1.5 w-20 rounded-full bg-blue-600" />
          <Text className="mt-4 text-lg text-gray-500">ติดตามรายการยืม-คืนหนังสือทั้งหมดของคุณ</Text>
        </View>

        {/* Table Container */}
        <View className="w-full flex-1 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
          
          {/* --- Table Header (ใช้ flex-row) --- */}
          <View className="w-full flex-row items-center border-b border-gray-200 bg-gray-50 px-6 py-4">
            <View className="flex-[4]">
              <Text className="text-left text-xs font-bold uppercase tracking-widest text-gray-400">หนังสือ / รายการ</Text>
            </View>
            <View className="flex-[3]">
              <Text className="text-left text-xs font-bold uppercase tracking-widest text-gray-400">วันที่ยืม</Text>
            </View>
            <View className="flex-[3]">
              <Text className="text-center text-xs font-bold uppercase tracking-widest text-gray-400">สถานะ</Text>
            </View>
            <View className="flex-[2]">
              <Text className="text-right text-xs font-bold uppercase tracking-widest text-gray-400">คืนวันที่</Text>
            </View>
          </View>

          {/* --- Table List --- */}
          <FlatList
            data={borrowings}
            keyExtractor={(item) => item.borrow_id.toString()}
            renderItem={({ item }) => {
              const book = books.find(b => b.book_id === item.book_id);
              const isReturned = !!item.return_date; // เช็คว่าคืนหรือยัง (ถ้ามีวันที่คืน = คืนแล้ว)

              return (
                // ใช้ flex-row และ w-full เพื่อให้เรียงแนวนอนเต็มความกว้าง
                <View className="w-full flex-row items-center border-b border-gray-100 px-6 py-5 hover:bg-gray-50">
                  
                  {/* 1. ชื่อหนังสือ & รหัส (4 ส่วน) */}
                  <View className="flex-[4] pr-4">
                    <Text className="text-sm font-bold leading-snug text-gray-900" numberOfLines={1}>
                      {book?.title || 'ไม่พบข้อมูล'}
                    </Text>
                    <Text className="mt-0.5 text-xs font-medium text-gray-500">#TR-{item.borrow_id}</Text>
                  </View>

                  {/* 2. วันที่ยืม (3 ส่วน) */}
                  <View className="flex-[3] pr-2">
                    <Text className="text-sm font-medium text-gray-600">{item.borrow_date}</Text>
                  </View>

                  {/* 3. สถานะ (3 ส่วน - จัดกลาง) */}
                  <View className="flex-[3] items-center justify-center">
                    <View className={`rounded-full px-3 py-1 ${
                      isReturned ? 'bg-green-100' : 'bg-orange-100'
                    }`}>
                      <Text className={`text-[10px] font-black uppercase tracking-widest ${
                        isReturned ? 'text-green-700' : 'text-orange-700'
                      }`}>
                        {isReturned ? 'คืนแล้ว' : 'ยังไม่คืน'}
                      </Text>
                    </View>
                  </View>

                  {/* 4. วันที่คืน (2 ส่วน - ชิดขวา) */}
                  <View className="flex-[2] items-end justify-center">
                    <Text className={`text-xs font-bold ${isReturned ? 'text-gray-400' : 'text-blue-600'}`}>
                      {item.return_date || 'รอการคืน'}
                    </Text>
                  </View>

                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListEmptyComponent={
              <View className="mt-20 items-center p-10">
                <Text className="text-lg font-medium text-gray-400">ยังไม่มีประวัติการทำรายการ</Text>
              </View>
            }
          />
        </View>
      </View>
    </View>
  );
}