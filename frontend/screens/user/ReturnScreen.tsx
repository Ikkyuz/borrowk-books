import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { borrowingApi, bookApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function ReturnScreen() {
  const [activeTab, setActiveTab] = useState<'holding' | 'returned'>('holding');
  const [holdingItems, setHoldingItems] = useState<any[]>([]);
  const [returnedItems, setReturnedItems] = useState<any[]>([]);
  const [allBooks, setAllBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastReturnedTitle, setLastReturnedTitle] = useState<string | null>(null);
  const { user, isLoading: authLoading } = useAuth();

  const loadData = async () => {
    if (authLoading || !user?.id) return;
    setLoading(true);
    try {
      const [historyRes, booksRes] = await Promise.all([
        borrowingApi.getHistory(user.id),
        bookApi.getAll()
      ]);
      setAllBooks(booksRes.data);
      
      const allHistory = historyRes.data;
      // แยกรายการตามสถานะ
      setHoldingItems(allHistory.filter((i: any) => !i.returnDate));
      setReturnedItems(allHistory.filter((i: any) => !!i.returnDate).sort((a: any, b: any) => 
        new Date(b.returnDate).getTime() - new Date(a.returnDate).getTime()
      ));
    } catch (e) {
      const msg = 'โหลดข้อมูลไม่สำเร็จ';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, [user?.id, authLoading]);

  const getBookTitle = (bookId: number) => {
    return allBooks.find(b => b.id === bookId)?.title || `หนังสือ (ID: ${bookId})`;
  };

  const handleReturn = (item: any) => {
    const bookTitle = item.book?.title || getBookTitle(item.bookId);
    const confirmMsg = `ยืนยันการคืนหนังสือ "${bookTitle}" ?`;
    
    if (Platform.OS === 'web') {
      if (window.confirm(confirmMsg)) performReturn(item.id, bookTitle);
    } else {
      Alert.alert('ยืนยัน', confirmMsg, [
        { text: 'ยกเลิก' },
        { text: 'คืนหนังสือ', onPress: () => performReturn(item.id, bookTitle) }
      ]);
    }
  };

  const performReturn = async (id: number, title: string) => {
    try {
      await borrowingApi.return(id);
      setLastReturnedTitle(title);
      setActiveTab('returned'); // สลับไปหน้า "คืนแล้ว" ทันทีเพื่อให้เห็นผลลัพธ์
      setTimeout(() => setLastReturnedTitle(null), 5000);
      loadData();
    } catch (e) {
      const msg = 'การคืนล้มเหลว';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Error', msg);
    }
  };

  const renderHeader = () => (
    <View className="mb-6">
      <Text className="text-3xl font-black text-slate-900 mb-6">การคืนหนังสือ</Text>
      
      {/* ระบบแถบสลับหน้า (Tabs) */}
      <View className="flex-row bg-slate-100 p-1.5 rounded-[20px] mb-8">
        <TouchableOpacity 
          onPress={() => setActiveTab('holding')}
          className={`flex-1 py-3 rounded-[15px] items-center flex-row justify-center ${activeTab === 'holding' ? 'bg-white shadow-sm' : ''}`}
        >
          <Ionicons name="book-outline" size={18} color={activeTab === 'holding' ? '#2563eb' : '#94a3b8'} />
          <Text className={`ml-2 font-bold ${activeTab === 'holding' ? 'text-blue-600' : 'text-slate-400'}`}>
            ต้องคืน ({holdingItems.length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => setActiveTab('returned')}
          className={`flex-1 py-3 rounded-[15px] items-center flex-row justify-center ${activeTab === 'returned' ? 'bg-white shadow-sm' : ''}`}
        >
          <Ionicons name="checkmark-circle-outline" size={18} color={activeTab === 'returned' ? '#10b981' : '#94a3b8'} />
          <Text className={`ml-2 font-bold ${activeTab === 'returned' ? 'text-green-600' : 'text-slate-400'}`}>
            คืนแล้ว ({returnedItems.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* แจ้งเตือนเมื่อคืนสำเร็จ */}
      {lastReturnedTitle && (
        <View className="mb-6 bg-green-500 p-4 rounded-2xl flex-row items-center shadow-lg shadow-green-100">
          <Ionicons name="checkmark-done" size={24} color="white" />
          <Text className="text-white font-bold ml-3 flex-1">คืน "{lastReturnedTitle}" สำเร็จแล้ว!</Text>
        </View>
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-white pt-12 px-6">
      <StatusBar barStyle="dark-content" />
      
      <FlatList
        data={activeTab === 'holding' ? holdingItems : returnedItems}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View className={`p-5 rounded-[30px] mb-4 border ${activeTab === 'holding' ? 'bg-white border-slate-100 shadow-sm' : 'bg-slate-50 border-slate-50 opacity-80'}`}>
            <View className="flex-row items-center">
              <View className={`w-12 h-12 rounded-2xl items-center justify-center mr-4 ${activeTab === 'holding' ? 'bg-blue-50' : 'bg-green-50'}`}>
                <Ionicons name="book" size={24} color={activeTab === 'holding' ? '#2563eb' : '#10b981'} />
              </View>
              
              <View className="flex-1">
                <Text className="font-bold text-slate-900 text-lg" numberOfLines={1}>
                  {item.book?.title || getBookTitle(item.bookId)}
                </Text>
                <View className="flex-row items-center mt-1">
                  <Ionicons name="time-outline" size={12} color="#94a3b8" />
                  <Text className="text-slate-400 text-[11px] font-bold ml-1 uppercase">
                    {activeTab === 'holding' ? `ยืมเมื่อ ${new Date(item.borrowDate).toLocaleDateString()}` : `คืนเมื่อ ${new Date(item.returnDate).toLocaleString('th-TH')}`}
                  </Text>
                </View>
              </View>

              {activeTab === 'holding' ? (
                <TouchableOpacity 
                  onPress={() => handleReturn(item)}
                  className="bg-slate-900 px-4 py-2.5 rounded-xl"
                >
                  <Text className="text-white font-black text-[10px] uppercase">คืนหนังสือ</Text>
                </TouchableOpacity>
              ) : (
                <View className="bg-green-100 p-2 rounded-full">
                  <Ionicons name="checkmark" size={16} color="#10b981" />
                </View>
              )}
            </View>
          </View>
        )}
        ListEmptyComponent={
          !loading && (
            <View className="items-center mt-10 p-10 bg-slate-50 rounded-[40px] border border-dashed border-slate-200">
              <Ionicons name={activeTab === 'holding' ? "happy-outline" : "receipt-outline"} size={80} color="#cbd5e1" />
              <Text className="text-slate-500 mt-4 font-bold text-lg">
                {activeTab === 'holding' ? "ไม่มีหนังสือค้างคืน" : "ยังไม่มีประวัติการคืน"}
              </Text>
            </View>
          )
        }
      />
      
      {loading && (
        <View className="absolute inset-0 bg-white/50 justify-center items-center">
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      )}
    </View>
  );
}
