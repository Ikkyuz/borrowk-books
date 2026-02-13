import React from 'react';
import { View, Text } from 'react-native';

interface MemberCardProps {
  member: any;
}

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <View className="mb-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm shadow-slate-200">
      <View className="flex-row items-center">
        <View className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-blue-50">
          <Text className="text-lg font-bold text-blue-600">{member.fullName ? member.fullName.charAt(0).toUpperCase() : '?'}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-lg font-bold text-slate-900">{member.fullName || 'No Name'}</Text>
          <Text className="text-slate-400 text-xs">@{member.username}</Text>
          <View className="mt-1 flex-row">
            <View
              className={`rounded-full px-3 py-0.5 ${member.role === 'admin' ? 'bg-purple-50' : 'bg-slate-50'}`}>
              <Text
                className={`text-[10px] font-bold uppercase tracking-widest ${member.role === 'admin' ? 'text-purple-600' : 'text-slate-500'}`}>
                {member.role || 'user'}
              </Text>
            </View>
          </View>
        </View>
        <Text className="text-xs font-black text-slate-200">#{member.id}</Text>
      </View>
    </View>
  );
}
