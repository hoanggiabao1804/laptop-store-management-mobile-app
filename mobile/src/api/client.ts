export const apiUrl = process.env.EXPO_PUBLIC_API_URL?.replace(/\/+$/, '');

export async function getHealth(): Promise<{ status: string; service: string }> {
  if (!apiUrl) throw new Error('Chưa cấu hình EXPO_PUBLIC_API_URL trong mobile/.env.');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(`${apiUrl}/health`, { signal: controller.signal });
    if (!response.ok) throw new Error(`API trả về lỗi ${response.status}.`);
    const data: unknown = await response.json();
    if (!data || typeof data !== 'object' || !('status' in data) ||
        !('service' in data) || typeof data.status !== 'string' || typeof data.service !== 'string') {
      throw new Error('API trả về dữ liệu không hợp lệ.');
    }
    return { status: data.status, service: data.service };
  } finally {
    clearTimeout(timeout);
  }
}
