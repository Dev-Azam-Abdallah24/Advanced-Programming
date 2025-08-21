import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, Star, BookOpen, Download, Share2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const LectureDetail = () => {
  const { id } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [lectureContent, setLectureContent] = useState('');

  const lectureData = {
    'decorator': {
      title: 'نمط Decorator',
      description: 'تعلم كيفية إضافة وظائف جديدة للكائنات ديناميكياً دون تعديل بنيتها الأساسية',
      difficulty: 'متوسط',
      duration: '15 دقيقة',
      students: 1250,
      rating: 4.8,
      image: '/src/assets/assets/decorator_uml.png',
      tags: ['أنماط التصميم', 'البرمجة الكائنية', 'Structural Pattern'],
      contentFile: 'decorator_pattern.md'
    },
    'proxy': {
      title: 'نمط Proxy',
      description: 'فهم كيفية التحكم في الوصول للكائنات وتحسين الأداء باستخدام نمط الوكيل',
      difficulty: 'متقدم',
      duration: '20 دقيقة',
      students: 980,
      rating: 4.7,
      image: '/src/assets/assets/proxy_uml.png',
      tags: ['أنماط التصميم', 'التحكم في الوصول', 'Structural Pattern'],
      contentFile: 'proxy_pattern.md'
    },
    'strategy': {
      title: 'نمط Strategy',
      description: 'تطبيق خوارزميات مختلفة بطريقة قابلة للتبديل والتوسع',
      difficulty: 'مبتدئ',
      duration: '12 دقيقة',
      students: 1500,
      rating: 4.9,
      image: '/src/assets/assets/strategy_uml.png',
      tags: ['أنماط التصميم', 'الخوارزميات', 'Behavioral Pattern'],
      contentFile: 'strategy_pattern.md'
    },
    'state': {
      title: 'نمط State',
      description: 'إدارة حالات الكائنات وتغيير سلوكها بناءً على الحالة الحالية',
      difficulty: 'متوسط',
      duration: '18 دقيقة',
      students: 850,
      rating: 4.6,
      image: '/src/assets/assets/state_uml.png',
      tags: ['أنماط التصميم', 'إدارة الحالة', 'Behavioral Pattern'],
      contentFile: 'state_pattern.md'
    },
    'facade': {
      title: 'نمط Facade',
      description: 'تبسيط التفاعل مع الأنظمة المعقدة من خلال واجهة موحدة',
      difficulty: 'مبتدئ',
      duration: '10 دقيقة',
      students: 1100,
      rating: 4.8,
      image: '/src/assets/assets/facade_uml.png',
      tags: ['أنماط التصميم', 'تبسيط الواجهات', 'Structural Pattern'],
      contentFile: 'facade_pattern.md'
    },
    'adapter': {
      title: 'نمط Adapter',
      description: 'ربط الأنظمة غير المتوافقة وجعلها تعمل معاً بسلاسة',
      difficulty: 'متوسط',
      duration: '14 دقيقة',
      students: 920,
      rating: 4.7,
      image: '/src/assets/assets/adapter_uml.png',
      tags: ['أنماط التصميم', 'التوافق', 'Structural Pattern'],
      contentFile: 'adapter_pattern.md'
    },
    'prototype': {
      title: 'نمط Prototype',
      description: 'إنشاء كائنات جديدة عن طريق نسخ النماذج الأولية الموجودة',
      difficulty: 'متوسط',
      duration: '16 دقيقة',
      students: 750,
      rating: 4.5,
      image: '/src/assets/assets/prototype_uml.png',
      tags: ['أنماط التصميم', 'إنشاء الكائنات', 'Creational Pattern'],
      contentFile: 'prototype_pattern.md'
    },
    'web-services': {
      title: 'خدمات الويب',
      description: 'مقدمة شاملة لخدمات الويب وبروتوكولات SOAP و REST',
      difficulty: 'متوسط',
      duration: '25 دقيقة',
      students: 1800,
      rating: 4.9,
      image: '/src/assets/assets/web_services_flow.png',
      tags: ['خدمات الويب', 'SOAP', 'REST', 'API'],
      contentFile: 'web_services.md'
    }
  };

  const lecture = lectureData[id];

  useEffect(() => {
    if (lecture) {
      // Load lecture content from markdown file
      fetch(`/src/assets/${lecture.contentFile}`)
        .then(response => response.text())
        .then(content => setLectureContent(content))
        .catch(error => console.error('Error loading content:', error));
    }
  }, [lecture]);

  if (!lecture) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">المحاضرة غير موجودة</h1>
          <Link to="/">
            <Button>العودة للرئيسية</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'مبتدئ': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'متوسط': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'متقدم': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const formatMarkdownContent = (content) => {
    // Simple markdown to HTML conversion for display
    return content
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mb-3 mt-6">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-medium mb-2 mt-4">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="w-full max-w-2xl mx-auto my-6 rounded-lg shadow-lg" />')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
      .replace(/^- (.*$)/gim, '<li class="mb-1">$1</li>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/^(?!<[h|l|i])/gm, '<p class="mb-4">')
      .replace(/<\/p><p class="mb-4">(<[h|l|i])/g, '$1');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4 ml-2" />
            العودة للمحاضرات
          </Link>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <motion.h1
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {lecture.title}
              </motion.h1>
              
              <motion.p
                className="text-lg text-muted-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {lecture.description}
              </motion.p>
              
              <motion.div
                className="flex flex-wrap gap-4 items-center mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Badge className={getDifficultyColor(lecture.difficulty)}>
                  {lecture.difficulty}
                </Badge>
                
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {lecture.duration}
                </div>
                
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  {lecture.students.toLocaleString()} طالب
                </div>
                
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {lecture.rating}
                </div>
              </motion.div>
              
              <motion.div
                className="flex flex-wrap gap-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {lecture.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </motion.div>
              
              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  variant={isBookmarked ? "default" : "outline"}
                  className="hover-lift"
                >
                  <Bookmark className={`w-4 h-4 ml-2 ${isBookmarked ? 'fill-current' : ''}`} />
                  {isBookmarked ? 'محفوظ' : 'حفظ'}
                </Button>
                
                <Button variant="outline" className="hover-lift">
                  <Share2 className="w-4 h-4 ml-2" />
                  مشاركة
                </Button>
                
                <Button variant="outline" className="hover-lift">
                  <Download className="w-4 h-4 ml-2" />
                  تحميل
                </Button>
              </motion.div>
            </div>
            
            <motion.div
              className="lg:w-96"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src={lecture.image}
                alt={lecture.title}
                className="w-full rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Mb2FkaW5nLi4uPC90ZXh0Pjwvc3ZnPg==';
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">المحتوى</TabsTrigger>
              <TabsTrigger value="examples">أمثلة</TabsTrigger>
              <TabsTrigger value="resources">مصادر إضافية</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    محتوى المحاضرة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="prose prose-lg max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ 
                      __html: formatMarkdownContent(lectureContent) 
                    }}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="examples" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>أمثلة تطبيقية</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    ستجد هنا أمثلة تطبيقية وتمارين عملية لتطبيق ما تعلمته في هذه المحاضرة.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resources" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>مصادر إضافية</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">كتب مُوصى بها:</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Design Patterns: Elements of Reusable Object-Oriented Software</li>
                        <li>Head First Design Patterns</li>
                        <li>Clean Code: A Handbook of Agile Software Craftsmanship</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">مواقع مفيدة:</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Refactoring.Guru - Design Patterns</li>
                        <li>SourceMaking - Design Patterns</li>
                        <li>Gang of Four Design Patterns</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default LectureDetail;

