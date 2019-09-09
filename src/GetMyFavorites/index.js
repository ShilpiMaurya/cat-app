import React from "react";
import DispalyGrid from "../Components/DisplayGrid";
export default class GetMyFavorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritesData: null,
      isFavoritesLoading: true
    };
  }
  componentDidMount() {
    this.onGetMyFavorites();
  }
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
        console.log("see", data);
        this.setState({
          favoritesData: data,
          isFavoritesLoading: false
        });
      });
  };
  render() {
    console.log("data", this.state.favoritesData);

    return (
      <>
        {this.state.isFavoritesLoading ? (
          "Loading..."
        ) : (
          <DispalyGrid favoriteData={this.state.favoritesData} />
        )}
      </>
    );
  }
}
