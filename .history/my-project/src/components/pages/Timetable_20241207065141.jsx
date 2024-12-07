// Change this line
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Loader, Plus, X, Calendar } from "lucide-react";
import CourseList from "./CourseList"; 
import CourseList from './CourseList';  // Update import path

// Add the JSX return content
return (
  <div className="p-6 max-w-7xl mx-auto">
    {/* Header */}
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold">Timetable</h1>
      <button
        onClick={assembleTimetable}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        <Calendar size={20} />
        Generate Timetable
      </button>
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
                    c => c.day === day && c.startTime <= time && c.endTime > time
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
          <div
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
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Timetable;