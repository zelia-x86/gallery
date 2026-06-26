export default function Floatbox ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-transparent animate-fade-in">
      {children}
    </div>
  )
}
