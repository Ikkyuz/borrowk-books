import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { borrowings } from '../../data/library';
import BorrowingCard from '../../components/BorrowingCard';

export default function BorrowingsScreen() {
  return (
    <View className="flex-1 bg-gray-50 px-4 pt-4">
      <View className="mb-4">
        <Text className="text-2xl font-bold text-gray-800">ประวัติการยืม-คืน</Text>
        <Text className="text-gray-500">ข้อมูลการยืมหนังสือทั้งหมด</Text>
      </View>

      <FlatList
        data={borrowings}
        keyExtractor={(item) => item.borrow_id.toString()}
        renderItem={({ item }) => <BorrowingCard borrowing={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
