const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
          <span className="font-semibold text-gray-900">Ozvia Travel</span>
          <a href="#" className="hover:text-gray-900 transition-colors">
            Şartlar ve Koşullar
          </a>
          <a href="#" className="hover:text-gray-900 transition-colors">
            Gizlilik Politikası
          </a>
          <a href="#" className="hover:text-gray-900 transition-colors">
            Çerez Tercihleri
          </a>
          <a href="#" className="hover:text-gray-900 transition-colors">
            Bize Ulaşın
          </a>
          <a href="#" className="hover:text-gray-900 transition-colors">
            Bir Hata Bildirin
          </a>
          <span className="text-gray-500">
            © Ozvia Travel, 2025
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;