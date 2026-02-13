import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-[#fcfcfd]">
      <StatusBar barStyle="dark-content" />
      
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* --- Header Hero Section --- */}
        <View className="px-8 pt-10 pb-16 bg-blue-600 rounded-b-[60px] shadow-2xl shadow-blue-200 relative overflow-hidden">
          {/* Background Decorative Circles */}
          <View className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full" />
          <View className="absolute top-40 -left-10 w-32 h-32 bg-blue-500/50 rounded-full" />
          
          <View className="flex-row justify-between items-center mb-10">
            <View className="bg-white/20 p-3 rounded-2xl border border-white/30">
              <Ionicons name="library" size={32} color="white" />
            </View>
            {user && (
              <TouchableOpacity onPress={logout} className="bg-white/10 px-4 py-2 rounded-xl border border-white/20">
                <Text className="text-white font-bold text-xs">Logout</Text>
              </TouchableOpacity>
            )}
          </View>

          <Text className="text-white text-5xl font-black tracking-tighter leading-[55px]">
            Smart{'\n'}Library
          </Text>
          <Text className="text-blue-100 text-lg font-medium mt-4">
            ระบบจัดการห้องสมุดอัจฉริยะ{'\n'}วิทยาลัยเทคนิคนครปฐม
          </Text>
        </View>

        {/* --- Content Section --- */}
        <View className="px-8 -mt-10">
          {!user ? (
            <View className="space-y-6">
              {/* User Entry */}
              <TouchableOpacity 
                activeOpacity={0.9}
                onPress={() => router.push('/auth/login')}
                className="bg-white p-8 rounded-[40px] shadow-xl shadow-slate-200 border border-slate-50 flex-row items-center"
              >
                <View className="bg-blue-50 w-16 h-16 rounded-3xl items-center justify-center mr-6">
                  <Ionicons name="people" size={32} color="#2563eb" />
                </View>
                <View className="flex-1">
                  <Text className="text-2xl font-black text-slate-900">ทั่วไป</Text>
                  <Text className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">For Members</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#e2e8f0" />
              </TouchableOpacity>

              {/* Admin Entry */}
              <TouchableOpacity 
                activeOpacity={0.9}
                onPress={() => router.push('/auth/admin-login')}
                className="bg-slate-900 p-8 rounded-[40px] shadow-2xl shadow-slate-400 flex-row items-center"
              >
                <View className="bg-white/10 w-16 h-16 rounded-3xl items-center justify-center mr-6">
                  <Ionicons name="shield-checkmark" size={32} color="#f87171" />
                </View>
                <View className="flex-1">
                  <Text className="text-2xl font-black text-white">แอดมิน</Text>
                  <Text className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">Management</Text>
                </View>
                <Ionicons name="lock-closed" size={20} color="#475569" />
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => router.push('/auth/register')}
                className="items-center py-4"
              >
                <Text className="text-slate-400 font-bold">ยังไม่เป็นสมาชิก? <Text className="text-blue-600">สมัครที่นี่</Text></Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              {/* Profile Card */}
              <View className="bg-white p-8 rounded-[45px] shadow-xl shadow-slate-200 border border-slate-50 mb-8">
                <View className="flex-row items-center mb-6">
                  <View className="w-16 h-16 bg-slate-100 rounded-3xl items-center justify-center mr-5 border border-slate-200">
                    <Text className="text-2xl font-black text-slate-400">{user.fullName[0]}</Text>
                  </View>
                  <View>
                    <Text className="text-slate-400 text-[10px] font-black uppercase tracking-[3px]">Welcome Back</Text>
                    <Text className="text-2xl font-black text-slate-900">{user.fullName}</Text>
                  </View>
                </View>
                
                <View className="h-px bg-slate-50 w-full mb-6" />
                
                <TouchableOpacity 
                  onPress={() => router.push(user.role === 'admin' ? '/admin/members' : '/user/books')}
                  className="bg-blue-600 py-5 rounded-3xl items-center justify-center shadow-lg shadow-blue-300"
                >
                  <Text className="text-white font-black text-lg">เข้าสู่ระบบจัดการ</Text>
                </TouchableOpacity>
              </View>

              {/* Stats / Info */}
              <View className="flex-row space-x-4 h-32">
                <View className="flex-1 bg-indigo-50 rounded-[35px] p-5 justify-center">
                  <Text className="text-indigo-600 font-black text-2xl">24/7</Text>
                  <Text className="text-indigo-400 text-[10px] font-bold uppercase">Availability</Text>
                </View>
                <View className="flex-1 bg-rose-50 rounded-[35px] p-5 justify-center">
                  <Text className="text-rose-600 font-black text-2xl">Secure</Text>
                  <Text className="text-rose-400 text-[10px] font-bold uppercase">SSL Encrypted</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Footer */}
        <View className="mt-20 items-center opacity-30">
          <Text className="text-[10px] font-black uppercase tracking-[5px] text-slate-900">
            Nakhon Pathom Vocational College
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
