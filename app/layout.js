export const metadata = {
  title: "Next.js File Hosting App",
  description: "A simple file hosting application built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
