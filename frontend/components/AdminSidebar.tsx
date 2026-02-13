import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function AdminSidebar(props: any) {
  return (
    <View className="flex-1 bg-slate-900">
      <DrawerContentScrollView 
        {...props} 
        contentContainerStyle={{ paddingTop: 0 }}
      >
        {/* Header section - Distinct & Cohesive - Full Width */}
        <View className="p-6 bg-slate-800/80 pb-10 border-b border-slate-700">
          <View className="w-12 h-12 bg-blue-600 rounded-xl items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
            <Ionicons name="shield-checkmark" size={24} color="white" />
          </View>
          <Text className="text-white text-lg font-bold tracking-tight">Admin Console</Text>
          <Text className="text-slate-400 text-xs mt-0.5 uppercase tracking-widest font-semibold">
            Library Management
          </Text>
        </View>
        
        {/* Menu Section - flex-grow handled by View wrapper */}
        <View className="flex-1 px-2">
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      {/* Logout Section - Anchored at the bottom */}
      <View className="p-4 border-t border-slate-800 bg-slate-900">
        <TouchableOpacity 
          onPress={() => router.replace('/')}
          activeOpacity={0.7}
          className="flex-row items-center bg-slate-800/40 p-4 rounded-2xl"
        >
          <View className="w-9 h-9 bg-red-500/10 rounded-xl items-center justify-center mr-3 border border-red-500/20">
            <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          </View>
          <Text className="text-red-500 font-bold text-base">ออกจากระบบ</Text>
        </TouchableOpacity>
        <Text className="text-slate-600 text-[10px] text-center mt-4 font-medium uppercase tracking-tighter">
          v1.0.4 • secure access
        </Text>
      </View>
    </View>
  );
}
