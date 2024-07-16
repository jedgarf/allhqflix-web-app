import packageJSON from '../../package.json';
import { isMobile } from "../Services/Utils";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const title = process.env.REACT_APP_NAME;
const version = process.env.REACT_APP_VERSION || packageJSON.version;
const dev_portfolio = "https://dev.allhqflix.com";
const fb_link = "https://facebook.com/jedgarf";
const linkedin_link = "https://linkedin.com/in/jedgarf";
const github_link = "https://github.com/jedgarf";
const site_email = "allhqflix@gmail.com";
const search_bar = true;
const defaultInternationalServer = process.env.REACT_APP_INTNL_DEFAULT_SERVER || 'upcloud';
const defaultInternationalVideoRes = "auto";

const maxMediaSaved = 100;
const maxMediaSavedMessage = `Oops! Your watching progress can't be saved at the moment. It seems our list save limit of ${maxMediaSaved} has been reached.`;
const pageLoadMS = 1000;

const pages = [ {'id': 1, 'icon': '', 'code': 'movie', 'search_code': 'movie', 'name': 'Movies', 'link': '/movies', 'enable': true}, 
                {'id': 2, 'icon': '', 'code': 'tv', 'search_code': 'tv', 'name': 'TV Series', 'link': '/tvshow', 'enable': true}, 
                {'id': 3, 'icon': '', 'code': 'anime', 'search_code': 'anime', 'name': 'Anime', 'link': '/anime', 'enable': true}, 
                {'id': 4, 'icon': '', 'code': 'asian_drama', 'search_code': 'drama-detail', 'name': 'Asian Films', 'link': '/asian_drama', 'enable': true},
                {'id': 5, 'icon': '', 'code': 'asian_films', 'search_code': 'drama', 'name': 'Asian Films V2', 'link': '/asian_films', 'enable': true},
                {'id': 6, 'icon': '', 'code': 'live_channels', 'search_code': 'cable', 'name': 'Live Channels', 'link': '/live_channels', 'enable': false} ];

const misc_pages = [ {'id': 1, 'icon': '', 'code': 'apps', 'search_code': 'apps', 'name': 'Native Apps', 'link': '/native_apps', 'enable': false}, 
                     {'id': 2, 'icon': '', 'code': 'taq', 'search_code': 'taq', 'name': 'Term & Conditions', 'link': '/taq', 'enable': false}, 
                     {'id': 3, 'icon': '', 'code': 'privacy_policies', 'search_code': 'privacy_policies', 'name': 'Privacy Policies', 'link': '/privacy_policies', 'enable': false}, 
                     {'id': 4, 'icon': '', 'code': 'contact', 'search_code': 'contact', 'name': 'Contact Us', 'link': '/contact_us', 'enable': false} ];

// ---------------------------------------------------------------------------------------------------------------------
// Foreign Films Filter
// 10, 24, 18, 3, 37, 7, 2, 11, 4, 9, 13, 19, 14, 27, 15, 1, 34, 22, 12, 31, 5, 35, 29, 16, 8, 17, 28, 6
const foreign_genre = [
  {
    id: 1,
    genre_id: 10,
    code: 'action',
    name: 'Action',
    is_active: true
  },
  {
    id: 2,
    genre_id: 24,
    code: 'action-adventure',
    name: 'Action & Adventure',
    is_active: true
  },
  {
    id: 3,
    genre_id: 18,
    code: 'adventure',
    name: 'Adventure',
    is_active: true
  },
  {
    id: 4,
    genre_id: 3,
    code: 'animation',
    name: 'Animation',
    is_active: true
  },
  {
    id: 5,
    genre_id: 37,
    code: 'biography',
    name: 'Biography',
    is_active: true
  },
  {
    id: 6,
    genre_id: 7,
    code: 'comedy',
    name: 'Comedy',
    is_active: true
  },
  { id: 7, genre_id: 2, code: 'crime', name: 'Crime', is_active: true },
  {
    id: 8,
    genre_id: 11,
    code: 'documentary',
    name: 'Documentary',
    is_active: true
  },
  { id: 9, genre_id: 4, code: 'drama', name: 'Drama', is_active: true },
  {
    id: 10,
    genre_id: 9,
    code: 'family',
    name: 'Family',
    is_active: true
  },
  {
    id: 11,
    genre_id: 13,
    code: 'fantasy',
    name: 'Fantasy',
    is_active: true
  },
  {
    id: 12,
    genre_id: 19,
    code: 'history',
    name: 'History',
    is_active: true
  },
  {
    id: 13,
    genre_id: 14,
    code: 'horror',
    name: 'Horror',
    is_active: true
  },
  { id: 14, genre_id: 27, code: 'kids', name: 'Kids', is_active: true },
  {
    id: 15,
    genre_id: 15,
    code: 'music',
    name: 'Music',
    is_active: true
  },
  {
    id: 16,
    genre_id: 1,
    code: 'mystery',
    name: 'Mystery',
    is_active: true
  },
  { id: 17, genre_id: 34, code: 'news', name: 'News', is_active: true },
  {
    id: 18,
    genre_id: 22,
    code: 'reality',
    name: 'Reality',
    is_active: true
  },
  {
    id: 19,
    genre_id: 12,
    code: 'romance',
    name: 'Romance',
    is_active: true
  },
  {
    id: 20,
    genre_id: 31,
    code: 'sci-fi-fantasy',
    name: 'Sci-Fi & Fantasy',
    is_active: true
  },
  {
    id: 21,
    genre_id: 5,
    code: 'science-fiction',
    name: 'Science Fiction',
    is_active: true
  },
  { id: 22, genre_id: 35, code: 'soap', name: 'Soap', is_active: true },
  {
    id: 23,
    genre_id: 29,
    code: 'tv-movie',
    name: 'TV Movie',
    is_active: true
  },
  { id: 24, genre_id: 16, code: 'talk', name: 'Talk', is_active: true },
  {
    id: 25,
    genre_id: 8,
    code: 'thriller',
    name: 'Thriller',
    is_active: true
  },
  { id: 26, genre_id: 17, code: 'war', name: 'War', is_active: true },
  {
    id: 27,
    genre_id: 28,
    code: 'war-politics',
    name: 'War & Politics',
    is_active: true
  },
  {
    id: 28,
    genre_id: 6,
    code: 'western',
    name: 'Western',
    is_active: true
  }
];

// 11, 151, 4, 44, 190, 147, 101, 231, 222, 158, 3, 96, 93, 72, 105, 196, 24, 205, 173, 91, 40, 172, 122, 219, 23, 170, 109, 200, 135, 62, 114, 41, 119, 57, 180, 129
// {'id': 1, 'country_id': 0, 'code': 'PH', 'name': 'Philippines', 'is_active': true}
const foreign_country = [
  {
    id: 1,
    country_id: 11,
    code: 'AR',
    name: 'Argentina',
    is_active: true
  },
  {
    id: 2,
    country_id: 151,
    code: 'AU',
    name: 'Australia',
    is_active: true
  },
  {
    id: 3,
    country_id: 4,
    code: 'AT',
    name: 'Austria',
    is_active: true
  },
  {
    id: 4,
    country_id: 44,
    code: 'BE',
    name: 'Belgium',
    is_active: true
  },
  {
    id: 5,
    country_id: 190,
    code: 'BR',
    name: 'Brazil',
    is_active: true
  },
  {
    id: 6,
    country_id: 147,
    code: 'CA',
    name: 'Canada',
    is_active: true
  },
  {
    id: 7,
    country_id: 101,
    code: 'CN',
    name: 'China',
    is_active: true
  },
  {
    id: 8,
    country_id: 231,
    code: 'CZ',
    name: 'Czech Republic',
    is_active: true
  },
  {
    id: 9,
    country_id: 222,
    code: 'DK',
    name: 'Denmark',
    is_active: true
  },
  {
    id: 10,
    country_id: 158,
    code: 'FI',
    name: 'Finland',
    is_active: true
  },
  {
    id: 11,
    country_id: 3,
    code: 'FR',
    name: 'France',
    is_active: true
  },
  {
    id: 12,
    country_id: 96,
    code: 'DE',
    name: 'Germany',
    is_active: true
  },
  {
    id: 13,
    country_id: 93,
    code: 'HK',
    name: 'Hong Kong',
    is_active: true
  },
  {
    id: 14,
    country_id: 72,
    code: 'HU',
    name: 'Hungary',
    is_active: true
  },
  {
    id: 15,
    country_id: 105,
    code: 'IN',
    name: 'India',
    is_active: true
  },
  {
    id: 16,
    country_id: 196,
    code: 'IE',
    name: 'Ireland',
    is_active: true
  },
  {
    id: 17,
    country_id: 24,
    code: 'IL',
    name: 'Israel',
    is_active: true
  },
  {
    id: 18,
    country_id: 205,
    code: 'IT',
    name: 'Italy',
    is_active: true
  },
  {
    id: 19,
    country_id: 173,
    code: 'JP',
    name: 'Japan',
    is_active: true
  },
  {
    id: 20,
    country_id: 91,
    code: 'LU',
    name: 'Luxembourg',
    is_active: true
  },
  {
    id: 21,
    country_id: 40,
    code: 'MX',
    name: 'Mexico',
    is_active: true
  },
  {
    id: 22,
    country_id: 172,
    code: 'NL',
    name: 'Netherlands',
    is_active: true
  },
  {
    id: 23,
    country_id: 122,
    code: 'NZ',
    name: 'New Zealand',
    is_active: true
  },
  {
    id: 24,
    country_id: 219,
    code: 'NO',
    name: 'Norway',
    is_active: true
  },
  {
    id: 25,
    country_id: 23,
    code: 'PL',
    name: 'Poland',
    is_active: true
  },
  {
    id: 26,
    country_id: 170,
    code: 'RO',
    name: 'Romania',
    is_active: true
  },
  {
    id: 27,
    country_id: 109,
    code: 'RU',
    name: 'Russia',
    is_active: true
  },
  {
    id: 28,
    country_id: 200,
    code: 'ZA',
    name: 'South Africa',
    is_active: true
  },
  {
    id: 29,
    country_id: 135,
    code: 'KR',
    name: 'South Korea',
    is_active: true
  },
  {
    id: 30,
    country_id: 62,
    code: 'ES',
    name: 'Spain',
    is_active: true
  },
  {
    id: 31,
    country_id: 114,
    code: 'SE',
    name: 'Sweden',
    is_active: true
  },
  {
    id: 32,
    country_id: 41,
    code: 'CH',
    name: 'Switzerland',
    is_active: true
  },
  {
    id: 33,
    country_id: 119,
    code: 'TW',
    name: 'Taiwan',
    is_active: true
  },
  {
    id: 34,
    country_id: 57,
    code: 'TH',
    name: 'Thailand',
    is_active: true
  },
  {
    id: 35,
    country_id: 180,
    code: 'GB',
    name: 'United Kingdom',
    is_active: true
  },
  {
    id: 36,
    country_id: 129,
    code: 'US',
    name: 'United States of America',
    is_active: true
  }
];

// .sort( function( a, b ) {
//   return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
// })
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
// Asian Films Filter
const asian_films_genre = [
  {
    id: 1,
    genre_id: 'accident',
    code: 'accident',
    name: 'Accident',
    is_active: true
  },
  {
    id: 2,
    genre_id: 'action',
    code: 'action',
    name: 'Action',
    is_active: true
  },
  {
    id: 3,
    genre_id: 'adult',
    code: 'adult',
    name: 'Adult',
    is_active: true
  },
  {
    id: 4,
    genre_id: 'adventure',
    code: 'adventure',
    name: 'Adventure',
    is_active: true
  },
  {
    id: 5,
    genre_id: 'alien',
    code: 'alien',
    name: 'Alien',
    is_active: true
  },
  {
    id: 6,
    genre_id: 'amnesia',
    code: 'amnesia',
    name: 'Amnesia',
    is_active: true
  },
  {
    id: 7,
    genre_id: 'ancient_legend',
    code: 'ancient_legend',
    name: 'Ancient legend',
    is_active: true
  },
  {
    id: 8,
    genre_id: 'animals',
    code: 'animals',
    name: 'Animals',
    is_active: true
  },
  {
    id: 9,
    genre_id: 'Animation',
    code: 'Animation',
    name: 'Animation',
    is_active: true
  },
  {
    id: 10,
    genre_id: 'Arthouse',
    code: 'Arthouse',
    name: 'Arthouse',
    is_active: true
  },
  {
    id: 11,
    genre_id: 'artificial_lntelligence',
    code: 'artificial_lntelligence',
    name: 'Artificial Intelligence',
    is_active: true
  },
  {
    id: 12,
    genre_id: 'award_winning',
    code: 'award_winning',
    name: 'Award Winning',
    is_active: true
  },
  {
    id: 13,
    genre_id: 'based_on_a_comic',
    code: 'based_on_a_comic',
    name: 'Based on a Comic',
    is_active: true
  },
  {
    id: 14,
    genre_id: 'based_on_true_story',
    code: 'based_on_true_story',
    name: 'Based on True Story',
    is_active: true
  },
  {
    id: 15,
    genre_id: 'betrayal',
    code: 'betrayal',
    name: 'Betrayal',
    is_active: true
  },
  {
    id: 16,
    genre_id: 'Biography',
    code: 'Biography',
    name: 'Biography',
    is_active: true
  },
  { id: 17, genre_id: 'bl', code: 'bl', name: 'BL', is_active: true },
  {
    id: 18,
    genre_id: 'bodyguard',
    code: 'bodyguard',
    name: 'Bodyguard',
    is_active: true
  },
  {
    id: 19,
    genre_id: 'bromance',
    code: 'bromance',
    name: 'Bromance',
    is_active: true
  },
  {
    id: 20,
    genre_id: 'Business',
    code: 'Business',
    name: 'Business',
    is_active: true
  },
  {
    id: 21,
    genre_id: 'Chambara',
    code: 'Chambara',
    name: 'Chambara',
    is_active: true
  },
  {
    id: 22,
    genre_id: 'childhood',
    code: 'childhood',
    name: 'Childhood',
    is_active: true
  },
  {
    id: 23,
    genre_id: 'Christmas',
    code: 'Christmas',
    name: 'Christmas',
    is_active: true
  },
  {
    id: 24,
    genre_id: 'cohabitation',
    code: 'cohabitation',
    name: 'Cohabitation',
    is_active: true
  },
  {
    id: 25,
    genre_id: 'cold_man',
    code: 'cold_man',
    name: 'Cold Man',
    is_active: true
  },
  {
    id: 26,
    genre_id: 'coma',
    code: 'coma',
    name: 'Coma',
    is_active: true
  },
  {
    id: 27,
    genre_id: 'comedy',
    code: 'comedy',
    name: 'Comedy',
    is_active: true
  },
  {
    id: 28,
    genre_id: 'Concert',
    code: 'Concert',
    name: 'Concert',
    is_active: true
  },
  {
    id: 29,
    genre_id: 'conspiracy',
    code: 'conspiracy',
    name: 'Conspiracy',
    is_active: true
  },
  {
    id: 30,
    genre_id: 'contract_relationship',
    code: 'contract_relationship',
    name: 'Contract Relationship',
    is_active: true
  },
  {
    id: 31,
    genre_id: 'cooking',
    code: 'cooking',
    name: 'Cooking',
    is_active: true
  },
  {
    id: 32,
    genre_id: 'corruption',
    code: 'corruption',
    name: 'Corruption',
    is_active: true
  },
  {
    id: 33,
    genre_id: 'Crime',
    code: 'Crime',
    name: 'Crime',
    is_active: true
  },
  {
    id: 34,
    genre_id: 'Criminal',
    code: 'Criminal',
    name: 'Criminal',
    is_active: true
  },
  {
    id: 35,
    genre_id: 'curse',
    code: 'curse',
    name: 'Curse',
    is_active: true
  },
  {
    id: 36,
    genre_id: 'cyberpunk',
    code: 'cyberpunk',
    name: 'Cyberpunk',
    is_active: true
  },
  {
    id: 37,
    genre_id: 'dance',
    code: 'dance',
    name: 'Dance',
    is_active: true
  },
  {
    id: 38,
    genre_id: 'deity',
    code: 'deity',
    name: 'Deity',
    is_active: true
  },
  {
    id: 39,
    genre_id: 'demon',
    code: 'demon',
    name: 'Demon',
    is_active: true
  },
  {
    id: 40,
    genre_id: 'Detective',
    code: 'Detective',
    name: 'Detective',
    is_active: true
  },
  {
    id: 41,
    genre_id: 'Disability',
    code: 'Disability',
    name: 'Disability',
    is_active: true
  },
  {
    id: 42,
    genre_id: 'disaster',
    code: 'disaster',
    name: 'Disaster',
    is_active: true
  },
  {
    id: 43,
    genre_id: 'Documentary',
    code: 'Documentary',
    name: 'Documentary',
    is_active: true
  },
  {
    id: 44,
    genre_id: 'doujinshi',
    code: 'doujinshi',
    name: 'Doujinshi',
    is_active: true
  },
  {
    id: 45,
    genre_id: 'drama',
    code: 'drama',
    name: 'Drama',
    is_active: true
  },
  {
    id: 46,
    genre_id: 'eastern',
    code: 'eastern',
    name: 'Eastern',
    is_active: true
  },
  {
    id: 47,
    genre_id: 'ecchi',
    code: 'ecchi',
    name: 'Ecchi',
    is_active: true
  },
  {
    id: 48,
    genre_id: 'Educational',
    code: 'Educational',
    name: 'Educational',
    is_active: true
  },
  {
    id: 49,
    genre_id: 'Entertainment',
    code: 'Entertainment',
    name: 'Entertainment',
    is_active: true
  },
  {
    id: 50,
    genre_id: 'Environment',
    code: 'Environment',
    name: 'Environment',
    is_active: true
  },
  {
    id: 51,
    genre_id: 'Erotica',
    code: 'Erotica',
    name: 'Erotica',
    is_active: true
  },
  {
    id: 52,
    genre_id: 'espionage',
    code: 'espionage',
    name: 'Espionage',
    is_active: true
  },
  {
    id: 53,
    genre_id: 'exorcism',
    code: 'exorcism',
    name: 'Exorcism',
    is_active: true
  },
  {
    id: 54,
    genre_id: 'Exploitation',
    code: 'Exploitation',
    name: 'Exploitation',
    is_active: true
  },
  {
    id: 55,
    genre_id: 'Fairy',
    code: 'Fairy',
    name: 'Fairy',
    is_active: true
  },
  {
    id: 56,
    genre_id: 'Family',
    code: 'Family',
    name: 'Family',
    is_active: true
  },
  {
    id: 57,
    genre_id: 'fantasy',
    code: 'fantasy',
    name: 'Fantasy',
    is_active: true
  },
  {
    id: 58,
    genre_id: 'Fashion',
    code: 'Fashion',
    name: 'Fashion',
    is_active: true
  },
  {
    id: 59,
    genre_id: 'Food',
    code: 'Food',
    name: 'Food',
    is_active: true
  },
  {
    id: 60,
    genre_id: 'Foreign',
    code: 'Foreign',
    name: 'Foreign',
    is_active: true
  },
  {
    id: 61,
    genre_id: 'friendship',
    code: 'friendship',
    name: 'Friendship',
    is_active: true
  },
  {
    id: 62,
    genre_id: 'game_developer',
    code: 'game_developer',
    name: 'Game Developer',
    is_active: true
  },
  {
    id: 63,
    genre_id: 'Gangster',
    code: 'Gangster',
    name: 'Gangster',
    is_active: true
  },
  {
    id: 64,
    genre_id: 'Geishas',
    code: 'Geishas',
    name: 'Geishas',
    is_active: true
  },
  {
    id: 65,
    genre_id: 'goryeo_dynasty',
    code: 'goryeo_dynasty',
    name: 'Goryeo Dynasty',
    is_active: true
  },
  {
    id: 66,
    genre_id: 'grudge',
    code: 'grudge',
    name: 'Grudge',
    is_active: true
  },
  {
    id: 67,
    genre_id: 'gumiho',
    code: 'gumiho',
    name: 'Gumiho',
    is_active: true
  },
  {
    id: 68,
    genre_id: 'harem',
    code: 'harem',
    name: 'Harem',
    is_active: true
  },
  {
    id: 69,
    genre_id: 'hidden_identity',
    code: 'hidden_identity',
    name: 'Hidden Identity',
    is_active: true
  },
  {
    id: 70,
    genre_id: 'historical',
    code: 'historical',
    name: 'Historical',
    is_active: true
  },
  {
    id: 71,
    genre_id: 'horror',
    code: 'horror',
    name: 'Horror',
    is_active: true
  },
  {
    id: 72,
    genre_id: 'hostage',
    code: 'hostage',
    name: 'Hostage',
    is_active: true
  },
  {
    id: 73,
    genre_id: 'Human',
    code: 'Human',
    name: 'Human',
    is_active: true
  },
  {
    id: 74,
    genre_id: 'hypnotism',
    code: 'hypnotism',
    name: 'Hypnotism',
    is_active: true
  },
  {
    id: 75,
    genre_id: 'Idol_Drama',
    code: 'Idol_Drama',
    name: 'Idol Drama',
    is_active: true
  },
  {
    id: 76,
    genre_id: 'Indie',
    code: 'Indie',
    name: 'Indie',
    is_active: true
  },
  {
    id: 77,
    genre_id: 'Instructional',
    code: 'Instructional',
    name: 'Instructional',
    is_active: true
  },
  {
    id: 78,
    genre_id: 'Investigation',
    code: 'Investigation',
    name: 'Investigation',
    is_active: true
  },
  {
    id: 79,
    genre_id: 'jidai_geki',
    code: 'jidai_geki',
    name: 'Jidai Geki',
    is_active: true
  },
  {
    id: 80,
    genre_id: 'josei',
    code: 'josei',
    name: 'Josei',
    is_active: true
  },
  {
    id: 81,
    genre_id: 'kidnapping',
    code: 'kidnapping',
    name: 'Kidnapping',
    is_active: true
  },
  {
    id: 82,
    genre_id: 'Kung_Fu',
    code: 'Kung_Fu',
    name: 'Kung Fu',
    is_active: true
  },
  {
    id: 83,
    genre_id: 'Law',
    code: 'Law',
    name: 'Law',
    is_active: true
  },
  {
    id: 84,
    genre_id: 'legal',
    code: 'legal',
    name: 'legal',
    is_active: true
  },
  {
    id: 85,
    genre_id: 'Lesbian',
    code: 'Lesbian',
    name: 'Lesbian',
    is_active: true
  },
  {
    id: 86,
    genre_id: 'life',
    code: 'life',
    name: 'life',
    is_active: true
  },
  {
    id: 87,
    genre_id: 'mafia',
    code: 'mafia',
    name: 'Mafia',
    is_active: true
  },
  {
    id: 88,
    genre_id: 'magic',
    code: 'magic',
    name: 'Magic',
    is_active: true
  },
  {
    id: 89,
    genre_id: 'manga',
    code: 'manga',
    name: 'Manga',
    is_active: true
  },
  {
    id: 90,
    genre_id: 'manhua',
    code: 'manhua',
    name: 'Manhua',
    is_active: true
  },
  {
    id: 91,
    genre_id: 'martial_arts',
    code: 'martial_arts',
    name: 'Martial Arts',
    is_active: true
  },
  {
    id: 92,
    genre_id: 'mature',
    code: 'mature',
    name: 'Mature',
    is_active: true
  },
  {
    id: 93,
    genre_id: 'Medical',
    code: 'Medical',
    name: 'Medical',
    is_active: true
  },
  {
    id: 94,
    genre_id: 'melodrama',
    code: 'melodrama',
    name: 'melodrama',
    is_active: true
  },
  {
    id: 95,
    genre_id: 'mermaid',
    code: 'mermaid',
    name: 'Mermaid',
    is_active: true
  },
  {
    id: 96,
    genre_id: 'Military',
    code: 'Military',
    name: 'Military',
    is_active: true
  },
  {
    id: 97,
    genre_id: 'miniseries',
    code: 'miniseries',
    name: 'Miniseries',
    is_active: true
  },
  {
    id: 98,
    genre_id: 'monster',
    code: 'monster',
    name: 'Monster',
    is_active: true
  },
  {
    id: 99,
    genre_id: 'murder',
    code: 'murder',
    name: 'Murder',
    is_active: true
  },
  {
    id: 100,
    genre_id: 'Music',
    code: 'Music',
    name: 'Music',
    is_active: true
  },
  {
    id: 101,
    genre_id: 'Musical',
    code: 'Musical',
    name: 'Musical',
    is_active: true
  },
  {
    id: 102,
    genre_id: 'mystery',
    code: 'mystery',
    name: 'Mystery',
    is_active: true
  },
  {
    id: 103,
    genre_id: 'Myth',
    code: 'Myth',
    name: 'Myth',
    is_active: true
  },
  {
    id: 104,
    genre_id: 'Mythology',
    code: 'Mythology',
    name: 'Mythology',
    is_active: true
  },
  {
    id: 105,
    genre_id: 'Nature',
    code: 'Nature',
    name: 'Nature',
    is_active: true
  },
  {
    id: 106,
    genre_id: 'neighbours',
    code: 'neighbours',
    name: 'Neighbours',
    is_active: true
  },
  {
    id: 107,
    genre_id: 'noir',
    code: 'noir',
    name: 'Noir',
    is_active: true
  },
  {
    id: 108,
    genre_id: 'north_korea',
    code: 'north_korea',
    name: 'North Korea',
    is_active: true
  },
  {
    id: 109,
    genre_id: 'novel',
    code: 'novel',
    name: 'Novel',
    is_active: true
  },
  {
    id: 110,
    genre_id: 'Omnibus',
    code: 'Omnibus',
    name: 'Omnibus',
    is_active: true
  },
  {
    id: 111,
    genre_id: 'one_shot',
    code: 'one_shot',
    name: 'One shot',
    is_active: true
  },
  {
    id: 112,
    genre_id: 'Period',
    code: 'Period',
    name: 'Period',
    is_active: true
  },
  {
    id: 113,
    genre_id: 'phobia',
    code: 'phobia',
    name: 'Phobia',
    is_active: true
  },
  {
    id: 114,
    genre_id: 'poison',
    code: 'poison',
    name: 'Poison',
    is_active: true
  },
  {
    id: 115,
    genre_id: 'police',
    code: 'police',
    name: 'police',
    is_active: true
  },
  {
    id: 116,
    genre_id: 'political',
    code: 'political',
    name: 'political',
    is_active: true
  },
  {
    id: 117,
    genre_id: 'Prison',
    code: 'Prison',
    name: 'Prison',
    is_active: true
  },
  {
    id: 118,
    genre_id: 'Professional',
    code: 'Professional',
    name: 'Professional',
    is_active: true
  },
  {
    id: 119,
    genre_id: 'programmer',
    code: 'programmer',
    name: 'Programmer',
    is_active: true
  },
  {
    id: 120,
    genre_id: 'psychiatry',
    code: 'psychiatry',
    name: 'psychiatry',
    is_active: true
  },
  {
    id: 121,
    genre_id: 'psychological',
    code: 'psychological',
    name: 'Psychological',
    is_active: true
  },
  {
    id: 122,
    genre_id: 'Reality',
    code: 'Reality',
    name: 'Reality',
    is_active: true
  },
  {
    id: 123,
    genre_id: 'Reality_Show',
    code: 'Reality_Show',
    name: 'Reality Show',
    is_active: true
  },
  {
    id: 124,
    genre_id: 'reality_tv',
    code: 'reality_tv',
    name: 'Reality TV',
    is_active: true
  },
  {
    id: 125,
    genre_id: 'Rebellion',
    code: 'Rebellion',
    name: 'Rebellion',
    is_active: true
  },
  {
    id: 126,
    genre_id: 'religion',
    code: 'religion',
    name: 'Religion',
    is_active: true
  },
  {
    id: 127,
    genre_id: 'Renzoku',
    code: 'Renzoku',
    name: 'Renzoku',
    is_active: true
  },
  {
    id: 128,
    genre_id: 'Republic',
    code: 'Republic',
    name: 'Republic',
    is_active: true
  },
  {
    id: 129,
    genre_id: 'resurrection',
    code: 'resurrection',
    name: 'Resurrection',
    is_active: true
  },
  {
    id: 130,
    genre_id: 'revenge',
    code: 'revenge',
    name: 'Revenge',
    is_active: true
  },
  {
    id: 131,
    genre_id: 'rich_man',
    code: 'rich_man',
    name: 'Rich Man',
    is_active: true
  },
  {
    id: 132,
    genre_id: 'robot',
    code: 'robot',
    name: 'Robot',
    is_active: true
  },
  {
    id: 133,
    genre_id: 'romance',
    code: 'romance',
    name: 'Romance',
    is_active: true
  },
  {
    id: 134,
    genre_id: 'RPG',
    code: 'RPG',
    name: 'RPG',
    is_active: true
  },
  {
    id: 135,
    genre_id: 'Rural',
    code: 'Rural',
    name: 'Rural',
    is_active: true
  },
  {
    id: 136,
    genre_id: 'Samurai',
    code: 'Samurai',
    name: 'Samurai',
    is_active: true
  },
  {
    id: 137,
    genre_id: 'scholar',
    code: 'scholar',
    name: 'Scholar',
    is_active: true
  },
  {
    id: 138,
    genre_id: 'School',
    code: 'School',
    name: 'School',
    is_active: true
  },
  {
    id: 139,
    genre_id: 'sci_fi',
    code: 'sci_fi',
    name: 'Sci-fi',
    is_active: true
  },
  {
    id: 140,
    genre_id: 'seinen',
    code: 'seinen',
    name: 'Seinen',
    is_active: true
  },
  {
    id: 141,
    genre_id: 'serial_killer',
    code: 'serial_killer',
    name: 'Serial Killer',
    is_active: true
  },
  {
    id: 142,
    genre_id: 'Short',
    code: 'Short',
    name: 'Short',
    is_active: true
  },
  {
    id: 143,
    genre_id: 'sismance',
    code: 'sismance',
    name: 'Sismance',
    is_active: true
  },
  {
    id: 144,
    genre_id: 'Sitcom',
    code: 'Sitcom',
    name: 'Sitcom',
    is_active: true
  },
  {
    id: 145,
    genre_id: 'slapstick',
    code: 'slapstick',
    name: 'Slapstick',
    is_active: true
  },
  {
    id: 146,
    genre_id: 'slice_of_life',
    code: 'slice_of_life',
    name: 'Slice of Life',
    is_active: true
  },
  {
    id: 147,
    genre_id: '*****',
    code: '*****',
    name: '*****',
    is_active: true
  },
  {
    id: 148,
    genre_id: 'Society',
    code: 'Society',
    name: 'Society',
    is_active: true
  },
  {
    id: 149,
    genre_id: 'soulmates',
    code: 'soulmates',
    name: 'Soulmates',
    is_active: true
  },
  {
    id: 150,
    genre_id: 'splatter',
    code: 'splatter',
    name: 'Splatter',
    is_active: true
  },
  {
    id: 151,
    genre_id: 'sports',
    code: 'sports',
    name: 'Sports',
    is_active: true
  },
  {
    id: 152,
    genre_id: 'stage_play',
    code: 'stage_play',
    name: 'Stage Play',
    is_active: true
  },
  {
    id: 153,
    genre_id: 'supernatural',
    code: 'supernatural',
    name: 'Supernatural',
    is_active: true
  },
  {
    id: 154,
    genre_id: 'survival',
    code: 'survival',
    name: 'Survival',
    is_active: true
  },
  {
    id: 155,
    genre_id: 'Suspense',
    code: 'Suspense',
    name: 'Suspense',
    is_active: true
  },
  {
    id: 156,
    genre_id: 'swordsman',
    code: 'swordsman',
    name: 'Swordsman',
    is_active: true
  },
  {
    id: 157,
    genre_id: 'taiga_drama',
    code: 'taiga_drama',
    name: 'Taiga drama',
    is_active: true
  },
  {
    id: 158,
    genre_id: 'teamwork',
    code: 'teamwork',
    name: 'Teamwork',
    is_active: true
  },
  {
    id: 159,
    genre_id: 'tearjerker',
    code: 'tearjerker',
    name: 'Tearjerker',
    is_active: true
  },
  {
    id: 160,
    genre_id: 'Teen',
    code: 'Teen',
    name: 'Teen',
    is_active: true
  },
  {
    id: 161,
    genre_id: 'terrorist',
    code: 'terrorist',
    name: 'Terrorist',
    is_active: true
  },
  {
    id: 162,
    genre_id: 'thief',
    code: 'thief',
    name: 'Thief',
    is_active: true
  },
  {
    id: 163,
    genre_id: 'Thriller',
    code: 'Thriller',
    name: 'Thriller',
    is_active: true
  },
  {
    id: 164,
    genre_id: 'time_travel',
    code: 'time_travel',
    name: 'Time Travel',
    is_active: true
  },
  {
    id: 165,
    genre_id: 'Tokusatsu',
    code: 'Tokusatsu',
    name: 'Tokusatsu',
    is_active: true
  },
  {
    id: 166,
    genre_id: 'tomboy',
    code: 'tomboy',
    name: 'Tomboy',
    is_active: true
  },
  {
    id: 167,
    genre_id: 'tragedy',
    code: 'tragedy',
    name: 'Tragedy',
    is_active: true
  },
  {
    id: 168,
    genre_id: 'tragic_past',
    code: 'tragic_past',
    name: 'Tragic Past',
    is_active: true
  },
  {
    id: 169,
    genre_id: 'trauma',
    code: 'trauma',
    name: 'Trauma',
    is_active: true
  },
  {
    id: 170,
    genre_id: 'treason',
    code: 'treason',
    name: 'Treason',
    is_active: true
  },
  {
    id: 171,
    genre_id: 'triad',
    code: 'triad',
    name: 'Triad',
    is_active: true
  },
  {
    id: 172,
    genre_id: 'underworld',
    code: 'underworld',
    name: 'Underworld',
    is_active: true
  },
  {
    id: 173,
    genre_id: 'urban_drama',
    code: 'urban_drama',
    name: 'urban drama',
    is_active: true
  },
  {
    id: 174,
    genre_id: 'vampire',
    code: 'vampire',
    name: 'Vampire',
    is_active: true
  },
  {
    id: 175,
    genre_id: 'Variety',
    code: 'Variety',
    name: 'Variety',
    is_active: true
  },
  {
    id: 176,
    genre_id: 'variety_show',
    code: 'variety_show',
    name: 'Variety show',
    is_active: true
  },
  {
    id: 177,
    genre_id: 'War',
    code: 'War',
    name: 'War',
    is_active: true
  },
  {
    id: 178,
    genre_id: 'warrior',
    code: 'warrior',
    name: 'Warrior',
    is_active: true
  },
  {
    id: 179,
    genre_id: 'web_series',
    code: 'web_series',
    name: 'Web Series',
    is_active: true
  },
  {
    id: 180,
    genre_id: 'werewolf',
    code: 'werewolf',
    name: 'Werewolf',
    is_active: true
  },
  {
    id: 181,
    genre_id: 'western',
    code: 'western',
    name: 'Western',
    is_active: true
  },
  {
    id: 182,
    genre_id: 'witch',
    code: 'witch',
    name: 'Witch',
    is_active: true
  },
  {
    id: 183,
    genre_id: 'workplace',
    code: 'workplace',
    name: 'Workplace',
    is_active: true
  },
  {
    id: 184,
    genre_id: 'Wuxia',
    code: 'Wuxia',
    name: 'Wuxia',
    is_active: true
  },
  {
    id: 185,
    genre_id: 'Yakuza',
    code: 'Yakuza',
    name: 'Yakuza',
    is_active: true
  },
  {
    id: 186,
    genre_id: 'yaoi',
    code: 'yaoi',
    name: 'Yaoi',
    is_active: true
  },
  {
    id: 187,
    genre_id: 'Youth',
    code: 'Youth',
    name: 'Youth',
    is_active: true
  },
  {
    id: 188,
    genre_id: 'yuri',
    code: 'yuri',
    name: 'Yuri',
    is_active: true
  },
  {
    id: 189,
    genre_id: 'Zombie',
    code: 'Zombie',
    name: 'Zombie',
    is_active: true
  }
];

const asian_films_country = [];
const asian_drama_countries = [{'country_id': 6, 'name': 'American'}, {'country_id': 5, 'name': 'Chinese'}, {'country_id': 4, 'name': 'Hong Kong'}, {'country_id': 13, 'name': 'Indian'}, {'country_id': 2, 'name': 'Japanese'}, {'country_id': 1, 'name': 'Korean'}, {'country_id': 12, 'name': 'Philippine'}, {'country_id': 3, 'name': 'Taiwanese'}, {'country_id': 11, 'name': 'Thailand'}, {'country_id': 10, 'name': 'Other Asian Countries'}];
asian_drama_countries.filter((item) => item.name !== 'American').map((item, i) => {
    return asian_films_country.push({'id': i, 'country_id': item.country_id, code: item.name.replaceAll(" ", "-").toLowerCase(), 'name': item.name, 'is_active': true});
  });


// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
// Anime Filter
const anime_genres = ['Action', 'Adventure', 'Cars', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mahou Shoujo', 'Mecha', 'Music', 'Mystery', 'Psychological', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural', 'Thriller'];

// Anime Types
const anime_types = ['ANIME', 'MANGA'];

// Anime Formats
const anime_formats = ['TV', 'TV_SHORT', 'MOVIE', 'SPECIAL', 'OVA', 'ONA', 'MUSIC'];

// Anime Sorts
const anime_sorts = ['POPULARITY_DESC', 'POPULARITY', 'TRENDING_DESC', 'TRENDING', 'UPDATED_AT_DESC', 'UPDATED_AT', 'START_DATE_DESC', 'START_DATE', 'END_DATE_DESC', 'END_DATE', 'FAVOURITES_DESC', 'FAVOURITES', 'SCORE_DESC', 'SCORE', 'TITLE_ROMAJI_DESC', 'TITLE_ROMAJI', 'TITLE_ENGLISH_DESC', 'TITLE_ENGLISH', 'TITLE_NATIVE_DESC', 'TITLE_NATIVE', 'EPISODES_DESC', 'EPISODES', 'ID', 'ID_DESC'].sort();

// Anime Status
const anime_statuses = ['RELEASING', 'FINISHED', 'NOT_YET_RELEASED', 'CANCELLED', 'HIATUS'];

// Anime Seasons
const anime_seasons = ['WINTER', 'SPRING', 'SUMMER', 'FALL'];

// ---------------------------------------------------------------------------------------------------------------------

const account_pages = [{'id': 1, 'icon': '', 'code': 'login', 'name': 'Login', 'url': ''}];

const ads = [ {id: 1, name: 'Shopee', video: 'shopee.mp4', link: 'https://shopee.ph/', totalDuration: 30, skipDuration: 5},
              {id: 2, name: 'Nescafe', video: 'nescafe.mp4', link: 'https://www.nescafe.com/ph/', totalDuration: 90, skipDuration: 5},
              {id: 3, name: 'Netflix', video: 'netflix.mp4', link: 'https://www.netflix.com/ph-en/', totalDuration: 68, skipDuration: 5},
              {id: 4, name: 'Voltes 5: Legacy', video: 'voltes_5_legacy.mp4', link: 'https://www.gmanetwork.com/entertainment/tv/voltes_v_legacy/home/', totalDuration: 30, skipDuration: 5},
              {id: 5, name: 'Insidious: The Red Door', video: 'insidious_the_red_door.mp4', link: 'https://www.sonypictures.com/movies/insidiousthereddoor', totalDuration: 99, skipDuration: 5},
              {id: 6, name: 'Department of Health', video: 'doh_family_planning.mp4', link: 'https://doh.gov.ph/family-planning', totalDuration: 47, skipDuration: 5},
              {id: 7, name: 'Welcome Back to the Philippines!', video: 'tourism.mp4', link: 'http://visitor.tourism.gov.ph', totalDuration: 66, skipDuration: 5},
            ];

const carousel_settings = {
  arrows: false,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  ease: 'linear',
  className: 'carousel_slick',
  // adaptiveHeight: true,
  pauseOnHover: true,
  // appendDots: dots => <ul style={{ color: 'white' }}>{dots}</ul>,
  // customPaging: function(slick,index) {
  //   var targetImage = slick.$slides.eq(index).find('img').attr('src');    
    
  //   return (<div className="ft-slick__dots--custom">
  //             <div className="loading" />{targetImage}•
  //           </div>)
  // }
  variableWidth: false,
  swipeToSlide: true,
  centerPadding: '0px',
  centerMode: false,
  // vertical: false,

};

const top_played_carousel_settings = {
  arrows: true,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  ease: 'linear',
  className: 'carousel_slick',
  pauseOnHover: true,
  variableWidth: false,
  swipeToSlide: true,
  // centerPadding: '0px',
  centerMode: false,
  nextArrow: <SampleNextArrow/>,
  prevArrow: <SamplePrevArrow/>

};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", backgroundColor: 'rgba(255,255,255,0.2)', padding: '5px 10px 8px 5px', borderRadius: '20px', zIndex: 20 }}
      onClick={onClick}
    >
      <ArrowForwardIosIcon sx={{ color: '#DC4C64', fontWeight: 550 }}/>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", backgroundColor: 'rgba(255,255,255,0.3)', padding: '5px 10px 8px 5px', borderRadius: '20px', zIndex: 20 }}
      onClick={onClick}
    >
      <ArrowBackIosNewIcon sx={{ color: '#DC4C64', fontWeight: 550 }}/>
    </div>
  );
}

const movie_card_carousel_settings = {
  arrows: isMobile ? false : true,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToScroll: 2,
  // autoplay: true,
  // autoplaySpeed: 5000,
  ease: 'linear',
  className: 'carousel_slick',
  variableWidth: true,
  // vertical: false,
  nextArrow: <SampleNextArrow/>,
  prevArrow: <SamplePrevArrow/>
};

const suggestion_movie_card_carousel_settings = {
  arrows: isMobile ? false : true,
  dots: false,
  infinite: false,
  speed: 500,
  slidesToScroll: 2,
  ease: 'linear',
  className: 'carousel_slick',
  variableWidth: true,
  // vertical: false,
  nextArrow: <SampleNextArrow/>,
  prevArrow: <SamplePrevArrow/>
};

const movie_genre_carousel_settings = {
  arrows: isMobile ? false : true,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToScroll: 3,
  // autoplay: true,
  // autoplaySpeed: 5000,
  ease: 'linear',
  className: 'carousel_slick',
  variableWidth: true,
  // vertical: false,
  nextArrow: <SampleNextArrow/>,
  prevArrow: <SamplePrevArrow/>
};

const manual_selection_carousel_settings = {
  arrows: isMobile ? false : true,
  dots: false,
  speed: 500,
  slidesToScroll: 3,
  autoplay: false,
  autoplaySpeed: 5000,
  ease: 'linear',
  className: 'carousel_slick',
  variableWidth: true,
  // vertical: false,
  nextArrow: <SampleNextArrow/>,
  prevArrow: <SamplePrevArrow/>
}

const stream_server_carousel_settings = {
  arrows: isMobile ? false : true,
  dots: false,
  speed: 500,
  slidesToScroll: 3,
  autoplay: false,
  autoplaySpeed: 5000,
  ease: 'linear',
  className: 'carousel_slick',
  variableWidth: true,
  // vertical: false,
  nextArrow: <SampleNextArrow/>,
  prevArrow: <SamplePrevArrow/>
}

const anime_character_carousel_settings = {
  arrows: isMobile ? false : true,
  dots: false,
  infinite: false,
  speed: 500,
  autoplay: false,
  autoplaySpeed: 5000,
  ease: 'linear',
  className: 'carousel_slick',
  variableWidth: true,
  // vertical: false,
  nextArrow: <SampleNextArrow/>,
  prevArrow: <SamplePrevArrow/>
};

const recent_watch_carousel_settings = {
  arrows: isMobile ? false : true,
  dots: false,
  infinite: false,
  speed: 500,
  autoplay: false,
  autoplaySpeed: 5000,
  ease: 'linear',
  className: 'carousel_slick',
  variableWidth: true,
  // vertical: false,
  nextArrow: <SampleNextArrow/>,
  prevArrow: <SamplePrevArrow/>
};

const suggestion_carousel_settings = {
  arrows: false,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  autoplay: false,
  // autoplaySpeed: 5000,
  ease: 'linear',
  className: 'carousel_slick',
  // vertical: false,
  // adaptiveHeight: true,
  // pauseOnHover: true,
  // appendDots: dots => <ul style={{ color: 'white' }}>{dots}</ul>,
  // customPaging: i => (
  //   <div className="ft-slick__dots--custom">
  //     <div className="loading" />
  //   </div>
  // ),
  nextArrow: <SampleNextArrow/>,
  prevArrow: <SamplePrevArrow/>
  // variableWidth:true,

};
// 'Philippines', 'United States', 'Japan', 'Singapore', 'Thailand', 'China'
const allowed_countries = [];

const server_status = [ { id: 1, code: 'upcloud', name: 'UpCloud', status: 'stable' },
                        { id: 2, code: 'vidcloud', name: 'VidCloud', status: 'stable' } ];

const devAlert = [ {id: 1, type: 'info', message: 'Auto next episode in series.', status: 'features'}, 
                   {id: 2, type: 'info', message: 'Setting access for logged users.', status: 'features'} ];

export {  title,
          version,
          dev_portfolio, 
          fb_link, 
          linkedin_link, 
          github_link, 
          site_email, 
          search_bar, 
          defaultInternationalServer, 
          defaultInternationalVideoRes, 
          maxMediaSaved, 
          maxMediaSavedMessage, 
          pageLoadMS, 
          pages, 
          misc_pages, 
          account_pages, 
          allowed_countries, 
          ads, 
          carousel_settings, 
          top_played_carousel_settings, 
          movie_card_carousel_settings, 
          suggestion_movie_card_carousel_settings, 
          movie_genre_carousel_settings, 
          manual_selection_carousel_settings, 
          stream_server_carousel_settings, 
          anime_character_carousel_settings, 
          recent_watch_carousel_settings, 
          suggestion_carousel_settings, 
          foreign_genre, foreign_country, 
          asian_films_genre, 
          asian_films_country,
          anime_genres,
          anime_types, 
          anime_formats, 
          anime_sorts, 
          anime_statuses, 
          anime_seasons, 
          server_status,
          devAlert };