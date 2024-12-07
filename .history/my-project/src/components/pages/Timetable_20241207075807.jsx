import React, { useState, useEffect } from 'react';
import { Plus, X, Loader, Calendar } from 'lucide-react';
import { Button } from '../common/Button';
import Card from '../common/Card';

const Timetable = () => {
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [myListCourses, setMyListCourses] = useState([
    { id: 1, title: 'Introduction to Programming', time: '9:00-10:30', days: ['Monday', 'Wednesday'] },
    { id: 2, title: 'Data Structures', time: '11:00-12:30', days: ['Tuesday', 'Thursday'] },
    { id: 3, title: 'Web Development', time: '14:00-15:30', days: ['Monday', 'Wednesday'] }
  ]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = Array.from({ length: 13 }, (_, i) => i + 8);

  const assembleTimetable = async () => {
    setLoading(true);
    try {
      // Simulated API call for timetable generation
      const generatedTimetable = {
        classes: myListCourses.map(course => ({
          id: course.id,
          courseName: course.title,
          days: course.days,
          startTime: parseInt(course.time.split('-')[0]),
          endTime: parseInt(course.time.split('-')[1])
        }))
      };
      
      setTimetable(generatedTimetable);
      // In production: await axios.post('/api/timetable/assemble', { courses: myListCourses });
    } catch (error) {
      setError('Failed to generate timetable');
    } finally {
      setLoading(false);
    }
  };

  const addClass = async (courseId) => {
    try {
      // In production: await axios.post('/api/timetable/add', { courseId });
      const courseToAdd = myListCourses.find(c => c.id === courseId);
      if (courseToAdd && timetable) {
        setTimetable({
          ...timetable,
          classes: [...timetable.classes, {
            id: courseToAdd.id,
            courseName: courseToAdd.title,
            days: courseToAdd.days,
            startTime: parseInt(courseToAdd.time.split('-')[0]),
            endTime: parseInt(courseToAdd.time.split('-')[1])
          }]
        });
      }
    } catch (error) {
      console.error('Error adding class:', error);
    }
  };

  const removeClass = async (classId) => {
    try {
      // In production: await axios.delete('/api/timetable/remove', { data: { classId } });
      if (timetable) {
        setTimetable({
          ...timetable,
          classes: timetable.classes.filter(c => c.id !== classId)
        });
      }
    } catch (error) {
      console.error('Error removing class:', error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Timetable</h1>
        <Button
          onClick={assembleTimetable}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Calendar size={20} />
          Generate Timetable
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader className="animate-spin text-blue-500" size={32} />
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-600">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2 bg-gray-50">Time</th>
                {days.map(day => (
                  <th key={day} className="border p-2 bg-gray-50">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map(time => (
                <tr key={time}>
                  <td className="border p-2 bg-gray-50">
                    {time}:00 - {time + 1}:00
                  </td>
                  {days.map(day => {
                    const class_ = timetable?.classes?.find(
                      c => c.days.includes(day) && c.startTime <= time && c.endTime > time
                    );
                    
                    return (
                      <td
                        key={`${day}-${time}`}
                        className={`border p-2 ${
                          class_ ? 'bg-blue-50' : ''
                        }`}
                      >
                        {class_ && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm">{class_.courseName}</span>
                            <button
                              onClick={() => removeClass(class_.id)}
                              className="text-red-400 hover:text-red-600"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Available Courses */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Available Courses</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {myListCourses.map(course => (
            <Card
              key={course.id}
              className="p-4 border rounded-lg bg-white"
            >
              <div className="flex justify-between items-center">
                <span>{course.title}</span>
                <button
                  onClick={() => addClass(course.id)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <Plus size={20} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timetable;