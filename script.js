class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      movieName: "",
      movies: [],
      apiKey: `1b62ccff88d2cd537027e1d82920197b`
    };
    
    this.handleChange = this.handleChange.bind(this);
  }
  
  api(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ movies: data.results }));
  }
  
  handleChange() {
    this.setState({ movieName: this.refs.keyword.value.toLowerCase() });
    
    setTimeout(() => {
      this.api(`https://api.themoviedb.org/3/search/movie?api_key=${this.state.apiKey}&query=${this.state.movieName}`);
    }, 1000);

  }

  componentDidMount() {
    this.api(`https://api.themoviedb.org/3/discover/movie?api_key=${this.state.apiKey}&sort_by=popularity.desc&with_original_language=ko`);
  }
  
  render() {
    let movies = this.state.movies;
    
    return (
      <div>
        <div>
          <input
            type="text"
            value={this.state.movieName}
            ref="keyword"
            placeholder="Search for a movie →"
            onChange={this.handleChange}
          />
          
          <ul>
            {movies.map(movie => {
              return (
                <li>
                  <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}` : `https://www.societaetstheater.de/media/thumbnails/229/3b9e6b88f1adc1a78594de4e39819229/7adcc363/placeholder_portrait.png`} />

                  <div className="flex">
                    <h2>{movie.title}</h2>
                    <p className="star">
                      <span>⭐️⭐⭐</span> 
                      {Math.round(movie.vote_average)}
                    </p>
                    <p className="desc">
                      {movie.overview}
                    </p> 
                  </div>
                </li>
              );
            })}
          </ul>
          
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
