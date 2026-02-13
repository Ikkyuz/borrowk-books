import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { books } from '../../data/library';

export default function BorrowScreen() {
  const [bookCode, setBookCode] = useState('');

  // กรองเฉพาะหนังสือที่มีสถานะเป็น 'available' (ว่าง)
  const availableBooks = books.filter(book => book.status === 'available');

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
      <Text className="text-3xl font-bold text-gray-800 mb-2">ทำรายการยืม</Text>
      <Text className="text-gray-500 mb-6">เลือกหนังสือที่ต้องการ หรือระบุรหัส</Text>

      {/* ส่วนกรอกรหัสด่วน */}
      <View className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-6">
        <View className="flex-row items-center bg-gray-50 p-3 rounded-2xl border border-gray-100">
          <Ionicons name="qr-code-outline" size={20} color="#64748b" style={{ marginRight: 8 }} />
          <TextInput
            className="flex-1 p-1 text-gray-800"
            placeholder="กรอกรหัสหนังสือ..."
            value={bookCode}
            onChangeText={setBookCode}
          />
          <TouchableOpacity 
            onPress={() => handleBorrow()}
            className="bg-blue-600 px-4 py-2 rounded-xl"
          >
            <Text className="text-white font-bold">ยืม</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-gray-800">หนังสือที่ว่างอยู่</Text>
        <View className="bg-green-100 px-3 py-1 rounded-full">
          <Text className="text-green-700 text-xs font-bold">{availableBooks.length} เล่ม</Text>
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
          <View className="mb-4 bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex-row items-center">
            <View className="w-12 h-12 bg-green-50 rounded-2xl items-center justify-center mr-4">
              <Ionicons name="book" size={24} color="#16a34a" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-800">{item.title}</Text>
              <Text className="text-gray-500 text-sm">รหัส: {item.book_id} • {item.author}</Text>
            </View>
            <TouchableOpacity 
              onPress={() => handleBorrow(item.book_id)}
              className="bg-green-600 px-4 py-2 rounded-xl"
            >
              <Text className="text-white font-bold">เลือก</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View className="items-center mt-10">
            <Ionicons name="alert-circle-outline" size={48} color="#9ca3af" />
            <Text className="text-gray-400 mt-2">ขออภัย ไม่พบหนังสือว่างในขณะนี้</Text>
          </View>
        }
      />
    </View>
  );
}
