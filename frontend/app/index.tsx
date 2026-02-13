import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <View className="flex-1 bg-white px-8 justify-center">
      <StatusBar barStyle="dark-content" />
      
      <View className="items-center mb-12">
        <View className="bg-blue-50 p-6 rounded-full mb-4">
          <Ionicons name="library" size={60} color="#3b82f6" />
        </View>
        <Text className="text-3xl font-black text-slate-900">ห้องสมุดอัจฉริยะ</Text>
        <Text className="text-slate-400 mt-2">Smart Library Management System</Text>
      </View>

      {!user ? (
        <View className="space-y-4">
          <TouchableOpacity 
            onPress={() => router.push('/auth/login')}
            className="bg-blue-600 h-14 rounded-2xl items-center justify-center shadow-sm"
          >
            <Text className="text-white text-lg font-bold">เข้าสู่ระบบ</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => router.push('/auth/register')}
            className="border-2 border-slate-100 h-14 rounded-2xl items-center justify-center"
          >
            <Text className="text-slate-600 text-lg font-bold">สมัครสมาชิกใหม่</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => router.push('/auth/admin-login')}
            className="mt-4 items-center"
          >
            <Text className="text-slate-400 font-medium italic">สำหรับผู้ดูแลระบบ</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="space-y-4">
          <View className="bg-slate-50 p-6 rounded-3xl mb-4 border border-slate-100">
            <Text className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">สวัสดีคุณ</Text>
            <Text className="text-xl font-bold text-slate-900">{user.fullName}</Text>
            <Text className="text-blue-600 font-medium text-sm mt-1">{user.role === 'admin' ? 'ผู้ดูแลระบบ' : 'สมาชิกห้องสมุด'}</Text>
          </View>

          <TouchableOpacity 
            onPress={() => router.push(user.role === 'admin' ? '/admin/members' : '/user/books')}
            className="bg-blue-600 h-14 rounded-2xl items-center justify-center flex-row shadow-sm"
          >
            <Ionicons name="enter-outline" size={24} color="white" className="mr-2" />
            <Text className="text-white text-lg font-bold ml-2">เข้าสู่หน้าใช้งาน</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={logout}
            className="bg-red-50 h-14 rounded-2xl items-center justify-center flex-row"
          >
            <Text className="text-red-600 text-lg font-bold">ออกจากระบบ</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
