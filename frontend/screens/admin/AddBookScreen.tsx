import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Platform } from 'react-native';
import { bookApi } from '../../services/api';
import AdminHeader from '../../components/AdminHeader';

export default function AddBookScreen() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      const msg = 'กรุณาระบุชื่อหนังสือ';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Error', msg);
      return;
    }
    setLoading(true);
    try {
      await bookApi.create({ title, author: author || null, status: 'available' });
      const msg = 'เพิ่มหนังสือใหม่เรียบร้อยแล้ว';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('สำเร็จ', msg);
      setTitle(''); setAuthor('');
    } catch (e) {
      const msg = 'ไม่สามารถเพิ่มหนังสือได้';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-slate-50">
      <AdminHeader title="เพิ่มหนังสือ" subtitle="Add New Book" iconName="add-outline" />
      
      <ScrollView className="flex-1 px-8 -mt-8">
        <View className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 mb-10">
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
        </View>
      </ScrollView>
    </View>
  );
}
