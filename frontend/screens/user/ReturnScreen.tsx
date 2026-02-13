import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ReturnScreen() {
  const [bookCode, setBookCode] = useState('');

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-6">
        <Text className="text-3xl font-bold text-gray-800 mb-2">คืนหนังสือ</Text>
        <Text className="text-gray-500 mb-6">เลือกรายการที่ต้องการคืน หรือกรอกรหัส</Text>

        <View className="bg-white p-4 rounded-2xl flex-row items-center shadow-sm mb-6 border border-gray-100">
          <TextInput
            className="flex-1 p-2 text-gray-800"
            placeholder="กรอกรหัสหนังสือ..."
            value={bookCode}
            onChangeText={setBookCode}
          />
          <TouchableOpacity className="bg-blue-600 p-3 rounded-xl">
            <Text className="text-white font-bold">ตรวจสอบ</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-lg font-bold text-gray-800 mb-4">รายการที่กำลังยืมอยู่</Text>
        
        <View className="bg-blue-50 p-8 rounded-3xl items-center border border-dashed border-blue-200">
          <Ionicons name="book-outline" size={48} color="#3b82f6" />
          <Text className="text-blue-800 mt-4 font-medium">ไม่พบรายการที่ค้างคืน</Text>
          <Text className="text-blue-600 text-sm mt-1">คุณคืนหนังสือครบถ้วนแล้ว</Text>
        </View>
      </View>
    </View>
  );
}
