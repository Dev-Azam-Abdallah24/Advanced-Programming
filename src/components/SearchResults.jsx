import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState('relevance');

  const lectures = [
    {
      id: 'decorator',
      title: 'نمط Decorator',
      description: 'تعلم كيفية إضافة وظائف جديدة للكائنات ديناميكياً دون تعديل بنيتها الأساسية',
      category: 'design-patterns',
      difficulty: 'متوسط',
      duration: '15 دقيقة',
      students: 1250,
      rating: 4.8,
      image: '/src/assets/assets/decorator_uml.png',
      tags: ['أنماط التصميم', 'البرمجة الكائنية', 'Structural Pattern']
    },
    {
      id: 'proxy',
      title: 'نمط Proxy',
      description: 'فهم كيفية التحكم في الوصول للكائنات وتحسين الأداء باستخدام نمط الوكيل',
      category: 'design-patterns',
      difficulty: 'متقدم',
      duration: '20 دقيقة',
      students: 980,
      rating: 4.7,
      image: '/src/assets/assets/proxy_uml.png',
      tags: ['أنماط التصميم', 'التحكم في الوصول', 'Structural Pattern']
    },
    {
      id: 'strategy',
      title: 'نمط Strategy',
      description: 'تطبيق خوارزميات مختلفة بطريقة قابلة للتبديل والتوسع',
      category: 'design-patterns',
      difficulty: 'مبتدئ',
      duration: '12 دقيقة',
      students: 1500,
      rating: 4.9,
      image: '/src/assets/assets/strategy_uml.png',
      tags: ['أنماط التصميم', 'الخوارزميات', 'Behavioral Pattern']
    },
    {
      id: 'state',
      title: 'نمط State',
      description: 'إدارة حالات الكائنات وتغيير سلوكها بناءً على الحالة الحالية',
      category: 'design-patterns',
      difficulty: 'متوسط',
      duration: '18 دقيقة',
      students: 850,
      rating: 4.6,
      image: '/src/assets/assets/state_uml.png',
      tags: ['أنماط التصميم', 'إدارة الحالة', 'Behavioral Pattern']
    },
    {
      id: 'facade',
      title: 'نمط Facade',
      description: 'تبسيط التفاعل مع الأنظمة المعقدة من خلال واجهة موحدة',
      category: 'design-patterns',
      difficulty: 'مبتدئ',
      duration: '10 دقيقة',
      students: 1100,
      rating: 4.8,
      image: '/src/assets/assets/facade_uml.png',
      tags: ['أنماط التصميم', 'تبسيط الواجهات', 'Structural Pattern']
    },
    {
      id: 'adapter',
      title: 'نمط Adapter',
      description: 'ربط الأنظمة غير المتوافقة وجعلها تعمل معاً بسلاسة',
      category: 'design-patterns',
      difficulty: 'متوسط',
      duration: '14 دقيقة',
      students: 920,
      rating: 4.7,
      image: '/src/assets/assets/adapter_uml.png',
      tags: ['أنماط التصميم', 'التوافق', 'Structural Pattern']
    },
    {
      id: 'prototype',
      title: 'نمط Prototype',
      description: 'إنشاء كائنات جديدة عن طريق نسخ النماذج الأولية الموجودة',
      category: 'design-patterns',
      difficulty: 'متوسط',
      duration: '16 دقيقة',
      students: 750,
      rating: 4.5,
      image: '/src/assets/assets/prototype_uml.png',
      tags: ['أنماط التصميم', 'إنشاء الكائنات', 'Creational Pattern']
    },
    {
      id: 'web-services',
      title: 'خدمات الويب',
      description: 'مقدمة شاملة لخدمات الويب وبروتوكولات SOAP و REST',
      category: 'web-services',
      difficulty: 'متوسط',
      duration: '25 دقيقة',
      students: 1800,
      rating: 4.9,
      image: '/src/assets/assets/web_services_flow.png',
      tags: ['خدمات الويب', 'SOAP', 'REST', 'API']
    }
  ];

  const filteredLectures = lectures.filter(lecture => {
    const query = searchTerm.toLowerCase();
    return lecture.title.toLowerCase().includes(query) ||
           lecture.description.toLowerCase().includes(query) ||
           lecture.tags.some(tag => tag.toLowerCase().includes(query));
  });

  const sortedLectures = [...filteredLectures].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'students':
        return b.students - a.students;
      case 'duration':
        return parseInt(a.duration) - parseInt(b.duration);
      default:
        return 0;
    }
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: searchTerm });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'مبتدئ': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'متوسط': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'متقدم': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold mb-4">نتائج البحث</h1>
          
          <form onSubmit={handleSearch} className="flex gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="البحث في المحاضرات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12"
              />
            </div>
            <Button type="submit" className="hover-lift">
              بحث
            </Button>
          </form>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <p className="text-muted-foreground">
              {sortedLectures.length} نتيجة للبحث عن "{searchParams.get('q')}"
            </p>
            
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-background border border-border rounded-md px-3 py-1 text-sm"
              >
                <option value="relevance">الأكثر صلة</option>
                <option value="rating">الأعلى تقييماً</option>
                <option value="students">الأكثر شعبية</option>
                <option value="duration">الأقصر مدة</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        {sortedLectures.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedLectures.map((lecture, index) => (
              <motion.div
                key={lecture.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover-lift ripple-effect group cursor-pointer">
                  <Link to={`/lecture/${lecture.id}`}>
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={lecture.image}
                        alt={lecture.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Mb2FkaW5nLi4uPC90ZXh0Pjwvc3ZnPg==';
                        }}
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className={getDifficultyColor(lecture.difficulty)}>
                          {lecture.difficulty}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {lecture.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {lecture.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {lecture.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {lecture.students.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          {lecture.rating}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {lecture.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {lecture.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{lecture.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">لم يتم العثور على نتائج</h3>
            <p className="text-muted-foreground mb-6">
              جرب البحث بكلمات مختلفة أو تحقق من الإملاء
            </p>
            <Link to="/">
              <Button>العودة للرئيسية</Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;

