import { Chakra_Petch } from "next/font/google";
// import "./globals.css";

const chakra = Chakra_Petch({ subsets: ["latin"], weight: ["300", "500"] });

export const metadata = {
  title: "My Notes App",
  description: "A web application for taking notes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={chakra.className}>{children}</body>
    </html>
  );
}
