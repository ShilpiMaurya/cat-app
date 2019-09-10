import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import LoadMoreCats from "./LoadMoreCats/index";
import GetMyFavorites from "./GetMyFavorites";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Title from "./Components/Title";

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
      <div className="container">
        <Title title="Cat`s World" className="text" />
        <Tabs>
          <TabList className="tab">
            <Tab>Show New Cats</Tab>
            <Tab>Show My favorite Cats</Tab>
          </TabList>
          <TabPanel>
            <LoadMoreCats />
          </TabPanel>
          <TabPanel>
            <GetMyFavorites />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
