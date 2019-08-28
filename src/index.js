import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      imgObj: null
    };
  }
  onLoadMorePics = () => {
    this.setState({ loading: true });
    fetch("https://api.thecatapi.com/v1/images/search")
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        console.log(data[0].url);
        const newState = {
          loading: false,
          imgObj: data[0]
        };
        this.setState(newState);
      });
  };
  onGetMyFavorites = () => {
    fetch(
      "https://api.thecatapi.com/v1/favourites",
      { method: "GET" },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "85eb2c59-14e5-4281-ba81-ae03cde1d50a"
        },
        body: JSON.stringify({
          image_id: this.state.imgObj.id
        })
      }
    ).then(response => response.json());
  };

  componentWillMount() {
    this.onLoadMorePics();
  }
  onMarkAsFavorite = () => {
    fetch("https://api.thecatapi.com/v1/favourites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "85eb2c59-14e5-4281-ba81-ae03cde1d50a"
      },
      body: JSON.stringify({
        image_id: this.state.imgObj.id
      })
    }).then(response => response.json());
  };

  render() {
    if (this.state.loading === true) {
      return <h1>Loading.....</h1>;
    } else {
      return (
        <div>
          <h1>CAT'S WORLD</h1>
          <div>
            <button onClick={this.onLoadMorePics}>Load More Pics</button>
            <button onClick={this.onMarkAsFavorite}>Mark as Favorite</button>
            <button onClick={this.onGetMyFavorites}>Show my favourites</button>
          </div>
          <img
            src={this.state.imgObj.url}
            alt="catimage"
            style={{
              maxWidth: "100%",
              maxHeight: "100%"
            }}
          />
        </div>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
