import React from 'react';
import { View, Text } from 'react-native';
import { Member } from '../types/library';

interface MemberCardProps {
  member: Member;
}

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <View className="mb-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <View className="flex-row items-center">
        <View className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <Text className="text-lg font-bold text-blue-600">{member.full_name.charAt(0)}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-800">{member.full_name}</Text>
          <Text className="text-gray-600">Username: {member.username}</Text>
          <View className="mt-1 flex-row">
            <View
              className={`rounded px-2 py-0.5 ${member.role === 'admin' ? 'bg-purple-100' : 'bg-gray-100'}`}>
              <Text
                className={`text-xs font-medium ${member.role === 'admin' ? 'text-purple-700' : 'text-gray-700'}`}>
                {member.role.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
        <Text className="text-xs text-gray-400">ID: {member.member_id}</Text>
      </View>
    </View>
  );
}
