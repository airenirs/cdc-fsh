import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, GraduationCap, Calendar, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { supabase, JobVacancy, Internship, Event } from '../lib/supabase';

export function Home() {
  const [latestJobs, setLatestJobs] = useState<JobVacancy[]>([]);
  const [latestInternships, setLatestInternships] = useState<Internship[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: jobs } = await supabase
      .from('job_vacancies')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);

    const { data: internships } = await supabase
      .from('internships')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);

    const { data: events } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true })
      .limit(3);

    if (jobs) setLatestJobs(jobs);
    if (internships) setLatestInternships(internships);
    if (events) setUpcomingEvents(events);
  };

  return (
    <div className="flex flex-col">
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Wujudkan Karir Impian Anda Bersama CDC FSH
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Career Development Center Fakultas Syariah dan Hukum UIN Sunan Gunung Djati Bandung hadir untuk membantu mahasiswa dan alumni meraih kesuksesan karir.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link to="/lowongan">
                    Lihat Lowongan
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/hubungi-kami">Hubungi Kami</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/recruit@2x.png"
                alt="Career Development"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="border-t-4 border-t-primary hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Briefcase className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Lowongan Kerja</CardTitle>
                <CardDescription>Peluang karir di berbagai perusahaan terkemuka</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-t-4 border-t-secondary hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <GraduationCap className="h-12 w-12 text-secondary mx-auto mb-4" />
                <CardTitle>Program Magang</CardTitle>
                <CardDescription>Kesempatan magang untuk pengalaman praktis</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-t-4 border-t-primary hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Acara & Pelatihan</CardTitle>
                <CardDescription>Workshop dan seminar pengembangan karir</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-t-4 border-t-secondary hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-secondary mx-auto mb-4" />
                <CardTitle>Networking Alumni</CardTitle>
                <CardDescription>Terhubung dengan alumni sukses</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Lowongan Terbaru</h2>
              <p className="text-muted-foreground">Temukan peluang karir yang sesuai dengan Anda</p>
            </div>
            <Button asChild variant="ghost">
              <Link to="/lowongan">
                Lihat Semua
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {latestJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{job.title}</CardTitle>
                  <CardDescription>{job.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">{job.location}</p>
                    <div className="flex items-center justify-between pt-4">
                      <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                        {job.type}
                      </span>
                      <Button asChild size="sm" variant="ghost">
                        <Link to={`/lowongan/${job.id}`}>Detail</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Program Magang</h2>
              <p className="text-muted-foreground">Dapatkan pengalaman kerja profesional</p>
            </div>
            <Button asChild variant="ghost">
              <Link to="/magang">
                Lihat Semua
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {latestInternships.map((internship) => (
              <Card key={internship.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{internship.title}</CardTitle>
                  <CardDescription>{internship.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">{internship.location}</p>
                    <p className="text-muted-foreground">Durasi: {internship.duration}</p>
                    <div className="flex items-center justify-between pt-4">
                      <span className="text-xs bg-secondary/10 text-secondary px-3 py-1 rounded-full">
                        Magang
                      </span>
                      <Button asChild size="sm" variant="ghost">
                        <Link to={`/magang/${internship.id}`}>Detail</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Acara Mendatang</h2>
              <p className="text-muted-foreground">Ikuti kegiatan pengembangan karir kami</p>
            </div>
            <Button asChild variant="ghost">
              <Link to="/resource/acara-pelatihan">
                Lihat Semua
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription>{event.speaker}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">{event.location}</p>
                    <p className="text-muted-foreground">
                      {new Date(event.date).toLocaleDateString('id-ID')} | {event.time}
                    </p>
                    <div className="flex items-center justify-between pt-4">
                      <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full capitalize">
                        {event.type}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {event.registered}/{event.quota} peserta
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Siap Memulai Perjalanan Karir Anda?</h2>
          <p className="text-lg mb-8 opacity-90">
            Bergabunglah dengan ribuan mahasiswa dan alumni yang telah sukses berkarir
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/hubungi-kami">Hubungi Kami Sekarang</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
