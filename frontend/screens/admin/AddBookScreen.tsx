import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AddBookScreen() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');

  const handleAddBook = () => {
    // Handling Errors: ตรวจสอบข้อมูลว่าง
    if (!title.trim() || !author.trim() || !isbn.trim()) {
      Alert.alert('ข้อผิดพลาด', 'กรุณากรอกข้อมูลหนังสือให้ครบถ้วนทุกช่อง');
      return;
    }

    Alert.alert('สำเร็จ', 'เพิ่มหนังสือใหม่เข้าสู่ฐานข้อมูลแล้ว', [
      { text: 'ตกลง', onPress: () => {
        setTitle('');
        setAuthor('');
        setIsbn('');
      }}
    ]);
  };

  return (
    <ScrollView className="flex-1 bg-slate-50" showsVerticalScrollIndicator={false}>
      <View className="bg-slate-900 pt-12 pb-6 px-6">
        <Text className="text-white text-3xl font-bold">เพิ่มหนังสือใหม่</Text>
        <Text className="text-slate-400 mt-1">กรอกรายละเอียดข้อมูลหนังสือ</Text>
      </View>

      <View className="p-6">
        <View className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <View className="mb-4">
            <Text className="text-slate-700 mb-2 font-medium">ชื่อหนังสือ</Text>
            <TextInput
              className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-slate-800"
              placeholder="ระบุชื่อหนังสือ"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View className="mb-4">
            <Text className="text-slate-700 mb-2 font-medium">ชื่อผู้แต่ง</Text>
            <TextInput
              className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-slate-800"
              placeholder="ระบุชื่อผู้แต่ง"
              value={author}
              onChangeText={setAuthor}
            />
          </View>

          <View className="mb-6">
            <Text className="text-slate-700 mb-2 font-medium">รหัส ISBN / รหัสหนังสือ</Text>
            <TextInput
              className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-slate-800"
              placeholder="เช่น 978-X-XXXX-XXXX-X"
              value={isbn}
              onChangeText={setIsbn}
            />
          </View>

          <TouchableOpacity 
            onPress={handleAddBook}
            className="bg-blue-600 p-4 rounded-2xl items-center shadow-md"
          >
            <Text className="text-white text-lg font-bold">บันทึกข้อมูล</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
