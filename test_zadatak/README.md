# Test Zadatak - Job Board Aplikacija

## Opis
Modernizovana job board aplikacija sa responsive dizajnom, animacijama i OpenAI integracijom za generisanje zahvalnica.

## Funkcionalnosti

### ✨ Animacije
- Framer Motion animacije kroz celu aplikaciju
- Smooth hover efekti na kartice i dugmad
- Staggered animacije za liste elemenata
- Loading animacije

### 📱 Responsive Dizajn
- Optimizovano za desktop, tablet i mobilne uređaje
- Responsive grid sistem
- Mobile-first pristup
- Hamburger meni za mobilne uređaje

### 🤖 OpenAI Integracija
- Automatsko generisanje zahvalnica kada kandidat aplicira na posao
- Personalizovane poruke na srpskom jeziku
- Fallback poruke u slučaju greške API-ja

### 🎯 Ključne Funkcionalnosti
- Job listing sa detaljnim informacijama
- Apliciranje na poslove sa instant feedback-om
- Company dashboard za upravljanje poslovima
- Candidate dashboard za praćenje aplikacija
- Responsive search funkcionalnost

## Instalacija i Pokretanje

### Preduslovi
- Node.js (v16 ili noviji)
- npm ili yarn

### Koraci

1. **Instaliraj dependencies:**
```bash
npm install
```

2. **Postavi environment varijable:**
Kreiraj `.env.local` fajl u root direktorijumu:
```
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

3. **Pokreni development server:**
```bash
npm run dev
```

4. **Otvori aplikaciju:**
Idi na `http://localhost:5173` u browseru

## Struktura Projekta

```
src/
├── components/          # React komponente
│   ├── Header.jsx      # Navigacija sa animacijama
│   ├── Hero.jsx        # Hero sekcija
│   ├── JobCard.jsx     # Job kartice sa apliciranjem
│   ├── SearchBar.jsx   # Search funkcionalnost
│   └── Categories.jsx  # Kategorije poslova
├── pages/              # Stranice aplikacije
│   ├── CandidateHome.jsx # Kandidat dashboard
│   └── CompanyHome.jsx  # Kompanija dashboard
├── services/           # API servisi
│   └── openai.js       # OpenAI integracija
└── index.css          # Glavni CSS sa responsive stilovima
```

## Tehnologije

- **React 19** - UI framework
- **Framer Motion** - Animacije
- **Axios** - HTTP klijent
- **OpenAI API** - Generisanje zahvalnica
- **CSS Grid/Flexbox** - Responsive layout
- **Vite** - Build tool

## Responsive Breakpoints

- **Desktop:** > 960px
- **Tablet:** 640px - 960px  
- **Mobile:** < 640px
- **Small Mobile:** < 480px

## OpenAI Prompt

Aplikacija koristi sledeći prompt za generisanje zahvalnica:

```
Generiši profesionalnu zahvalnicu za kandidata koji je aplicirao na posao. 

Detalji:
- Pozicija: {jobTitle}
- Kompanija: {companyName}
- Ime kandidata: {candidateName}

Zahvalnica treba da bude:
- Profesionalna i topla
- Kratka (2-3 rečenice)
- Na srpskom jeziku
- Pozitivna i ohrabrujuća
- Spomenuti da će kompanija kontaktirati kandidata uskoro
```

## Napomene

- OpenAI API ključ je privremeno hardkodovan za potrebe zadatka
- Aplikacija koristi mock podatke za demonstraciju
- Sve animacije su optimizovane za performanse
- Responsive dizajn je testiran na različitim uređajima