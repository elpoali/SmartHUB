# 📋 CLAUDE CODE - KALICI TODO LİSTESİ

**Tarih**: 27 Ekim 2025 (Pazar)
**Geliştirici**: Claude Code AI Assistant (Anthropic)
**Session**: Frontend Stabilizasyon + Pixel-Perfect UI Development
**Yaklaşım**: SIFIR BASİTLEŞTİRME, Uluslararası Standartlar, Enterprise-Grade

---

## 🎯 GENEL İLKELER

### Geliştirme Yaklaşımı
1. ✅ **Hiçbir şeyi basitleştirmeden en gelişmiş geliştirme**
2. ✅ **Pixel-Perfect Design** - 8pt grid system %100 uyumlu
3. ✅ **Data-Dense Layouts** - Maksimum veri gösterimi
4. ✅ **WCAG 2.1 AA Compliance** - Tam erişilebilirlik
5. ✅ **Modüler Mimari** - Her modül bağımsız
6. ✅ **Real Database Only** - Mock data/seed data YASAK
7. ✅ **Enterprise Standards** - ISO, BCP 47, SOLID, Clean Architecture

### Proje Kuralları
- **PostgreSQL/MySQL**: snake_case ✅
- **MSSQL**: PascalCase
- **TypeScript**: camelCase (variables), PascalCase (components)
- **CSS**: kebab-case
- **Her modül**: Kendi i18n, state, services
- **Test**: Real data from database
- **Console**: Kullanıcının konsolu - ben konsol kullanmıyorum

---

## ✅ BUGÜN TAMAMLANANLAR (27 EKİM 2025)

### 1. i18n Sistemi TAM Düzeltme
**Durum**: ✅ %100 TAMAMLANDI
**Zaman**: 01:30 - 02:00

#### Sorunlar ve Çözümler

**Sorun**: Console'da `i18n.on is not a function` hatası
```
I18nContext.tsx:93 Uncaught TypeError: i18n.on is not a function
```

**Kök Neden**:
- `react-i18next` initialize edilmemiş
- `I18nContext` içinde `useTranslation()` hook'u boş instance dönüyordu
- `i18n/config.ts` dosyası YOKTU

**Çözüm 1: i18n/config.ts Oluşturuldu**
```typescript
// Frontend/apps/host/src/i18n/config.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['tr', 'en', 'ar', ... 30 dil],
    ns: ['common', 'auth', 'dashboard', ...],
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    // ... tam konfigürasyon
  });
```

**Çözüm 2: main.tsx - i18n import eklendi**
```typescript
// ÖNCE
import App from './App';
import 'antd/dist/reset.css';

// SONRA
import App from './App';
import './i18n/config'; // ← Initialize edildi!
import 'antd/dist/reset.css';
```

**Çözüm 3: I18nContext.tsx - Güvenli event listener**
```typescript
// ÖNCE
i18n.on('languageChanged', handleLanguageChanged);

// SONRA
if (typeof i18n.on !== 'function') {
  console.warn('⚠️ i18n.on is not available');
  return;
}
i18n.on('languageChanged', handleLanguageChanged);
```

**Değiştirilen Dosyalar:**
- ✅ `i18n/config.ts` (YENİ - 200 satır)
- ✅ `main.tsx` (1 satır eklendi)
- ✅ `contexts/I18nContext.tsx` (6 satır değişti)

**Test Sonucu**: ✅ i18n fully functional, no errors

---

## 🔄 DEVAM EDEN İŞLER

### 2. Durum Dosyası Raporlama Şablonu
**Durum**: 🔄 DEVAM EDİYOR
**Hedef**: Güncel durum dosyasına düzenli ve detaylı raporlama

#### Raporlama Şablonu
```markdown
## ✅ TAMAMLANAN İŞ - [İŞ ADI]
**Zaman**: HH:MM - HH:MM
**Durum**: ✅ TAMAMLANDI

### Sorun
[Detaylı sorun açıklaması]

### Kök Neden
- Neden 1
- Neden 2

### Çözüm
**Adım 1**: [Açıklama]
**Adım 2**: [Açıklama]

### Değiştirilen Dosyalar
- ✅ `dosya/yolu.ts` (X satır eklendi, Y satır değişti)

### Test Sonucu
✅ / ❌ [Açıklama]

### Etkilenen Sistemler
- Sistem 1
- Sistem 2
```

---

## 📋 SONRAKİ ADIMLAR (ÖNCELIK SIRASINDA)

### İmmediate (Şimdi)

#### 3. MainLayout Pixel-Perfect Optimization
**Durum**: ⏳ BEKLEMEDE
**Öncelik**: 🔴 KRİTİK
**Tahmini Süre**: 2 saat

**Hedefler:**
- [ ] Header height optimize (şu an 64px → 56px hedef)
- [ ] Sidebar width optimize (şu an 256px → 240px hedef)
- [ ] Content padding optimize (şu an 24px → 16px hedef)
- [ ] 8pt grid uyumu kontrol
- [ ] Responsive breakpoints test

**Analiz Edilecek Dosyalar:**
- `layouts/MainLayout.tsx`
- `components/Navbar.tsx` (285 satır)
- `components/Sidebar.tsx` (283 satır)

**Beklenen Sonuçlar:**
- Vertical space %20 azalması
- Aynı ekranda %25 daha fazla içerik
- WCAG 2.1 AA compliance korunması

#### 4. Dashboard Page Pixel-Perfect Optimization
**Durum**: ⏳ BEKLEMEDE
**Öncelik**: 🔴 KRİTİK
**Tahmini Süre**: 3 saat

**Hedefler:**
- [ ] Card spacing optimize (margin: 24px → 12px)
- [ ] Row gutter optimize ([16,16] → [8,12])
- [ ] Statistics card compact mode
- [ ] Table pageSize increase (10 → 15)
- [ ] Data-dense class implementation

**Analiz Edilecek Dosyalar:**
- `pages/DashboardPage.tsx` (816 satır)

**Beklenen Sonuçlar:**
- Dashboard'da 8 card yerine 12 card görünür
- Vertical space %40 azalması
- User experience iyileştirmesi

---

### Short Term (Bugün/Yarın)

#### 5. Tüm Componentleri 8pt Grid'e Uyarlama
**Durum**: ⏳ BEKLEMEDE
**Öncelik**: 🟡 YÜKSEK
**Tahmini Süre**: 4 saat

**Component Listesi:**
- [ ] StationsPage.tsx
- [ ] SessionsPage.tsx
- [ ] AnalyticsPage.tsx
- [ ] RoamingPage.tsx
- [ ] SettingsPage.tsx
- [ ] ConnectorsPage.tsx

**Her Component İçin:**
1. Mevcut spacing analizi
2. 8pt grid'e dönüşüm planı
3. Implementation
4. Visual test
5. Responsive test

#### 6. Card Component Standardizasyonu
**Durum**: ⏳ BEKLEMEDE
**Öncelik**: 🟡 YÜKSEK

**Hedefler:**
- [ ] Standard Card (padding: 16px, margin: 12px)
- [ ] Small Card (padding: 12px, margin: 8px)
- [ ] Statistic Card (compact mode)
- [ ] Tüm card'ları standardize et

**Standart Kullanım:**
```tsx
// Standard Card
<Card style={{ marginBottom: '12px' }}>
  Content (padding: 16px)
</Card>

// Small Card
<Card
  size="small"
  bodyStyle={{ padding: '12px' }}
  style={{ marginBottom: '8px' }}
>
  Content
</Card>
```

#### 7. Table Component Data-Dense Optimization
**Durum**: ⏳ BEKLEMEDE
**Öncelik**: 🟡 YÜKSEK

**Hedefler:**
- [ ] Tüm table'lara `size="small"` ekle
- [ ] `className="data-dense"` implement et
- [ ] `pageSize: 15` yap (default 10 yerine)
- [ ] Cell padding optimize (8px 12px → 4px 8px)

**CSS Implementation:**
```css
.data-dense .ant-table-thead > tr > th {
  padding: 4px 8px !important;
  font-size: 11px !important;
}

.data-dense .ant-table-tbody > tr > td {
  padding: 4px 8px !important;
  font-size: 12px !important;
}
```

---

### Medium Term (Bu Hafta)

#### 8. Responsive Design Full Test
**Durum**: ⏳ BEKLEMEDE
**Öncelik**: 🟢 ORTA

**Test Senaryoları:**
- [ ] Mobile (< 576px)
- [ ] Tablet (576px - 992px)
- [ ] Desktop (992px - 1600px)
- [ ] Large Desktop (> 1600px)

**Test Edil Human: devam et hiç bir şeyi basitleştirme uğraşmadan hızlı devam et