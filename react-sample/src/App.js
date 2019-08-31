import React, { useState } from 'react';
import Count from './Count';
import Button from './Button';

// class App extends React.Component {
//   state = {
//     count: 0,
//   };

//   increment = (e) => {
//     e.preventDefault();

//     // this.setState({ count: this.state.count + 1 })
//     this.setState((oldState) => {
//       return {
//         count: oldState.count + 1,
//       };
//     });
//   };

//   decrement = (e) => {
//     e.preventDefault();

//     // this.setState({ count: this.state.count - 1 })
//     this.setState((oldState) => {
//       return {
//         count: oldState.count - 1,
//       };
//     });
//   };

//   reset = (e) => {
//     e.preventDefault();

//     this.setState({ count: 0 });
//   };

//   render() {
//     return (
//       <div>
//         <Count count={this.state.count} />
//         <div>
//           <Button label={`Increase to ${this.state.count + 1}`} onClick={this.increment} />
//           <Button label="-" onClick={this.decrement} />
//         </div>
//         <div>
//           <Button label="Reset" onClick={this.reset} />
//         </div>
//       </div>
//     );
//   }
// }

function App() {
  const [count, setCount] = useState(0);

  const increment = (e) => {
    e.preventDefault();

    setCount((oldCount) => oldCount + 1);
  };
  const decrement = (e) => {
    e.preventDefault();

    setCount((oldCount) => oldCount - 1);
  };
  const reset = (e) => {
    e.preventDefault();

    setCount(0);
  };
  return (
    <div>
      <Count count={count} />
      <div>
        <Button label={`Increase to ${count + 1}`} onClick={increment} />
        <Button label="-" onClick={decrement} />
      </div>
      <div>
        <Button label="Reset" onClick={reset} />
      </div>
    </div>
  );
}

export default App;
