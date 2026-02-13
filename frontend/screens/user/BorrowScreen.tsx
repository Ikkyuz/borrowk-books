import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert, ActivityIndicator, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { bookApi, borrowingApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function BorrowScreen() {
  const [books, setBooks] = useState<any[]>([]);
  const [myBorrowings, setMyBorrowings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookCode, setBookCode] = useState('');
  const { user, isLoading: authLoading } = useAuth();

  const fetchData = async () => {
    if (authLoading || !user?.id) return;
    setLoading(true);
    try {
      const [availableRes, historyRes] = await Promise.all([
        bookApi.getAvailable(),
        borrowingApi.getHistory(user.id)
      ]);
      setBooks(availableRes.data);
      setMyBorrowings(historyRes.data.filter((b: any) => !b.returnDate));
    } catch (e) {
      const msg = 'โหลดข้อมูลไม่สำเร็จ';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [user?.id, authLoading]);

  const handleReturn = (item: any) => {
    const bookTitle = item.book?.title || `หนังสือ ID: ${item.bookId}`;
    const confirmMsg = `คุณต้องการคืนหนังสือ "${bookTitle}" ใช่หรือไม่?`;
    
    if (Platform.OS === 'web') {
      if (window.confirm(confirmMsg)) {
        performReturn(item.id);
      }
    } else {
      Alert.alert('ยืนยันการคืน', confirmMsg, [
        { text: 'ยกเลิก', style: 'cancel' },
        { text: 'คืนหนังสือ', onPress: () => performReturn(item.id) }
      ]);
    }
  };

  const performReturn = async (id: number) => {
    try {
      await borrowingApi.return(id);
      const msg = 'คืนหนังสือเรียบร้อยแล้ว';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('สำเร็จ', msg);
      fetchData();
    } catch (e) {
      const msg = 'ไม่สามารถทำรายการคืนได้';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Error', msg);
    }
  };

  const handleBorrow = async (id?: number) => {
    const targetId = id || Number(bookCode);
    if (!targetId || isNaN(targetId)) {
      const msg = 'กรุณาระบุรหัสหนังสือที่ถูกต้อง';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Error', msg);
      return;
    }

    try {
      if (!user?.id) {
        const msg = 'ไม่พบข้อมูลผู้ใช้งาน กรุณาเข้าสู่ระบบใหม่';
        Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Error', msg);
        return;
      }
      
      await borrowingApi.borrow({ memberId: user.id, bookId: targetId });
      const successMsg = 'ทำรายการยืมเรียบร้อย';
      Platform.OS === 'web' ? window.alert(successMsg) : Alert.alert('สำเร็จ', successMsg);
      
      setBookCode('');
      fetchData();
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || 'การยืมล้มเหลว';
      Platform.OS === 'web' ? window.alert(errorMsg) : Alert.alert('Error', errorMsg);
    }
  };

  const renderHeader = () => (
    <View className="mb-6">
      <Text className="text-3xl font-black text-slate-900 mb-2">ยืมหนังสือ</Text>
      <Text className="text-slate-400 mb-8">ค้นหาหนังสือที่ท่านต้องการ</Text>

      {/* ส่วนแสดงหนังสือที่ยืมอยู่ปัจจุบัน - แบบช่องๆ เลื่อนข้าง */}
      {myBorrowings.length > 0 && (
        <View className="mb-8">
          <View className="flex-row items-center mb-4 px-1">
            <Ionicons name="bookmark" size={20} color="#2563eb" />
            <Text className="text-lg font-bold text-slate-800 ml-2">หนังสือที่ท่านถืออยู่</Text>
            <View className="ml-3 bg-blue-100 px-2 py-0.5 rounded-lg">
              <Text className="text-blue-600 text-[10px] font-black">{myBorrowings.length}</Text>
            </View>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="flex-row"
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {myBorrowings.map((item) => (
              <View key={item.id} className="bg-white w-52 p-6 rounded-[35px] mr-5 shadow-xl shadow-blue-100 border border-blue-50 relative overflow-hidden">
                <View className="absolute top-0 left-0 bottom-0 w-1.5 bg-blue-500" />
                <View className="bg-blue-50 w-12 h-12 items-center justify-center rounded-2xl mb-5">
                  <Ionicons name="book" size={24} color="#2563eb" />
                </View>
                <Text className="text-slate-900 font-bold text-lg leading-6 mb-1" numberOfLines={1}>
                  {item.book?.title || `หนังสือ ID: ${item.bookId}`}
                </Text>
                <View className="flex-row items-center mb-5">
                  <View className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2" />
                  <Text className="text-blue-600 text-[10px] font-black uppercase tracking-widest">In Possession</Text>
                </View>

                <TouchableOpacity 
                  onPress={() => handleReturn(item)}
                  activeOpacity={0.7}
                  className="bg-slate-900 py-3 rounded-2xl items-center justify-center flex-row shadow-md"
                >
                  <Ionicons name="return-up-back" size={16} color="white" className="mr-2" />
                  <Text className="text-white font-bold text-[11px] ml-1">คืนหนังสือ</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* ช่องกรอก ID หนังสือ */}
      <View className="bg-blue-600 p-6 rounded-[35px] shadow-xl shadow-blue-500/30 mb-10">
        <Text className="text-white/80 font-bold mb-3 ml-1">ยืมด่วนด้วยรหัสหนังสือ</Text>
        <View className="flex-row items-center bg-white rounded-2xl px-4 py-1">
          <Ionicons name="qr-code-outline" size={20} color="#64748b" />
          <TextInput
            className="flex-1 p-3 text-slate-800 font-bold"
            placeholder="ใส่ ID เช่น 1, 2, 3..."
            keyboardType="numeric"
            value={bookCode}
            onChangeText={setBookCode}
          />
          <TouchableOpacity
            onPress={() => handleBorrow()}
            className="bg-blue-600 px-6 py-2 rounded-xl">
            <Text className="text-white font-bold">ยืม</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row justify-between items-center mb-4 px-1">
        <Text className="text-xl font-bold text-slate-800">รายการหนังสือว่าง</Text>
        <Text className="text-slate-400 font-bold text-xs uppercase bg-slate-100 px-3 py-1 rounded-full">
          {books.length} เล่ม
        </Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      {loading && books.length === 0 ? (
        <ActivityIndicator size="large" color="#3b82f6" className="mt-20" />
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="mb-4 flex-row items-center p-5 bg-white border border-slate-100 rounded-[30px] shadow-sm">
              <View className="w-14 h-14 bg-green-50 rounded-2xl items-center justify-center mr-4 border border-green-100">
                <Ionicons name="book" size={28} color="#16a34a" />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-slate-900 text-base" numberOfLines={1}>{item.title}</Text>
                <Text className="text-slate-400 text-[11px] font-bold uppercase tracking-tighter">ID: #{item.id}</Text>
              </View>
              <TouchableOpacity
                onPress={() => handleBorrow(item.id)}
                activeOpacity={0.5}
                className="bg-slate-900 px-5 py-3 rounded-2xl shadow-sm">
                <Text className="text-white font-bold text-xs">ยืมเล่มนี้</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <View className="items-center mt-10 p-10 bg-slate-50 rounded-[40px] border border-dashed border-slate-200">
              <Ionicons name="search-outline" size={60} color="#cbd5e1" />
              <Text className="text-center text-slate-400 mt-4 font-bold">ไม่พบหนังสือว่างในขณะนี้</Text>
            </View>
          }
        />
      )}
    </View>
  );
}
