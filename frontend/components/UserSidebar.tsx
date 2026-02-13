import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function UserSidebar(props: any) {
  return (
    <View className="flex-1 bg-white">
      <DrawerContentScrollView 
        {...props} 
        contentContainerStyle={{ paddingTop: 0 }}
      >
        {/* Header section - Professional Blue - Full Width */}
        <View className="p-6 bg-blue-600 pb-10">
          <View className={`${Platform.OS === 'ios' ? 'mt-10' : 'mt-6'}`}>
            <View className="w-12 h-12 bg-white/20 rounded-xl items-center justify-center mb-4">
              <Ionicons name="person" size={24} color="white" />
            </View>
            <Text className="text-white text-lg font-bold tracking-tight">สวัสดี, ผู้ใช้งาน</Text>
            <Text className="text-blue-100 text-xs mt-0.5 font-medium">สมาชิกห้องสมุดอัจฉริยะ</Text>
          </View>
        </View>
        
        {/* Menu Section */}
        <View className="flex-1 px-2">
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      {/* Bottom Section - Anchored */}
      <View className="p-4 border-t border-gray-100 bg-white">
        <TouchableOpacity 
          onPress={() => router.replace('/')}
          activeOpacity={0.7}
          className="flex-row items-center bg-gray-50 p-4 rounded-2xl border border-gray-100"
        >
          <View className="w-9 h-9 bg-blue-100 rounded-xl items-center justify-center mr-3">
            <Ionicons name="log-out-outline" size={20} color="#2563eb" />
          </View>
          <Text className="text-blue-600 font-bold text-base">ออกจากระบบ</Text>
        </TouchableOpacity>
        <Text className="text-gray-400 text-[10px] text-center mt-4 font-medium uppercase tracking-widest">
          Smart Library • v1.0.0
        </Text>
      </View>
    </View>
  );
}
