import "./App.css";
import React from "react";
import Board from "./Board";
import { Button, Select, CardPanel } from "react-materialize";
import "materialize-css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      shouldShowBoard: false,
      noOfCards: 0,
    };

    this.handleStart = this.handleStart.bind(this);
    this.setLevel = this.setLevel.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  levels = [
    { id: 0, name: "--Select--", noOfCards: 0 },
    { id: 1, name: "Easy", noOfCards: 2 },
    { id: 2, name: "Medium", noOfCards: 5 },
    { id: 3, name: "Difficult", noOfCards: 10 },
  ];

  // Reset the game after completing or quitting it
  refresh() {
    this.setState({ shouldShowBoard: false });
  }

  // Start the game after verifying valid selection of level
  handleStart() {
    if (this.state.noOfCards === 0) {
      alert("Please choose a level");
    } else {
      this.setState({ shouldShowBoard: true });
    }
  }

  // assign no. of cards to be shown based on the level selected
  setLevel(e) {
    let idx = e.target.selectedIndex;
    let dataset = e.target.options[idx].dataset;
    this.setState({ noOfCards: Number(dataset.noofcards) });
  }

  render() {
    let levelOptions =
      this.levels.length > 0 &&
      this.levels.map((item, i) => {
        return (
          <option key={i} data-noofcards={item.noOfCards} value={item.id}>
            {item.name}
          </option>
        );
      }, this);

    return (
      <div style={{ textAlign: "center", fontFamily: "Comic Sans MS" }}>
        <CardPanel
          style={{
            backgroundColor: "#e0e0e0",
          }}
        >
          <h4>Memory Game</h4>
        </CardPanel>
        {this.state.shouldShowTryAgain ? null : (
          <div>
            Select a level :
            <div
              style={{
                width: "200px",
                display: "inline-block",
              }}
            >
              <Select
                disabled={this.state.shouldShowBoard}
                onChange={this.setLevel}
              >
                {levelOptions}
              </Select>
            </div>
            <Button
              style={{ fontFamily: "Comic Sans MS", marginLeft: "5px" }}
              waves="light"
              disabled={this.state.shouldShowBoard}
              onClick={this.handleStart}
            >
              Start
            </Button>
            <Button
              style={{ fontFamily: "Comic Sans MS", marginLeft: "5px" }}
              waves="light"
              disabled={!this.state.shouldShowBoard}
              onClick={() => {
                if (window.confirm("Are you sure you want to quit?")) {
                  this.refresh();
                }
              }}
            >
              Quit the game
            </Button>
          </div>
        )}
        {this.state.shouldShowBoard ? (
          <Board noOfCards={this.state.noOfCards} refresh={this.refresh} />
        ) : null}
        <div style={{ display: "flex", justifyContent: "center" }}></div>
      </div>
    );
  }
}

export default App;
