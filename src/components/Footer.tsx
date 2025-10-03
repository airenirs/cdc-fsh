import { MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/Logo-uinsgd_official.png"
                alt="Logo UIN SGD"
                className="h-12 w-12"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-primary">Career Development Center</span>
                <span className="text-xs text-muted-foreground">FSH UIN Sunan Gunung Djati</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Membantu mahasiswa dan alumni Fakultas Syariah dan Hukum dalam mengembangkan karir profesional.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Menu</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/lowongan" className="text-muted-foreground hover:text-primary transition-colors">
                  Lowongan
                </Link>
              </li>
              <li>
                <Link to="/magang" className="text-muted-foreground hover:text-primary transition-colors">
                  Magang
                </Link>
              </li>
              <li>
                <Link to="/resource/acara-pelatihan" className="text-muted-foreground hover:text-primary transition-colors">
                  Acara & Pelatihan
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Kontak</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Jl. A.H. Nasution No. 105, Cibiru, Bandung 40614
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">(022) 7800525</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">cdc.fsh@uinsgd.ac.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Career Development Center FSH UIN Sunan Gunung Djati Bandung. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
