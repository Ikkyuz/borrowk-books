import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AdminHeader from '../../components/AdminHeader';
import { borrowingApi } from '../../services/api';

export default function BorrowedListScreen() {
  const [borrowings, setBorrowings] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchActiveBorrowings = async () => {
    setIsLoading(true);
    try {
      const response = await borrowingApi.getActive();
      setBorrowings(response.data);
    } catch (error) {
      Alert.alert('Error', 'ไม่สามารถดึงข้อมูลรายการยืมได้');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveBorrowings();
  }, []);

  const handleReturn = async (id: number, bookTitle: string) => {
    Alert.alert('ยืนยันการคืน', `ยืนยันการคืนหนังสือ "${bookTitle}" หรือไม่?`, [
      { text: 'ยกเลิก', style: 'cancel' },
      {
        text: 'ยืนยัน',
        onPress: async () => {
          try {
            await borrowingApi.return(id);
            Alert.alert('สำเร็จ', 'คืนหนังสือเรียบร้อยแล้ว');
            fetchActiveBorrowings();
          } catch (error) {
            Alert.alert('Error', 'ไม่สามารถทำรายการคืนได้');
          }
        }
      }
    ]);
  };

  const filteredBorrowings = borrowings.filter((item) => {
    const searchLower = searchQuery.toLowerCase();
    const bookTitle = item.book?.title?.toLowerCase() || "";
    const memberName = item.member?.fullName?.toLowerCase() || "";
    return bookTitle.includes(searchLower) || memberName.includes(searchLower);
  });

  return (
    <View className="flex-1 bg-slate-50">
      <AdminHeader
        title="การยืมปัจจุบัน"
        subtitle="Active Borrowings"
        variant="dark"
        iconName="receipt-outline"
      />

      <View className="-mt-8 flex-1 px-4 pt-4">
        <View className="mx-auto w-full max-w-5xl flex-1">
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

          {isLoading ? (
            <View className="mt-20 items-center">
              <ActivityIndicator size="large" color="#3b82f6" />
            </View>
          ) : (
            <FlatList
              data={filteredBorrowings}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 40, paddingTop: 10 }}
              renderItem={({ item }) => (
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
                          #{item.bookId}
                        </Text>
                      </View>
                      <Text
                        className="text-lg font-bold leading-6 text-slate-800"
                        numberOfLines={2}>
                        {item.book?.title || `หนังสือ (ID: ${item.bookId})`}
                      </Text>
                    </View>
                  </View>

                  <View className="mt-4 flex-row items-center justify-between border-t border-slate-50 pt-4">
                    <View className="flex-row items-center">
                      <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                        <Ionicons name="person" size={18} color="#3b82f6" />
                      </View>
                      <View>
                        <Text className="mb-0.5 text-xs font-medium text-slate-400">ผู้ยืม</Text>
                        <Text className="text-sm font-bold text-slate-700">
                          {item.member?.fullName || `สมาชิก (ID: ${item.memberId})`}
                        </Text>
                      </View>
                    </View>

                    <View className="items-end">
                      <Text className="mb-0.5 text-xs font-medium text-slate-400">วันที่ยืม</Text>
                      <Text className="text-sm font-semibold text-slate-600">
                        {new Date(item.borrowDate).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handleReturn(item.id, item.book?.title || "หนังสือไม่ทราบชื่อ")}
                    className="mt-5 flex-row items-center justify-center rounded-2xl bg-slate-900 py-4">
                    <Ionicons name="checkmark-circle-outline" size={18} color="white" />
                    <Text className="ml-2 font-bold text-white">จัดการการคืนหนังสือ</Text>
                  </TouchableOpacity>
                </View>
              )}
              ListEmptyComponent={
                <View className="mt-20 items-center p-10">
                  <Ionicons name="search-outline" size={48} color="#cbd5e1" />
                  <Text className="text-center text-xl font-bold text-slate-500">
                    ไม่มีหนังสือที่ถูกยืมในขณะนี้
                  </Text>
                </View>
              }
            />
          )}
        </View>
      </View>
    </View>
  );
}
