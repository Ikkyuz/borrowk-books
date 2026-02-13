import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { borrowingApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function ReturnScreen() {
  const [borrowings, setBorrowings] = useState<any[]>([]);
  const [allBooks, setAllBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [historyRes, booksRes] = await Promise.all([
        borrowingApi.getHistory(user.id),
        bookApi.getAll()
      ]);
      setAllBooks(booksRes.data);
      setBorrowings(historyRes.data.filter((i: any) => !i.returnDate));
    } catch (e) {
      const msg = 'โหลดข้อมูลรายการยืมไม่สำเร็จ';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const getBookTitle = (bookId: number) => {
    return allBooks.find(b => b.id === bookId)?.title || `หนังสือ (ID: ${bookId})`;
  };

  const handleReturn = (item: any) => {
    const bookTitle = item.book?.title || getBookTitle(item.bookId);
    const confirmMsg = `คุณต้องการคืน "${bookTitle}" ใช่หรือไม่?`;
    
    if (Platform.OS === 'web') {
      if (window.confirm(confirmMsg)) {
        performReturn(item.id);
      }
    } else {
      Alert.alert('ยืนยัน', confirmMsg, [
        { text: 'ยกเลิก' },
        { text: 'คืนหนังสือ', onPress: () => performReturn(item.id) }
      ]);
    }
  };

  const performReturn = async (id: number) => {
    try {
      await borrowingApi.return(id);
      const msg = 'คืนหนังสือเรียบร้อย';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('สำเร็จ', msg);
      loadData();
    } catch (e) {
      const msg = 'การคืนล้มเหลว';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Error', msg);
    }
  };

  return (
    <View className="flex-1 bg-white pt-12 px-6">
      <Text className="text-2xl font-black text-slate-900 mb-6">คืนหนังสือ</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#3b82f6" className="mt-10" />
      ) : (
        <FlatList
          data={borrowings}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View className="flex-row items-center p-5 bg-white border border-slate-100 rounded-3xl mb-4 shadow-sm">
              <View className="flex-1">
                <Text className="font-bold text-slate-900 text-lg">
                  {item.book?.title || getBookTitle(item.bookId)}
                </Text>
                <Text className="text-slate-400 text-sm">ยืมเมื่อ: {new Date(item.borrowDate).toLocaleDateString()}</Text>
              </View>
              <TouchableOpacity onPress={() => handleReturn(item)} className="bg-slate-900 p-3 rounded-2xl">
                <Ionicons name="return-up-back" size={20} color="white" />
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <View className="items-center mt-20">
              <Ionicons name="checkmark-done-circle-outline" size={80} color="#e2e8f0" />
              <Text className="text-slate-400 mt-4 font-bold">ไม่มีหนังสือค้างคืน</Text>
            </View>
          }
        />
      )}
    </View>
  );
}
