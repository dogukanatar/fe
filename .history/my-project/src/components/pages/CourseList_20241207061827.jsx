import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

export default function CourseList() {
  // Mock data based on your database structure
  const mockCourses = [
    {
      course_id: 1,
      year: 2024,
      semester: "Spring",
      department: "Computer Science",
      course_code: "CS101",
      course_name: "Introduction to Programming",
      credit: 3.0,
      timeslot: "Mon 09:00-10:30",
      classroom: "Room 301",
      professor: "Dr. Smith",
      student_capacity: 40,
      english_class: true,
      course_description: "An introductory course to programming concepts and practices."
    },
    // Add more mock courses as needed
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState(mockCourses);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header and Search */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Available Courses</h1>
        
        {/* Search and Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter size={20} />
            Filters
          </button>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.course_id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              {/* Course Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {course.course_name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {course.course_code} • {course.credit} Credits
                  </p>
                </div>
              </div>

              {/* Course Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium text-gray-500">Professor:</span>
                  <span className="text-sm text-gray-900">{course.professor}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium text-gray-500">Schedule:</span>
                  <span className="text-sm text-gray-900">{course.timeslot}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium text-gray-500">Location:</span>
                  <span className="text-sm text-gray-900">{course.classroom}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium text-gray-500">Capacity:</span>
                  <span className="text-sm text-gray-900">{course.student_capacity} students</span>
                </div>
              </div>

              {/* Course Tags */}
              <div className="flex flex-wrap gap-2">
                {course.english_class && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    English
                  </span>
                )}
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                  {course.semester} {course.year}
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  {course.department}
                </span>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Add to My List
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}