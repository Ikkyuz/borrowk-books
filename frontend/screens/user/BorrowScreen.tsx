import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { bookApi, borrowingApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function BorrowScreen() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookCode, setBookCode] = useState('');
  const { user } = useAuth();

  const fetchAvailable = async () => {
    setLoading(true);
    try {
      const res = await bookApi.getAvailable();
      setBooks(res.data);
    } catch (e) {
      Alert.alert('Error', 'โหลดข้อมูลหนังสือไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAvailable(); }, []);

  const handleBorrow = async (id?: number) => {
    console.log('Attempting to borrow book with ID:', id || bookCode);
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
      
      console.log('Sending borrow request:', { memberId: user.id, bookId: targetId });
      const response = await borrowingApi.borrow({ memberId: user.id, bookId: targetId });
      console.log('Borrow response:', response.data);
      
      const successMsg = 'ทำรายการยืมเรียบร้อย';
      Platform.OS === 'web' ? window.alert(successMsg) : Alert.alert('สำเร็จ', successMsg);
      
      setBookCode('');
      fetchAvailable();
    } catch (error: any) {
      console.error('Borrow error details:', error.response?.data || error.message);
      const errorMsg = error.response?.data?.error || 'การยืมล้มเหลว';
      Platform.OS === 'web' ? window.alert(errorMsg) : Alert.alert('Error', errorMsg);
    }
  };

  const renderHeader = () => (
    <View className="mb-6">
      <Text className="text-3xl font-black text-slate-900 mb-2">ยืมหนังสือ</Text>
      <Text className="text-slate-400 mb-8">กรอกรหัสหรือเลือกหนังสือที่ว่าง</Text>

      <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm mb-8">
        <View className="flex-row items-center bg-slate-50 rounded-2xl px-4 py-1">
          <Ionicons name="qr-code-outline" size={20} color="#64748b" />
          <TextInput
            className="flex-1 p-3 text-slate-800 font-bold"
            placeholder="ใส่ ID หนังสือ..."
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

      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-slate-800">รายการที่ว่างอยู่</Text>
        <Text className="text-blue-600 font-black text-xs uppercase bg-blue-50 px-3 py-1 rounded-full">
          {books.length} Available
        </Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      {loading ? (
        <ActivityIndicator size="large" color="#3b82f6" className="mt-20" />
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
          style={{ flex: 1 }}
          renderItem={({ item }) => (
            <View className="mb-4 flex-row items-center p-4 bg-white border border-slate-100 rounded-3xl shadow-sm">
              <View className="w-12 h-12 bg-green-50 rounded-2xl items-center justify-center mr-4">
                <Ionicons name="book" size={24} color="#16a34a" />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-slate-900">{item.title}</Text>
                <Text className="text-slate-400 text-xs">ID: #{item.id}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  console.log('Button Pressed!');
                  handleBorrow(item.id);
                }}
                activeOpacity={0.5}
                style={{ zIndex: 100 }}
                className="bg-blue-600 px-5 py-2.5 rounded-xl shadow-sm border border-blue-700">
                <Text className="text-white font-bold text-xs pointer-events-none">ยืมเล่มนี้</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text className="text-center text-slate-400 mt-10">ไม่พบหนังสือว่างในขณะนี้</Text>
          }
        />
      )}
    </View>
  );
}
