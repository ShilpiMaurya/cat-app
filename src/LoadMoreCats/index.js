import React from "react";
import Button from "../Components/Button";
import Displayimage from "../Components/Displayimage";
export default class LoadMoreCats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newCatData: null,
      isNewCatLoading: true,
      isMarkedAsFav: false
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
          newCatData: data[0],
          isMarkedAsFav: false
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
  render() {
    return (
      <>
        {this.state.isNewCatLoading ? (
          "loading"
        ) : (
          <Displayimage
            image={this.state.newCatData.url}
            imagestyle={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        )}
        {this.state.isMarkedAsFav ? (
          <span role="img" aria-labelledby="heart emoji" className="emoji">
            💕
          </span>
        ) : (
          <Button onButtonClick={this.onMarkAsFavorite}>
            Mark as Favorite
          </Button>
        )}
        <Button onButtonClick={this.onLoadMorePics}>LoadMoreCats</Button>
      </>
    );
  }
}
