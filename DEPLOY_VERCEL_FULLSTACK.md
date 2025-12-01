# 🚀 Deploy Full Stack lên Vercel với PostgreSQL

## Tổng quan

Bạn sẽ deploy:
- **Backend (NestJS)** → Vercel Serverless Functions
- **Frontend (React + Vite)** → Vercel Static Hosting  
- **Database (PostgreSQL)** → Neon.tech (miễn phí)

**Tất cả trên 1 domain Vercel!**

---

## Bước 1: Tạo Database trên Neon.tech

### 1.1. Đăng ký Neon.tech

1. Truy cập: https://neon.tech/
2. Click **"Sign Up"** → Chọn **"Continue with GitHub"**
3. Authorize Neon

### 1.2. Tạo Project mới

1. Click **"Create a project"**
2. Điền thông tin:
   - **Project name:** `user-registration-db` (hoặc tên bạn muốn)
   - **Region:** `AWS / Asia Pacific (Singapore)` (gần VN nhất)
   - **Postgres version:** `16` (latest)
   - **Database name:** `userdb`
3. Click **"Create project"**

### 1.3. Copy Connection String

Sau khi tạo xong, bạn sẽ thấy **Connection String**:

```
postgresql://username:password@ep-xxx.region.aws.neon.tech/userdb?sslmode=require
```

**⚠️ QUAN TRỌNG:** Copy và lưu lại connection string này!

---

## Bước 2: Cập nhật Environment Variables Local

### 2.1. Cập nhật backend/.env

Mở file `backend/.env` và thay đổi `DATABASE_URL`:

```env
PORT=3001
FRONTEND_URL=http://localhost:5173
NODE_ENV=development

# Paste connection string từ Neon.tech vào đây
DATABASE_URL=postgresql://username:password@ep-xxx.region.aws.neon.tech/userdb?sslmode=require
```

### 2.2. Test local trước khi deploy

```powershell
# Test backend
cd backend
npm run start:dev

# Test frontend (terminal mới)
cd frontend
npm run dev
```

Truy cập `http://localhost:5173` và thử đăng ký user để đảm bảo kết nối database thành công.

---

## Bước 3: Push code lên GitHub

### 3.1. Commit tất cả thay đổi

```powershell
git add .
git commit -m "Switch to PostgreSQL and Vercel deployment"
git push
```

---

## Bước 4: Deploy lên Vercel

### 4.1. Đăng nhập Vercel

1. Truy cập: https://vercel.com/
2. Click **"Sign Up"** → **"Continue with GitHub"**
3. Authorize Vercel

### 4.2. Import Project

1. Click **"Add New..."** → **"Project"**
2. Tìm repository: `User-Registration-API-with-React-Frontend`
3. Click **"Import"**

### 4.3. Configure Project

**Framework Preset:** `Other` (để sử dụng custom vercel.json)

**Root Directory:** `.` (để nguyên, không chọn gì)

**Build Settings:**
- ✅ Override build command: `cd frontend && npm install && npm run build`
- ✅ Override output directory: `frontend/dist`

### 4.4. Environment Variables

Click **"Environment Variables"** và thêm:

**Variable 1:**
- **Name:** `DATABASE_URL`
- **Value:** `postgresql://username:password@ep-xxx.region.aws.neon.tech/userdb?sslmode=require`
- **Environments:** ✅ Production, ✅ Preview, ✅ Development

**Variable 2:**
- **Name:** `NODE_ENV`
- **Value:** `production`
- **Environments:** ✅ Production

**Variable 3:**
- **Name:** `FRONTEND_URL`
- **Value:** `https://your-project.vercel.app` (tạm thời để giá trị này, sẽ update sau)
- **Environments:** ✅ Production

⚠️ **Lưu ý:** Đừng để lộ connection string ra ngoài!

### 4.5. Deploy!

1. Click **"Deploy"**
2. Đợi 2-3 phút
3. Xem build logs để đảm bảo không có lỗi

---

## Bước 5: Cập nhật FRONTEND_URL

### 5.1. Sau khi deploy xong, copy URL

Ví dụ: `https://user-registration-api.vercel.app`

### 5.2. Cập nhật Environment Variable

1. Vào Vercel Dashboard → Project → **Settings** → **Environment Variables**
2. Tìm `FRONTEND_URL`
3. Click **Edit** → Update value thành URL thật
4. Save → Redeploy

---

## Bước 6: Test Website

### 6.1. Truy cập URL

```
https://your-project.vercel.app
```

### 6.2. Test Registration

1. Click **"Sign Up"**
2. Nhập email: `test@example.com`
3. Nhập password: `Test1234`
4. Click **"Sign Up"**
5. Đợi vài giây → Thấy thông báo thành công!

### 6.3. Kiểm tra Database

Quay lại Neon.tech Dashboard:
1. Click vào project
2. Vào tab **"Tables"**
3. Chọn table `user`
4. Click **"Run"** để xem dữ liệu
5. Thấy user vừa đăng ký!

---

## 🎯 Cấu trúc Project đã thay đổi

### Trước (SQLite):
```
backend/
  src/
  database.sqlite  ❌ Local file
frontend/
```

### Sau (PostgreSQL + Vercel):
```
api/
  index.ts  ✅ Vercel serverless function
backend/
  src/
    app.module.ts  ✅ Đổi sang PostgreSQL
frontend/
  src/
    api/userApi.ts  ✅ Dùng /api endpoint
vercel.json  ✅ Routing config
```

---

## 📊 Kiến trúc Deployment

```
User Browser
    ↓
Vercel Domain (your-app.vercel.app)
    ├─→ / → Frontend (React Static Files)
    └─→ /api → Backend (NestJS Serverless)
              ↓
        Neon.tech PostgreSQL Database
```

---

## 🔧 Troubleshooting

### ❌ Build failed?

**Lỗi:** `Cannot find module 'express'`

**Giải pháp:** Đã cài đặt trong bước setup:
```powershell
cd backend
npm install express @nestjs/platform-express --save
```

---

### ❌ Database connection failed?

**Lỗi:** `Connection terminated unexpectedly`

**Nguyên nhân:**
1. Connection string sai
2. SSL mode không đúng
3. IP bị block (ít khi xảy ra với Neon)

**Giải pháp:**
1. Kiểm tra `DATABASE_URL` trong Vercel Environment Variables
2. Đảm bảo có `?sslmode=require` ở cuối URL
3. Vào Neon.tech → Settings → IP Allow → Đảm bảo là `0.0.0.0/0` (allow all)

---

### ❌ API returns 404?

**Lỗi:** `POST /api/user/register` returns 404

**Nguyên nhân:** Routing không đúng trong `vercel.json`

**Giải pháp:** File `vercel.json` đã được cấu hình đúng:
```json
{
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/index.ts" }
  ]
}
```

Nếu vẫn lỗi, check logs trong Vercel Dashboard → Functions tab.

---

### ❌ CORS error?

**Lỗi:** `Access to fetch has been blocked by CORS policy`

**Giải pháp:** File `api/index.ts` đã enable CORS:
```typescript
app.enableCors({
  origin: true,
  credentials: true,
});
```

Nếu vẫn lỗi, đảm bảo `FRONTEND_URL` trong Vercel env vars khớp với domain thật.

---

### ⚠️ Cold start chậm?

**Hiện tượng:** Lần đầu call API mất 3-5 giây

**Nguyên nhân:** Vercel Serverless cold start + NestJS bootstrap

**Giải pháp:**
1. **Chấp nhận** (free tier bình thường)
2. **Upgrade Vercel Pro** ($20/month) → faster cold starts
3. **Warm-up strategy:** Ping API định kỳ

---

## 💰 Chi phí

| Service | Free Tier | Limits |
|---------|-----------|--------|
| **Vercel** | Miễn phí | 100GB bandwidth/tháng, Unlimited requests |
| **Neon.tech** | Miễn phí | 3GB storage, 0.5GB RAM, 10GB data transfer/tháng |
| **Tổng** | **$0/tháng** | Đủ cho hobby/learning projects |

---

## 🔄 Workflow Development

### Local Development:
```powershell
# Terminal 1: Backend
cd backend
npm run start:dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

### Deploy to Production:
```powershell
git add .
git commit -m "Your changes"
git push

# Vercel tự động deploy! 🎉
```

---

## 📈 Monitoring

### 1. Vercel Analytics
- Dashboard → Analytics
- Xem traffic, performance

### 2. Neon Database
- Dashboard → Monitoring
- Xem connections, queries

### 3. Function Logs
- Dashboard → Functions → Logs
- Debug errors

---

## ✅ Checklist Deploy Thành Công

- [ ] Neon.tech database đã tạo
- [ ] Connection string đã copy
- [ ] `backend/.env` đã update DATABASE_URL
- [ ] Test local thành công
- [ ] Code đã push lên GitHub
- [ ] Vercel project đã import
- [ ] Environment variables đã thêm (DATABASE_URL, NODE_ENV, FRONTEND_URL)
- [ ] Build thành công trên Vercel
- [ ] Website mở được
- [ ] Registration form hoạt động
- [ ] Data lưu vào Neon database
- [ ] FRONTEND_URL đã update với URL thật

---

## 🎉 Hoàn thành!

**Live URLs:**
- **Website:** `https://your-project.vercel.app`
- **API Endpoint:** `https://your-project.vercel.app/api/user/register`
- **Database:** Neon.tech Dashboard

---

## 🚀 Next Steps

1. **Custom Domain:** Settings → Domains → Add your domain
2. **Monitoring:** Setup uptime monitoring (UptimeRobot)
3. **Analytics:** Enable Vercel Analytics
4. **Security:** Add rate limiting, input sanitization
5. **Features:** Add login authentication, user profile
6. **Testing:** Write unit tests, E2E tests
7. **CI/CD:** Setup GitHub Actions for testing before deploy

---

## 📚 Tài liệu tham khảo

- [Vercel Deployment Docs](https://vercel.com/docs)
- [Neon.tech Docs](https://neon.tech/docs/introduction)
- [NestJS Serverless](https://docs.nestjs.com/faq/serverless)
- [TypeORM PostgreSQL](https://typeorm.io/#/connection-options/postgres-connection-options)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

## ⚡ Performance Tips

1. **Database Indexing:** Add indexes to frequently queried columns
2. **Connection Pooling:** Neon handles this automatically
3. **Caching:** Consider Redis for session storage
4. **Image Optimization:** Use Vercel Image Optimization
5. **Code Splitting:** Vite does this automatically

---

## 🔐 Security Checklist

- [ ] Environment variables không commit vào Git
- [ ] Password được hash với bcrypt
- [ ] CORS configured đúng
- [ ] Input validation enabled
- [ ] SSL/TLS enabled (automatic với Vercel)
- [ ] Database connection string secured

---

**Chúc mừng bạn đã deploy thành công Full Stack application lên Production! 🎊**
