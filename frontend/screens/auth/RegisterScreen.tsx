import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Handling Errors: ตรวจสอบข้อมูลว่าง
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('ข้อผิดพลาด', 'กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }

    if (password.length < 6) {
      Alert.alert('ข้อผิดพลาด', 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
      return;
    }

    Alert.alert('สำเร็จ', 'สมัครสมาชิกเรียบร้อยแล้ว', [
      { text: 'ตกลง', onPress: () => router.back() },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="px-6 pt-12"
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => router.back()} className="mb-8">
            <Ionicons name="arrow-back" size={24} color="#1f2937" />
          </TouchableOpacity>

          <View className="mb-10">
            <Text className="text-4xl font-bold text-gray-800">สร้างบัญชีใหม่</Text>
            <Text className="mt-2 text-lg text-gray-500">กรอกข้อมูลเพื่อร่วมเป็นสมาชิกกับเรา</Text>
          </View>

          <View className="gap-y-4">
            <View>
              <Text className="mb-2 ml-1 font-medium text-gray-700">ชื่อ-นามสกุล</Text>
              <TextInput
                className="rounded-2xl border border-gray-100 bg-gray-50 p-4 text-gray-800"
                placeholder="สมชาย ใจดี"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View>
              <Text className="mb-2 ml-1 font-medium text-gray-700">อีเมล</Text>
              <TextInput
                className="rounded-2xl border border-gray-100 bg-gray-50 p-4 text-gray-800"
                placeholder="example@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View>
              <Text className="mb-2 ml-1 font-medium text-gray-700">รหัสผ่าน</Text>
              <TextInput
                className="rounded-2xl border border-gray-100 bg-gray-50 p-4 text-gray-800"
                placeholder="********"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              onPress={handleRegister}
              className="mt-6 items-center rounded-2xl bg-blue-600 p-4 shadow-md">
              <Text className="text-lg font-bold text-white">สมัครสมาชิก</Text>
            </TouchableOpacity>
          </View>

          <View className="mb-10 mt-10 flex-row justify-center">
            <Text className="text-gray-500">มีบัญชีอยู่แล้ว? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text className="font-bold text-blue-600">เข้าสู่ระบบ</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
