import { useState, useEffect } from 'react';
import axios from 'axios';
export default function App() {
  //listen to the input n the form:
  const [term, setTerm] = useState('');
  const [result, setResult] = useState([]);

  //The first time the website launches, we want to collect the data from Wikipedia and render it in the website.
  useEffect(() => {
    const search = async () => {
      const response = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          //what we are searching for; it can be hard coded value as well or dynamic.
          srsearch: term,
        },
      });
      const data = response.data.query.search;
      console.log(data);
      setResult(data);
    };
    if (term) {
      search();
    }
  }, [term]);
  
  //handler functions:
  const termHandler = (event) => {
    const termInSearch = event.target.value;
    console.log(termInSearch);
    setTerm(termInSearch);
  };

  // const renderFetchData = <p>Hello</p>;

  const renderFetchData = result && result?.map((item) => {
    return (
      <tr>
        <th scope="row" key={item?.pageid}>
          1
        </th>
        <td>{item?.title}</td>
        <td>{item?.snippet}</td>
      </tr>
    );
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="my-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Search Input
            </label>
            <input
              value={term}
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              onChange={termHandler}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Desc</th>
              </tr>
            </thead>
            <tbody>{renderFetchData}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
