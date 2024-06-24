import React from 'react';

interface Application {
  name: string;
  path: string;
  parameter: string;
  icon: string;
}

interface ApplicationIconProps {
  app: Application;
  launchApplication: (app: Application) => void;
}

export const ApplicationIcon: React.FC<ApplicationIconProps> = ({ app, launchApplication }) => {
  return (
    <div
      className="bg-white p-4 shadow hover:bg-gray-100 cursor-pointer rounded-2xl"
      onClick={() => launchApplication(app)}
    >
      <img src={app.icon} alt={app.name} className="w-full h-32 object-contain " />
      <p className="text-center mt-2">{app.name}</p>
    </div>
  );
};
