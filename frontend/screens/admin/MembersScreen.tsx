import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, ActivityIndicator, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { memberApi } from '../../services/api';

export default function AdminMembersScreen() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await memberApi.getAll();
      setMembers(res.data);
    } catch (e) {
      const msg = 'โหลดข้อมูลสมาชิกไม่สำเร็จ';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleDelete = (id: number, name: string) => {
    const confirmMsg = `ยืนยันการลบสมาชิก "${name}" หรือไม่?`;
    if (Platform.OS === 'web') {
      if (window.confirm(confirmMsg)) {
        performDelete(id);
      }
    } else {
      Alert.alert('ยืนยันการลบ', confirmMsg, [
        { text: 'ยกเลิก', style: 'cancel' },
        { text: 'ลบข้อมูล', style: 'destructive', onPress: () => performDelete(id) }
      ]);
    }
  };

  const performDelete = async (id: number) => {
    try {
      await memberApi.delete(id);
      const msg = 'ลบสมาชิกเรียบร้อยแล้ว';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('สำเร็จ', msg);
      loadData();
    } catch (e: any) {
      const msg = e.response?.data?.error || 'ไม่สามารถลบสมาชิกได้';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Error', msg);
    }
  };

  const filtered = members.filter(m => 
    m.fullName.toLowerCase().includes(search.toLowerCase()) || 
    m.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="flex-1 bg-white pt-12 px-6">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-black text-slate-900">สมาชิกทั้งหมด</Text>
        <TouchableOpacity onPress={loadData} className="p-2 bg-slate-50 rounded-xl">
          <Ionicons name="refresh" size={20} color="#64748b" />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center bg-slate-50 px-4 py-3 rounded-2xl mb-6 border border-slate-100">
        <Ionicons name="search" size={20} color="#94a3b8" />
        <TextInput 
          className="flex-1 ml-3 text-slate-700 font-medium"
          placeholder="ค้นหาชื่อสมาชิก..."
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
            <View className="flex-row items-center p-4 bg-white border border-slate-100 rounded-2xl mb-3 shadow-sm shadow-slate-200">
              <View className="w-12 h-12 bg-blue-50 rounded-full items-center justify-center mr-4">
                <Text className="text-blue-600 font-bold text-lg">{item.fullName ? item.fullName[0].toUpperCase() : '?'}</Text>
              </View>
              <View className="flex-1">
                <Text className="font-bold text-slate-900">{item.fullName}</Text>
                <Text className="text-slate-400 text-xs">@{item.username}</Text>
              </View>
              <View className="flex-row items-center">
                <View className={`px-3 py-1 rounded-full mr-2 ${item.role === 'admin' ? 'bg-purple-50' : 'bg-slate-50'}`}>
                  <Text className={`text-[10px] font-bold uppercase ${item.role === 'admin' ? 'text-purple-600' : 'text-slate-500'}`}>
                    {item.role}
                  </Text>
                </View>
                {item.role !== 'admin' && (
                  <TouchableOpacity onPress={() => handleDelete(item.id, item.fullName)} className="p-2">
                    <Ionicons name="trash-outline" size={20} color="#ef4444" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
          ListEmptyComponent={<Text className="text-center text-slate-400 mt-10">ไม่พบข้อมูลสมาชิก</Text>}
        />
      )}
    </View>
  );
}
