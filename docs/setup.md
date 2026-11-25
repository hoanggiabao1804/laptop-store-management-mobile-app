# Khởi tạo môi trường — 25/11/2026

## Quyết định

- Expo SDK 58 theo template chính thức; .NET 10 tận dụng SDK đã cài.
- Đây là project mới hoàn toàn: xây mobile, backend, schema, migration, seed và nghiệp vụ từ đầu theo plan riêng.
- Không điều chỉnh source, cấu hình, Git, dịch vụ hoặc database của repo tham khảo; không sử dụng backend/database đó để triển khai project này.
- Routes ở `mobile/src/app/` theo template hiện hành.
- Repository Git local nhánh main; chưa commit hoặc tạo remote.

## Công cụ và kiểm tra

Node 24.11.0, npm 11.6.1, .NET SDK 10.0.401, Git 2.51.2, Docker 29.9.2.
Docker engine truy cập được ngoài sandbox. Chưa tìm thấy adb hoặc Android SDK tại vị trí mặc định.
Chưa xác nhận JDK phù hợp để build Android local.

Backend build thành công, 0 warning/error. Expo Doctor đạt 20/20.
Typecheck, lint và export JavaScript Android đều thành công.
PostgreSQL container `laptop-staff-db-1` healthy trên cổng 5433.
API `/health` trả 200/ok, `/health/ready` trả 200/ready với database thật; OpenAPI JSON truy cập được.
Mật khẩu sinh ngẫu nhiên nằm trong file local đã được xác nhận Git ignore.
CI đã được cấu hình lint/typecheck và build backend; chưa chạy trên GitHub.
Chưa chạy app trên thiết bị và chưa build APK.

`npm audit` báo 3 mục moderate thuộc chuỗi minimatch → @expo/fingerprint → expo.
Không chạy `audit fix --force` vì công cụ đề xuất hạ Expo xuống SDK 52; cần theo dõi bản vá tương thích upstream.

## Bước tiếp theo

Chốt ERD/API contract, auth/session và phân quyền API; development build trên điện thoại.
Chưa có migration/seed nghiệp vụ hoặc kết quả nghiệm thu F01–F12.

## Tham khảo

- https://docs.expo.dev/versions/v58.0.0/
- https://docs.expo.dev/router/basics/navigation-layouts/
- https://docs.expo.dev/versions/v58.0.0/sdk/securestore/
