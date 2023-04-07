import {React, useState, useEffect} from 'react';

export default function SinglePage() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/api/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return(

    <h2>Single: <p>The current time is {currentTime}.</p></h2>
  );
}
