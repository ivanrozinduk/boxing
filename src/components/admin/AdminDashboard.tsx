import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Users, FileText, BarChart3, BookOpen, GraduationCap } from 'lucide-react';
import UserManagement from './UserManagement';
import ContentManager from './ContentManager';
import AnalyticsReport from './AnalyticsReport';
import LessonBuilder from './LessonBuilder';
import CourseManager from './CourseManager';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Admin Portal</h2>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm border border-gray-100">
          {[
            { id: 'users', label: 'Users', icon: Users },
            { id: 'content', label: 'Content', icon: FileText },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'lessons', label: 'Lessons', icon: BookOpen },
            { id: 'courses', label: 'Courses', icon: GraduationCap },
          ].map(({ id, label, icon: Icon }) => (
            <TabsTrigger
              key={id}
              value={id}
              className="flex-1 flex items-center justify-center px-4 py-2.5 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 transition-colors"
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="content">
          <ContentManager />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsReport />
        </TabsContent>

        <TabsContent value="lessons">
          <LessonBuilder />
        </TabsContent>

        <TabsContent value="courses">
          <CourseManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}