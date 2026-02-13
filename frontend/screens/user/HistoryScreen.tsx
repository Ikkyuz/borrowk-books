import React from 'react';
import { View, Text, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// --- ข้อมูลจำลอง ---
const books = [
  { book_id: 'B001', title: 'React Native Guide' },
  { book_id: 'B002', title: 'TypeScript Mastery' },
];

const borrowings = [
  { borrow_id: 1, book_id: 'B001', borrow_date: '2024-02-10', return_date: null },
  { borrow_id: 2, book_id: 'B002', borrow_date: '2024-02-01', return_date: '2024-02-05' },
];

export default function HistoryScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* ✨ Center Container: คุมความกว้างให้เป๊ะทั้งบนมือถือและเว็บ */}
      <View className="mx-auto w-full max-w-[500px] flex-1 bg-white">
        {/* 1. Header Section - แบบคลีนๆ */}
        <View className="border-b border-gray-100 px-6 pb-6 pt-10">
          <Text className="text-3xl font-black tracking-tight text-gray-900">ประวัติการใช้งาน</Text>
          <Text className="mt-1 font-medium text-gray-500">ติดตามรายการยืม-คืนหนังสือทั้งหมด</Text>
        </View>

        <FlatList
          data={borrowings}
          keyExtractor={(item) => item.borrow_id.toString()}
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="mt-20 items-center">
              <Ionicons name="document-text-outline" size={64} color="#e2e8f0" />
              <Text className="mt-4 text-lg font-bold text-gray-400">ยังไม่มีประวัติการใช้งาน</Text>
            </View>
          }
          renderItem={({ item }) => {
            const book = books.find((b) => b.book_id === item.book_id);
            const isReturned = !!item.return_date;

            return (
              /* 2. List Item แบบ Card ที่เราตกลงกันไว้ (นำตารางออก) */
              <View
                className={`mb-4 rounded-2xl border p-5 ${
                  isReturned ? 'border-gray-100 bg-gray-50' : 'border-blue-100 bg-white shadow-sm'
                }`}>
                <View className="mb-3 flex-row items-start justify-between">
                  <View className="flex-1 pr-2">
                    <Text className="text-lg font-bold leading-tight text-gray-900">
                      {book?.title || 'ไม่พบข้อมูลหนังสือ'}
                    </Text>
                    <Text className="mt-1 text-xs font-semibold text-gray-400">
                      Transaction: #TR-{item.borrow_id}
                    </Text>
                  </View>

                  {/* Status Badge */}
                  <View
                    className={`rounded-full px-3 py-1 ${
                      isReturned ? 'bg-green-100' : 'bg-orange-100'
                    }`}>
                    <Text
                      className={`text-[10px] font-black uppercase ${
                        isReturned ? 'text-green-700' : 'text-orange-700'
                      }`}>
                      {isReturned ? 'คืนแล้ว' : 'ยังไม่คืน'}
                    </Text>
                  </View>
                </View>

                {/* 3. Detail Section: วันที่ยืม - วันที่คืน */}
                <View className="mt-1 flex-row items-center justify-between border-t border-gray-100 pt-3">
                  <View>
                    <Text className="text-[10px] font-bold uppercase tracking-tighter text-gray-400">
                      วันที่ยืม
                    </Text>
                    <View className="mt-1 flex-row items-center">
                      <Ionicons name="calendar-outline" size={14} color="#64748b" />
                      <Text className="ml-1 text-sm font-semibold text-gray-600">
                        {item.borrow_date}
                      </Text>
                    </View>
                  </View>

                  <View className="items-end">
                    <Text className="text-[10px] font-bold uppercase tracking-tighter text-gray-400">
                      กำหนดคืน / วันที่คืน
                    </Text>
                    <View className="mt-1 flex-row items-center">
                      <Ionicons
                        name={isReturned ? 'checkmark-circle-outline' : 'time-outline'}
                        size={14}
                        color={isReturned ? '#16a34a' : '#2563eb'}
                      />
                      <Text
                        className={`ml-1 text-sm font-bold ${
                          isReturned ? 'text-gray-500' : 'text-blue-600'
                        }`}>
                        {item.return_date || 'รอการส่งคืน'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
