# متابعة التكليفات — الهيئة العامة للرعاية الصحية، فرع المنيا

- **لينك النظام:** https://ehagovminya.github.io/hio-tasks/
- **قاعدة البيانات:** Firebase project `hio-minya-tasks` (حساب ehagovminya@gmail.com)
- **أول حساب مدير:** ehagovminya@gmail.com — يعمل "حساب جديد" من صفحة الدخول بالإيميل ده، ويبقى مدير تلقائيًا.
  بعد كده من تبويب **الفريق** يقدر يعيّن مدير الفرع ونائبه بأي إيميل.

## كل الإعدادات من جوه التطبيق (⚙️)
اسم الجهة، الإدارات (إضافة/تعديل/حذف)، درجات التقييم، المواعيد الافتراضية، لينك تحميل الـ APK.

## إشعارات الموبايل وهو مقفول (خطوة اختيارية — 3 دقايق)
1. Firebase Console ← ⚙️ Project settings ← Service accounts ← **Generate new private key** (هينزل ملف JSON).
2. GitHub ← الـ repo ← Settings ← Secrets and variables ← Actions ← **New repository secret**
   الاسم: `FIREBASE_SERVICE_ACCOUNT` — القيمة: محتوى ملف الـ JSON كله.
من غير الخطوة دي التذكيرات بتشتغل لما التطبيق مفتوح + تذكيرات Google Calendar.

## تطبيق أندرويد (APK)
pwabuilder.com ← حط لينك النظام ← Package for stores ← Android ← Download.
ارفع الـ APK على Google Drive وحط اللينك في ⚙️ الإعدادات ← يظهر زرار التحميل لكل الموظفين.

## آيفون
Safari ← زرار المشاركة ← "إضافة إلى الشاشة الرئيسية".

## التقييم الافتراضي
قبل الموعد الأول 100% · قبل الثاني 85% · قبل النهائي 70% · بعده 50% وبيقل 10% كل يوم · ما اتنفذش 0%.
