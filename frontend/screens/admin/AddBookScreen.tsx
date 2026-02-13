import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { bookApi } from '../../services/api';

export default function AddBookScreen() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) return Alert.alert('Error', 'กรุณาระบุชื่อหนังสือ');
    setLoading(true);
    try {
      await bookApi.create({ title, author: author || null, status: 'available' });
      Alert.alert('สำเร็จ', 'เพิ่มหนังสือใหม่เรียบร้อยแล้ว');
      setTitle(''); setAuthor('');
    } catch (e) {
      Alert.alert('Error', 'ไม่สามารถเพิ่มหนังสือได้');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white pt-12 px-8">
      <Text className="text-2xl font-black text-slate-900 mb-8">เพิ่มหนังสือใหม่</Text>
      
      <View className="space-y-6">
        <View>
          <Text className="text-slate-500 font-bold mb-2 ml-1">ชื่อหนังสือ *</Text>
          <TextInput 
            className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-slate-800"
            placeholder="เช่น คู่มือ React Native"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View>
          <Text className="text-slate-500 font-bold mb-2 ml-1">ชื่อผู้แต่ง</Text>
          <TextInput 
            className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-slate-800"
            placeholder="ชื่อผู้เขียน..."
            value={author}
            onChangeText={setAuthor}
          />
        </View>

        <TouchableOpacity 
          onPress={handleSubmit}
          disabled={loading}
          className={`h-14 rounded-2xl items-center justify-center mt-4 ${loading ? 'bg-slate-200' : 'bg-blue-600'}`}
        >
          <Text className="text-white text-lg font-bold">บันทึกข้อมูล</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
