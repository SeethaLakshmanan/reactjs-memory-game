import React from "react";
import blank from "./images/blank.PNG";
import bells from "./images/bells.jpg";
import snow from "./images/snow.jpg";
import white from "./images/white.jpg";
import bliss from "./images/bliss.jpg";
import blueTree from "./images/blueTree.jpg";
import grinch from "./images/grinch.jpg";
import merry from "./images/merry.jpg";
import santa from "./images/santa.jpg";
import snowglobe from "./images/snowglobe.jpg";
import snowman from "./images/snowman.jpg";
import tree from "./images/tree.jpg";
import { CardPanel } from "react-materialize";

export default class Board extends React.Component {
  cardArrayWithDuplicates = [];
  allCards = [];

  constructor() {
    super();
    this.state = {
      cardArray: [],
      cardsChosen: [],
      cardsCompleted: [],
      // setting card dimensions based on the 'no. of cards' value sent by the parent class
      dimensions: {
        2: {
          width: 200,
          height: 250,
        },
        5: {
          width: 150,
          height: 200,
        },
        10: {
          width: 100,
          height: 150,
        },
      },
    };
    this.createBoard = this.createBoard.bind(this);
    this.flipCard = this.flipCard.bind(this);
    this.checkForMatch = this.checkForMatch.bind(this);
  }

  /* check if the 2 flipped cards are the same:
  if yes, then make them white else reset to start position.
  Congratulate and reset board once completed.
   */
  checkForMatch() {
    let { cardArray, cardsChosen, cardsCompleted } = this.state;
    if (cardArray[cardsChosen[0]] === cardArray[cardsChosen[1]]) {
      cardArray[cardsChosen[0]] = white;
      cardArray[cardsChosen[1]] = white;
      cardsCompleted.push(...cardsChosen);
    } else {
      cardArray[cardsChosen[0]] = blank;
      cardArray[cardsChosen[1]] = blank;
    }
    cardsChosen = [];
    this.setState({
      cardArray,
      cardsChosen,
      cardsCompleted,
    });
    if (this.state.cardsCompleted.length === this.state.cardArray.length) {
      alert("Congratulations!! :)");
      setTimeout(this.props.refresh, 500);
    }
  }

  // assign image to a card once it's clicked
  flipCard(counter) {
    let { cardArray, cardsChosen } = this.state;

    // if card already matched (white) or
    // if card currently flipped and you click on flipped card again
    if (cardArray[counter] === white || cardsChosen[0] === counter) {
      return;
    }

    cardArray[counter] = this.cardArrayWithDuplicates[counter];
    cardsChosen.push(counter);
    this.setState({
      cardArray: cardArray,
      cardsChosen: cardsChosen,
    });

    if (this.state.cardsChosen.length === 2) {
      setTimeout(this.checkForMatch, 500);
    }
  }

  componentDidMount() {
    // generating all cards list
    this.allCards = [
      bells,
      bliss,
      blueTree,
      grinch,
      merry,
      santa,
      snow,
      snowglobe,
      snowman,
      tree,
    ];

    // shuffling (TODO: use better way of shuffling)
    this.allCards = this.allCards.sort(() => 0.5 - Math.random());

    // generating required no. of cards with duplicates
    for (var x = 0; x < this.props.noOfCards; x++) {
      this.cardArrayWithDuplicates.push(this.allCards[x]);
      this.cardArrayWithDuplicates.push(this.allCards[x]);
    }
    this.cardArrayWithDuplicates = this.cardArrayWithDuplicates.sort(
      () => 0.5 - Math.random()
    );

    // generating cardArray with blanks to start the game with
    let { cardArray } = this.state;
    for (var i = 0; i < 2 * this.props.noOfCards; i++) {
      cardArray.push(blank);
    }
    this.setState({ cardArray: cardArray });
  }

  // create the board based on the 'no. of cards' value sent by the parent class
  createBoard() {
    let boardRows = [];
    let boardColumns = [];
    let { cardArray, dimensions } = this.state;
    cardArray.forEach((key, index) => {
      let x = (
        <td key={index}>
          <CardPanel style={{ textAlign: "center" }}>
            <img
              style={{
                width: dimensions[this.props.noOfCards].width,
                height: dimensions[this.props.noOfCards].height,
              }}
              onClick={() => this.flipCard(index)}
              key={index}
              src={key}
              alt={key}
            />
          </CardPanel>
        </td>
      );
      boardColumns.push(x);
      if ((index + 1) % this.props.noOfCards === 0) {
        boardRows.push(<tr key={index}>{boardColumns}</tr>);
        boardColumns = [];
      }
    });

    let board = (
      <div>
        <table style={{ width: "40%", margin: "auto" }}>
          <tbody>{boardRows}</tbody>
        </table>
      </div>
    );

    return board;
  }

  render() {
    return <div>{this.createBoard()}</div>;
  }
}
