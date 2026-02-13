import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { bookApi } from '../services/api';
import AdminHeader from './AdminHeader';

export default function ManageBooksScreen() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const loadBooks = async () => {
    setLoading(true);
    try {
      const res = await bookApi.getAll();
      setBooks(res.data);
    } catch (e) {
      const msg = 'ไม่สามารถโหลดข้อมูลหนังสือได้';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadBooks(); }, []);

  const handleDelete = (id: number, title: string) => {
    const confirmMsg = `ยืนยันการลบหนังสือ "${title}" หรือไม่?`;
    if (Platform.OS === 'web') {
      if (window.confirm(confirmMsg)) performDelete(id);
    } else {
      Alert.alert('ยืนยันการลบ', confirmMsg, [
        { text: 'ยกเลิก' },
        { text: 'ลบ', style: 'destructive', onPress: () => performDelete(id) }
      ]);
    }
  };

  const performDelete = async (id: number) => {
    try {
      await bookApi.delete(id);
      Platform.OS === 'web' ? window.alert('ลบเรียบร้อย') : Alert.alert('สำเร็จ', 'ลบหนังสือแล้ว');
      loadBooks();
    } catch (e) {
      Platform.OS === 'web' ? window.alert('ลบไม่สำเร็จ') : Alert.alert('Error', 'ไม่สามารถลบได้');
    }
  };

  const filtered = books.filter(b => 
    b.title.toLowerCase().includes(search.toLowerCase()) || 
    b.author?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="flex-1 bg-slate-50">
      <AdminHeader title="จัดการหนังสือ" subtitle="Book Inventory" iconName="library-outline" />
      
      <View className="flex-1 px-6 -mt-8">
        <View className="flex-row items-center bg-white px-4 py-3 rounded-2xl mb-6 shadow-sm border border-slate-100">
          <Ionicons name="search" size={20} color="#94a3b8" />
          <TextInput 
            className="flex-1 ml-3 text-slate-700 font-medium"
            placeholder="ค้นหาหนังสือ..."
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity onPress={loadBooks}>
            <Ionicons name="refresh" size={20} color="#3b82f6" />
          </TouchableOpacity>
        </View>

        {loading ? <ActivityIndicator size="large" color="#3b82f6" /> : (
          <FlatList
            data={filtered}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View className="bg-white p-5 rounded-3xl mb-4 border border-slate-100 shadow-sm flex-row items-center">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-slate-900">{item.title}</Text>
                  <Text className="text-slate-400 text-sm">{item.author || 'ไม่ระบุผู้แต่ง'}</Text>
                  <View className="mt-2 flex-row">
                    <View className={`px-2 py-0.5 rounded-lg ${item.status === 'available' ? 'bg-green-50' : 'bg-orange-50'}`}>
                      <Text className={`text-[10px] font-bold uppercase ${item.status === 'available' ? 'text-green-600' : 'text-orange-600'}`}>
                        {item.status}
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="flex-row">
                  <TouchableOpacity 
                    onPress={() => handleDelete(item.id, item.title)}
                    className="p-2 bg-red-50 rounded-xl ml-2"
                  >
                    <Ionicons name="trash-outline" size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            ListEmptyComponent={<Text className="text-center text-slate-400 mt-10">ไม่พบหนังสือ</Text>}
          />
        )}
      </View>
    </View>
  );
}
