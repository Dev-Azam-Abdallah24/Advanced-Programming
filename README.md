# منصة المحاضرات التفاعلية

منصة تعليمية تفاعلية لعرض أنماط التصميم وخدمات الويب مع شروحات مرئية وتفاعلية.

## المميزات

- 🎨 تصميم حديث ومتجاوب
- 🌙 وضع ليلي/نهاري
- 🔍 بحث متقدم وفلترة
- 📱 متوافق مع الأجهزة المحمولة
- ⚡ أداء سريع مع React و Vite
- 🎯 تجربة مستخدم سلسة مع الرسوم المتحركة

## المحاضرات المتاحة

### أنماط التصميم (Design Patterns)
- نمط Decorator
- نمط Proxy
- نمط Strategy
- نمط State
- نمط Facade
- نمط Adapter
- نمط Prototype

### خدمات الويب
- مقدمة شاملة لخدمات الويب
- بروتوكولات SOAP و REST
- تطبيقات عملية

## التقنيات المستخدمة

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Routing**: React Router DOM

## التشغيل المحلي

```bash
# تثبيت التبعيات
pnpm install

# تشغيل خادم التطوير
pnpm run dev

# بناء المشروع للإنتاج
pnpm run build
```

## البنية

```
src/
├── components/          # مكونات React
│   ├── ui/             # مكونات واجهة المستخدم
│   ├── Header.jsx      # رأس الصفحة
│   ├── HomePage.jsx    # الصفحة الرئيسية
│   ├── LectureDetail.jsx # تفاصيل المحاضرة
│   └── ...
├── assets/             # الملفات والصور
├── App.jsx            # المكون الرئيسي
└── main.jsx           # نقطة الدخول
```

## المساهمة

نرحب بالمساهمات! يرجى فتح issue أو pull request.

## الترخيص

هذا المشروع مرخص تحت رخصة MIT.

