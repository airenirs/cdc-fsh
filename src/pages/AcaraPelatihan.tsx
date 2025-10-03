import { useEffect, useState } from 'react';
import { Search, MapPin, Calendar, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { supabase, Event } from '../lib/supabase';

export function AcaraPelatihan() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const filtered = events.filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.speaker.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
    setCurrentPage(1);
  }, [searchTerm, events]);

  const fetchEvents = async () => {
    const { data } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (data) setEvents(data);
  };

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, endIndex);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'training':
        return 'bg-primary/10 text-primary';
      case 'workshop':
        return 'bg-secondary/10 text-secondary';
      case 'seminar':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'training':
        return 'Pelatihan';
      case 'workshop':
        return 'Workshop';
      case 'seminar':
        return 'Seminar';
      default:
        return type;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-gradient-to-br from-primary/10 to-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-foreground mb-4">Acara & Pelatihan</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Ikuti berbagai acara dan pelatihan untuk mengembangkan keterampilan profesional Anda
          </p>

          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Cari berdasarkan judul, jenis acara, atau pembicara..."
              className="pl-10 h-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="py-12 flex-grow">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredEvents.length)} dari {filteredEvents.length} acara
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getTypeColor(event.type)}>
                      {getTypeLabel(event.type)}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription className="font-semibold">{event.speaker}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      {new Date(event.date).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                      {event.registered}/{event.quota} peserta terdaftar
                    </div>
                    <div className="pt-4">
                      <Button
                        className="w-full"
                        variant="default"
                        disabled={event.registered >= event.quota}
                      >
                        {event.registered >= event.quota ? 'Kuota Penuh' : 'Daftar Sekarang'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Sebelumnya
              </Button>

              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    onClick={() => setCurrentPage(page)}
                    size="sm"
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Selanjutnya
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
