import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AdminLoginScreen() {
  const [adminCode, setAdminCode] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 pt-12">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="mb-8"
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <View className="mb-10">
            <View className="w-16 h-16 bg-red-500 rounded-2xl items-center justify-center mb-4">
              <Ionicons name="shield-checkmark" size={32} color="white" />
            </View>
            <Text className="text-4xl font-bold text-white">Admin Panel</Text>
            <Text className="text-slate-400 mt-2 text-lg">เข้าสู่ระบบเฉพาะผู้ดูแลระบบเท่านั้น</Text>
          </View>

          <View className="gap-y-4">
            <View>
              <Text className="text-slate-300 mb-2 ml-1 font-medium">รหัสผู้ดูแล</Text>
              <TextInput
                className="bg-slate-800 p-4 rounded-2xl border border-slate-700 text-white"
                placeholder="ADMIN-XXXX"
                placeholderTextColor="#64748b"
                value={adminCode}
                onChangeText={setAdminCode}
                autoCapitalize="characters"
              />
            </View>

            <View>
              <Text className="text-slate-300 mb-2 ml-1 font-medium">รหัสผ่าน</Text>
              <TextInput
                className="bg-slate-800 p-4 rounded-2xl border border-slate-700 text-white"
                placeholder="********"
                placeholderTextColor="#64748b"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity 
              onPress={() => router.replace('/admin/members')}
              className="bg-red-500 p-4 rounded-2xl items-center mt-6 shadow-lg shadow-red-500/50"
            >
              <Text className="text-white text-lg font-bold">ยืนยันตัวตน</Text>
            </TouchableOpacity>
          </View>

          <View className="items-center mt-10">
            <Text className="text-slate-500 text-center">
              หากคุณไม่ใช่ผู้ดูแลระบบ โปรดกลับไปหน้าหลัก
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
