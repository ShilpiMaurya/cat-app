import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Title from "./Components/Title";
import LoadMoreCats from "./LoadMoreCats/index";
import GetMyFavorites from "./GetMyFavorites";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoadMoreCats: true,
      showMyFavorites: false
    };
  }

  render() {
    return (
      <>
        <button
          onClick={() => {
            this.setState({ showLoadMoreCats: true, showMyFavorites: false });
          }}
        >
          Tab 1
        </button>
        <button
          onClick={() => {
            this.setState({ showMyFavorites: true, showLoadMoreCats: false });
          }}
        >
          Tab 2
        </button>
        <Title title="Cat`s World" />
        {this.state.showLoadMoreCats && <LoadMoreCats />}
        {this.state.showMyFavorites && <GetMyFavorites />}
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
