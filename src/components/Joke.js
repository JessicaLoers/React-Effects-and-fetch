import { useState, useEffect } from "react";

export default function Joke() {
  const [joke, setJoke] = useState();
  const [id, setId] = useState(0);
  // New state variable for error tracking
  const [error, setError] = useState(false);

  useEffect(() => {
    async function startFetching() {
      try {
        // Reset error state before starting a new fetch
        setError(false);

        const response = await fetch(
          `https://example-apis.vercel.app/api/bad-jokes/${id}`
        );

        // Check if response is ok (status in the range 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const joke = await response.json();
        setJoke(joke);
      } catch (error) {
        // Catching any errors that occur during fetch or data processing
        console.error(error); // Log error to console (optional)
        setError(true); // Update error state
      }
    }

    startFetching();
  }, [id]);

  // Handling the case where an error occurred
  if (error) {
    return <p>Sorry, an error occurred while fetching the joke.</p>;
  }

  // Handling the case where no joke data is available
  if (!joke) {
    return null; // If there is no joke, the component renders nothing
  }

  return (
    <>
      <h1>{joke.joke}</h1>
      <button type="button" onClick={() => setId(joke.nextId)}>
        Next Joke
      </button>
    </>
  );
}
