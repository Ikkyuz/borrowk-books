import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function AdminSidebar(props: any) {
  return (
    <View className="flex-1 bg-slate-900">
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        {/* Header section - Distinct & Cohesive - Full Width */}
        <View className="border-b border-slate-700 bg-slate-800/80 p-6 pb-10">
          <View className="mb-4 h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-500/20">
            <Ionicons name="shield-checkmark" size={24} color="white" />
          </View>
          <Text className="text-lg font-bold tracking-tight text-white">Admin Console</Text>
          <Text className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Library Management
          </Text>
        </View>

        {/* Menu Section - flex-grow handled by View wrapper */}
        <View className="flex-1 px-2">
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      {/* Logout Section - Anchored at the bottom */}
      <View className="border-t border-slate-800 bg-slate-900 p-4">
        <TouchableOpacity
          onPress={() => router.replace('/')}
          activeOpacity={0.7}
          className="flex-row items-center rounded-2xl bg-slate-800/40 p-4">
          <View className="mr-3 h-9 w-9 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
            <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          </View>
          <Text className="text-base font-bold text-red-500">ออกจากระบบ</Text>
        </TouchableOpacity>
        <Text className="mt-4 text-center text-[10px] font-medium uppercase tracking-tighter text-slate-600">
          v1.0.4 • secure access
        </Text>
      </View>
    </View>
  );
}
