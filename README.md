# Laptop Staff

Khung ứng dụng nhân viên cửa hàng laptop theo kế hoạch 14 ngày.

## Cấu trúc

- `mobile/`: Expo SDK 58, React Native 0.88, TypeScript, Expo Router.
- `mobile/src/app/`: routes; `src/features/`: auth, products, customers, orders, profile.
- `server/LaptopStaff.Api/`: ASP.NET Core 10, EF Core, PostgreSQL provider.
- `infra/`: PostgreSQL 18 Docker Compose; `docs/`: tài liệu; `tests/`: kiểm thử.
- Đã cài TanStack Query, Zustand, React Hook Form, Zod, SecureStore, Camera, development client.
- UI ban đầu dùng component React Native; chưa chọn React Native Paper.

## Chạy backend

Từ thư mục gốc, dùng .NET SDK 10.0.401:

```powershell
dotnet restore LaptopStaff.slnx
dotnet run --project server/LaptopStaff.Api
```

API: http://localhost:5080/health. OpenAPI JSON: http://localhost:5080/openapi/v1.json trong Development.
`/health/ready` kiểm tra PostgreSQL, trả 503 nếu chưa cấu hình hoặc chưa kết nối được.

## PostgreSQL

Mở Docker Desktop, sau đó:

```powershell
Copy-Item infra/.env.example infra/.env
# Sửa POSTGRES_PASSWORD trong infra/.env trước khi chạy.
docker compose --env-file infra/.env -f infra/compose.yaml up -d
```

Database riêng ở cổng 5433, không dùng database đồ án desktop.
Đặt connection string trong terminal chạy API, thay mật khẩu bằng giá trị local:

```powershell
$env:ConnectionStrings__Store = 'Host=localhost;Port=5433;Database=laptop_staff;Username=laptop_staff;Password=YOUR_LOCAL_PASSWORD'
dotnet run --project server/LaptopStaff.Api
```

Không commit mật khẩu. Chưa có migration hoặc seed nghiệp vụ; thực hiện sau khi chốt ERD.

Trên máy hiện tại, container đã được tạo và mật khẩu local đã được sinh trong `infra/.env`.
API tự đọc `server/LaptopStaff.Api/appsettings.Local.json` trong Development; hai file này được Git bỏ qua.
Không cần chép đè các file local đã có. Khi dựng máy mới, có thể sao chép `appsettings.Local.example.json`
thành `appsettings.Local.json` và đặt connection string khớp `infra/.env`.

## Chạy mobile

Node 24 và npm 11 đã được kiểm tra. Dùng lockfile để cài lại:

```powershell
cd mobile
npm ci
Copy-Item .env.example .env
npm start
```

Sửa `EXPO_PUBLIC_API_URL` trong `mobile/.env`:

- Android emulator: `http://10.0.2.2:5080`.
- Web local: `http://localhost:5080`, chạy `npm run web`.
- Điện thoại thật: dùng IP LAN của máy API; chạy API với `--urls http://0.0.0.0:5080` trong môi trường phát triển, cấu hình firewall nếu cần.
- Môi trường demo chia sẻ dùng HTTPS. `EXPO_PUBLIC_*` không được chứa secret.

SDK 58 dùng development build. Build Android local cần Android SDK và JDK tương thích:

```powershell
npm run android:build
```

Hoặc đăng nhập tài khoản Expo để build cloud:

```powershell
npx eas-cli@latest login
npx eas-cli@latest build --platform android --profile development
npx eas-cli@latest build --platform android --profile preview
```

Profile preview tạo APK độc lập. Cấu hình `EXPO_PUBLIC_API_URL` HTTPS trong môi trường build trước khi build.
Chưa liên kết tài khoản Expo hoặc build APK.

## Kiểm tra

```powershell
dotnet build LaptopStaff.slnx
cd mobile
npm run typecheck
npm run lint
npx expo-doctor
npx expo export --platform android
```

## Trạng thái

Đã tạo app shell và nút kiểm tra kết nối API. Chưa triển khai đăng nhập, phân quyền, sản phẩm,
đơn hàng, thanh toán hoặc serial. Xem [kết quả thiết lập](docs/setup.md).
