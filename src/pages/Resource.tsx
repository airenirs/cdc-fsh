import { Link } from 'react-router-dom';
import { Calendar, Building2, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

export function Resource() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-gradient-to-br from-primary/10 to-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-foreground mb-4">Resource Center</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Akses berbagai sumber daya untuk mendukung pengembangan karir Anda, termasuk acara, pelatihan, informasi mitra perusahaan, dan networking alumni.
          </p>
        </div>
      </section>

      <section className="py-16 flex-grow">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-shadow border-t-4 border-t-primary">
              <CardHeader>
                <Calendar className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-2xl">Acara & Pelatihan</CardTitle>
                <CardDescription className="text-base">
                  Ikuti berbagai workshop, seminar, dan pelatihan untuk meningkatkan keterampilan profesional Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/resource/acara-pelatihan">
                    Lihat Acara
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow border-t-4 border-t-secondary">
              <CardHeader>
                <Building2 className="h-12 w-12 text-secondary mb-4" />
                <CardTitle className="text-2xl">Mitra Perusahaan</CardTitle>
                <CardDescription className="text-base">
                  Jelajahi perusahaan-perusahaan terpercaya yang bermitra dengan CDC FSH untuk peluang karir Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/resource/mitra-perusahaan">
                    Lihat Mitra
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow border-t-4 border-t-primary">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-2xl">Networking Alumni</CardTitle>
                <CardDescription className="text-base">
                  Terhubung dengan alumni FSH yang telah sukses berkarir di berbagai bidang industri
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/resource/networking-alumni">
                    Lihat Alumni
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Manfaatkan Resource Kami
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Resource Center CDC FSH dirancang untuk membantu mahasiswa dan alumni dalam mengembangkan karir profesional. Akses berbagai informasi, jaringan, dan peluang yang tersedia untuk kesuksesan Anda.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Pengembangan Keterampilan</h3>
                  <p className="text-sm text-muted-foreground">
                    Ikuti pelatihan dan workshop untuk meningkatkan keterampilan profesional
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Koneksi Industri</h3>
                  <p className="text-sm text-muted-foreground">
                    Jalin hubungan dengan perusahaan dan profesional di berbagai bidang
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Komunitas Alumni</h3>
                  <p className="text-sm text-muted-foreground">
                    Bergabung dengan jaringan alumni yang saling mendukung
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
