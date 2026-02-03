const axios = require('axios');
const cheerio = require('cheerio');

async function fetchDailyWebsite() {
  const url = process.env.NEWS_URL;

  const { data } = await axios.get(url, {
    headers: {
      'User-Agent': 'RefundBot/1.0'
    }
  });

  const $ = cheerio.load(data);

  // Remove noise
  $('script, style, nav, footer, header, aside').remove();

  const text = $('main').text() || $('body').text();

  return text
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 12000);
}

module.exports = fetchDailyWebsite;
