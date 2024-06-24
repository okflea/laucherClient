import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface SystemInfo {
  architecture: string;
  platform: string;
  cpus: any[];
  freeMemory: number;
  totalMemory: number;
  uptime: number;
  hostname: string;
  networkInterfaces: any;
  currentDateTime: string;
}
const url = import.meta.env.VITE_SERVER_URL

const formatBytes = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
};

const formatUptime = (seconds: number) => {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${days}d ${hours}h ${minutes}m`;
};

export const SystemInfo: React.FC = () => {
  const { data, error, isLoading, refetch, isFetching } = useQuery<SystemInfo>({
    queryKey: ['systemInfo'],
    queryFn: async () => {
      const res = await fetch(`http://${url}:3000/systemInfo`);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading system information</p>;

  const totalMemory = data?.totalMemory ?? 0;
  const freeMemory = data?.freeMemory ?? 0;
  const memoryUsage = totalMemory > 0 ? ((totalMemory - freeMemory) / totalMemory) * 100 : 0;

  return (
    <div className="p-6 bg-white shadow rounded-2xl my-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Hi there</h2>
        <button
          onClick={() => refetch()}
          className="m-2 bg-gray-500 text-white px-4 py-2 rounded-2xl shadow-md hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 transition duration-300 ease-in-out transform hover:scale-105"
          disabled={isFetching}
        >
          Refresh
        </button>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-1/3 p-2">
          <CircularProgressbar
            value={memoryUsage}
            text={`${Math.round(memoryUsage)}%`}
            styles={buildStyles({
              textSize: '12px',
              pathColor: '#3498db',
              textColor: '#3498db',
              trailColor: '#d6d6d6',
            })}
          />
          <p className="text-center mt-2">RAM Usage</p>
        </div>
        <div className="w-2/3 p-2">
          <ul className="list-disc list-inside text-left ">
            <li><strong>Architecture:</strong> {data?.architecture}</li>
            <li><strong>Platform:</strong> {data?.platform}</li>
            <li><strong>Hostname:</strong> {data?.hostname}</li>
            <li><strong>Total Memory:</strong> {formatBytes(totalMemory)}</li>
            <li><strong>Uptime:</strong> {formatUptime(data?.uptime || 0)}</li>
            <li><strong>CPUs:</strong> {data?.cpus.length}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
