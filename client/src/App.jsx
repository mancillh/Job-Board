import 'semantic-ui-css/semantic.min.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([]);

// Fetch jobs from the server whenever searchQuery changes
useEffect(() => {
  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:3001/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query SearchJobs($term: String) {
                searchJobs(term: $term) {
                  _id
                  title
                  company
                  location
                  description
                }
              }
            `,
            variables: {
              term: searchQuery,
            },
          }),
        });

        const result = await response.json();
        console.log(result)
        
        setJobs(result.data.searchJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [searchQuery]);

  return (
    <>
      <Navbar />
      <Header onSearch={setSearchQuery} />
      <main>
      <div>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard key={job.id} job={job} />
              ))
            ) : (
              <p>No jobs found</p>
            )}
          </div>
      </main>
      <Footer />
    </>
  );
}
export default App;