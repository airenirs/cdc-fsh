import { useEffect, useState } from 'react';
import { Search, Mail, Linkedin } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { supabase, AlumniNetwork } from '../lib/supabase';

export function NetworkingAlumni() {
  const [alumni, setAlumni] = useState<AlumniNetwork[]>([]);
  const [filteredAlumni, setFilteredAlumni] = useState<AlumniNetwork[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchAlumni();
  }, []);

  useEffect(() => {
    const filtered = alumni.filter(
      (alum) =>
        alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alum.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alum.current_position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alum.industry.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAlumni(filtered);
    setCurrentPage(1);
  }, [searchTerm, alumni]);

  const fetchAlumni = async () => {
    const { data } = await supabase
      .from('alumni_network')
      .select('*')
      .order('graduation_year', { ascending: false });

    if (data) setAlumni(data);
  };

  const totalPages = Math.ceil(filteredAlumni.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAlumni = filteredAlumni.slice(startIndex, endIndex);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-gradient-to-br from-primary/10 to-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-foreground mb-4">Networking Alumni</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Terhubung dengan alumni FSH UIN SGD yang telah sukses berkarir di berbagai bidang
          </p>

          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Cari berdasarkan nama, perusahaan, posisi, atau industri..."
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
              Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredAlumni.length)} dari {filteredAlumni.length} alumni
            </p>
          </div>

          <div className="bg-white rounded-lg border overflow-hidden mb-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Nama</TableHead>
                  <TableHead>Posisi</TableHead>
                  <TableHead>Perusahaan</TableHead>
                  <TableHead>Industri</TableHead>
                  <TableHead>Angkatan</TableHead>
                  <TableHead className="text-right">Kontak</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentAlumni.map((alum) => (
                  <TableRow key={alum.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={alum.photo_url} alt={alum.name} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {getInitials(alum.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{alum.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{alum.current_position}</TableCell>
                    <TableCell className="text-sm">{alum.company}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {alum.industry}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {alum.graduation_year}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {alum.linkedin && (
                          <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            className="h-8 w-8"
                          >
                            <a href={alum.linkedin} target="_blank" rel="noopener noreferrer">
                              <Linkedin className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="h-8 w-8"
                        >
                          <a href={`mailto:${alum.email}`}>
                            <Mail className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
