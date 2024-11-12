import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZDgzYzFjOTQwOWZjNTkyMTQ3MWM3YWE5NGRhOWVkZCIsIm5iZiI6MTczMTQzMDkyOC45NjIyOTc0LCJzdWIiOiI2NzMyNWQ3YWE3ZmRjODYwODc4OGJiYmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.FdtdjpHtrhS6j92qm6YnDDXTdNJIOBbQXA1DM9joeBw`,
  },
});

export default api;
