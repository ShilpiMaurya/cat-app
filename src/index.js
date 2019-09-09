import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import LoadMoreCats from "./LoadMoreCats/index";
import GetMyFavorites from "./GetMyFavorites";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

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
        <Tabs>
          <TabList>
            <Tab>SHOW NEW CATS</Tab>
            <Tab>SHOW MY FAVORITE</Tab>
          </TabList>
          <TabPanel>
            <LoadMoreCats />
          </TabPanel>
          <TabPanel>
            <GetMyFavorites />
          </TabPanel>
        </Tabs>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
