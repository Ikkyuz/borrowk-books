import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function UserSidebar(props: any) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{ paddingTop: 0 }}
          showsVerticalScrollIndicator={false}>
          {/* 1. Header Section - ลดขนาด padding และความสูงลง */}
          <View className="rounded-br-[35px] bg-blue-600 px-5 pb-7 pt-10">
            <View className={`flex-row items-center ${Platform.OS === 'ios' ? 'mt-4' : 'mt-2'}`}>
              {/* Profile Avatar - ปรับขนาดให้เล็กลงกะทัดรัดขึ้น */}
              <View className="mr-4 h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/20">
                <Ionicons name="person" size={24} color="white" />
              </View>

              {/* Text Group */}
              <View className="flex-1">
                <Text className="text-lg font-black tracking-tight text-white" numberOfLines={1}>
                  สวัสดี, ผู้ใช้งาน
                </Text>
                <View className="mt-0.5 flex-row items-center">
                  <View className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-400" />
                  <Text className="text-[11px] font-medium text-blue-100">
                    สมาชิกห้องสมุดอัจฉริยะ
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* 2. Menu Section */}
          <View className="mt-6 px-3">
            <Text className="mb-3 ml-4 text-[9px] font-black uppercase tracking-[2px] text-gray-400">
              เมนูหลัก
            </Text>
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>

        {/* 3. Bottom Section */}
        <View className="px-5 pb-6">
          <TouchableOpacity
            onPress={() => router.replace('/')}
            activeOpacity={0.8}
            className="flex-row items-center rounded-2xl border border-gray-100 bg-gray-50 p-3.5 shadow-sm">
            <View className="mr-3 h-9 w-9 items-center justify-center rounded-xl bg-blue-50">
              <Ionicons name="log-out" size={18} color="#2563eb" />
            </View>
            <Text className="text-sm font-bold text-blue-600">ออกจากระบบ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
