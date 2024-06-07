import React, { useState, useEffect, useRef } from 'react';
import Ui_Ux from './component/Ui_Ux';

function App() {
  const paragraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, ullam. Perspiciatis mollitia, nam, sunt dolor vitae magni similique maxime voluptatem rerum saepe eos sed fugit animi blanditiis at tenetur. Accusantium?",
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum corrupti aut quaerat molestias excepturi soluta quibusdam, consequatur sequi dolor quis. Necessitatibus eligendi incidunt rem iusto facilis natus porro est animi.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam vitae delectus itaque dolorem quasi aperiam eligendi illo, molestias officia error a quidem asperiores. Dolorem corporis deserunt, repellat iste minus adipisci.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur iste ipsa sit, necessitatibus sed aperiam sint maiores voluptas laudantium ullam, eos corrupti repellendus illo eius voluptates ad cum molestiae saepe!",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam at sequi quam distinctio numquam fuga voluptate minima amet tempore nobis illum necessitatibus saepe omnis architecto quae, cum temporibus mollitia illo.",
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam, quibusdam! Sunt error ipsam voluptas ea corrupti necessitatibus optio nam obcaecati vel quidem facilis blanditiis quaerat neque consectetur, tempora beatae odit?",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum iste recusandae dolor quam corporis, quae placeat eos a aliquam quia unde minima vitae rem at quas, dolore enim qui nam.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione asperiores ea beatae consectetur, exercitationem suscipit soluta nemo laborum possimus reprehenderit, eligendi labore doloremque libero quam? Sit obcaecati quos animi eius.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat maxime delectus hic harum voluptatibus corporis ipsam laborum placeat earum expedita unde, molestias debitis optio eaque natus, cumque architecto itaque doloribus.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptas veniam debitis, numquam atque eos adipisci similique! Corrupti quidem eius neque amet deleniti libero autem, dolor nemo, iure animi aperiam.",
  ];

  const [typingText, setTypingText] = useState(""); 
  const [inputFieldValue, setInputFieldValue] = useState(""); 
  const maxTime = 60; 
  const [timeLeft, setTimeLeft] = useState(60); 
  const [charIndex, setCharIndex] = useState(0); 
  const [mistakes, setMistakes] = useState(0); 
  const [isTyping, setIsTyping] = useState(false); 
  const [WPM, setWPM] = useState(0); 
  const [CPM, setCPM] = useState(0); 

  // Initialize the useRef hook for the input field
  const inputFieldRef = useRef(null);

  const Loading_paragraph = () => {
    const paraLength = paragraphs.length;
    const randomPara = Math.floor(Math.random() * paraLength);
    const paraContent = Array.from(paragraphs[randomPara]).map((letter, index) => (
      <span
        key={index}
        style={{ color: letter !== ' ' ? 'text-special_green' : 'transparent' }}
        className={`char ${index === 0 ? 'active' : ''}`}>
        {letter !== ' ' ? letter : '_'}
      </span>
    ));
    setTypingText(paraContent);
    setInputFieldValue('');
    setCharIndex(0);
    setMistakes(0);
    setIsTyping(false);
  };

  const Handel_Key = (event) => {
    const characters = document.querySelectorAll('.char');
    if (event.key === 'Backspace' && charIndex > 0 && charIndex < characters.length && timeLeft > 0) {
      if (characters[charIndex - 1].classList.contains('text-special_green')) {
        characters[charIndex - 1].classList.remove('text-special_green');
      }
      if (characters[charIndex - 1].classList.contains('text-special_red')) {
        characters[charIndex - 1].classList.remove('text-special_red');
      }
      characters[charIndex].classList.remove('active');
      characters[charIndex - 1].classList.add('active');
      setCharIndex(charIndex - 1);
      updateCpmAndM(charIndex - 1, mistakes - 1);
    }
  };

  const Current_Typing = (event) => {
    const characters = document.querySelectorAll('.char');
    let typedChar = event.target.value;
    if (charIndex < characters.length && timeLeft > 0) {
      let currentChar = characters[charIndex].innerText;
      if (currentChar === "_") {
        currentChar = ' ';
      }
      if (!isTyping) {
        setIsTyping(true);
      }
      if (typedChar === currentChar) {
        setCharIndex(charIndex + 1);
        if (charIndex + 1 < characters.length) {
          characters[charIndex + 1].classList.add('active');
          characters[charIndex].classList.remove('active');
          characters[charIndex].classList.add('text-special_green');
        }
      } else {
        setCharIndex(charIndex + 1);
        setMistakes(mistakes + 1);
        if (charIndex + 1 < characters.length) {
          characters[charIndex + 1].classList.add('active');
          characters[charIndex].classList.remove('active');
          characters[charIndex].classList.add('text-special_red');
        }
      }
      if (charIndex === characters.length - 1) {
        setIsTyping(false);
      }
      updateCpmAndM(charIndex, mistakes);
    } else {
      setIsTyping(false);
    }
  };

  const restartGame = () => {
    setIsTyping(false);
    setTimeLeft(maxTime);
    setCharIndex(0);
    setMistakes(0);
    setTypingText('');
    setCPM(0);
    setWPM(0);
    const characters = document.querySelectorAll('.char');
    characters.forEach(span => {
      span.classList.remove('text-special_green', 'text-special_red', 'active');
    });
    characters[0].classList.add('active');
    Loading_paragraph();
  };

  const updateCpmAndM = (newCharIndex, newMistake) => {
    let newCpm = (newCharIndex - newMistake) * (60 / (maxTime - timeLeft));
    if (newCpm < 0 || !newCpm || newCpm === Infinity) {
      newCpm = 0;
    } else {
      newCpm = parseInt(newCpm, 10);
    }
    setCPM(newCpm);
    let newWpm = Math.round(((newCharIndex - newMistake) / 5) * (60 / (maxTime - timeLeft)));
    if (newWpm < 0 || !newWpm || newWpm === Infinity) {
      newWpm = 0;
    } else {
      newWpm = parseInt(newWpm, 10);
    }
    setWPM(newWpm);
  };

  useEffect(() => {
    Loading_paragraph();
  }, []);

  useEffect(() => {
    // Set focus on the input field when the component mounts
    inputFieldRef.current.focus();
  }, []);

  useEffect(() => {
    let interval;
    if (isTyping && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
        updateCpmAndM(charIndex, mistakes);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsTyping(false);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isTyping, timeLeft]);

  return (
    <>
      <input
        type="text"
        className="input-field"
        value={inputFieldValue}
        onChange={Current_Typing}
        onKeyDown={Handel_Key}
        ref={inputFieldRef} // Attach the ref to the input field
      />
      <Ui_Ux
        typingText={typingText}
        inputFieldValue={inputFieldValue}
        timeLeft={timeLeft}
        charIndex={charIndex}
        mistakes={mistakes}
        isTyping={isTyping}
        WPM={WPM}
        CPM={CPM}
        restartGame={restartGame}
        Handel_Key={Handel_Key}
        Current_Typing={Current_Typing}
      />
    </>
  );
}

export default App;
