import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import Title from "./Components/Title";
import Button from "./Components/Button";
import Display1 from "./Components/Display1";

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
      <Button onButtonClick={this.onMarkAsFavorite}>Mark as Favorite</Button>
    );
  };

  getFavoriteComponent = () => {
    const jsxArray = [];
    for (let i = 0; i < this.state.favoritesData.length; i++) {
      jsxArray.push(
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
          <Title title="Cat's World" />
          <div className="button-group">
            <Button onButtonClick={this.onLoadMorePics}>Load More Pics</Button>
            {this.getMarkAsFavButton()}
            <Button onButtonClick={this.onGetMyFavorites}>
              Show my favourites
            </Button>
          </div>
          <br />
          <br />
          {this.state.favoritesData ? (
            this.getFavoriteComponent()
          ) : (
            <div className="display">
              <Display1>
                image={this.state.newCatData.url}
                sty=
                {{
                  maxWidth: "100%",
                  maxHeight: "100%"
                }}
              </Display1>
            </div>
          )}
        </div>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
