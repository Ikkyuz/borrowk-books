import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, ActivityIndicator, Alert, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { memberApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import AdminHeader from '../../components/AdminHeader';

export default function AdminMembersScreen() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { isLoading, token, user } = useAuth();

  const loadData = async () => {
    if (isLoading || !token) return;
    
    setLoading(true);
    try {
      const res = await memberApi.getAll();
      setMembers(res.data);
    } catch (e: any) {
      if (e.response?.status === 401) return;
      const msg = 'โหลดข้อมูลสมาชิกไม่สำเร็จ';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    if (!isLoading) loadData(); 
  }, [isLoading, token]);

  const handleToggleRole = (id: number, currentRole: string, name: string) => {
    if (id === user?.id) {
      const msg = 'คุณไม่สามารถเปลี่ยนบทบาทของตัวเองได้';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('คำเตือน', msg);
      return;
    }

    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const confirmMsg = `ยืนยันการเปลี่ยนบทบาทของ "${name}" เป็น ${newRole.toUpperCase()} หรือไม่?`;
    
    if (Platform.OS === 'web') {
      if (window.confirm(confirmMsg)) performToggleRole(id, newRole);
    } else {
      Alert.alert('ยืนยันการเปลี่ยนสิทธิ์', confirmMsg, [
        { text: 'ยกเลิก', style: 'cancel' },
        { text: 'ตกลง', onPress: () => performToggleRole(id, newRole) }
      ]);
    }
  };

  const performToggleRole = async (id: number, newRole: string) => {
    try {
      await memberApi.update(id, { role: newRole });
      loadData();
    } catch (e: any) {
      const msg = e.response?.data?.error || 'ไม่สามารถเปลี่ยนบทบาทได้';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Error', msg);
    }
  };

  const handleDelete = (id: number, name: string) => {
    const confirmMsg = `ยืนยันการลบสมาชิก "${name}" หรือไม่?`;
    if (Platform.OS === 'web') {
      if (window.confirm(confirmMsg)) performDelete(id);
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
    <View className="flex-1 bg-[#f8fafc]">
      <StatusBar barStyle="light-content" />
      <AdminHeader 
        title="รายชื่อสมาชิก" 
        subtitle="Manage library staff & members" 
        iconName="people-outline" 
        variant="dark"
      />

      <View className="flex-1 px-8 -mt-8">
        <View className="flex-row items-center bg-white px-6 py-4 rounded-[30px] mb-8 shadow-xl shadow-slate-200 border border-slate-50">
          <Ionicons name="search" size={24} color="#3b82f6" />
          <TextInput 
            className="flex-1 ml-4 text-slate-700 font-bold text-base"
            placeholder="ค้นหาตามชื่อ หรือ Username..."
            placeholderTextColor="#cbd5e1"
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity onPress={loadData} className="bg-blue-50 p-2 rounded-xl">
            <Ionicons name="refresh" size={20} color="#3b82f6" />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#3b82f6" className="mt-10" />
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View className="flex-row items-center p-6 bg-white border border-slate-50 rounded-[35px] mb-4 shadow-sm">
                <View className="w-16 h-16 bg-slate-50 rounded-[22px] items-center justify-center mr-5 border border-slate-100">
                  <Text className="text-blue-600 font-black text-2xl">{item.fullName ? item.fullName[0].toUpperCase() : '?'}</Text>
                </View>
                
                <View className="flex-1">
                  <Text className="font-black text-slate-900 text-lg">{item.fullName}</Text>
                  <Text className="text-slate-400 font-bold text-xs">@{item.username}</Text>
                </View>

                <View className="flex-row items-center">
                  <TouchableOpacity 
                    onPress={() => handleToggleRole(item.id, item.role, item.fullName)}
                    activeOpacity={0.7}
                    className={`px-4 py-2 rounded-2xl mr-3 border ${item.role === 'admin' ? 'bg-indigo-50 border-indigo-100' : 'bg-slate-50 border-slate-100'}`}
                  >
                    <Text className={`text-[10px] font-black uppercase tracking-widest ${item.role === 'admin' ? 'text-indigo-600' : 'text-slate-500'}`}>
                      {item.role}
                    </Text>
                  </TouchableOpacity>
                  
                  {item.id !== user?.id && (
                    <TouchableOpacity onPress={() => handleDelete(item.id, item.fullName)} className="p-3 bg-rose-50 rounded-2xl">
                      <Ionicons name="trash" size={18} color="#f43f5e" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
            ListEmptyComponent={
              <View className="items-center mt-20 opacity-20">
                <Ionicons name="people-outline" size={100} color="#0f172a" />
                <Text className="text-2xl font-black mt-4">No Members Found</Text>
              </View>
            }
          />
        )}
      </View>
    </View>
  );
}
