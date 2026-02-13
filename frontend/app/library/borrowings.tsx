import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import { borrowingApi } from '../../services/api';
import BorrowingCard from '../../components/BorrowingCard';

export default function BorrowingsScreen() {
  const [borrowings, setBorrowings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBorrowings = async () => {
      try {
        const res = await borrowingApi.getAll();
        setBorrowings(res.data);
      } catch (e) {
        Alert.alert('Error', 'ไม่สามารถโหลดข้อมูลการยืมได้');
      } finally {
        setLoading(false);
      }
    };
    fetchBorrowings();
  }, []);

  return (
    <View className="flex-1 bg-white px-4 pt-4">
      <View className="mb-4">
        <Text className="text-2xl font-bold text-gray-800">ประวัติการยืม-คืน</Text>
        <Text className="text-gray-500">ข้อมูลจริงจากฐานข้อมูล</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#3b82f6" />
      ) : (
        <FlatList
          data={borrowings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <BorrowingCard borrowing={{
            ...item, 
            borrow_id: item.id,
            member_id: item.memberId,
            book_id: item.bookId,
            borrow_date: new Date(item.borrowDate).toLocaleDateString(),
            return_date: item.returnDate ? new Date(item.returnDate).toLocaleDateString() : undefined
          }} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
