import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase, Calendar, DollarSign, Building2, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { supabase, JobVacancy } from '../lib/supabase';

export function LowonganDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<JobVacancy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchJobDetail(id);
    }
  }, [id]);

  const fetchJobDetail = async (jobId: string) => {
    setLoading(true);
    const { data } = await supabase
      .from('job_vacancies')
      .select('*')
      .eq('id', jobId)
      .maybeSingle();

    if (data) {
      setJob(data);
    } else {
      navigate('/lowongan');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return null;
  }

  const isExpired = new Date(job.deadline) < new Date();

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-gradient-to-br from-primary/10 to-white py-8">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/lowongan">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Lowongan
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
                      <CardTitle className="text-3xl mb-2">{job.title}</CardTitle>
                      <CardDescription className="text-lg font-semibold text-foreground">
                        {job.company}
                      </CardDescription>
                    </div>
                    <Badge className={isExpired ? 'bg-red-100 text-red-700' : ''}>
                      {isExpired ? 'Ditutup' : 'Aktif'}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Briefcase className="h-4 w-4 mr-2 text-primary" />
                      {job.type}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      Deadline: {new Date(job.deadline).toLocaleDateString('id-ID', {
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
                  <CardTitle>Deskripsi Pekerjaan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground whitespace-pre-line">{job.description}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Persyaratan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground whitespace-pre-line">{job.requirements}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Informasi Lowongan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Building2 className="h-4 w-4 mr-2 text-primary" />
                      Perusahaan
                    </div>
                    <p className="font-semibold">{job.company}</p>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      Lokasi
                    </div>
                    <p className="font-semibold">{job.location}</p>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Briefcase className="h-4 w-4 mr-2 text-primary" />
                      Tipe Pekerjaan
                    </div>
                    <Badge variant="outline">{job.type}</Badge>
                  </div>

                  {job.salary_range && (
                    <>
                      <Separator />
                      <div>
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <DollarSign className="h-4 w-4 mr-2 text-primary" />
                          Rentang Gaji
                        </div>
                        <p className="font-semibold">{job.salary_range}</p>
                      </div>
                    </>
                  )}

                  <Separator />

                  <div>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      Batas Lamaran
                    </div>
                    <p className="font-semibold">
                      {new Date(job.deadline).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      Diposting
                    </div>
                    <p className="text-sm">
                      {new Date(job.created_at).toLocaleDateString('id-ID', {
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
                    {isExpired ? 'Lowongan Ditutup' : 'Lamar Sekarang'}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Pastikan Anda memenuhi semua persyaratan sebelum melamar
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
