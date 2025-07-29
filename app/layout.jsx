import "./globals.css";
import NavBar from "./_components/navbar";
import { UserProvider } from "./_context/UserContext";
import { Toaster } from "react-hot-toast";



export const metadata = {
  title: 'SConfirmation',
  description: 'SConfirmation',
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
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
