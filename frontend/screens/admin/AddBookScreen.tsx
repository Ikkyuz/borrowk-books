import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AdminHeader from '../../components/AdminHeader';

export default function AddBookScreen() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');

  const handleAddBook = () => {
    if (!title.trim() || !author.trim() || !isbn.trim()) {
      Alert.alert('ข้อผิดพลาด', 'กรุณากรอกข้อมูลหนังสือให้ครบถ้วนทุกช่อง');
      return;
    }

    Alert.alert('สำเร็จ', 'เพิ่มหนังสือใหม่เข้าสู่ฐานข้อมูลแล้ว', [
      {
        text: 'ตกลง',
        onPress: () => {
          setTitle('');
          setAuthor('');
          setIsbn('');
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-slate-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}>
        <AdminHeader
          title="เพิ่มหนังสือ"
          subtitle="Add New Book"
          variant="primary"
          iconName="book"
        />

        {/* Form Container */}
        <View className="-mt-8 px-6 pt-4">
          <View className="rounded-[32px] border border-slate-100 bg-white p-6 shadow-sm">
            <View className="mb-8 items-center">
              <View className="h-32 w-24 items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-100">
                <Ionicons name="image-outline" size={32} color="#94a3b8" />
                <Text className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  เพิ่มรูปหน้าปก
                </Text>
              </View>
            </View>

            <View className="space-y-6">
              <View>
                <Text className="mb-2 ml-1 text-sm font-semibold text-slate-500">ชื่อหนังสือ</Text>
                <View className="flex-row items-center rounded-2xl border border-slate-100 bg-slate-50 px-4 focus:border-blue-500">
                  <Ionicons name="text" size={20} color="#64748b" />
                  <TextInput
                    className="flex-1 p-4 text-base text-slate-800"
                    placeholder="ระบุชื่อหนังสือ"
                    placeholderTextColor="#94a3b8"
                    value={title}
                    onChangeText={setTitle}
                  />
                </View>
              </View>

              <View>
                <Text className="mb-2 ml-1 text-sm font-semibold text-slate-500">ชื่อผู้แต่ง</Text>
                <View className="flex-row items-center rounded-2xl border border-slate-100 bg-slate-50 px-4 focus:border-blue-500">
                  <Ionicons name="person-outline" size={20} color="#64748b" />
                  <TextInput
                    className="flex-1 p-4 text-base text-slate-800"
                    placeholder="ระบุชื่อผู้แต่ง"
                    placeholderTextColor="#94a3b8"
                    value={author}
                    onChangeText={setAuthor}
                  />
                </View>
              </View>

              <View>
                <Text className="mb-2 ml-1 text-sm font-semibold text-slate-500">
                  รหัส ISBN / รหัสหนังสือ
                </Text>
                <View className="flex-row items-center rounded-2xl border border-slate-100 bg-slate-50 px-4 focus:border-blue-500">
                  <Ionicons name="barcode-outline" size={20} color="#64748b" />
                  <TextInput
                    className="flex-1 p-4 text-base text-slate-800"
                    placeholder="เช่น 978-X-XXXX-XXXX-X"
                    placeholderTextColor="#94a3b8"
                    value={isbn}
                    onChangeText={setIsbn}
                  />
                </View>
              </View>

              <TouchableOpacity
                onPress={handleAddBook}
                activeOpacity={0.8}
                className="mt-4 items-center rounded-2xl bg-blue-600 p-5 shadow-lg shadow-blue-500/30">
                <Text className="text-lg font-bold tracking-wide text-white">
                  บันทึกข้อมูลหนังสือ
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tips Section */}
          <View className="mt-8 flex-row items-start rounded-3xl border border-amber-100 bg-amber-50 p-6">
            <View className="mr-4 rounded-xl bg-amber-100 p-2">
              <Ionicons name="bulb-outline" size={20} color="#d97706" />
            </View>
            <View className="flex-1">
              <Text className="mb-1 font-bold text-amber-900">คำแนะนำ</Text>
              <Text className="text-sm leading-relaxed text-amber-800/70">
                กรุณาตรวจสอบรหัส ISBN ให้ถูกต้องเพื่อความสะดวกในการค้นหาและจัดระเบียบในระบบห้องสมุด
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
