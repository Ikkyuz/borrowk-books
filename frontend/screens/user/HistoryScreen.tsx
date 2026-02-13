import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { borrowingApi, bookApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function HistoryScreen() {
  const [borrowings, setBorrowings] = useState<any[]>([]);
  const [allBooks, setAllBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      setLoading(true);
      try {
        console.log('HistoryScreen: Fetching data for user:', user.id);
        
        // Fetch both history and all books in parallel
        const [historyRes, booksRes] = await Promise.all([
          borrowingApi.getHistory(user.id),
          bookApi.getAll()
        ]);
        
        console.log('HistoryScreen: Loaded', historyRes.data.length, 'records');
        setAllBooks(booksRes.data);
        setBorrowings(historyRes.data);
      } catch (e: any) {
        console.error('HistoryScreen: Load error:', e.message);
        const msg = 'ไม่สามารถโหลดประวัติได้';
        Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Error', msg);
      } finally { 
        setLoading(false); 
      }
    };
    load();
  }, [user?.id]);

  // Helper function to get book info manually
  const getBookInfo = (bookId: number) => {
    const book = allBooks.find(b => b.id === bookId);
    return book || null;
  };

  return (
    <View className="flex-1 bg-white pt-12 px-6">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-black text-slate-900">ประวัติการใช้งาน</Text>
        <View className="bg-blue-50 px-3 py-1 rounded-full">
          <Text className="text-blue-600 font-bold text-xs">{borrowings.length} รายการ</Text>
        </View>
      </View>

      {loading ? <ActivityIndicator size="large" color="#3b82f6" className="mt-10" /> : (
        <FlatList
          data={borrowings}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            // Try to get book info from relation first, then fallback to manual lookup
            const bookInfo = item.book || getBookInfo(item.bookId);
            
            return (
              <View className="p-5 bg-slate-50 border border-slate-100 rounded-3xl mb-4">
                <View className="flex-row justify-between mb-2">
                  <Text className="font-bold text-slate-900 flex-1">
                    {bookInfo?.title || `หนังสือ (ID: ${item.bookId})`}
                  </Text>
                  <Text className={`text-[10px] font-black uppercase ${item.returnDate ? 'text-green-600' : 'text-orange-600'}`}>
                    {item.returnDate ? 'Returned' : 'In Progress'}
                  </Text>
                </View>
                <View className="flex-row justify-between items-end mt-2">
                  <View>
                    <Text className="text-[9px] text-slate-400 font-bold uppercase">Borrowed on</Text>
                    <Text className="text-xs text-slate-600 font-medium">{new Date(item.borrowDate).toLocaleDateString()}</Text>
                  </View>
                  {item.returnDate && (
                    <View className="items-end">
                      <Text className="text-[9px] text-slate-400 font-bold uppercase">Returned on</Text>
                      <Text className="text-xs text-slate-600 font-medium">{new Date(item.returnDate).toLocaleDateString()}</Text>
                    </View>
                  )}
                </View>
              </View>
            );
          }}
          ListEmptyComponent={
            <View className="items-center mt-20">
              <Ionicons name="receipt-outline" size={60} color="#e2e8f0" />
              <Text className="text-slate-400 mt-4 font-bold">ไม่มีประวัติการยืมหนังสือ</Text>
            </View>
          }
        />
      )}
    </View>
  );
}
