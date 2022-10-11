
import { useRef, useState } from 'react';
import { FaClipboard } from 'react-icons/fa';
import './App.css';

function App() {
  const [length, setLength] = useState(20);
  const [hasUppercase, setHasUppercase] = useState(true);
  const [hasLowercase, setHasLowercase] = useState(true);
  const [hasNumbers, setHasNumbers] = useState(true);
  const [hasSymbols, setHasSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const passwordRef = useRef();

  const getRandomUpper = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  };

  const getRandomLower = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  };

  const getRandomNumber = () => {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  };

  const getRandomSymbol = () => {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const randomFunc = {
    upper: getRandomUpper,
    lower: getRandomLower,
    number: getRandomNumber,
    symbol: getRandomSymbol,
  };

  const handlePassword = (upper, lower, number, symbol, length) => {
    let generatedPassword = '';
    const countLower = lower ? 1 : 0;
    const countUpper = upper ? 1 : 0;
    const countNumber = number ? 1 : 0;
    const countSymbol = symbol ? 1 : 0;
    const typesCount = countLower + countUpper + countNumber + countSymbol;
    const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(
      (item) => Object.values(item)[0]
    );

    if (typesCount === 0) {
      setPassword('');
    }

    for (let i = 0; i < length; i += +typesCount) {
      typesArr.forEach((type) => {
        const funcName = Object.keys(type)[0];
        generatedPassword += randomFunc[funcName]();
      });
    }

    const finalPassword = generatedPassword.slice(0, length);

    setPassword(finalPassword);
  };

  const handleClipboard = () => {
    if (!password) {
      return;
    }

    passwordRef.current.focus();
    navigator.clipboard.writeText(password);
    setPassword('');
    alert('Password copied to clipboard!');
  };

  return (
    <div className="App">
      <div className="container">
        <h2>Password Generator</h2>
        <div className="result-container">
          <span ref={passwordRef} className="result">
            {password}
          </span>
          <button className="btn" onClick={handleClipboard}>
            <FaClipboard />
          </button>
        </div>
        <div className="settings">
          <div className="setting">
            <label htmlFor="length">Password Length</label>
            <input
              type="number"
              id="length"
              min="4"
              max="20"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
          <div className="setting">
            <label htmlFor="uppercase">Include Uppercase Letters</label>
            <input
              type="checkbox"
              id="uppercase"
              checked={hasUppercase}
              onClick={() => setHasUppercase((prev) => !prev)}
            />
          </div>
          <div className="setting">
            <label htmlFor="lowercase">Include Lowercase Letters</label>
            <input
              type="checkbox"
              id="lowercase"
              checked={hasLowercase}
              onClick={() => setHasLowercase((prev) => !prev)}
            />
          </div>
          <div className="setting">
            <label htmlFor="numbers">Include Numbers</label>
            <input
              type="checkbox"
              id="numbers"
              checked={hasNumbers}
              onClick={() => setHasNumbers((prev) => !prev)}
            />
          </div>
          <div className="setting">
            <label htmlFor="symbols">Include Symbols</label>
            <input
              type="checkbox"
              id="symbols"
              checked={hasSymbols}
              onClick={() => setHasSymbols((prev) => !prev)}
            />
          </div>
        </div>
        <button
          className="btn btn-large"
          onClick={() =>
            handlePassword(
              hasUppercase,
              hasLowercase,
              hasNumbers,
              hasSymbols,
              length
            )
          }
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;