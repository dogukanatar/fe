import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, Loader } from 'lucide-react';

const CourseList = ({ onAddCourse }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: 'all',
    level: 'all',
    semester: 'all'
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async (course) => {
    try {
      await axios.post('/api/mylist/add', {
        courseId: course.course_id,
        listId: 'default'
      });
      onAddCourse?.(course);
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => document.getElementById('filterModal')?.showModal()}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Filter size={20} />
            Filters
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader className="animate-spin text-blue-500" size={32} />
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-600">{error}</div>
      ) : filteredCourses.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <div
              key={course.course_id}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-white"
            >
              <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{course.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {course.department} • {course.credits} credits
                </span>
                <button
                  onClick={() => handleAddCourse(course)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add to List
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No courses found
        </div>
      )}

      <dialog id="filterModal" className="modal p-6 rounded-lg shadow-xl">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Filter Courses</h2>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Department</label>
            <select
              className="w-full p-2 border rounded"
              value={filters.department}
              onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
            >
              <option value="all">All Departments</option>
              <option value="CS">Computer Science</option>
              <option value="MATH">Mathematics</option>
              <option value="PHYS">Physics</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Level</label>
            <select
              className="w-full p-2 border rounded"
              value={filters.level}
              onChange={(e) => setFilters(prev => ({ ...prev, level: e.target.value }))}
            >
              <option value="all">All Levels</option>
              <option value="100">100 Level</option>
              <option value="200">200 Level</option>
              <option value="300">300 Level</option>
              <option value="400">400 Level</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={() => document.getElementById('filterModal')?.close()}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                document.getElementById('filterModal')?.close();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CourseList;