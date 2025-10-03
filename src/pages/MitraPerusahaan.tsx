import { useEffect, useState } from 'react';
import { Search, Building2, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { supabase, CompanyPartner } from '../lib/supabase';

export function MitraPerusahaan() {
  const [companies, setCompanies] = useState<CompanyPartner[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<CompanyPartner[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    const filtered = companies.filter(
      (company) =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCompanies(filtered);
    setCurrentPage(1);
  }, [searchTerm, companies]);

  const fetchCompanies = async () => {
    const { data } = await supabase
      .from('company_partners')
      .select('*')
      .order('partnership_year', { ascending: false });

    if (data) setCompanies(data);
  };

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCompanies = filteredCompanies.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-gradient-to-br from-primary/10 to-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-foreground mb-4">Mitra Perusahaan</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Perusahaan-perusahaan terpercaya yang bermitra dengan CDC FSH UIN SGD
          </p>

          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Cari berdasarkan nama perusahaan atau industri..."
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
              Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredCompanies.length)} dari {filteredCompanies.length} mitra perusahaan
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentCompanies.map((company) => (
              <Card key={company.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-center h-20 mb-4 bg-gray-50 rounded-lg">
                    {company.logo_url ? (
                      <img
                        src={company.logo_url}
                        alt={company.name}
                        className="max-h-16 max-w-full object-contain"
                      />
                    ) : (
                      <Building2 className="h-12 w-12 text-primary" />
                    )}
                  </div>
                  <CardTitle className="text-lg text-center">{company.name}</CardTitle>
                  <CardDescription className="text-center">
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mt-2">
                      {company.industry}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {company.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-xs text-muted-foreground">
                        Mitra sejak {company.partnership_year}
                      </span>
                      {company.website && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                        >
                          <a href={company.website} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
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
