import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Status Bar สีเดียวกับพื้นหลัง */}
      <StatusBar barStyle="light-content" backgroundColor="#2563eb" />

      {/* ✨ จุดที่แก้: เพิ่ม View นี้มาครอบ ScrollView เพื่อจำกัดความกว้างไม่ให้เกิน 500px */}
      <View className="mx-auto w-full max-w-[500px] flex-1 overflow-hidden bg-gray-50 shadow-2xl sm:border-x sm:border-gray-200">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* --- 1. Header Section --- */}
          {/* --- Header Section (Refactored) --- */}
          <View className="relative overflow-hidden rounded-b-[50px] bg-blue-600 pb-12 pt-14 shadow-xl">
            {/* 1. Background Decoration (วงกลมตกแต่งฉากหลัง) */}
            {/* วงขวาบน */}
            <View className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-sm" />
            {/* วงซ้ายล่าง */}
            <View className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-blue-500/50 blur-sm" />

            {/* 2. Content Container */}
            <View className="z-10 items-center justify-center px-4">
              {/* Icon Wrapper: ปรับให้เป็นวงกลมและมีขอบจางๆ ให้ดูมีมิติ */}
              <View className="mb-5 h-24 w-24 items-center justify-center rounded-full border-4 border-white/10 bg-white/20 shadow-sm backdrop-blur-md">
                <Ionicons name="library" size={42} color="white" />
              </View>

              {/* Title */}
              <Text className="text-center text-3xl font-extrabold tracking-tight text-white shadow-sm">
                Smart Library
              </Text>

              {/* Subtitle */}
              <View className="mt-2 rounded-full bg-blue-700/30 px-4 py-1">
                <Text className="text-center text-sm font-medium text-blue-50">
                  ระบบจัดการห้องสมุดอัจฉริยะ 2026
                </Text>
              </View>
            </View>
          </View>

          {/* --- 2. Menu Section --- */}
          <View className="-mt-10 mb-6 px-6">
            <View className="gap-5">
              {/* User Login Card */}
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => router.push('/auth/login')}
                className="flex-row items-center rounded-3xl border border-gray-100 bg-white p-5 shadow-md shadow-gray-200">
                <View className="mr-4 h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                  <Ionicons name="people" size={26} color="#2563eb" />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-900">เข้าใช้งานทั่วไป</Text>
                  <Text className="mt-0.5 text-sm text-gray-500">สมาชิก, นักเรียน, ครูอาจารย์</Text>
                </View>
                <View className="h-8 w-8 items-center justify-center rounded-full bg-gray-50">
                  <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
                </View>
              </TouchableOpacity>

              {/* Admin Login Card */}
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => router.push('/auth/admin-login')}
                className="flex-row items-center rounded-3xl bg-slate-800 p-5 shadow-lg shadow-slate-300">
                <View className="mr-4 h-14 w-14 items-center justify-center rounded-2xl border border-slate-600 bg-slate-700/50">
                  <Ionicons name="shield-checkmark" size={26} color="#f87171" />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold text-white">ผู้ดูแลระบบ</Text>
                  <Text className="mt-0.5 text-sm text-slate-400">จัดการระบบห้องสมุด</Text>
                </View>
                <View className="h-8 w-8 items-center justify-center rounded-full bg-slate-700">
                  <Ionicons name="lock-closed" size={14} color="#cbd5e1" />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View className="items-center py-8 opacity-60">
            <Text className="text-xs font-medium text-gray-400">
              © 2026 Nakhon Pathom Vocational College
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
