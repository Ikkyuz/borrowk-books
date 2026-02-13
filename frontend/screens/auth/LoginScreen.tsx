import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        {/* ✨ บีบความกว้างหน้าจอให้สมดุล (Center Container) */}
        <View className="mx-auto w-full max-w-[450px] flex-1 bg-white shadow-2xl shadow-black/5">
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            className="px-8"
            showsVerticalScrollIndicator={false}>
            {/* 1. ปุ่มย้อนกลับ */}
            <View className="mb-6 mt-8">
              <TouchableOpacity
                onPress={() => router.back()}
                className="h-10 w-10 items-center justify-center rounded-full bg-gray-100 active:bg-gray-200">
                <Ionicons name="chevron-back" size={24} color="#1e293b" />
              </TouchableOpacity>
            </View>

            {/* 2. ส่วนหัว (Branding) */}
            <View className="mb-12 items-center">
              <View className="mb-6 h-24 w-24 items-center justify-center rounded-[32px] bg-blue-600 shadow-xl shadow-blue-500/40">
                <Ionicons name="library" size={48} color="white" />
              </View>
              <Text className="text-3xl font-black tracking-tight text-slate-900">
                Smart Library
              </Text>
              <Text className="mt-2 text-center text-sm font-medium uppercase tracking-widest text-slate-400">
                Login to your account
              </Text>
            </View>

            {/* 3. แบบฟอร์มกรอกข้อมูล */}
            <View className="space-y-5">
              {/* Email Input */}
              <View>
                <Text className="mb-2 ml-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Email Address
                </Text>
                <View className="h-14 flex-row items-center rounded-2xl border-2 border-slate-50 bg-slate-50 px-4 focus:border-blue-500 focus:bg-white">
                  <Ionicons name="mail-outline" size={20} color="#94a3b8" />
                  <TextInput
                    placeholder="example@mail.com"
                    placeholderTextColor="#cbd5e1"
                    className="flex-1 px-4 text-base font-semibold text-slate-700"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View className="mt-4">
                <View className="mb-2 flex-row items-center justify-between px-1">
                  <Text className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Password
                  </Text>
                  <TouchableOpacity>
                    <Text className="text-xs font-bold text-blue-600">Forgot?</Text>
                  </TouchableOpacity>
                </View>
                <View className="h-14 flex-row items-center rounded-2xl border-2 border-slate-50 bg-slate-50 px-4 focus:border-blue-500 focus:bg-white">
                  <Ionicons name="lock-closed-outline" size={20} color="#94a3b8" />
                  <TextInput
                    placeholder="••••••••"
                    placeholderTextColor="#cbd5e1"
                    className="flex-1 px-4 text-base font-semibold text-slate-700"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color="#94a3b8"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* 4. ปุ่มเข้าสู่ระบบ */}
              <TouchableOpacity
                activeOpacity={0.8}
                className="mt-8 h-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-500/30"
                onPress={() => console.log('Login Pressed', email, password)}>
                <Text className="text-lg font-bold tracking-wide text-white">SIGN IN</Text>
              </TouchableOpacity>

              {/* 5. เส้นคั่น */}
              <View className="my-8 flex-row items-center justify-center">
                <View className="h-[1px] w-12 bg-slate-100" />
                <Text className="mx-4 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                  New Member?
                </Text>
                <View className="h-[1px] w-12 bg-slate-100" />
              </View>

              {/* 6. ปุ่มลงทะเบียน */}
              <TouchableOpacity
                activeOpacity={0.6}
                className="mb-10 h-14 w-full items-center justify-center rounded-2xl border-2 border-slate-100">
                <Text className="text-base font-bold text-slate-600">Create New Account</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
