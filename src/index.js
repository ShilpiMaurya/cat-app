import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newCatData: null,
      isNewCatLoading: true,
      newCatError: null,

      isMarkedAsFav: false,
      markedFavError: null,

      favoritesData: null,
      isFavoritesLoading: false,
      favoritesError: null
    };
  }
  componentWillMount() {
    this.onLoadMorePics();
  }
  onLoadMorePics = () => {
    this.setState({ isNewCatloading: true });
    fetch("https://api.thecatapi.com/v1/images/search")
      .then(response => {
        return response.json();
      })
      .then(data => {
        const newState = {
          isNewCatLoading: false,
          newCatData: data[0]
        };
        this.setState(newState);
      });
  };
  onMarkAsFavorite = () => {
    const fetchPromise = fetch("https://api.thecatapi.com/v1/favourites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "85eb2c59-14e5-4281-ba81-ae03cde1d50a"
      },
      body: JSON.stringify({
        image_id: this.state.newCatData.id
      })
    });

    fetchPromise
      .then(response => {
        return response.json();
      })
      .then(() => {
        this.setState({ isMarkedAsFav: true });
      });
  };

  onGetMyFavorites = () => {
    this.setState({ isFavoritesLoading: true, favoritesData: null });
    fetch("https://api.thecatapi.com/v1/favourites", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "85eb2c59-14e5-4281-ba81-ae03cde1d50a"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("url", data[0].image.url);
        this.setState({
          favoritesData: data,
          isFavoritesLoading: false
        });
      });
  };

  getMarkAsFavButton = () => {
    if (this.state.isMarkedAsFav) {
      return (
        <span role="img" aria-labelledby="heart emoji" className="emoji">
          💕
        </span>
      );
    }
    return (
      <button className="button2" onClick={this.onMarkAsFavorite}>
        Mark as Favorite
      </button>
    );
  };

  getFavoriteComponent = () => {
    const jsxArray = [];
    for (let i = 0; i < this.state.favoritesData.length; i++) {
      jsxArray.push(
        // <img
        //   src={this.state.favoritesData[i].image.url}
        //   alt="fav cat images"
        //   style={{
        //     width: "10%"
        //   }}
        // />
        <div
          style={{
            backgroundImage: `url("${this.state.favoritesData[i].image.url}")`,
            width: "400px",
            height: "400px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            margin: "5px",
            borderRadius: "5px"
          }}
        ></div>
      );
    }
    return <div className="shilpi">{jsxArray}</div>;
  };

  render() {
    if (this.state.isNewCatLoading) {
      return <h1>Loading.....</h1>;
    } else {
      return (
        <div className="container">
          <div className="title">
            <h1>CAT'S WORLD</h1>
          </div>
          <div className="button-group">
            <button className="button1" onClick={this.onLoadMorePics}>
              Load More Pics
            </button>
            {this.getMarkAsFavButton()}
            <button className="button3" onClick={this.onGetMyFavorites}>
              Show my favourites
            </button>
          </div>
          <br />
          <br />
          {this.state.favoritesData ? (
            this.getFavoriteComponent()
          ) : (
            <div className="display">
              <img
                src={this.state.newCatData.url}
                alt="catimage"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%"
                }}
              />
            </div>
          )}
        </div>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
