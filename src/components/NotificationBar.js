import Image from "next/image";

export default function NotificationBar() {
  return (
    <div className="bg-gray-800 text-gray-300 py-0 px-4 md:px-8">
      <div className="container mx-auto flex flex-wrap justify-center md:justify-between items-center gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <Image
            src="/1961.jpg"
            alt="Herts 1961 League Logo"
            width={30}
            height={30}
            className="h-8 w-8 object-contain rounded-full"
          />
          <span className="hidden md:inline">Herts 1961 League</span>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src="/full-time.png"
            alt="Full Time Logo"
            width={70}
            height={70}
            className="h-20 w-20 object-contain"
          />
          <Image
            src="/england.png"
            alt="England FA Logo"
            width={30}
            height={30}
            className="h-10 w-10 object-contain"
          />
          <span className="hidden md:inline">Part of the English FA</span>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src="/uefa.webp"
            alt="UEFA Logo"
            width={30}
            height={30}
            className="h-8 w-8 object-contain"
          />
          <span className="hidden md:inline">Certified UEFA Coached Club</span>
        </div>
      </div>
    </div>
  );
}
