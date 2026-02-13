import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
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
    <View className="flex-1 bg-slate-950">
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        {/* Profile Header */}
        <View className="bg-slate-900 px-6 pb-10 pt-16 rounded-br-[50px] border-b border-slate-800">
          <View className="mb-5 h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-xl shadow-blue-500/40">
            <Ionicons name="shield-checkmark" size={32} color="white" />
          </View>
          
          <Text className="text-xl font-black tracking-tight text-white" numberOfLines={1}>
            {user?.fullName || 'ผู้ดูแลระบบ'}
          </Text>
          <View className="mt-1 flex-row items-center">
            <View className="mr-2 h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <Text className="text-[10px] font-black uppercase tracking-[2px] text-blue-400">
              Administrator
            </Text>
          </View>
        </View>

        {/* Navigation Menu */}
        <View className="flex-1 px-3 pt-8">
          <Text className="mb-4 ml-4 text-[9px] font-black uppercase tracking-[3px] text-slate-600">
            Main Management
          </Text>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      {/* Footer / Logout */}
      <View className="p-6 border-t border-slate-900 bg-slate-950">
        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={0.8}
          className="flex-row items-center rounded-2xl bg-red-500/10 border border-red-500/20 p-4">
          <View className="mr-3 h-10 w-10 items-center justify-center rounded-xl bg-red-500 shadow-lg shadow-red-500/30">
            <Ionicons name="log-out" size={20} color="white" />
          </View>
          <View>
            <Text className="text-sm font-bold text-red-500">ออกจากระบบ</Text>
            <Text className="text-[9px] font-medium text-red-400/60 uppercase">Sign out safely</Text>
          </View>
        </TouchableOpacity>
        
        <Text className="mt-6 text-center text-[10px] font-bold uppercase tracking-widest text-slate-700">
          v1.2.0 • Build 2026
        </Text>
      </View>
    </View>
  );
}
