import { useState } from 'react';
import { Search, X } from 'lucide-react';

export default function CourseList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [totalCredits, setTotalCredits] = useState(0);
  const [filters, setFilters] = useState({
    semester: '',
    department: '',
    language: '',
    credits: '',
    professor: '',
    scheduleDay: '',
    schedulePeriod: ''
  });

  // Example extended course data based on the curriculum
  const mockCourses = [
    {
      course_id: 1,
      course_code: "CSE2030",
      course_name: "Computer Programming I",
      credits: 3,
      professor: "Dr. Joo Ho Lee",
      schedule: "Tue, Thu 15:30-14:45",
      location: "AS 818",
      capacity: "40 students",
      english_class: true,
      semester: "Spring 2024",
      department: "Computer Science",
      weeklySchedule: [
        { week: 1, topic: "C Programming Overview", content: "Introduction. Writing, compiling, and debugging C programs. Hello world." },
        { week: 2, topic: "Variable, datatype and operators" },
        { week: 3, topic: "Function" },
        // ... more weeks
      ],
      description: "An introductory course to C programming language. Students will learn the required background knowledge, including memory management, pointers, preprocessor macros, and debugging skills.",
      prerequisites: "None",
      evaluation: {
        midterm: "30%",
        final: "30%",
        quizzes: "20%",
        assignments: "20%"
      }
    },
    {
        course_id: 1,
        course_code: "CSE2030",
        course_name: "Computer Programming I",
        credits: 3,
        professor: "Dr. Joo Ho Lee",
        schedule: "Tue, Thu 15:30-14:45",
        days: ["TUE", "THU"],
        period: "5",
        location: "AS 818",
        capacity: "40 students",
        current_enrolled: 35,
        english_class: true,
        semester: "Spring 2024",
        department: "Computer Science",
        classType: "lecture",
        academicLevel: "freshman",
        instructionType: "offline",
        examType: "traditional",
        prerequisites: "None",
        description: "An introductory course to C programming language. Students will learn the required background knowledge, including memory management, pointers, preprocessor macros, and debugging skills.",
        weeklySchedule: [
          { week: 1, topic: "C Programming Overview", content: "Introduction. Writing, compiling, and debugging C programs." },
          { week: 2, topic: "Variables and Operators", content: "Basic data types, operators, expressions" }
        ]
      },
      {
        course_id: 2,
        course_code: "CSE3090",
        course_name: "Programming Language",
        credits: 3,
        professor: "Dr. Sarah Kim",
        schedule: "Mon, Wed 10:30-12:00",
        days: ["MON", "WED"],
        period: "2",
        location: "AS 710",
        capacity: "35 students",
        current_enrolled: 30,
        english_class: true,
        semester: "Spring 2024",
        department: "Computer Science",
        classType: "lecture",
        academicLevel: "sophomore",
        instructionType: "hybrid",
        examType: "project",
        prerequisites: "CSE2030",
        description: "Study of programming language concepts and paradigms. Covers functional, object-oriented, and logic programming."
      },
      {
        course_id: 3,
        course_code: "CSE4070",
        course_name: "Operating Systems Lab",
        credits: 6,
        professor: "Dr. John Park",
        schedule: "Fri 13:30-18:00",
        days: ["FRI"],
        period: "4,5,6",
        location: "AS 915 Lab",
        capacity: "25 students",
        current_enrolled: 20,
        english_class: false,
        semester: "Spring 2024",
        department: "Computer Science",
        classType: "lab",
        academicLevel: "junior",
        instructionType: "offline",
        examType: "project",
        prerequisites: "CSE3080",
        description: "Hands-on experience with operating system implementation. Includes process management, memory management, and file systems."
      },
      {
        course_id: 4,
        course_code: "AIE2050",
        course_name: "Introduction to AI",
        credits: 3,
        professor: "Dr. Lisa Chen",
        schedule: "Mon, Wed 9:00-10:30",
        days: ["MON", "WED"],
        period: "1",
        location: "AS 620",
        capacity: "45 students",
        current_enrolled: 40,
        english_class: true,
        semester: "Spring 2024",
        department: "Artificial Intelligence",
        classType: "lecture",
        academicLevel: "freshman",
        instructionType: "online",
        examType: "mixed",
        prerequisites: "None",
        description: "Introduction to artificial intelligence concepts and applications. Covers basic ML algorithms and AI principles."
      },
      {
        course_id: 5,
        course_code: "CSE4050",
        course_name: "Computer Graphics",
        credits: 3,
        professor: "Dr. Michael Wong",
        schedule: "Tue, Thu 12:00-13:30",
        days: ["TUE", "THU"],
        period: "3",
        location: "AS 510",
        capacity: "30 students",
        current_enrolled: 25,
        english_class: true,
        semester: "Spring 2024",
        department: "Computer Science",
        classType: "lecture",
        academicLevel: "senior",
        instructionType: "offline",
        examType: "mixed",
        prerequisites: "CSE2030",
        description: "Fundamentals of computer graphics including 2D/3D rendering, transformation, and animation."
    }
  ];

  const [courses, setCourses] = useState(mockCourses);

  

  

  // Enhanced search function
  const handleSearch = (value) => {
    setSearchTerm(value);
    filterCourses(value, filters);
  };

  // Enhanced filter function
  const filterCourses = (search, currentFilters) => {
    let filtered = mockCourses.filter(course => {
      const searchMatch = search.toLowerCase() === '' || 
      course.course_name.toLowerCase().includes(searchValue.toLowerCase()) ||
      course.course_code.toLowerCase().includes(searchValue.toLowerCase()) ||
      course.professor.toLowerCase().includes(searchValue.toLowerCase()) ||
      course.description.toLowerCase().includes(searchValue.toLowerCase())

      const filterMatch = 
        (currentFilters.semester === '' || course.semester === currentFilters.semester) &&
        (currentFilters.department === '' || course.department === currentFilters.department) &&
        (currentFilters.credits === '' || course.credits.toString() === currentFilters.credits) &&
        (currentFilters.professor === '' || course.professor === currentFilters.professor) &&
        (currentFilters.language === '' || 
          (currentFilters.language === 'english' ? course.english_class : !course.english_class));

      return searchMatch && filterMatch;
    });

    setCourses(filtered);
  };

  // Course detail modal
  const CourseDetailModal = ({ course, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{course.course_name}</h2>
              <p className="text-gray-600">{course.course_code} • {course.credits} Credits</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={24} />
            </button>
          </div>

          {/* Course Details */}
          <div className="space-y-6">
            <section>
              <h3 className="font-semibold text-lg mb-2">Course Description</h3>
              <p>{course.description}</p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">Prerequisites</h3>
              <p>{course.prerequisites}</p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">Evaluation</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(course.evaluation).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="capitalize">{key}:</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">Weekly Schedule</h3>
              <div className="space-y-2">
                {course.weeklySchedule.map((week) => (
                  <div key={week.week} className="border-b pb-2">
                    <div className="font-medium">Week {week.week}: {week.topic}</div>
                    {week.content && <div className="text-sm text-gray-600">{week.content}</div>}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full bg-white">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Available Courses</h1>
          <div className="text-sm text-blue-600">
            Total Credits: {totalCredits} / 21 (Minimum: 9)
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Filters
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <select
                value={filters.semester}
                onChange={(e) => setFilters({...filters, semester: e.target.value})}
                className="p-2 border rounded-lg"
              >
                <option value="">Semester (All)</option>
                <option value="Spring 2024">Spring 2024</option>
                <option value="Fall 2024">Fall 2024</option>
              </select>

              <select
                value={filters.credits}
                onChange={(e) => setFilters({...filters, credits: e.target.value})}
                className="p-2 border rounded-lg"
              >
                <option value="">Credits (All)</option>
                <option value="1">1 Credit</option>
                <option value="3">3 Credits</option>
                <option value="6">6 Credits</option>
              </select>

              <select
                value={filters.language}
                onChange={(e) => setFilters({...filters, language: e.target.value})}
                className="p-2 border rounded-lg"
              >
                <option value="">Language (All)</option>
                <option value="english">English</option>
                <option value="korean">Korean</option>
              </select>

              <select
                value={filters.department}
                onChange={(e) => setFilters({...filters, department: e.target.value})}
                className="p-2 border rounded-lg"
              >
                <option value="">Department (All)</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
              </select>
            </div>
          </div>
        )}

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.course_id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {course.course_name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {course.course_code} • {course.credits} Credits
                </p>

                <div className="space-y-2 mb-4">
                  <div className="grid grid-cols-[auto,1fr] gap-x-8">
                    <span className="text-gray-500">Professor:</span>
                    <span className="text-gray-900">{course.professor}</span>
                  </div>
                  <div className="grid grid-cols-[auto,1fr] gap-x-8">
                    <span className="text-gray-500">Schedule:</span>
                    <span className="text-gray-900">{course.schedule}</span>
                  </div>
                  <div className="grid grid-cols-[auto,1fr] gap-x-8">
                    <span className="text-gray-500">Location:</span>
                    <span className="text-gray-900">{course.location}</span>
                  </div>
                  <div className="grid grid-cols-[auto,1fr] gap-x-8">
                    <span className="text-gray-500">Capacity:</span>
                    <span className="text-gray-900">{course.capacity}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {course.english_class && (
                    <span className="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-600">
                      English
                    </span>
                  )}
                  <span className="px-3 py-1 text-sm rounded-full bg-purple-50 text-purple-600">
                    {course.semester}
                  </span>
                  <span className="px-3 py-1 text-sm rounded-full bg-green-50 text-green-600">
                    {course.department}
                  </span>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="w-full py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    See More
                  </button>
                  <button
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add to My List
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Course Detail Modal */}
        {selectedCourse && (
          <CourseDetailModal 
            course={selectedCourse} 
            onClose={() => setSelectedCourse(null)} 
          />
        )}
      </div>
    </div>
  );
}