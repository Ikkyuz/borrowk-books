import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ReturnScreen() {
  const [bookCode, setBookCode] = useState('');

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-6">
        <Text className="mb-2 text-3xl font-bold text-gray-800">คืนหนังสือ</Text>
        <Text className="mb-6 text-gray-500">เลือกรายการที่ต้องการคืน หรือกรอกรหัส</Text>

        <View className="mb-6 flex-row items-center rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <TextInput
            className="flex-1 p-2 text-gray-800"
            placeholder="กรอกรหัสหนังสือ..."
            value={bookCode}
            onChangeText={setBookCode}
          />
          <TouchableOpacity className="rounded-xl bg-blue-600 p-3">
            <Text className="font-bold text-white">ตรวจสอบ</Text>
          </TouchableOpacity>
        </View>

        <Text className="mb-4 text-lg font-bold text-gray-800">รายการที่กำลังยืมอยู่</Text>

        <View className="items-center rounded-3xl border border-dashed border-blue-200 bg-blue-50 p-8">
          <Ionicons name="book-outline" size={48} color="#3b82f6" />
          <Text className="mt-4 font-medium text-blue-800">ไม่พบรายการที่ค้างคืน</Text>
          <Text className="mt-1 text-sm text-blue-600">คุณคืนหนังสือครบถ้วนแล้ว</Text>
        </View>
      </View>
    </View>
  );
}
