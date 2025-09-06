export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto py-3 w-full">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Blog App. All rights reserved.</p>
      </div>
    </footer>
  );
}
