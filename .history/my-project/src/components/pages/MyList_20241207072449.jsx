import React, { useState, useEffect } from 'react';
import { Plus, Trash, Loader, List } from 'lucide-react';

const MyList = () => {
  const [lists, setLists] = useState([]);  // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newListName, setNewListName] = useState('');

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      setLoading(true);
      // Using dummy data instead of API call
      const dummyLists = [
        {
          id: 1,
          name: "Fall 2024",
          courses: [
            { id: 1, title: "Introduction to Programming" },
            { id: 2, title: "Data Structures" }
          ]
        },
        {
          id: 2,
          name: "Spring 2024",
          courses: [
            { id: 3, title: "Web Development" }
          ]
        }
      ];
      
      setLists(dummyLists);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to load lists');
    } finally {
      setLoading(false);
    }
  };

  const createNewList = () => {
    if (!newListName.trim()) return;
    
    const newList = {
      id: lists.length + 1,
      name: newListName,
      courses: []
    };
    
    setLists([...lists, newList]);
    setNewListName('');
    document.getElementById('newListModal')?.close();
  };

  const removeCourse = (listId, courseId) => {
    setLists(lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          courses: list.courses.filter(course => course.id !== courseId)
        };
      }
      return list;
    }));
  };

  const deleteList = (listId) => {
    setLists(lists.filter(list => list.id !== listId));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Lists</h1>
        <button
          onClick={() => document.getElementById('newListModal')?.showModal()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus size={20} />
          New List
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader className="animate-spin text-blue-500" size={32} />
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-600">{error}</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lists.map((list) => (
            <div key={list.id} className="border rounded-lg bg-white p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{list.name}</h3>
                <button
                  onClick={() => deleteList(list.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash size={18} />
                </button>
              </div>
              
              {list.courses?.length > 0 ? (
                <ul className="space-y-2">
                  {list.courses.map((course) => (
                    <li 
                      key={course.id}
                      className="flex justify-between items-center p-2 bg-gray-50 rounded"
                    >
                      <span className="text-sm">{course.title}</span>
                      <button
                        onClick={() => removeCourse(list.id, course.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                  <List size={24} />
                  <p className="mt-2 text-sm">No courses added yet</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* New List Modal */}
      <dialog id="newListModal" className="modal p-6 rounded-lg shadow-xl bg-white">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Create New List</h2>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">List Name</label>
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter list name..."
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => document.getElementById('newListModal')?.close()}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={createNewList}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={!newListName.trim()}
            >
              Create List
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyList;