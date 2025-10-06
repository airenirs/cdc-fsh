import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Beranda', path: '/' },
    { name: 'Isi Tracert Study', path: 'https://cdc.uinsgd.ac.id/tracer_study/' },
    { name: 'Lowongan', path: '/lowongan' },
    { name: 'Magang', path: '/magang' },
    {
      name: 'Resource',
      path: '/resource',
      submenu: [
        { name: 'Acara & Pelatihan', path: '/resource/acara-pelatihan' },
        { name: 'Mitra Perusahaan', path: '/resource/mitra-perusahaan' },
        { name: 'Networking Alumni', path: '/resource/networking-alumni' },
      ]
    },
    { name: 'Hubungi Kami', path: '/hubungi-kami' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/Logo-uinsgd_official.png"
              alt="Logo UIN SGD"
              className="h-12 w-12"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-primary">Career Development Center</span>
              <span className="text-xs text-muted-foreground">FSH UIN Sunan Gunung Djati</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.path} className="relative group">
                <Link
                  to={item.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-primary bg-accent'
                      : 'text-foreground hover:text-primary hover:bg-accent/50'
                  }`}
                >
                  {item.name}
                </Link>
                {item.submenu && (
                  <div className="absolute left-0 mt-1 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white border rounded-md shadow-lg">
                    <div className="py-2">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.path}
                          to={subitem.path}
                          className={`block px-4 py-2 text-sm transition-colors ${
                            isActive(subitem.path)
                              ? 'text-primary bg-accent font-medium'
                              : 'text-foreground hover:text-primary hover:bg-accent/50'
                          }`}
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <div key={item.path}>
                  <Link
                    to={item.path}
                    className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'text-primary bg-accent'
                        : 'text-foreground hover:text-primary hover:bg-accent/50'
                    }`}
                    onClick={() => !item.submenu && setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.path}
                          to={subitem.path}
                          className={`block px-4 py-2 rounded-md text-sm transition-colors ${
                            isActive(subitem.path)
                              ? 'text-primary bg-accent font-medium'
                              : 'text-foreground hover:text-primary hover:bg-accent/50'
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
