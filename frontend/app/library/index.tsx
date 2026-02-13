import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { books } from '../../data/library';
import BookCard from '../../components/BookCard';

export default function BooksScreen() {
  return (
    <View className="flex-1 bg-gray-50 px-4 pt-4">
      <View className="mb-4">
        <Text className="text-2xl font-bold text-gray-800">รายการหนังสือทั้งหมด</Text>
        <Text className="text-gray-500">จัดการข้อมูลหนังสือในระบบ</Text>
      </View>

      <FlatList
        data={books}
        keyExtractor={(item) => item.book_id}
        renderItem={({ item }) => <BookCard book={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
