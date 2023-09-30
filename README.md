# React + JSON server
HTTP requests with React

### JSON server
`npm i json-server`

[more info](https://github.com/typicode/json-server)

- Create this script in package.json
`"server": "json-server --watch data/db.json"`

Resources
  http://localhost:3000/countries

[images of flag](https://www.countryflags.com/)


### Retrieving data with React
- useState 
- useEffect 
- Asynchronous request with Fetch API

### Add data
- useState 
- Function after submit e send request Post

### Loading Dynamic of data
- Using set of useState
- With the old state
- Reset states of input

### Custom Hook for the Fetch
- Technique call custom hook
- Folder hooks
- Standard useName
- useFetch

### Refactoring the Post
- The same hook
- Create a new useEffect
- callFetch to fetch data
- httpConfig

### State of Loading 
- An interval between requests and the receipt of responses
- To users understand that loading
- Identify when it starts and when it ends

`const [loading, setLoading] = useState(false);`

### State of Loading in Post 
- Block undue actions as in POST
- Remove the action of adding other item, while the request still not finalized

- `{loading && (<input className="button" type="submit" disabled value="Please wait" />)}`
- `{!loading && (<input className="button" type="submit" value="Create" />)}`

### Handling errors
- try catch
- Change a state
- Predict various scenarios

`{error && (<div className="container-error"><h3>{error}</h3></div>)}`

### Axios in React

(A Guide)[https://www.geeksforgeeks.org/axios-in-react-a-guide-for-beginners/]