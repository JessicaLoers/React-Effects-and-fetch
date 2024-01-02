// Importing necessary hooks from React
import { useState, useEffect } from "react";

// Defining a functional component named Joke
export default function Joke() {
  // Using the useState hook to create a state variable "joke" and a function "setJoke" to update it
  const [joke, setJoke] = useState();
  // Another state variable "id", initialized to 0, with its updater function "setId"
  const [id, setId] = useState(0);

  // useEffect hook is used here to perform side effects in the component
  useEffect(() => {
    // Defining an async function inside useEffect for fetching jokes
    async function startFetching() {
      // Fetching joke data from the API using the current "id" value
      const response = await fetch(
        `https://example-apis.vercel.app/api/bad-jokes/${id}`
      );
      // Parsing the JSON response to get the joke data as a JavaScript object
      const joke = await response.json();

      // Updating the "joke" state variable with the fetched joke data
      setJoke(joke);
    }

    // Calling the function to start fetching joke data
    startFetching();
  }, [id]); // Dependeny array on the "id" variable -  will re-run when "id" changes

  // Handling the case where no joke data is available
  if (!joke) {
    // If there is no joke, the component renders nothing
    return null;
  }

  // The component's JSX returned to be rendered
  return (
    <>
      <h1>{joke && joke.joke}</h1>
      <button type="button" onClick={() => setId(joke.nextId)}>
        Next Joke
      </button>
    </>
  );
}
