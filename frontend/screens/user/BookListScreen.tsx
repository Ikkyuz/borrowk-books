import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { bookApi, borrowingApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function BookListScreen() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { user } = useAuth();

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await bookApi.getAvailable();
      setBooks(res.data);
    } catch (e) {
      Alert.alert('Error', 'ไม่สามารถโหลดข้อมูลหนังสือได้');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleBorrow = (book: any) => {
    console.log('BookListScreen: handleBorrow called for book:', book.id);
    
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(`คุณต้องการยืม "${book.title}" ใช่หรือไม่?`);
      if (confirmed) {
        performBorrow(book);
      }
    } else {
      Alert.alert('ยืนยัน', `คุณต้องการยืม "${book.title}" ใช่หรือไม่?`, [
        { text: 'ยกเลิก', style: 'cancel' },
        { text: 'ยืมเลย', onPress: () => performBorrow(book) }
      ]);
    }
  };

  const performBorrow = async (book: any) => {
    try {
      if (!user?.id) {
        const msg = 'ไม่พบข้อมูลผู้ใช้งาน กรุณาเข้าสู่ระบบใหม่';
        Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Error', msg);
        return;
      }
      
      console.log('BookListScreen: Sending borrow request...', { memberId: user.id, bookId: book.id });
      await borrowingApi.borrow({ memberId: user.id, bookId: book.id });
      
      const successMsg = 'ทำรายการยืมเรียบร้อย';
      Platform.OS === 'web' ? window.alert(successMsg) : Alert.alert('สำเร็จ', successMsg);
      fetchBooks();
    } catch (e: any) {
      console.error('BookListScreen: Borrow error:', e.response?.data || e.message);
      const errorMsg = e.response?.data?.error || 'การยืมล้มเหลว';
      Platform.OS === 'web' ? window.alert(errorMsg) : Alert.alert('Error', errorMsg);
    }
  };

  const filtered = books.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <View className="flex-1 bg-white pt-12 px-6">
      <Text className="text-2xl font-black text-slate-900 mb-2">หนังสือที่ว่าง</Text>
      <Text className="text-slate-400 mb-6 font-medium">ค้นหาหนังสือที่คุณต้องการยืมได้ที่นี่</Text>

      <View className="flex-row items-center bg-slate-50 px-4 py-3 rounded-2xl mb-6 border border-slate-100">
        <Ionicons name="search" size={20} color="#94a3b8" />
        <TextInput 
          className="flex-1 ml-3 text-slate-700 font-medium"
          placeholder="ค้นหาชื่อหนังสือ..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#3b82f6" className="mt-10" />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View className="bg-white border border-slate-100 p-5 rounded-3xl mb-4 shadow-sm shadow-slate-200">
              <View className="flex-row justify-between items-start mb-2">
                <Text className="text-lg font-bold text-slate-900 flex-1 pr-2">{item.title}</Text>
                <View className="bg-green-50 px-2 py-1 rounded-lg">
                  <Text className="text-[10px] font-black text-green-600 uppercase">Available</Text>
                </View>
              </View>
              <Text className="text-slate-400 text-sm mb-4">ผู้แต่ง: {item.author || 'ไม่ระบุ'}</Text>
              <TouchableOpacity 
                onPress={() => handleBorrow(item)}
                className="bg-blue-600 h-12 rounded-xl items-center justify-center shadow-sm"
              >
                <Text className="text-white font-bold">ทำรายการยืม</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={<Text className="text-center text-slate-400 mt-10">ไม่มีหนังสือว่างในขณะนี้</Text>}
        />
      )}
    </View>
  );
}
