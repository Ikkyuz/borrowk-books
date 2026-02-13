import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { books } from '../../data/library';

export default function BorrowScreen() {
  const [bookCode, setBookCode] = useState('');

  // กรองเฉพาะหนังสือที่มีสถานะเป็น 'available' (ว่าง)
  const availableBooks = books.filter((book) => book.status === 'available');

  const handleBorrow = (code?: string) => {
    const targetCode = code || bookCode;
    if (!targetCode.trim()) {
      Alert.alert('ข้อผิดพลาด', 'กรุณาระบุรหัสหนังสือ');
      return;
    }
    Alert.alert('สำเร็จ', `ทำรายการยืมหนังสือรหัส ${targetCode} เรียบร้อยแล้ว`);
    setBookCode('');
  };

  const renderHeader = () => (
    <View className="mb-6">
      <Text className="mb-2 text-3xl font-bold text-gray-800">ทำรายการยืม</Text>
      <Text className="mb-6 text-gray-500">เลือกหนังสือที่ต้องการ หรือระบุรหัส</Text>

      {/* ส่วนกรอกรหัสด่วน */}
      <View className="mb-6 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
        <View className="flex-row items-center rounded-2xl border border-gray-100 bg-gray-50 p-3">
          <Ionicons name="qr-code-outline" size={20} color="#64748b" style={{ marginRight: 8 }} />
          <TextInput
            className="flex-1 p-1 text-gray-800"
            placeholder="กรอกรหัสหนังสือ..."
            value={bookCode}
            onChangeText={setBookCode}
          />
          <TouchableOpacity
            onPress={() => handleBorrow()}
            className="rounded-xl bg-blue-600 px-4 py-2">
            <Text className="font-bold text-white">ยืม</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-xl font-bold text-gray-800">หนังสือที่ว่างอยู่</Text>
        <View className="rounded-full bg-green-100 px-3 py-1">
          <Text className="text-xs font-bold text-green-700">{availableBooks.length} เล่ม</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <FlatList
        data={availableBooks}
        keyExtractor={(item) => item.book_id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View className="mb-4 flex-row items-center rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
            <View className="mr-4 h-12 w-12 items-center justify-center rounded-2xl bg-green-50">
              <Ionicons name="book" size={24} color="#16a34a" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-800">{item.title}</Text>
              <Text className="text-sm text-gray-500">
                รหัส: {item.book_id} • {item.author}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handleBorrow(item.book_id)}
              className="rounded-xl bg-green-600 px-4 py-2">
              <Text className="font-bold text-white">เลือก</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View className="mt-10 items-center">
            <Ionicons name="alert-circle-outline" size={48} color="#9ca3af" />
            <Text className="mt-2 text-gray-400">ขออภัย ไม่พบหนังสือว่างในขณะนี้</Text>
          </View>
        }
      />
    </View>
  );
}
