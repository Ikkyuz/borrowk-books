import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AdminLoginScreen() {
  const [adminCode, setAdminCode] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 pt-12">
          <TouchableOpacity onPress={() => router.back()} className="mb-8">
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <View className="mb-10">
            <View className="mb-4 h-16 w-16 items-center justify-center rounded-2xl bg-red-500">
              <Ionicons name="shield-checkmark" size={32} color="white" />
            </View>
            <Text className="text-4xl font-bold text-white">Admin Panel</Text>
            <Text className="mt-2 text-lg text-slate-400">เข้าสู่ระบบเฉพาะผู้ดูแลระบบเท่านั้น</Text>
          </View>

          <View className="gap-y-4">
            <View>
              <Text className="mb-2 ml-1 font-medium text-slate-300">รหัสผู้ดูแล</Text>
              <TextInput
                className="rounded-2xl border border-slate-700 bg-slate-800 p-4 text-white"
                placeholder="ADMIN-XXXX"
                placeholderTextColor="#64748b"
                value={adminCode}
                onChangeText={setAdminCode}
                autoCapitalize="characters"
              />
            </View>

            <View>
              <Text className="mb-2 ml-1 font-medium text-slate-300">รหัสผ่าน</Text>
              <TextInput
                className="rounded-2xl border border-slate-700 bg-slate-800 p-4 text-white"
                placeholder="********"
                placeholderTextColor="#64748b"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              onPress={() => router.replace('/admin/members')}
              className="mt-6 items-center rounded-2xl bg-red-500 p-4 shadow-lg shadow-red-500/50">
              <Text className="text-lg font-bold text-white">ยืนยันตัวตน</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-10 items-center">
            <Text className="text-center text-slate-500">
              หากคุณไม่ใช่ผู้ดูแลระบบ โปรดกลับไปหน้าหลัก
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
