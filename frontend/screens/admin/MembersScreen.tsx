import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import { members } from '../../data/library';
import { Ionicons } from '@expo/vector-icons';
import AdminHeader from '../../components/AdminHeader';

export default function AdminMembersScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = members.filter(
    (member) =>
      member.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      <AdminHeader
        title="จัดการสมาชิก"
        subtitle="Manage Members"
        variant="dark"
        rightElement={
          <TouchableOpacity
            activeOpacity={0.8}
            className="h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-500/40">
            <Ionicons name="person-add" size={22} color="white" />
          </TouchableOpacity>
        }
      />

      {/* Main Content */}
      <View className="-mt-8 flex-1 px-4 pt-4">
        <View className="mx-auto w-full max-w-5xl flex-1">
          {/* Action Row - Outside Header */}
          <View className="mb-6 flex-row items-center">
            <View className="mr-3 flex-1 flex-row items-center rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
              <Ionicons name="search" size={20} color="#94a3b8" />
              <TextInput
                className="ml-3 flex-1 text-base text-slate-800"
                placeholder="ค้นหาชื่อ หรือชื่อผู้ใช้..."
                placeholderTextColor="#94a3b8"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              className="h-[52px] w-[52px] items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-500/40">
              <Ionicons name="person-add" size={22} color="white" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={filteredMembers}
            keyExtractor={(item) => item.member_id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40, paddingTop: 10 }}
            renderItem={({ item }) => (
              <View className="mb-4 flex-row items-center rounded-[28px] border border-slate-100 bg-white p-5 shadow-sm">
                {/* Profile Avatar */}
                <View className="mr-4 h-16 w-16 items-center justify-center rounded-[22px] border border-blue-100/50 bg-blue-50">
                  <Text className="text-2xl font-bold text-blue-600">
                    {item.full_name.charAt(0).toUpperCase()}
                  </Text>
                </View>

                {/* Member Info */}
                <View className="flex-1">
                  <View className="mb-1 flex-row items-center">
                    <Text className="mr-2 text-lg font-bold text-slate-800" numberOfLines={1}>
                      {item.full_name}
                    </Text>
                    {item.role === 'admin' && (
                      <View className="rounded-md bg-purple-100 px-2 py-0.5">
                        <Text className="text-[10px] font-bold uppercase tracking-tighter text-purple-700">
                          Admin
                        </Text>
                      </View>
                    )}
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-sm font-medium text-slate-400">@{item.username}</Text>
                    <View className="mx-2 h-1 w-1 rounded-full bg-slate-200" />
                    <Text className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      ID: {item.member_id.toString().padStart(3, '0')}
                    </Text>
                  </View>
                </View>

                {/* Action Button */}
                <TouchableOpacity
                  className="h-12 w-12 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 active:bg-slate-100"
                  activeOpacity={0.6}>
                  <Ionicons name="settings-outline" size={20} color="#64748b" />
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={
              <View className="mt-20 items-center p-10">
                <View className="mb-6 h-24 w-24 items-center justify-center rounded-full bg-slate-100">
                  <Ionicons name="people-outline" size={48} color="#cbd5e1" />
                </View>
                <Text className="text-center text-xl font-bold text-slate-500">
                  {searchQuery ? 'ไม่พบสมาชิกที่ค้นหา' : 'ยังไม่มีข้อมูลสมาชิก'}
                </Text>
                <Text className="mt-2 text-center text-sm leading-5 text-slate-400">
                  {searchQuery
                    ? 'ลองใช้คำค้นหาอื่นในการค้นหาอีกครั้ง'
                    : 'สมาชิกที่ลงทะเบียนจะแสดงรายการที่นี่'}
                </Text>
              </View>
            }
          />
        </View>
      </View>
    </View>
  );
}
