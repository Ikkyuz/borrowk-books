import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
  ScrollView, // เพิ่ม Import เรียบร้อยแล้ว
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// ข้อมูลจำลอง
const initialBooks = [
  { book_id: 'B001', title: 'React Native Guide', author: 'John Doe', status: 'borrowed' },
  { book_id: 'B002', title: 'TypeScript Mastery', author: 'Jane Smith', status: 'available' },
  { book_id: 'B003', title: 'Expo Router Basics', author: 'Bob Builder', status: 'available' },
];

export default function BookListScreen() {
  const [books, setBooks] = useState(initialBooks);

  const handleBorrow = (item) => {
    if (item.status === 'borrowed') {
      Alert.alert('ไม่สามารถยืมได้', `หนังสือ "${item.title}" ถูกยืมไปแล้ว`);
      return;
    }

    Alert.alert('ยืนยันการยืม', `คุณต้องการยืมหนังสือ "${item.title}" ใช่หรือไม่?`, [
      { text: 'ยกเลิก', style: 'cancel' },
      { text: 'ยืนยัน', onPress: () => processBorrow(item.book_id) },
    ]);
  };

  const processBorrow = (id) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.book_id === id ? { ...book, status: 'borrowed' } : book))
    );
    Alert.alert('สำเร็จ', 'ทำรายการยืมเรียบร้อยแล้ว');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* ควบคุมความกว้างเพื่อความสมดุลบนหน้าจอเว็บ */}
      <View className="mx-auto w-full max-w-[500px] flex-1 bg-white">
        {/* Header - โทนขาวคลีน ไม่มีสีฟ้า */}
        <View className="border-b border-gray-100 px-6 pb-6 pt-10">
          <Text className="text-3xl font-black tracking-tight text-gray-900">ทำรายการยืม</Text>
          <Text className="mt-1 font-medium text-gray-500">
            เลือกหนังสือที่คุณต้องการ หรือระบุรหัส
          </Text>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-6 py-6">
            {/* Search Box */}
            <View className="mb-8 rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <View className="h-14 flex-row items-center rounded-xl border border-gray-200 bg-white px-4 shadow-sm">
                <Ionicons name="qr-code-outline" size={22} color="#64748b" />
                <TextInput
                  className="h-full flex-1 px-4 text-base text-gray-800"
                  placeholder="กรอกรหัสหนังสือ..."
                  placeholderTextColor="#94a3b8"
                />
                <TouchableOpacity className="rounded-lg bg-gray-900 px-6 py-2">
                  <Text className="font-bold text-white">ยืม</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Book List Section */}
            <View className="mb-6 flex-row items-center justify-between">
              <Text className="text-lg font-bold text-gray-800">หนังสือที่ว่างอยู่</Text>
              <View className="rounded-full border border-gray-200 bg-gray-100 px-3 py-1">
                <Text className="text-xs font-bold text-gray-600">
                  {books.filter((b) => b.status === 'available').length} เล่ม
                </Text>
              </View>
            </View>

            {/* Render รายการหนังสือแบบ Card */}
            {books.map((item) => (
              <TouchableOpacity
                key={item.book_id}
                activeOpacity={0.7}
                onPress={() => handleBorrow(item)}
                disabled={item.status === 'borrowed'}
                className={`mb-4 flex-row items-center rounded-2xl border p-5 ${
                  item.status === 'available'
                    ? 'border-gray-200 bg-white shadow-sm'
                    : 'border-gray-100 bg-gray-50 opacity-60'
                }`}>
                <View
                  className={`mr-4 h-12 w-12 items-center justify-center rounded-xl ${
                    item.status === 'available'
                      ? 'border border-green-100 bg-green-50'
                      : 'bg-gray-100'
                  }`}>
                  <Ionicons
                    name="book-outline"
                    size={24}
                    color={item.status === 'available' ? '#16a34a' : '#94a3b8'}
                  />
                </View>

                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-900">{item.title}</Text>
                  <Text className="mt-0.5 text-sm text-gray-500">
                    รหัส: {item.book_id} • {item.author}
                  </Text>
                </View>

                {item.status === 'available' ? (
                  <View className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-1">
                    <Text className="text-[10px] font-black uppercase text-blue-600">ยืมได้</Text>
                  </View>
                ) : (
                  <View className="rounded-lg bg-gray-200 px-3 py-1">
                    <Text className="text-[10px] font-black uppercase tracking-tighter text-gray-500">
                      ไม่ว่าง
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
