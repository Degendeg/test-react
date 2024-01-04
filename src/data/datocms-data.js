import config from '../config/config';

const API_TOKEN = config.DATO_KEY;

const fetchFromDato = async (q) => {
  try {
    const response = await fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        query: q
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error('There was a problem with fetching from DatoCMS:', error);
  }
};

export default fetchFromDato;