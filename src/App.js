import { useEffect, useState } from "react";
import "./App.css";
import useFetchJokes from "./hooks/useFecth";

function App() {
  const [getCategory, setGetCategory] = useState('animal');
  const { loading, data, error, fetchJokes } = useFetchJokes();
  const urlCategories = "https://api.chucknorris.io/jokes/categories";
  useEffect(() => {
    //fetch data at very display of web page
    fetchJokes(urlCategories);
  }, []);

  //categories
  const { loading: loadingcateg, data: dataCateg, error: errorCateg, fetchJokes: refetch } = useFetchJokes();

  useEffect(() => {
    //fetch data jokes dues categoriers
    const url = `https://api.chucknorris.io/jokes/random?category=${getCategory}`
    refetch(url);
  }, [getCategory]);

  const handleGetCategory = (category) => {
    setGetCategory(category)

  };
  console.log(dataCateg, 'data' )

  return (
    <div className="App">
      {loading && <p className="loading">loading data ...</p>}
      {error && <p className="error">{error}</p>}
      <div className="categories">
        {data?.map((category, idx) => {
          return (
            <div
              key={idx}
              className={getCategory===category?"category active": "category"}
              onClick={() => handleGetCategory(category)}
            >
              {category}
            </div>
          );
        })}
      </div>

      <div className="jokes">
        {loadingcateg && <p className="loading">loading jokes ...</p>}
        {errorCateg && <p className="error">{error}</p>}
        {dataCateg && <div className="joke">

          <h2>Selected Category: {dataCateg.categories[0]}</h2>
          <p>Value: {dataCateg.value}</p>
          </div>}
      
      </div>

      
    </div>
  );
}

export default App;
