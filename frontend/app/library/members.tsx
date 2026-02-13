import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { members } from '../../data/library';
import MemberCard from '../../components/MemberCard';

export default function MembersScreen() {
  return (
    <View className="flex-1 bg-gray-50 px-4 pt-4">
      <View className="mb-4">
        <Text className="text-2xl font-bold text-gray-800">รายชื่อสมาชิก</Text>
        <Text className="text-gray-500">รายชื่อผู้ใช้งานในระบบห้องสมุด</Text>
      </View>

      <FlatList
        data={members}
        keyExtractor={(item) => item.member_id.toString()}
        renderItem={({ item }) => <MemberCard member={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
