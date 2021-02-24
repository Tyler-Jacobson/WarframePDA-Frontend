import { useEffect, useState} from "react";
import '../styles/Home.css';
import axios from "axios";

// ▲ ▼

const defaultItemsData = []

const Home = function() {
    // console.log("THIS IS PROPS", props);
    

    const [ itemsData, setItemsData ] = useState(defaultItemsData);

    // for debugging
    
  
    const fetchData = function() {
        
      axios.get("https://warframepda.herokuapp.com/items/all")
      .then((res) => {
        
        console.log("res.data", res.data)

        const arrayWithDataParams = addDataParameters(res.data)
        const arraySortedByProfit = sortByProfit(arrayWithDataParams)
        setItemsData(arraySortedByProfit)
        console.log("returned from sortByProfit", arraySortedByProfit)

      })
      .catch((err) => {
        console.log(err)
      })
    }

    useEffect(() => {
      fetchData();
    }, [])

    const addDataParameters = function(incomingArray) {

        const fullDataArray = []
        
        incomingArray.map((incomingItem) => {

            const partsArray = incomingItem.parts

            let minTotalCost = 0
            let maxTotalCost = 0
    
            const displayArray = []
    
            let setObject = {}
    
            partsArray.map(function(part) {
                const testobject = {
                    "sectionname" : part.partname,
                    "pricerange" : [part.orders[0].price, part.orders[part.orders.length - 1].price],
                    "dropdown" : true,
                    "fulldata" : part.orders
                }
    
                if (part.partname === "Set") {
                    testobject.sectionname = "Gained From Sold Set:"
                    setObject = testobject
                } else {
                    minTotalCost += testobject.pricerange[0]
                    maxTotalCost += testobject.pricerange[1]
    
                    displayArray.push(testobject)
                } 
                return null; // this does nothing, it's just to get rid of the warning
            })
    
            const totalCostObject = {
                "sectionname" : "Total Cost:",
                "pricerange" : [minTotalCost, maxTotalCost],
                "dropdown" : false,
                "fulldata" : null
            }
    
            const expectedProfitObject = {
                "sectionname" : "Profit Margin:",
                "pricerange" : [setObject.pricerange[0] - totalCostObject.pricerange[0], setObject.pricerange[1] - totalCostObject.pricerange[0]],
                "dropdown" : false,
                "fulldata" : null
            }
    
            displayArray.push(totalCostObject)
            displayArray.push(setObject)
            displayArray.push(expectedProfitObject)
    

            // takes the original incoming item and replaces its 'parts' array with the newly created one
            const outgoingItem = incomingItem
            outgoingItem.displayData = displayArray

            fullDataArray.push(outgoingItem)

            return null; // this does nothing, it's just to get rid of the warning
        })
        return fullDataArray
    }

    const sortByProfit = function(incomingArray) {
        
        const sortedArray = incomingArray.sort((a, b) => {
            return b.displayData[6].pricerange[0] - a.displayData[6].pricerange[0];
        });

        return sortedArray
    }

    const renderData = function() {
        return (
            <div>
                {
                    itemsData === defaultItemsData ? 
                    <p>Loading...</p>
                        :
                    itemsData.map(function(item) {
                        console.log(item)
                        return (
                            <div key={item.itemid}>
                                <p>{item.itemname}</p>
                            </div>
                        )
                    })
                    
                }
            </div>
        )
    }

    return (
        <div className="home">
            <button onClick={fetchData}>Refresh</button>
            {/* render items */}
            {
                renderData()
            }  
        </div>
    )
}

export default Home;