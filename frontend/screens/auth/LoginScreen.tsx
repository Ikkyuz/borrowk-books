import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
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
    if (!username || !password) return Alert.alert('Error', 'กรุณากรอกข้อมูลให้ครบ');
    setLoading(true);
    try {
      const res = await memberApi.login({ username, password });
      login(res.data.token, res.data.member);
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Login Failed', error.response?.data?.error || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-8 justify-center">
      <TouchableOpacity onPress={() => router.back()} className="absolute top-12 left-6 p-2">
        <Ionicons name="arrow-back" size={28} color="#1e293b" />
      </TouchableOpacity>

      <View className="items-center mb-10">
        <View className="bg-blue-50 p-5 rounded-3xl mb-4">
          <Ionicons name="person" size={40} color="#3b82f6" />
        </View>
        <Text className="text-2xl font-black text-slate-900">ยินดีต้อนรับ</Text>
        <Text className="text-slate-400 mt-1">เข้าสู่ระบบเพื่อใช้งานห้องสมุด</Text>
      </View>

      <View className="space-y-4">
        <View>
          <Text className="text-slate-500 font-bold mb-2 ml-1">Username</Text>
          <TextInput 
            className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-slate-800"
            placeholder="ชื่อผู้ใช้งาน..."
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View>
          <Text className="text-slate-500 font-bold mb-2 ml-1">Password</Text>
          <TextInput 
            className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-slate-800"
            placeholder="********"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity 
          onPress={handleLogin}
          disabled={loading}
          className={`h-14 rounded-2xl items-center justify-center mt-4 ${loading ? 'bg-slate-200' : 'bg-blue-600 shadow-sm'}`}
        >
          {loading ? <ActivityIndicator color="white" /> : <Text className="text-white text-lg font-bold">เข้าสู่ระบบ</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}
