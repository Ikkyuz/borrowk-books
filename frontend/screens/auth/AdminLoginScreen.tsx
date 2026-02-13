import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { memberApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function AdminLoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleAdminLogin = async () => {
    if (!username || !password) {
      const msg = 'กรุณากรอกข้อมูลให้ครบ';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Error', msg);
      return;
    }
    setLoading(true);
    try {
      const res = await memberApi.login({ username, password });
      const { token, member } = res.data;

      if (member.role !== 'admin') {
        const msg = 'บัญชีนี้ไม่ใช่ผู้ดูแลระบบ';
        Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Access Denied', msg);
        return;
      }

      login(token, member);
      router.replace('/');
    } catch (error: any) {
      const msg = error.response?.data?.error || 'เข้าสู่ระบบไม่สำเร็จ';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Login Failed', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-slate-950" showsVerticalScrollIndicator={false}>
      <View className="flex-1 px-10 pt-20 pb-10">
        <TouchableOpacity onPress={() => router.back()} className="mb-12 bg-white/5 self-start p-4 rounded-3xl border border-white/10">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <View className="mb-16">
          <View className="bg-red-500/10 w-16 h-16 rounded-3xl items-center justify-center mb-6 border border-red-500/20">
            <Ionicons name="shield-checkmark" size={32} color="#ef4444" />
          </View>
          <Text className="text-5xl font-black text-white tracking-tighter">Admin.</Text>
          <Text className="text-slate-500 text-lg font-medium mt-2">Secure access for{'\n'}system administrators</Text>
        </View>

        <View className="space-y-8">
          <View>
            <Text className="text-white/40 font-black text-[10px] uppercase tracking-[3px] mb-3 ml-1">Secure ID</Text>
            <View className="bg-white/5 rounded-[25px] border border-white/10 px-6 py-5 flex-row items-center">
              <Ionicons name="finger-print-outline" size={20} color="#475569" />
              <TextInput 
                className="flex-1 ml-4 text-white font-bold text-base"
                placeholder="Admin Username"
                placeholderTextColor="#475569"
                autoCapitalize="none"
                value={username}
                onChangeText={setUsername}
              />
            </View>
          </View>

          <View>
            <Text className="text-white/40 font-black text-[10px] uppercase tracking-[3px] mb-3 ml-1">Master Key</Text>
            <View className="bg-white/5 rounded-[25px] border border-white/10 px-6 py-5 flex-row items-center">
              <Ionicons name="key-outline" size={20} color="#475569" />
              <TextInput 
                className="flex-1 ml-4 text-white font-bold text-base"
                placeholder="********"
                placeholderTextColor="#475569"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          <TouchableOpacity 
            onPress={handleAdminLogin}
            disabled={loading}
            activeOpacity={0.8}
            className={`h-20 rounded-[30px] items-center justify-center mt-6 shadow-2xl ${loading ? 'bg-slate-800' : 'bg-red-600 shadow-red-900/40'}`}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-xl font-black uppercase tracking-widest">Verify Sudo</Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-auto pt-10 items-center">
          <Text className="text-slate-600 font-bold text-xs uppercase tracking-[2px]">Encrypted Session v1.2</Text>
        </View>
      </View>
    </ScrollView>
  );
}
