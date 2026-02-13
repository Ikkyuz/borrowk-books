import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import { memberApi } from '../../services/api';
import MemberCard from '../../components/MemberCard';

export default function MembersScreen() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await memberApi.getAll();
        setMembers(res.data);
      } catch (e) {
        Alert.alert('Error', 'ไม่สามารถโหลดข้อมูลสมาชิกได้');
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  return (
    <View className="flex-1 bg-white px-4 pt-4">
      <View className="mb-4">
        <Text className="text-2xl font-bold text-gray-800">รายชื่อสมาชิก</Text>
        <Text className="text-gray-500">ข้อมูลจริงจากฐานข้อมูล</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#3b82f6" />
      ) : (
        <FlatList
          data={members}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MemberCard member={{...item, member_id: item.id, full_name: item.fullName}} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
