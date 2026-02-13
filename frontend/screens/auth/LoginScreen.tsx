import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { memberApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!username || !password) {
      const msg = 'กรุณากรอกข้อมูลให้ครบ';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Error', msg);
      return;
    }
    setLoading(true);
    try {
      const res = await memberApi.login({ username, password });
      login(res.data.token, res.data.member);
      router.replace('/');
    } catch (error: any) {
      const msg = error.response?.data?.error || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Login Failed', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      className="flex-1 bg-white"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 px-10 pt-20 pb-10">
          <TouchableOpacity onPress={() => router.back()} className="mb-12 bg-slate-50 self-start p-4 rounded-3xl">
            <Ionicons name="arrow-back" size={24} color="#1e293b" />
          </TouchableOpacity>

          <View className="mb-16">
            <Text className="text-5xl font-black text-slate-900 tracking-tighter">Sign In.</Text>
            <Text className="text-slate-400 text-lg font-medium mt-2">ยินดีต้อนรับกลับมา{'\n'}เข้าสู่ระบบเพื่อเริ่มใช้งาน</Text>
          </View>

          <View className="space-y-8">
            <View>
              <Text className="text-slate-900 font-black text-xs uppercase tracking-[2px] mb-3 ml-1">Username</Text>
              <View className="bg-slate-50 rounded-[25px] border border-slate-100 px-6 py-5 flex-row items-center focus:border-blue-500">
                <Ionicons name="at-outline" size={20} color="#94a3b8" />
                <TextInput 
                  className="flex-1 ml-4 text-slate-800 font-bold text-base"
                  placeholder="ชื่อผู้ใช้งานของคุณ"
                  autoCapitalize="none"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
            </View>

            <View>
              <Text className="text-slate-900 font-black text-xs uppercase tracking-[2px] mb-3 ml-1">Password</Text>
              <View className="bg-slate-50 rounded-[25px] border border-slate-100 px-6 py-5 flex-row items-center">
                <Ionicons name="lock-closed-outline" size={20} color="#94a3b8" />
                <TextInput 
                  className="flex-1 ml-4 text-slate-800 font-bold text-base"
                  placeholder="********"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
            </View>

            <TouchableOpacity 
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.8}
              className={`h-20 rounded-[30px] items-center justify-center mt-6 shadow-2xl ${loading ? 'bg-slate-200' : 'bg-blue-600 shadow-blue-300'}`}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <View className="flex-row items-center">
                  <Text className="text-white text-xl font-black mr-2">Login Now</Text>
                  <Ionicons name="arrow-forward" size={20} color="white" />
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View className="mt-auto pt-10 flex-row justify-center items-center">
            <Text className="text-slate-400 font-bold">New member? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/register')}>
              <Text className="text-blue-600 font-black">Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
