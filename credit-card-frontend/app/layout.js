import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "CreditAI - AI-Powered Credit Approval Predictor",
  description: "Experience the future of credit assessment with our advanced machine learning algorithm. Get instant, accurate predictions in seconds.",
  keywords: "credit approval, AI, machine learning, credit assessment, financial technology",
  authors: [{ name: "CreditAI Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
