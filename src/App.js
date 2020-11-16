import react, { useEffect, useState} from "react";
import './styles/App.css';
import dummyData from "./dummyData";

import WarframeCard from "./Components/WarframeCard";


function App() {

  const [ framesData, setFramesData ] = useState([]);

  // for debugging
  console.log(dummyData);

  const fetchData = function() {
    // axios call for main data here
    setFramesData(dummyData)// will be res.data
  }

  useEffect(() => {
    fetchData();
  })
  

  return (
    <div className="App">
      {
        dummyData.map(iter => {
          return (
            <WarframeCard frameData={iter} />
          )
        })
      }
    </div>
  );
}

export default App;
