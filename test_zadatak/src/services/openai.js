import axios from 'axios';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export async function generateThankYouMessage(jobTitle, companyName, candidateName) {
  try {
    const prompt = `Generiši profesionalnu zahvalnicu za kandidata koji je aplicirao na posao. 
    
    Detalji:
    - Pozicija: ${jobTitle}
    - Kompanija: ${companyName}
    - Ime kandidata: ${candidateName}
    
    Zahvalnica treba da bude:
    - Profesionalna i topla
    - Kratka (2-3 rečenice)
    - Na srpskom jeziku
    - Pozitivna i ohrabrujuća
    - Spomenuti da će kompanija kontaktirati kandidata uskoro
    
    Formatiraj kao kratku poruku koja se može prikazati u aplikaciji.`;

    const response = await axios.post(OPENAI_API_URL, {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Ti si AI asistent koji generiše profesionalne zahvalnice za kandidate koji apliciraju na poslove. Odgovoriš samo sa zahvalnicom, bez dodatnih objašnjenja."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 150,
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Greška pri generisanju zahvalnice:', error);
    // Fallback zahvalnica ako OpenAI API ne radi
    return `Hvala vam, ${candidateName}! Vaša prijava za poziciju ${jobTitle} u kompaniji ${companyName} je uspešno poslata. Naš tim će vas kontaktirati uskoro.`;
  }
}
