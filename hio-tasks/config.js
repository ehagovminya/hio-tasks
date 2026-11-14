// ===================== إعدادات النظام =====================
// ده الملف الوحيد اللي محتاج تعدّله.
// لازم تحط بيانات Firebase تحت عشان النظام يشتغل (الخطوات في README.md)
self.APP_CONFIG = {
  // القيم دي افتراضية بس — مدير الفرع يقدر يعدّل كل ده من داخل التطبيق (⚙️ الإعدادات)
  appName: "متابعة التكليفات",
  orgName: "الهيئة العامة للرعاية الصحية — فرع المنيا",

  // الإيميلات اللي ليها صلاحية "مدير" — مدير الفرع ونائبه (لازم تكتبها كمان في firestore.rules)
  managerEmails: ["ehagovminya@gmail.com"],

  // إدارات فرع الهيئة — حسب إعلان وظائف فرع المنيا + الإدارات الموجودة في باقي فروع الهيئة
  // امسح أو ضيف أي إدارة براحتك
  departmentGroups: {
    "الإدارات الفنية": [
      "المكتب الفني",
      "الرعاية الأولية",
      "الرعاية الثانوية والثالثية",
      "الجودة",
      "مكافحة العدوى",
      "رضاء المنتفعين",
      "الصيدلة",
      "التمريض",
      "السلامة والصحة المهنية",
      "التدريب"
    ],
    "الإدارات الإدارية والمساندة": [
      "الشئون الإدارية",
      "الموارد البشرية",
      "الشئون المالية",
      "الشئون القانونية",
      "المراجعة الداخلية والحوكمة",
      "النظم والمعلومات والتحول الرقمي",
      "الإمداد",
      "الشئون الهندسية",
      "التسويق",
      "الإعلام والتوعية الصحية",
      "الأمن"
    ]
  },

  // درجات التقييم حسب وقت التنفيذ
  scores: { beforeD1: 100, beforeD2: 85, beforeD3: 70, lateStart: 50, latePerDay: 10 },

  // المواعيد الافتراضية للتكليف الجديد (بالأيام من دلوقتي)
  defaultDueDays: [1, 3, 5],

  // انسخ قيم مشروعك من Firebase Console > Project settings > Your apps > Web
  firebase: {
    apiKey: "AIzaSyANMNTkgDE-HmELd3eA7cqwnOv1GjhZn14",
    authDomain: "hio-minya-tasks.firebaseapp.com",
    projectId: "hio-minya-tasks",
    storageBucket: "hio-minya-tasks.firebasestorage.app",
    messagingSenderId: "426950890607",
    appId: "1:426950890607:web:49676b1d468156ed46699a"
  },
  // Firebase Console > Project settings > Cloud Messaging > Web Push certificates > Key pair
  vapidKey: "BOj7TUY8QOqBGlQHuTnroIyF7aKuaI57JdnBMFzR0pm38acI5a9rZSmG6JBdBY0jgHmtKG_9RoWYP55Cho93XYg",

  // لينك تحميل الـ APK (يتعدّل كمان من الإعدادات)
  apkUrl: "",

};
self.APP_CONFIG.departments = Object.values(self.APP_CONFIG.departmentGroups).flat();
