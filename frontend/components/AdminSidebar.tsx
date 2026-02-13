import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function AdminSidebar(props: any) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <View className="flex-1 bg-slate-900">
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        {/* Header section - Admin Profile Context */}
        <View className="border-b border-slate-700 bg-slate-800/80 p-6 pb-10">
          <View className="mb-4 h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-500/20">
            <Ionicons name="shield-checkmark" size={24} color="white" />
          </View>
          <Text className="text-lg font-bold tracking-tight text-white">
            {user?.fullName || 'ผู้ดูแลระบบ'}
          </Text>
          <Text className="mt-0.5 text-[10px] font-black uppercase tracking-[2px] text-blue-400">
            Admin Console
          </Text>
          
          <View className="mt-4 flex-row items-center">
            <View className="mr-2 h-2 w-2 rounded-full bg-green-500" />
            <Text className="text-xs font-medium text-slate-400">กำลังใช้งาน (Online)</Text>
          </View>
        </View>

        {/* Menu Section */}
        <View className="flex-1 px-2 pt-6">
          <Text className="mb-4 ml-4 text-[10px] font-black uppercase tracking-[2px] text-slate-500">
            การจัดการระบบ
          </Text>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      {/* Logout Section */}
      <View className="border-t border-slate-800 bg-slate-900 p-4">
        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={0.7}
          className="flex-row items-center rounded-2xl bg-slate-800/40 p-4">
          <View className="mr-3 h-9 w-9 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
            <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          </View>
          <Text className="text-base font-bold text-red-500">ออกจากระบบ</Text>
        </TouchableOpacity>
        <Text className="mt-4 text-center text-[10px] font-medium uppercase tracking-tighter text-slate-600">
          Library Admin System v1.0.0
        </Text>
      </View>
    </View>
  );
}
