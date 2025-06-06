// components/Footer.tsx
const Footer = () => (
  <footer className="bg-gradient-to-r from-blue-500 to-violet-600 text-white mt-60">
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-3 w-[60%]">Event Mater</h2>
        <p className="text-sm opacity-80">
          Event Mater helps you plan and manage events effortlessly — from small meetups to large-scale festivals.
        </p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
        <p className="text-sm">Email: <a href="mailto:support@eventify.com" className="underline">support@eventify.com</a></p>
        <p className="text-sm mt-2">Phone: +91 98765 43210</p>
        <p className="text-sm mt-4 opacity-70">© {new Date().getFullYear()} Eventify. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
