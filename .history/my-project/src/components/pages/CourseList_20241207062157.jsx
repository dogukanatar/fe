import { useState } from 'react';
import { Search, Filter, ChevronDown, X } from 'lucide-react';

export default function CourseList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    semester: '',
    department: '',
    language: '',
    credits: ''
  });

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
      course_description: "An introductory course to programming concepts and practices.",
      prerequisites: "None",
      syllabus: "Week 1: Introduction to programming...",
    },
    // ... other mock courses
  ];

  const [courses, setCourses] = useState(mockCourses);

  const handleAddToList = (courseId) => {
    // This will be connected to your API later
    console.log('Adding course to list:', courseId);
    alert('Course will be added to your list when API is connected');
  };

  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
  };

  return (
    <div className="h-full w-full overflow-auto bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header and Search */}
        <div className="w-full p-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Available Courses
          </h1>
          
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
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
            <button 
              className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100 bg-white"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} />
              Filters
              <ChevronDown size={16} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-white border rounded-lg shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <select
                  className="p-2 border rounded-lg"
                  value={selectedFilters.semester}
                  onChange={(e) => setSelectedFilters({...selectedFilters, semester: e.target.value})}
                >
                  <option value="">Select Semester</option>
                  <option value="spring">Spring</option>
                  <option value="fall">Fall</option>
                </select>

                <select
                  className="p-2 border rounded-lg"
                  value={selectedFilters.department}
                  onChange={(e) => setSelectedFilters({...selectedFilters, department: e.target.value})}
                >
                  <option value="">Select Department</option>
                  <option value="cs">Computer Science</option>
                  <option value="eng">Engineering</option>
                </select>

                <select
                  className="p-2 border rounded-lg"
                  value={selectedFilters.language}
                  onChange={(e) => setSelectedFilters({...selectedFilters, language: e.target.value})}
                >
                  <option value="">Select Language</option>
                  <option value="english">English</option>
                  <option value="chinese">Chinese</option>
                </select>

                <select
                  className="p-2 border rounded-lg"
                  value={selectedFilters.credits}
                  onChange={(e) => setSelectedFilters({...selectedFilters, credits: e.target.value})}
                >
                  <option value="">Select Credits</option>
                  <option value="1">1 Credit</option>
                  <option value="2">2 Credits</option>
                  <option value="3">3 Credits</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {courses.map((course) => (
            <div
              key={course.course_id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-xl hover:transform hover:translate-y-[-4px]"
            >
              <div className="p-4 sm:p-6">
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
                    <span className="text-sm font-medium text-gray-500 w-20">Professor:</span>
                    <span className="text-sm text-gray-900">{course.professor}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium text-gray-500 w-20">Schedule:</span>
                    <span className="text-sm text-gray-900">{course.timeslot}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium text-gray-500 w-20">Location:</span>
                    <span className="text-sm text-gray-900">{course.classroom}</span>
                  </div>
                </div>

                {/* Course Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
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

                {/* Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => handleViewDetails(course)}
                    className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleAddToList(course.course_id)}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add to My List
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Course Details Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold">{selectedCourse.course_name}</h2>
                  <button 
                    onClick={() => setSelectedCourse(null)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Course Information</h3>
                    <p>{selectedCourse.course_description}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Prerequisites</h3>
                    <p>{selectedCourse.prerequisites}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Syllabus</h3>
                    <p>{selectedCourse.syllabus}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}