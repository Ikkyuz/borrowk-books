import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { members } from '../../data/library';
import MemberCard from '../../components/MemberCard';
import { Ionicons } from '@expo/vector-icons';

export default function AdminMembersScreen() {
  return (
    <View className="flex-1 bg-slate-50">
      <View className="bg-slate-900 pt-12 pb-6 px-6 rounded-b-[30px]">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-white text-3xl font-bold">สมาชิก</Text>
            <Text className="text-slate-400 mt-1">จัดการข้อมูลสมาชิกทั้งหมด</Text>
          </View>
          <TouchableOpacity className="bg-blue-600 p-3 rounded-2xl">
            <Ionicons name="person-add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-10">
        <View className="mb-10 px-2 flex-row justify-between items-end">
          <View>
            <Text className="text-4xl font-black text-slate-900 tracking-tighter">สมาชิก</Text>
            <View className="h-1.5 w-12 bg-blue-600 mt-2 rounded-full" />
          </View>
          <TouchableOpacity className="bg-blue-600 px-6 py-3 rounded-2xl shadow-lg flex-row items-center">
            <Ionicons name="person-add" size={20} color="white" />
            <Text className="text-white font-bold ml-2">เพิ่มสมาชิก</Text>
          </TouchableOpacity>
        </View>

        {/* Table Container */}
        <View className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">
          {/* Table Header Row */}
          <View className="flex-row items-center px-6 py-4 bg-slate-50 border-b border-slate-200">
            <View className="flex-[4] pr-4">
              <Text className="text-xs font-bold text-slate-500 uppercase tracking-wider">ข้อมูลสมาชิก</Text>
            </View>
            <View className="flex-[3] px-2">
              <Text className="text-xs font-bold text-slate-500 uppercase tracking-wider text-left">Username</Text>
            </View>
            <View className="flex-[3] px-2 items-center">
              <Text className="text-xs font-bold text-slate-500 uppercase tracking-wider">บทบาท</Text>
            </View>
            <View className="flex-[2] items-end">
              <Text className="text-xs font-bold text-slate-500 uppercase tracking-wider">จัดการ</Text>
            </View>
          </View>

          <FlatList
            data={members}
            keyExtractor={(item) => item.member_id.toString()}
            renderItem={({ item }) => (
              <View className="flex-row items-center px-6 py-5 border-b border-slate-100">
                {/* Col-span-4: Name & ID */}
                <View className="flex-[4] flex-row items-center pr-4">
                  <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
                    <Text className="text-blue-600 font-bold">{item.full_name.charAt(0)}</Text>
                  </View>
                  <View>
                    <Text className="text-sm font-bold text-slate-900 leading-snug">{item.full_name}</Text>
                    <Text className="text-xs text-slate-500 mt-0.5 font-medium">#ID-{item.member_id}</Text>
                  </View>
                </View>

                {/* Col-span-3: Username */}
                <View className="flex-[3] px-2">
                  <Text className="text-sm text-slate-600 font-medium">{item.username}</Text>
                </View>

                {/* Col-span-3: Role */}
                <View className="flex-[3] items-center">
                  <View className={`px-4 py-1 rounded-full ${
                    item.role === 'admin' ? 'bg-purple-100' : 'bg-slate-100'
                  }`}>
                    <Text className={`text-[10px] font-black uppercase tracking-widest ${
                      item.role === 'admin' ? 'text-purple-700' : 'text-slate-700'
                    }`}>
                      {item.role}
                    </Text>
                  </View>
                </View>

                {/* Col-span-2: Action */}
                <TouchableOpacity className="flex-[2] items-end">
                  <View className="bg-slate-900 px-4 py-2 rounded-xl">
                    <Text className="text-white text-xs font-bold">แก้ไข</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      </View>
    </View>
  );
}
