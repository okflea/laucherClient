import React, { useState } from 'react';
import './App.css'; // TailwindCSS styles
import { useQuery } from '@tanstack/react-query';
import { ApplicationIcon } from './Components/ApplicationIcon';
import { SettingsPage } from './Components/Settings';
import { toast } from 'sonner';
import { SystemInfo } from './Components/SystemInfo';

interface Application {
  name: string;
  path: string;
  parameter: string;
  icon: string;
}
const url = import.meta.env.VITE_SERVER_URL

const fetchApplications = async (): Promise<Application[]> => {
  const res = await fetch(`http://${url}:3000/applications`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

const App: React.FC = () => {

  const { data, error, isLoading } = useQuery<Application[]>({
    queryKey: ['applications'],
    queryFn: fetchApplications,
  });
  const [runningApp, setRunningApp] = useState<Application | null>(null);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const launchApplication = async (app: Application) => {
    try {

      setRunningApp(app);
      const response = await fetch(`http://${url}:3000/launch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path: app.path, parameters: app.parameter }),
      });

      if (!response.ok) {
        toast.error('Failed to launch application');
        throw new Error('Failed to launch application');
      }

      setRunningApp(app);
    } catch (error) {
      console.error('Error launching application:', error);

      setRunningApp(null);
    }
  };

  const quitApplication = async () => {
    try {
      if (runningApp) {
        const response = await fetch(`http://${url}:3000/launch/quit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ application: runningApp.path }),
        });
        if (!response.ok) {
          toast.error('Failed to quit application');
          throw new Error('Failed to quit application');
        }
        toast.success('Application quit successfully');
        setRunningApp(null);
      }
    } catch (error) {
      setRunningApp(null);
      console.error('Error quitting application:', error);
    }
  };

  // useEffect(() => {
  //   console.log("runningApp", runningApp)
  // }, [runningApp])

  return (
    <div className="min-h-[93vh] bg-slate-100 p-4 rounded-2xl">
      {/* <h1 className="text-3xl font-bold underline text-center mb-4"> */}
      {/*   App Launcher */}
      {/* </h1> */}
      <SystemInfo />
      {error && <p className="text-red-500 text-center">Error loading applications</p>}
      {isLoading && <p className="text-center">Loading...</p>}
      {!showSettings && !runningApp && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.map((app) => (
            <ApplicationIcon key={app.name} app={app} launchApplication={launchApplication} />
          ))}
        </div>
      )}
      {!showSettings && runningApp && (
        <div className="flex flex-col items-center">
          <p className="text-xl mb-4">Running: {runningApp.name}</p>
          <button
            onClick={quitApplication}
            className="m-2 bg-red-500 text-white px-4 py-2 rounded-2xl shadow-md hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Quit {runningApp.name}
          </button>
        </div>
      )}

      {showSettings && (
        <SettingsPage
          applications={data}
          onClose={() => setShowSettings(false)}
        />
      )}
      {!showSettings && (

        <button
          onClick={() => setShowSettings(true)}
          className="m-2 bg-blue-500 text-white px-4 py-2 rounded-2xl shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Settings
        </button>
      )}
    </div>
  );
};

export default App;
