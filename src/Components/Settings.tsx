import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'sonner';

interface Application {
  name: string;
  path: string;
  parameter: string;
  icon: string;
}

interface SettingsPageProps {
  applications: Application[] | undefined;
  onClose: () => void;
}
const url = import.meta.env.VITE_SERVER_URL

export const SettingsPage: React.FC<SettingsPageProps> = ({ applications, onClose }) => {
  const [appList, setAppList] = useState<Application[]>(applications || []);
  const [newApp, setNewApp] = useState<Application>({ name: '', path: '', parameter: '', icon: '' });
  const qc = useQueryClient()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const updatedApps = [...appList];
    updatedApps[index] = { ...updatedApps[index], [name]: value };
    setAppList(updatedApps);
  };

  const handleNewAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewApp({ ...newApp, [name]: value });
  };

  const addNewApp = async () => {
    try {
      const response = await fetch(`http://${url}:3000/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newApp),
      });
      if (!response.ok) {
        toast.error('Failed to add application');
        throw new Error('Failed to add application');
      } else {
        toast.success('Application added successfully');
      }
      setAppList([...appList, newApp]);
      setNewApp({ name: '', path: '', parameter: '', icon: '' });
      qc.invalidateQueries({ queryKey: ['applications'] })
    } catch (error) {
      console.error('Error adding application:', error);
    }
  };

  const updateApp = async (index: number) => {
    try {
      const appToUpdate = appList[index];
      const response = await fetch(`http://${url}:3000/applications/${index}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appToUpdate),
      });
      if (!response.ok) {
        toast.error('Failed to update application');
        throw new Error('Failed to update application');
      } else {
        toast.success('Application updated successfully');
      }
      setAppList([...appList]);
      qc.invalidateQueries({ queryKey: ['applications'] })
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  const removeApp = async (index: number) => {
    try {
      const response = await fetch(`http://${url}:3000/applications/${index}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        toast.error('Failed to remove application');
        throw new Error('Failed to remove application');
      } else {
        toast.success('Application removed successfully');
      }
      const updatedApps = appList.filter((_, i) => i !== index);
      setAppList(updatedApps);
    } catch (error) {
      console.error('Error removing application:', error);
    }
  };

  const saveChanges = async () => {
    try {
      await Promise.all(appList.map((_, index) => updateApp(index)));
      onClose();
    } catch (error) {
      console.error('Error saving applications:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <button
        onClick={onClose}
        className="m-2 bg-gray-500 text-white px-4 py-2 rounded-2xl shadow-md hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Close
      </button>
      <div className="mb-4">
        {appList.map((app, index) => (
          <div key={index} className="mb-2 p-4 border rounded-2xl">
            <input
              className="border p-2 mb-2 w-full rounded-lg"
              type="text"
              name="name"
              placeholder="Name"
              value={app.name}
              onChange={(e) => handleInputChange(e, index)}
            />
            <input
              className="border p-2 mb-2 w-full rounded-lg"
              type="text"
              name="path"
              placeholder="Path"
              value={app.path}
              onChange={(e) => handleInputChange(e, index)}
            />
            <input
              className="border p-2 mb-2 w-full rounded-lg"
              type="text"
              name="parameter"
              placeholder="Parameter"
              value={app.parameter}
              onChange={(e) => handleInputChange(e, index)}
            />
            <input
              className="border p-2 mb-2 w-full rounded-lg"
              type="text"
              name="icon"
              placeholder="Icon URL"
              value={app.icon}
              onChange={(e) => handleInputChange(e, index)}
            />
            <div className="flex gap-2">
              <button
                onClick={() => updateApp(index)}
                className="m-2 bg-yellow-500 text-white px-4 py-2 rounded-2xl shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Update
              </button>
              <button
                onClick={() => removeApp(index)}
                className="m-2 bg-red-500 text-white px-4 py-2 rounded-2xl shadow-md hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-4 p-4 border rounded-2xl">
        <h3 className="text-lg font-bold mb-2">Add New Application</h3>
        <input
          className="border p-2 mb-2 w-full rounded-lg"
          type="text"
          name="name"
          placeholder="Name"
          value={newApp.name}
          onChange={handleNewAppChange}
        />
        <input
          className="border p-2 mb-2 w-full rounded-lg"
          type="text"
          name="path"
          placeholder="Path"
          value={newApp.path}
          onChange={handleNewAppChange}
        />
        <input
          className="border p-2 mb-2 w-full rounded-lg"
          type="text"
          name="parameter"
          placeholder="Parameter"
          value={newApp.parameter}
          onChange={handleNewAppChange}
        />
        <input
          className="border p-2 mb-2 w-full rounded-lg"
          type="text"
          name="icon"
          placeholder="Icon URL"
          value={newApp.icon}
          onChange={handleNewAppChange}
        />
        <button
          onClick={addNewApp}
          className="m-2 bg-green-500 text-white px-4 py-2 rounded-2xl shadow-md hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Add Application
        </button>
      </div>
      <button
        onClick={saveChanges}
        className="m-2 bg-blue-500 text-white px-4 py-2 rounded-2xl shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Save Changes
      </button>
    </div>
  );
};
