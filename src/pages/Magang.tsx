import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Clock, Calendar, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { supabase, Internship } from '../lib/supabase';

export function Magang() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [filteredInternships, setFilteredInternships] = useState<Internship[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchInternships();
  }, []);

  useEffect(() => {
    const filtered = internships.filter(
      (internship) =>
        internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInternships(filtered);
    setCurrentPage(1);
  }, [searchTerm, internships]);

  const fetchInternships = async () => {
    const { data } = await supabase
      .from('internships')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setInternships(data);
  };

  const totalPages = Math.ceil(filteredInternships.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInternships = filteredInternships.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-gradient-to-br from-secondary/10 to-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-foreground mb-4">Program Magang</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Dapatkan pengalaman kerja profesional melalui program magang berkualitas
          </p>

          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Cari berdasarkan posisi, perusahaan, atau lokasi..."
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
              Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredInternships.length)} dari {filteredInternships.length} program magang
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentInternships.map((internship) => (
              <Card key={internship.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-grow">
                      <CardTitle className="text-lg mb-2">{internship.title}</CardTitle>
                      <CardDescription className="font-semibold">{internship.company}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2 text-secondary" />
                      {internship.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2 text-secondary" />
                      Durasi: {internship.duration}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2 text-secondary" />
                      Deadline: {new Date(internship.deadline).toLocaleDateString('id-ID')}
                    </div>
                    {internship.stipend && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4 mr-2 text-secondary" />
                        {internship.stipend}
                      </div>
                    )}
                    <div className="pt-4">
                      <Button className="w-full" variant="default" asChild>
                        <Link to={`/magang/${internship.id}`}>
                          Lihat Detail
                        </Link>
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
