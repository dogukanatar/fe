import { useState } from 'react';
import { Search } from 'lucide-react';

export default function CourseList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    language: '',
    semester: '',
    department: '',
    day: '',
    period: ''
  });

  const timePeriods = [
    { value: '1', label: '1st Period (1교시) - 9:00-10:30' },
    { value: '2', label: '2nd Period (2교시) - 10:30-12:00' },
    { value: '3', label: '3rd Period (3교시) - 12:00-13:30' },
  ];

  const weekDays = [
    { value: 'MON', label: 'Monday' },
    { value: 'TUE', label: 'Tuesday' },
    { value: 'WED', label: 'Wednesday' },
    { value: 'THU', label: 'Thursday' },
    { value: 'FRI', label: 'Friday' },
  ];

  const applyFilters = (currentFilters, search) => {
    let filtered = mockCourses;

    // Search filter
    if (search) {
      filtered = filtered.filter(course => 
        course.course_name.toLowerCase().includes(search.toLowerCase()) ||
        course.course_code.toLowerCase().includes(search.toLowerCase()) ||
        course.professor.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply each filter
    if (currentFilters.language) {
      filtered = filtered.filter(course => 
        course.english_class === (currentFilters.language === 'english')
      );
    }
    if (currentFilters.semester) {
      filtered = filtered.filter(course => 
        course.semester === currentFilters.semester
      );
    }
    if (currentFilters.department) {
      filtered = filtered.filter(course => 
        course.department === currentFilters.department
      );
    }
    if (currentFilters.day) {
      filtered = filtered.filter(course => 
        course.day === currentFilters.day
      );
    }
    if (currentFilters.period) {
      filtered = filtered.filter(course => 
        course.period === currentFilters.period
      );
    }

    setCourses(filtered);
  };


  const mockCourses = [
    {
      course_id: 1,
      course_code: "CS101",
      course_name: "Introduction to Programming",
      credits: 3,
      professor: "Dr. Smith",
      schedule: "Mon 09:00-10:30",
      location: "Room 301",
      capacity: "40 students",
      english_class: true,
      semester: "Spring 2024",
      department: "Computer Science"
    },
    // Add more courses here with same structure
  ];

  const [courses, setCourses] = useState(mockCourses);

  // Handle search functionality
  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = mockCourses.filter(course => 
      course.course_name.toLowerCase().includes(value.toLowerCase()) ||
      course.course_code.toLowerCase().includes(value.toLowerCase()) ||
      course.professor.toLowerCase().includes(value.toLowerCase())
    );
    setCourses(filtered);
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    
    let filtered = mockCourses;
    if (newFilters.language) {
      filtered = filtered.filter(course => 
        course.english_class === (newFilters.language === 'english')
      );
    }
    if (newFilters.semester) {
      filtered = filtered.filter(course => 
        course.semester === newFilters.semester
      );
    }
    if (newFilters.department) {
      filtered = filtered.filter(course => 
        course.department === newFilters.department
      );
    }
    
    setCourses(filtered);
  };

  return (
    <div className="h-full w-full">
      <div className="w-full p-0">
        <h1 className="text-2xl font-semibold px-6 pt-6 pb-4">Available Courses</h1>
        
        


        const applyFilters = (currentFilters, search) => {
        let filtered = mockCourses;

        // Search filter
        if (search) {
        filtered = filtered.filter(course => 
            course.course_name.toLowerCase().includes(search.toLowerCase()) ||
            course.course_code.toLowerCase().includes(search.toLowerCase()) ||
            course.professor.toLowerCase().includes(search.toLowerCase())
        );
        }

        // Apply each filter
        if (currentFilters.language) {
        filtered = filtered.filter(course => 
            course.english_class === (currentFilters.language === 'english')
        );
        }
        if (currentFilters.semester) {
        filtered = filtered.filter(course => 
            course.semester === currentFilters.semester
        );
        }
        if (currentFilters.department) {
        filtered = filtered.filter(course => 
            course.department === currentFilters.department
        );
        }
        if (currentFilters.day) {
        filtered = filtered.filter(course => 
            course.day === currentFilters.day
        );
        }
        if (currentFilters.period) {
        filtered = filtered.filter(course => 
            course.period === currentFilters.period
        );
        }

        setCourses(filtered);
    };

        {/* Search and Filter Bar */}
        <div className="px-6 w-full flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Filters
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="px-6 mb-6">
            <div className="bg-white p-4 rounded-lg border space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  value={filters.language}
                  onChange={(e) => handleFilterChange('language', e.target.value)}
                  className="p-2 border rounded-lg w-full"
                >
                  <option value="">Language (All)</option>
                  <option value="english">English</option>
                  <option value="chinese">Chinese</option>
                </select>

                <select
                  value={filters.semester}
                  onChange={(e) => handleFilterChange('semester', e.target.value)}
                  className="p-2 border rounded-lg w-full"
                >
                  <option value="">Semester (All)</option>
                  <option value="Spring 2024">Spring 2024</option>
                  <option value="Fall 2024">Fall 2024</option>
                </select>

                <select
                  value={filters.department}
                  onChange={(e) => handleFilterChange('department', e.target.value)}
                  className="p-2 border rounded-lg w-full"
                >
                  <option value="">Department (All)</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Engineering">Engineering</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Course Grid */}
        <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.course_id}
              className="bg-white rounded-lg border overflow-hidden"
            >
              <div className="p-6">
                <div>
                  <h3 className="text-lg font-semibold">{course.course_name}</h3>
                  <p className="text-gray-600">
                    {course.course_code} • {course.credits} Credits
                  </p>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="grid grid-cols-[100px,1fr]">
                    <span className="text-gray-500">Professor:</span>
                    <span>{course.professor}</span>
                  </div>
                  <div className="grid grid-cols-[100px,1fr]">
                    <span className="text-gray-500">Schedule:</span>
                    <span>{course.schedule}</span>
                  </div>
                  <div className="grid grid-cols-[100px,1fr]">
                    <span className="text-gray-500">Location:</span>
                    <span>{course.location}</span>
                  </div>
                  <div className="grid grid-cols-[100px,1fr]">
                    <span className="text-gray-500">Capacity:</span>
                    <span>{course.capacity}</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {course.english_class && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      English
                    </span>
                  )}
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    {course.semester}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {course.department}
                  </span>
                </div>

                <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Add to My List
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}