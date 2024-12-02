import './globals.css';
import { GeistSans } from 'geist/font';
import { Navbar } from '@/components/navbar';

export const metadata = {
  title: 'YouTube Gaming Trends',
  description: 'Interactive visualization of YouTube gaming trends and statistics',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="min-h-screen bg-background font-sans text-foreground">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}