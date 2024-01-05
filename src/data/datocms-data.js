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
      throw new Error('Network response not OK');
    }

    const data = await response.json();

    if (Object.hasOwn(data, 'errors')) {
      throw new Error(data.errors[0].message);
    }

    return data.data;
  } catch (error) {
    throw new Error('There was a problem with fetching from DatoCMS: ' + error.message);
  }
};

export default fetchFromDato;