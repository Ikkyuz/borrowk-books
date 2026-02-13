import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { borrowings, books, members } from '../../data/library';
import { Ionicons } from '@expo/vector-icons';
import AdminHeader from '../../components/AdminHeader';

export default function BorrowedListScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const activeBorrowings = borrowings.filter((b) => !b.return_date);

  const filteredBorrowings = activeBorrowings.filter((item) => {
    const book = books.find((b) => b.book_id === item.book_id);
    const member = members.find((m) => m.member_id === item.member_id);
    const searchLower = searchQuery.toLowerCase();
    return (
      book?.title.toLowerCase().includes(searchLower) ||
      member?.full_name.toLowerCase().includes(searchLower) ||
      item.book_id.toLowerCase().includes(searchLower)
    );
  });

  return (
    <View className="flex-1 bg-slate-50">
      <AdminHeader
        title="การยืมปัจจุบัน"
        subtitle="Active Borrowings"
        variant="dark"
        iconName="receipt-outline"
      />

      {/* Main Content */}
      <View className="-mt-8 flex-1 px-4 pt-4">
        <View className="mx-auto w-full max-w-5xl flex-1">
          {/* Search Bar - Outside Header */}
          <View className="mb-6 flex-row items-center rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
            <Ionicons name="search" size={20} color="#94a3b8" />
            <TextInput
              className="ml-3 flex-1 text-base text-slate-800"
              placeholder="ค้นหาตามชื่อหนังสือ หรือผู้ยืม..."
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <FlatList
            data={filteredBorrowings}
            keyExtractor={(item) => item.borrow_id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40, paddingTop: 10 }}
            renderItem={({ item }) => {
              const book = books.find((b) => b.book_id === item.book_id);
              const member = members.find((m) => m.member_id === item.member_id);

              return (
                <View className="mb-4 rounded-[28px] border border-slate-100 bg-white p-5 shadow-sm">
                  <View className="flex-row items-start justify-between">
                    <View className="mr-4 flex-1">
                      <View className="mb-1 flex-row items-center">
                        <View className="mr-2 rounded-lg bg-orange-100 px-2 py-1">
                          <Text className="text-[10px] font-bold uppercase text-orange-700">
                            กำลังยืม
                          </Text>
                        </View>
                        <Text className="text-[11px] font-medium text-slate-400">
                          #{item.book_id}
                        </Text>
                      </View>
                      <Text
                        className="text-lg font-bold leading-6 text-slate-800"
                        numberOfLines={2}>
                        {book?.title || 'ไม่พบข้อมูล'}
                      </Text>
                    </View>
                    <TouchableOpacity className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                      <Ionicons name="ellipsis-vertical" size={20} color="#64748b" />
                    </TouchableOpacity>
                  </View>

                  <View className="mt-4 flex-row items-center justify-between border-t border-slate-50 pt-4">
                    <View className="flex-row items-center">
                      <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                        <Ionicons name="person" size={18} color="#3b82f6" />
                      </View>
                      <View>
                        <Text className="mb-0.5 text-xs font-medium text-slate-400">ผู้ยืม</Text>
                        <Text className="text-sm font-bold text-slate-700">
                          {member?.full_name || 'ไม่พบข้อมูล'}
                        </Text>
                      </View>
                    </View>

                    <View className="items-end">
                      <Text className="mb-0.5 text-xs font-medium text-slate-400">วันที่ยืม</Text>
                      <View className="flex-row items-center">
                        <Ionicons
                          name="calendar-outline"
                          size={14}
                          color="#64748b"
                          className="mr-1"
                        />
                        <Text className="ml-1 text-sm font-semibold text-slate-600">
                          {item.borrow_date}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    className="mt-5 flex-row items-center justify-center rounded-2xl bg-slate-900 py-4">
                    <Ionicons name="checkmark-circle-outline" size={18} color="white" />
                    <Text className="ml-2 font-bold text-white">จัดการการคืนหนังสือ</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            ListEmptyComponent={
              <View className="mt-20 items-center p-10">
                <View className="mb-6 h-24 w-24 items-center justify-center rounded-full bg-slate-100">
                  <Ionicons name="search-outline" size={48} color="#cbd5e1" />
                </View>
                <Text className="text-center text-xl font-bold text-slate-500">
                  {searchQuery ? 'ไม่พบข้อมูลที่ค้นหา' : 'ไม่มีหนังสือที่ถูกยืม'}
                </Text>
                <Text className="mt-2 text-center text-sm leading-5 text-slate-400">
                  {searchQuery
                    ? 'ลองเปลี่ยนคำค้นหาหรือลบคำค้นหาออก'
                    : 'รายการยืมหนังสือที่รอดำเนินการจะแสดงที่นี่'}
                </Text>
              </View>
            }
          />
        </View>
      </View>
    </View>
  );
}
