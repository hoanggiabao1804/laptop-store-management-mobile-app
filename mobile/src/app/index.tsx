import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiUrl, getHealth } from '@/api/client';

export default function HomeScreen() {
  const health = useQuery({ queryKey: ['health'], queryFn: getHealth, enabled: false, retry: false });
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>LAPTOP STAFF</Text>
        <Text style={styles.title}>Sẵn sàng cho một ngày bán hàng</Text>
        <Text style={styles.body}>Ứng dụng dành cho nhân viên cửa hàng laptop, linh kiện và phụ kiện.</Text>
        <View style={styles.card}>
          <Text style={styles.heading}>Khởi tạo dự án</Text>
          <Text style={styles.body}>Khung ứng dụng đã sẵn sàng. Các chức năng đăng nhập, sản phẩm và bán hàng sẽ được triển khai theo kế hoạch.</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.heading}>Kết nối máy chủ</Text>
          <Text selectable style={styles.body}>{apiUrl ?? 'Chưa cấu hình địa chỉ API'}</Text>
          <Pressable accessibilityRole="button" disabled={health.isFetching} onPress={() => void health.refetch()}
            style={({ pressed }) => [styles.button, { opacity: pressed || health.isFetching ? 0.6 : 1 }]}>
            {health.isFetching ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Kiểm tra kết nối</Text>}
          </Pressable>
          {health.isError && <Text accessibilityLiveRegion="polite" style={styles.error}>{health.error.message}</Text>}
          {health.isSuccess && !health.isFetching && <Text accessibilityLiveRegion="polite" style={styles.success}>{health.data.service}: {health.data.status}</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f2f5fa' },
  content: { padding: 24, gap: 20, maxWidth: 720, width: '100%', alignSelf: 'center' },
  eyebrow: { color: '#2457c5', fontWeight: '800', letterSpacing: 2, marginTop: 24 },
  title: { fontSize: 32, lineHeight: 40, fontWeight: '700', color: '#14213d' },
  body: { fontSize: 16, lineHeight: 25, color: '#526079' },
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 22, gap: 14 },
  heading: { fontSize: 20, fontWeight: '700', color: '#14213d' },
  button: { backgroundColor: '#2457c5', borderRadius: 12, padding: 16, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  error: { color: '#b42318', lineHeight: 22 },
  success: { color: '#13734b', lineHeight: 22 },
});
