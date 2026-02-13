import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, ActivityIndicator, Alert, Platform, useWindowDimensions, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { bookApi, borrowingApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function BookListScreen() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { user, isLoading: authLoading } = useAuth();
  const { width } = useWindowDimensions();

  // คำนวณจำนวนคอลัมน์ตามความกว้างหน้าจอ (Responsive Grid)
  const numColumns = width > 1200 ? 4 : width > 800 ? 3 : width > 550 ? 2 : 1;

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await bookApi.getAvailable();
      setBooks(res.data);
    } catch (e) {
      const msg = 'ไม่สามารถโหลดข้อมูลหนังสือได้';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    if (!authLoading) fetchBooks(); 
  }, [authLoading]);

  const handleBorrow = (book: any) => {
    const confirmMsg = `คุณต้องการยืมหนังสือ "${book.title}" หรือไม่?`;
    if (Platform.OS === 'web') {
      if (window.confirm(confirmMsg)) performBorrow(book);
    } else {
      Alert.alert('ยืนยันการยืม', confirmMsg, [
        { text: 'ยกเลิก', style: 'cancel' },
        { text: 'ยืนยัน', onPress: () => performBorrow(book) }
      ]);
    }
  };

  const performBorrow = async (book: any) => {
    try {
      if (!user?.id) {
        const msg = 'กรุณาเข้าสู่ระบบก่อนทำรายการ';
        Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Error', msg);
        return;
      }
      await borrowingApi.borrow({ memberId: user.id, bookId: book.id });
      const msg = 'ยืมหนังสือสำเร็จ! ขอให้สนุกกับการอ่าน';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('สำเร็จ', msg);
      fetchBooks();
    } catch (e: any) {
      const errorMsg = e.response?.data?.error || 'การยืมล้มเหลว';
      Platform.OS === 'web' ? window.alert(errorMsg) : Alert.alert('Error', errorMsg);
    }
  };

  const filtered = books.filter(b => 
    b.title.toLowerCase().includes(search.toLowerCase()) || 
    b.author?.toLowerCase().includes(search.toLowerCase())
  );

  const renderHeader = () => (
    <View className="mb-12 mt-6">
      <View className="flex-row justify-between items-center mb-10">
        <View className="flex-1">
          <Text className="text-5xl font-black text-slate-900 tracking-tighter">Digital Library</Text>
          <View className="flex-row items-center mt-2">
            <View className="h-1 w-12 bg-blue-600 rounded-full mr-3" />
            <Text className="text-slate-400 text-lg font-medium">คลังความรู้ที่เข้าถึงได้ทุกที่ทุกเวลา</Text>
          </View>
        </View>
        <TouchableOpacity 
          onPress={fetchBooks}
          className="bg-white shadow-sm border border-slate-100 p-4 rounded-3xl"
        >
          <Ionicons name="refresh" size={24} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center bg-white px-8 py-6 rounded-[40px] border border-slate-50 shadow-2xl shadow-slate-200">
        <Ionicons name="search" size={28} color="#3b82f6" />
        <TextInput 
          className="flex-1 ml-5 text-slate-700 text-xl font-medium"
          placeholder="ค้นหาตามชื่อหนังสือ หรือผู้แต่ง..."
          placeholderTextColor="#cbd5e1"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')} className="bg-slate-100 rounded-full p-1">
            <Ionicons name="close" size={20} color="#94a3b8" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-[#fafbfc]">
      <StatusBar barStyle="dark-content" />
      
      {loading && books.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="mt-6 text-slate-400 font-bold tracking-[4px] uppercase text-xs">Loading Catalog</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          key={numColumns} 
          numColumns={numColumns}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{ padding: 40, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={numColumns > 1 ? { gap: 32 } : null}
          renderItem={({ item }) => (
            <View 
              style={{ flex: 1/numColumns }}
              className="bg-white border border-slate-50 p-8 rounded-[50px] mb-8 shadow-sm shadow-slate-100 hover:shadow-2xl transition-all"
            >
              {/* Book Cover Placeholder */}
              <View className="bg-slate-50 aspect-[3/4.5] rounded-[40px] mb-8 items-center justify-center border border-slate-100 overflow-hidden relative">
                <View className="absolute top-0 left-0 bottom-0 w-2 bg-blue-600/10" />
                <Ionicons name="book" size={80} color="#e2e8f0" />
                <View className="absolute top-6 left-6 bg-blue-600 px-3 py-1 rounded-full shadow-sm">
                  <Text className="text-white text-[9px] font-black uppercase tracking-widest">New</Text>
                </View>
              </View>

              <View className="flex-1">
                <Text className="text-2xl font-bold text-slate-900 leading-8 mb-2" numberOfLines={2}>
                  {item.title}
                </Text>
                <View className="flex-row items-center mb-10">
                  <Text className="text-slate-400 text-sm font-bold flex-1" numberOfLines={1}>
                    By {item.author || 'Anonymous'}
                  </Text>
                </View>

                <TouchableOpacity 
                  onPress={() => handleBorrow(item)}
                  activeOpacity={0.8}
                  className="bg-slate-900 py-5 rounded-[25px] items-center justify-center shadow-lg shadow-slate-400"
                >
                  <Text className="text-white font-black text-base uppercase tracking-widest">ยืมเลย</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View className="items-center mt-20 p-20 bg-white rounded-[60px] border border-slate-50 shadow-sm">
              <Ionicons name="library-outline" size={120} color="#f1f5f9" />
              <Text className="text-slate-500 mt-8 font-black text-3xl text-center">Empty Shelf</Text>
              <Text className="text-slate-400 text-lg text-center mt-3 font-medium">ไม่พบหนังสือที่คุณต้องการในขณะนี้</Text>
            </View>
          }
        />
      )}
    </View>
  );
}
