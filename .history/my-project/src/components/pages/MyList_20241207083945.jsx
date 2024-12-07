import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Download, Edit2, Calendar, CheckCircle } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const MyList = () => {
  const [lists, setLists] = useState([
    {
      id: 1,
      name: "Fall 2024",
      courses: [
        { id: 1, code: "CS101", title: "Intro to Programming", credits: 3, schedule: "MWF 10:00-11:15" },
        { id: 2, code: "CS201", title: "Data Structures", credits: 4, schedule: "TTH 13:00-14:15" }
      ],
      schedules: [
        { id: 1, name: "Schedule A", courses: [/* courses */], lastModified: new Date() },
        { id: 2, name: "Schedule B", courses: [/* courses */], lastModified: new Date() }
      ]
    }
  ]);
  const [editingName, setEditingName] = useState(null);
  const [newName, setNewName] = useState('');
  const [selectedList, setSelectedList] = useState(1);

  const createNewList = () => {
    const newList = {
      id: lists.length + 1,
      name: `New List ${lists.length + 1}`,
      courses: [],
      schedules: []
    };
    setLists([...lists, newList]);
    setSelectedList(newList.id);
  };

  const deleteList = (listId) => {
    setLists(lists.filter(list => list.id !== listId));
    if (selectedList === listId) {
      setSelectedList(lists[0]?.id);
    }
  };

  const createNewSchedule = (listId) => {
    const updatedLists = lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          schedules: [...list.schedules, {
            id: list.schedules.length + 1,
            name: `Schedule ${list.schedules.length + 1}`,
            courses: list.courses,
            lastModified: new Date()
          }]
        };
      }
      return list;
    });
    setLists(updatedLists);
  };

  const deleteSchedule = (listId, scheduleId) => {
    setLists(lists.map(list => 
      list.id === listId 
        ? { ...list, schedules: list.schedules.filter(s => s.id !== scheduleId) }
        : list
    ));
  };

  const renameSchedule = (listId, scheduleId, newName) => {
    setLists(lists.map(list =>
      list.id === listId
        ? {
            ...list,
            schedules: list.schedules.map(schedule =>
              schedule.id === scheduleId
                ? { ...schedule, name: newName }
                : schedule
            )
          }
        : list
    ));
  };

  const exportSchedulePDF = (schedule, listName) => {
    const content = document.createElement('div');
    content.innerHTML = `
      <h2 style="text-align: center; margin-bottom: 20px;">${listName} - ${schedule.name}</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px;">Code</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Title</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Credits</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Schedule</th>
          </tr>
        </thead>
        <tbody>
          ${schedule.courses.map(course => `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">${course.code}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${course.title}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${course.credits}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${course.schedule}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <p style="margin-top: 20px;">Last modified: ${new Date(schedule.lastModified).toLocaleString()}</p>
    `;

    const opt = {
      margin: 1,
      filename: `${listName}-${schedule.name}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(content).save();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Lists</h1>
        <button
          onClick={createNewList}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus size={20} />
          New List
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Lists Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {lists.map(list => (
            <div
              key={list.id}
              className={`p-4 border rounded-lg ${selectedList === list.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
            >
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setSelectedList(list.id)}
                  className="text-lg font-medium"
                >
                  {list.name}
                </button>
                <div className="flex items-center gap-2">
                  <button onClick={() => setEditingName(list.id)} className="text-gray-500 hover:text-blue-500">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => deleteList(list.id)} className="text-gray-500 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {list.courses.length} courses, {list.schedules.length} schedules
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {lists.find(l => l.id === selectedList) && (
            <>
              {/* Schedules */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Schedules</h2>
                  <button
                    onClick={() => createNewSchedule(selectedList)}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    <Calendar size={18} />
                    New Schedule
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {lists.find(l => l.id === selectedList)?.schedules.map(schedule => (
                    <div key={schedule.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{schedule.name}</h3>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => exportSchedulePDF(schedule, lists.find(l => l.id === selectedList).name)}
                            className="text-gray-500 hover:text-blue-500"
                          >
                            <Download size={16} />
                          </button>
                          <button
                            onClick={() => deleteSchedule(selectedList, schedule.id)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {schedule.courses.length} courses
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Last modified: {new Date(schedule.lastModified).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Courses */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Courses</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left p-3 border-b">Code</th>
                        <th className="text-left p-3 border-b">Title</th>
                        <th className="text-left p-3 border-b">Credits</th>
                        <th className="text-left p-3 border-b">Schedule</th>
                        <th className="text-right p-3 border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lists.find(l => l.id === selectedList)?.courses.map(course => (
                        <tr key={course.id} className="hover:bg-gray-50">
                          <td className="p-3 border-b">{course.code}</td>
                          <td className="p-3 border-b">{course.title}</td>
                          <td className="p-3 border-b">{course.credits}</td>
                          <td className="p-3 border-b">{course.schedule}</td>
                          <td className="p-3 border-b text-right">
                            <button className="text-red-500 hover:text-red-600">
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyList;