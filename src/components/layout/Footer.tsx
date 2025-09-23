const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-6 sm:py-8 mt-12 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-gray-600">
          <span className="font-semibold text-gray-900 text-base sm:text-sm order-first w-full sm:w-auto text-center sm:text-left">
            Ozvia Travel
          </span>
          <a href="#" className="hover:text-gray-900 transition-colors touch-manipulation py-2">
            Şartlar ve Koşullar
          </a>
          <a href="#" className="hover:text-gray-900 transition-colors touch-manipulation py-2">
            Gizlilik Politikası
          </a>
          <a href="#" className="hover:text-gray-900 transition-colors touch-manipulation py-2">
            Çerez Tercihleri
          </a>
          <a href="#" className="hover:text-gray-900 transition-colors touch-manipulation py-2">
            Bize Ulaşın
          </a>
          <a href="#" className="hover:text-gray-900 transition-colors touch-manipulation py-2">
            Bir Hata Bildirin
          </a>
          <span className="text-gray-500 text-xs sm:text-sm mt-4 sm:mt-0 w-full sm:w-auto text-center">
            © Ozvia Travel, 2025
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;