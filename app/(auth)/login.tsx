import { router } from 'expo-router'
import React from 'react'
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Login() {

  const handleSubmit = (): void => {
    router.push("/(tabs)/home");
  }

  return (
    <SafeAreaView className='flex-1 bg-black'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? "padding" : "height"}
        className='flex-1 justify-center px-6'
      >
        <View className='bg-gray-900 rounded-2xl p-8 shadow-lg'>
          <Text className='text-3xl font-bold text-white mb-6 text-center'>
            Welcome Back
          </Text>

          <Text className='text-gray-400 mb-2'>Email</Text>
          <TextInput 
            placeholder='Enter your email'
            placeholderTextColor="#888"
            className='bg-gray-800 text-white rounded-lg px-4 py-3 mb-4'
            keyboardType='email-address'
            autoCapitalize='none'
          />

          <Text className='text-gray-400 mb-2'>Password</Text>
          <TextInput 
            placeholder='Enter your password'
            placeholderTextColor="#888"
            className='bg-gray-800 text-white rounded-lg px-4 py-3 mb-4'
            secureTextEntry
          />

          <TouchableOpacity className='m-2'>
            <Text className='text-right text-gray-400'>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className='bg-blue-500 rounded-xl py-3 mt-3 mb-2'
            onPress={handleSubmit}
          >
            <Text className='text-white font-semi-bold text-center text-lg'>Login</Text>
          </TouchableOpacity>

          {/* Register Link */}
          <View className='flex-row justify-center'>
            <Text className='text-gray-400'>Don&apos;t have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
              <Text className='text-blue-500 font-semibold'>Register</Text>
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}