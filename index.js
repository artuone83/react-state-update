import React, { Component, useState } from "react";
import { render } from "react-dom";
import "./style.css";

class IncrementClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      increment: 0
    };
    this.handleIncrement = this.handleIncrement.bind(this);
    this.add3 = this.add3.bind(this);
  }

  handleIncrement() {
    // this.setState({
    //   increment: this.state.increment + 1
    // });
    this.setState(prevState => {
      return {
        increment: prevState.increment + 1
      };
    });
    console.log("this.state.increment", this.state.increment);
  }

  add3() {
    this.handleIncrement();
    this.handleIncrement();
    this.handleIncrement();
  }

  render() {
    return (
      <div className="container">
        <h2>IncrementClass Componenet</h2>
        <p>Current State: {this.state.increment} </p>
        <button type="button" onClick={this.add3}>
          Add
        </button>
      </div>
    );
  }
}

const IncrementFunc = ({ increment, handleClick }) => {
  return (
    <div className="container">
      <h2>IncrementFunc Component</h2>
      <p>Current State: {increment} </p>
      <button type="button" onClick={handleClick}>
        Add
      </button>
    </div>
  );
};

const Subscribe = () => {
  const [inputValue, setInputValue] = useState("");
  const [submitValue, setSubmitValue] = useState("");
  const [isEmail, setIsEmail] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Subscribed");

    if (isEmail) {
      setSubmitValue(inputValue);
    } else {
      setIsEmail(false);
    }
  };

  const handleChange = e => {
    console.log("on input change value");
    setIsEmail(false);
    const currentValue = e.target.value;

    setInputValue(currentValue);
    setSubmitValue(inputValue);

    if (currentValue.includes("@")) {
      console.log("includes");
      setIsEmail(true);
    }

    if(!currentValue) {
      setSubmitValue('');
    }
  };

  return (
    <div className="container">
      <h2>Subscribe Functional Componenet</h2>
      <form onSubmit={handleSubmit} className="subscribe">
        <label>
          Email:
          <input
            onChange={handleChange}
            value={inputValue}
            type="email"
            className={`subscribe__email ${isEmail ? "success" : "error"}`}
          />
        </label>
        <input
          type="submit"
          value="Submit"
          aria-label="submit button"
          className="subscribe__submit"
          disabled={isEmail ? false : true}
        />
      </form>
      <p>
        Input value: {inputValue} <br />
        Input value length: {inputValue.length}
      </p>
      <p>
        Submit value: {submitValue} <br />
        Submit value length: {submitValue.length}
      </p>
      <p
        className={`${isEmail ? "success" : "error"}`}
      >{`Email correct: ${isEmail}`}</p>
    </div>
  );
};

const App = () => {
  const [increment, setIncrement] = useState(0);

  const handleIncrement = () => {
    // setIncrement(increment + 1);
    setIncrement(prevIncrement => {
      return prevIncrement + 1;
    });
    console.log("increment state", increment); // we are one value behind
  };

  const add3 = () => {
    console.log("Clicked");
    handleIncrement();
    handleIncrement();
    handleIncrement();
  };

  return (
    <div>
      <h1>Why is STATE giving me the wrong value?</h1>
      <IncrementFunc increment={increment} handleClick={add3} />
      <IncrementClass />
      <Subscribe />
    </div>
  );
};

render(<App />, document.getElementById("root"));
