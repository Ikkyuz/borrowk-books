import React from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
// import { books } from '../../data/library';  <-- ลบบรรทัดนี้ทิ้งไปเลยครับ
import { Ionicons } from '@expo/vector-icons';

// --- สร้างข้อมูลจำลองตรงนี้แทนครับ ---
const books = [
  { book_id: 'B001', title: 'React Native Guide', author: 'John Doe', status: 'borrowed' },
  { book_id: 'B002', title: 'TypeScript Mastery', author: 'Jane Smith', status: 'available' },
  { book_id: 'B003', title: 'Expo Router Basics', author: 'Bob Builder', status: 'available' },
  { book_id: 'B004', title: 'Tailwind CSS Magic', author: 'Adam W.', status: 'available' },
  { book_id: 'B005', title: 'Advanced JavaScript', author: 'Kyle Simpson', status: 'borrowed' },
];

export default function BookListScreen() {
  return (
    <View className="flex-1 bg-gray-50">
      {/* Main Content */}
      <View className="mx-auto w-full max-w-7xl flex-1 px-4 pb-12 pt-12 sm:px-6 lg:px-8">
        {/* Title Section */}
        <View className="mb-8 px-2">
          <Text className="text-3xl font-black tracking-tighter text-gray-900">หนังสือทั้งหมด</Text>
          <View className="mt-2 h-1.5 w-16 rounded-full bg-blue-600" />
        </View>

        {/* Search Bar */}
        <View className="mb-8 px-2">
          <View className="h-12 flex-row items-center rounded-2xl border border-gray-100 bg-white px-4 shadow-sm">
            <Ionicons name="search" size={20} color="#64748b" />
            <TextInput
              className="h-full flex-1 px-4 text-base text-gray-800"
              placeholder="ค้นหาชื่อหนังสือ หรือผู้แต่ง..."
              placeholderTextColor="#94a3b8"
            />
          </View>
        </View>

        {/* Table Container */}
        <View className="flex-1 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
          {/* Header Row */}
          <View className="flex-row items-center border-b border-gray-200 bg-gray-50 px-6 py-4">
            <View className="flex-[4]">
              <Text className="text-xs font-bold uppercase tracking-widest text-gray-400">
                ข้อมูลหนังสือ
              </Text>
            </View>
            <View className="flex-[3]">
              <Text className="text-xs font-bold uppercase tracking-widest text-gray-400">
                ผู้แต่ง
              </Text>
            </View>
            <View className="flex-[3]">
              <Text className="text-center text-xs font-bold uppercase tracking-widest text-gray-400">
                สถานะ
              </Text>
            </View>
            <View className="flex-[2]">
              <Text className="text-right text-xs font-bold uppercase tracking-widest text-gray-400">
                จัดการ
              </Text>
            </View>
          </View>

          {/* Data Rows */}
          <FlatList
            data={books}
            keyExtractor={(item) => item.book_id}
            renderItem={({ item }) => (
              <View className="flex-row items-center border-b border-gray-100 px-6 py-4 hover:bg-gray-50">
                {/* Flex 4: Title & ID */}
                <View className="flex-[4] pr-2">
                  <Text
                    className="text-base font-bold leading-tight text-gray-900"
                    numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text className="mt-1 text-xs font-medium text-gray-400">#{item.book_id}</Text>
                </View>

                {/* Flex 3: Author */}
                <View className="flex-[3] pr-2">
                  <Text className="text-sm font-medium text-gray-600" numberOfLines={1}>
                    {item.author}
                  </Text>
                </View>

                {/* Flex 3: Status */}
                <View className="flex-[3] items-center">
                  <View
                    className={`rounded-full px-3 py-1 ${
                      item.status === 'available' ? 'bg-green-100' : 'bg-orange-100'
                    }`}>
                    <Text
                      className={`text-[10px] font-black uppercase tracking-widest ${
                        item.status === 'available' ? 'text-green-700' : 'text-orange-700'
                      }`}>
                      {item.status === 'available' ? 'ว่าง' : 'ถูกยืม'}
                    </Text>
                  </View>
                </View>

                {/* Flex 2: Action */}
                <View className="flex-[2] items-end">
                  <TouchableOpacity className="rounded-lg bg-blue-600 px-4 py-2 shadow-sm active:bg-blue-700">
                    <Text className="text-xs font-bold text-white">ยืม</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      </View>
    </View>
  );
}
