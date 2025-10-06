# CDC FSH - Career Development Center

> Platform Career Development Center untuk Fakultas Syariah dan Hukum UIN Sunan Gunung Djati Bandung

**Live Site:** [https://cdc.fsh.uinsgd.ac.id/](https://cdc.fsh.uinsgd.ac.id/)

## Tentang Project

CDC FSH adalah platform digital yang dirancang untuk membantu mahasiswa Fakultas Syariah dan Hukum dalam pengembangan karir mereka. Platform ini menyediakan informasi lowongan pekerjaan, program magang, dan berbagai resources untuk mempersiapkan mahasiswa memasuki dunia kerja.

## Fitur Utama

### 1. Job Vacancies
- Browse lowongan pekerjaan di bidang hukum dan syariah
- Filter berdasarkan lokasi, tipe pekerjaan, dan perusahaan
- Detail informasi lengkap untuk setiap lowongan
- 30+ lowongan dari berbagai perusahaan dan institusi

### 2. Internship Programs
- Daftar program magang untuk mahasiswa
- Filter berdasarkan durasi dan lokasi
- Informasi stipend dan requirements
- 30+ program magang dari NGO, korporat, hingga tech companies

### 3. Alumni Network
- Jaringan alumni Fakultas Syariah dan Hukum
- Profil alumni dan career paths
- Koneksi dengan alumni di berbagai industri

### 4. Company Partners
- Daftar perusahaan partner CDC FSH
- Informasi tentang company culture dan opportunities
- Direct links ke company profiles

### 5. Upcoming Events
- Kalender acara career development
- Workshop, seminar, dan job fair
- Registrasi online untuk events

## Tech Stack

- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool & Dev Server
- **React Router v7** - Routing
- **TailwindCSS** - Styling
- **shadcn/ui** - UI Components
- **Supabase** - Database & Authentication

### Additional Libraries
- `@radix-ui/*` - Accessible UI primitives
- `react-hook-form` - Form management
- `zod` - Schema validation
- `lucide-react` - Icons
- `recharts` - Data visualization
- `date-fns` - Date utilities

## Struktur Project

```
cdc-fsh/
├── src/
│   ├── components/      # Reusable components
│   │   ├── ui/         # shadcn/ui components
│   │   └── ...         # Custom components
│   ├── pages/          # Page components
│   ├── lib/            # Utilities & helpers
│   ├── hooks/          # Custom React hooks
│   └── types/          # TypeScript types
├── public/             # Static assets
├── vite.config.ts      # Vite configuration
└── package.json        # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm atau yarn
- Akun Supabase

### Installation

1. Clone repository
```bash
git clone https://github.com/airenirs/cdc-fsh.git
cd cdc-fsh
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables

Buat file `.env` di root project:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run development server
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

### Build untuk Production

```bash
npm run build
```

Output akan tersimpan di folder `dist/`

## Database Schema

### Tables

#### job_vacancies
- `id` (uuid, primary key)
- `title` (text)
- `company` (text)
- `location` (text)
- `type` (text) - Full-time, Part-time, Contract
- `description` (text)
- `requirements` (text)
- `salary_range` (text)
- `deadline` (date)
- `created_at` (timestamp)

#### internships
- `id` (uuid, primary key)
- `title` (text)
- `company` (text)
- `location` (text)
- `duration` (text)
- `description` (text)
- `requirements` (text)
- `stipend` (text)
- `deadline` (date)
- `created_at` (timestamp)

#### alumni_network
- `id` (uuid, primary key)
- `name` (text)
- `graduation_year` (integer)
- `current_position` (text)
- `company` (text)
- `profile_image` (text)
- `linkedin_url` (text)
- `created_at` (timestamp)

#### company_partners
- `id` (uuid, primary key)
- `name` (text)
- `industry` (text)
- `logo_url` (text)
- `website` (text)
- `description` (text)
- `created_at` (timestamp)

#### events
- `id` (uuid, primary key)
- `title` (text)
- `date` (timestamp)
- `location` (text)
- `type` (text)
- `description` (text)
- `registration_url` (text)
- `created_at` (timestamp)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |

## Contributing

Contributions are welcome! 

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Team

**Faculty of Sharia and Law**  
UIN Sunan Gunung Djati Bandung

## Contact

For questions or support:
- Email: cdc.fsh@uinsgd.ac.id
- Website: [https://cdc.fsh.uinsgd.ac.id/](https://cdc.fsh.uinsgd.ac.id/)

## Acknowledgments

- [Supabase](https://supabase.com/) - Backend infrastructure
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- All contributors and partners

---

Made with ❤️ by CDC FSH Team
