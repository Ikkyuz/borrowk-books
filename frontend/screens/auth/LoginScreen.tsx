import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('ข้อผิดพลาด', 'กรุณากรอกอีเมลและรหัสผ่านให้ครบถ้วน');
      return;
    }
    
    if (!email.includes('@')) {
      Alert.alert('ข้อผิดพลาด', 'รูปแบบอีเมลไม่ถูกต้อง');
      return;
    }

    router.replace('/user/books');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }} 
          className="px-6 pt-12"
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity 
            onPress={() => router.back()}
            className="mb-8"
          >
            <Ionicons name="arrow-back" size={24} color="#1f2937" />
          </TouchableOpacity>

          <View className="mb-10">
            <Text className="text-4xl font-bold text-gray-800">ยินดีต้อนรับ</Text>
            <Text className="text-gray-500 mt-2 text-lg">เข้าสู่ระบบเพื่อใช้งานห้องสมุด</Text>
          </View>

          <View className="gap-y-4">
            <View>
              <Text className="text-gray-700 mb-2 ml-1 font-medium">อีเมล</Text>
              <TextInput
                className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-gray-800"
                placeholder="example@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View>
              <Text className="text-gray-700 mb-2 ml-1 font-medium">รหัสผ่าน</Text>
              <TextInput
                className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-gray-800"
                placeholder="********"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity 
              onPress={handleLogin}
              className="bg-blue-600 p-4 rounded-2xl items-center mt-6 shadow-md"
            >
              <Text className="text-white text-lg font-bold">เข้าสู่ระบบ</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center mt-10">
            <Text className="text-gray-500">ยังไม่มีบัญชี? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/register')}>
              <Text className="text-blue-600 font-bold">สมัครสมาชิก</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            onPress={() => router.push('/auth/admin-login')}
            className="mt-8 items-center mb-10"
          >
            <Text className="text-gray-400">เข้าสู่ระบบสำหรับ Admin</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
