import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Calendar, DollarSign, Building2, Timer } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { supabase, Internship } from '../lib/supabase';

export function MagangDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [internship, setInternship] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchInternshipDetail(id);
    }
  }, [id]);

  const fetchInternshipDetail = async (internshipId: string) => {
    setLoading(true);
    const { data } = await supabase
      .from('internships')
      .select('*')
      .eq('id', internshipId)
      .maybeSingle();

    if (data) {
      setInternship(data);
    } else {
      navigate('/magang');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (!internship) {
    return null;
  }

  const isExpired = new Date(internship.deadline) < new Date();

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-gradient-to-br from-secondary/10 to-white py-8">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/magang">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Magang
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-12 flex-grow">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-grow">
                      <CardTitle className="text-3xl mb-2">{internship.title}</CardTitle>
                      <CardDescription className="text-lg font-semibold text-foreground">
                        {internship.company}
                      </CardDescription>
                    </div>
                    <Badge className={isExpired ? 'bg-red-100 text-red-700' : 'bg-secondary/10 text-secondary'}>
                      {isExpired ? 'Ditutup' : 'Aktif'}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2 text-secondary" />
                      {internship.location}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2 text-secondary" />
                      {internship.duration}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2 text-secondary" />
                      Deadline: {new Date(internship.deadline).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Deskripsi Program Magang</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground whitespace-pre-line">{internship.description}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Persyaratan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground whitespace-pre-line">{internship.requirements}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-secondary/5 border-secondary/20">
                <CardHeader>
                  <CardTitle className="text-lg">Manfaat Program Magang</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-2 text-secondary">✓</span>
                      <span>Pengalaman kerja profesional di bidang terkait</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-secondary">✓</span>
                      <span>Bimbingan dari profesional berpengalaman</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-secondary">✓</span>
                      <span>Sertifikat penyelesaian program magang</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-secondary">✓</span>
                      <span>Networking dengan profesional industri</span>
                    </li>
                    {internship.stipend && (
                      <li className="flex items-start">
                        <span className="mr-2 text-secondary">✓</span>
                        <span>Uang saku/stipend sesuai ketentuan</span>
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="sticky top-24 border-secondary/20">
                <CardHeader>
                  <CardTitle>Informasi Program Magang</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Building2 className="h-4 w-4 mr-2 text-secondary" />
                      Perusahaan
                    </div>
                    <p className="font-semibold">{internship.company}</p>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 mr-2 text-secondary" />
                      Lokasi
                    </div>
                    <p className="font-semibold">{internship.location}</p>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Timer className="h-4 w-4 mr-2 text-secondary" />
                      Durasi Program
                    </div>
                    <Badge variant="outline" className="border-secondary/50 text-secondary">
                      {internship.duration}
                    </Badge>
                  </div>

                  {internship.stipend && (
                    <>
                      <Separator />
                      <div>
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <DollarSign className="h-4 w-4 mr-2 text-secondary" />
                          Uang Saku
                        </div>
                        <p className="font-semibold">{internship.stipend}</p>
                      </div>
                    </>
                  )}

                  <Separator />

                  <div>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4 mr-2 text-secondary" />
                      Batas Pendaftaran
                    </div>
                    <p className="font-semibold">
                      {new Date(internship.deadline).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Clock className="h-4 w-4 mr-2 text-secondary" />
                      Diposting
                    </div>
                    <p className="text-sm">
                      {new Date(internship.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>

                  <Separator />

                  <Button
                    className="w-full"
                    size="lg"
                    disabled={isExpired}
                  >
                    {isExpired ? 'Pendaftaran Ditutup' : 'Daftar Sekarang'}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Pastikan Anda memenuhi semua persyaratan sebelum mendaftar
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
