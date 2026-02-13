import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Header Section */}
        <View className="bg-blue-600 px-6 pt-12 pb-16 rounded-b-[40px] shadow-xl">
          <View className="items-center">
            <View className="w-24 h-24 bg-white/20 rounded-3xl items-center justify-center mb-6">
              <Ionicons name="library" size={50} color="white" />
            </View>
            <Text className="text-4xl font-extrabold text-white text-center">Smart Library</Text>
            <Text className="text-blue-100 mt-2 text-lg text-center font-medium">
              ระบบจัดการห้องสมุดอัจฉริยะ
            </Text>
          </View>
        </View>

        {/* Menu Section */}
        <View className="px-6 -mt-10">
          <View className="gap-4">
            {/* User Login Card */}
            <TouchableOpacity 
              onPress={() => router.push('/auth/login')}
              className="bg-white p-6 rounded-3xl flex-row items-center shadow-lg border border-gray-50"
            >
              <View className="w-16 h-16 bg-blue-100 rounded-2xl items-center justify-center mr-4">
                <Ionicons name="person-outline" size={30} color="#2563eb" />
              </View>
              <View className="flex-1">
                <Text className="text-xl font-bold text-gray-800">เข้าใช้งานทั่วไป</Text>
                <Text className="text-gray-500">สำหรับสมาชิก ยืม-คืนหนังสือ</Text>
              </View>
              <View className="bg-gray-50 p-2 rounded-full">
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </View>
            </TouchableOpacity>

            {/* Admin Login Card */}
            <TouchableOpacity 
              onPress={() => router.push('/auth/admin-login')}
              className="bg-slate-900 p-6 rounded-3xl flex-row items-center shadow-lg"
            >
              <View className="w-16 h-16 bg-slate-800 rounded-2xl items-center justify-center mr-4">
                <Ionicons name="shield-checkmark-outline" size={30} color="#ef4444" />
              </View>
              <View className="flex-1">
                <Text className="text-xl font-bold text-white">ผู้ดูแลระบบ</Text>
                <Text className="text-slate-400">จัดการสมาชิกและหนังสือ</Text>
              </View>
              <View className="bg-slate-800 p-2 rounded-full">
                <Ionicons name="lock-closed" size={18} color="#64748b" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Stats Section */}
          <View className="mt-8 flex-row gap-4">
            <View className="flex-1 bg-green-50 p-6 rounded-3xl border border-green-100 items-center">
              <Text className="text-3xl font-bold text-green-700">1.2k+</Text>
              <Text className="text-green-600 font-medium mt-1">หนังสือ</Text>
            </View>
            <View className="flex-1 bg-purple-50 p-6 rounded-3xl border border-purple-100 items-center">
              <Text className="text-3xl font-bold text-purple-700">500+</Text>
              <Text className="text-purple-600 font-medium mt-1">สมาชิก</Text>
            </View>
          </View>
        </View>

        <View className="py-10 items-center">
          <Text className="text-gray-400 font-medium italic">© 2026 Smart Library System</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
