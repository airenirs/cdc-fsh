import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/toaster';
import { Home } from './pages/Home';
import { Lowongan } from './pages/Lowongan';
import { LowonganDetail } from './pages/LowonganDetail';
import { Magang } from './pages/Magang';
import { MagangDetail } from './pages/MagangDetail';
import { Resource } from './pages/Resource';
import { AcaraPelatihan } from './pages/AcaraPelatihan';
import { MitraPerusahaan } from './pages/MitraPerusahaan';
import { NetworkingAlumni } from './pages/NetworkingAlumni';
import { HubungiKami } from './pages/HubungiKami';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lowongan" element={<Lowongan />} />
            <Route path="/lowongan/:id" element={<LowonganDetail />} />
            <Route path="/magang" element={<Magang />} />
            <Route path="/magang/:id" element={<MagangDetail />} />
            <Route path="/resource" element={<Resource />} />
            <Route path="/resource/acara-pelatihan" element={<AcaraPelatihan />} />
            <Route path="/resource/mitra-perusahaan" element={<MitraPerusahaan />} />
            <Route path="/resource/networking-alumni" element={<NetworkingAlumni />} />
            <Route path="/hubungi-kami" element={<HubungiKami />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
