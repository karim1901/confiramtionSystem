import "./globals.css";
import NavBar from "./_components/navbar";
import { UserProvider } from "./_context/UserContext";
import { Toaster } from "react-hot-toast";



export const metadata = {
  title: 'SConfirmation',
  description: 'SConfirmation',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/svg+xml" href="/icons/icon.png" />
      </head>
      <body >
          <UserProvider>
          <NavBar />
          {children}
        <Toaster/>


        </UserProvider>
      </body>
    </html>
  );
}
