# App Launcher(Client)

## Instructions

### Installation

1. **Server Setup:**
   - Navigate to the server directory: `cd server`
   - Install dependencies: `npm install`

2. **Client Setup:**
   - Navigate to the client directory: `cd client`
   - Install dependencies: `npm install`

### Running the Application

1. **Start the Server:**
   - In the server root directory, run: `node app.js`
   - Ensure port 3000 is exposed in your firewall settings. [Learn how to open a port on Windows Firewall](https://www.howtogeek.com/394735/how-do-i-open-a-port-on-windows-firewall/).

2. **Start the Client:**
   - In the client directory, run: `npm run dev`
   - Ensure port 5173 is exposed in your firewall settings. [Learn how to open a port on Windows Firewall](https://www.howtogeek.com/394735/how-do-i-open-a-port-on-windows-firewall/).

### Configuration

- Update the `.env` file in the client with the IP address of your Windows machine. You can find the IP address by running `ipconfig` in PowerShell and using the IPv4 address.

### Additional Notes

- Make sure both ports 5173 (client) and 3000 (server) are allowed through any firewalls or network configurations to ensure proper functionality of the application.

## Features

- **App Launcher Interface**: Browse and launch applications on a Windows machine from any device on the network.
- **Settings Page**: Manage application details like path, parameters, and icons.
- **System Information**: View system details such as architecture, platform, memory usage, and more.
- **Responsive Design**: Accessible from various devices including Windows, macOS, Android, and iOS.
- **User-Friendly Interface**: Intuitive UI with interactive elements for easy navigation and operation.

## Technologies Used

- **Backend**: Node.js, Express
- **Frontend**: React.js, TypeScript, Tailwind CSS
- **Data Handling**: JSON file storage
- **External APIs**: logo.dev for fetching application icons
- **Additional Libraries**: react-query for data fetching, react-circular-progressbar for memory usage visualization

## Possible Enhancements

- **Authentication and Authorization**: Secure access to the app launcher and settings page.
- **Enhanced Settings Management**: Sorting, filtering, and pagination of applications.
- **Real-Time Updates**: Implement WebSocket for real-time application status updates.
- **User Profiles**: Allow users to save their preferred applications and settings.
- **Integration Testing**: Implement automated tests to ensure app stability.
- **Deployment**: Dockerize the application for easier deployment and scaling.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
