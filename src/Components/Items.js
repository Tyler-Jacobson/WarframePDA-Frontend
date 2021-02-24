import { useEffect, useState} from "react";
import '../styles/Home.css';
import axios from "axios";

// ▲ ▼

const defaultItemsData = []

const Items = function() {

    const [ itemsData, setItemsData ] = useState(defaultItemsData);

    // for debugging
    
  
    const fetchData = function() {
      setItemsData(defaultItemsData)
      axios.get("https://warframepda.herokuapp.com/items/all")
      .then((res) => {
        
        // console.log("res.data", res.data)

        const arrayWithDataParams = addDataParameters(res.data)
        const arraySortedByProfit = sortByProfit(arrayWithDataParams)
        setItemsData(arraySortedByProfit)
        // console.log("returned from sortByProfit", arraySortedByProfit)

      })
      .catch((err) => {
        console.log(err)
      })
    }

    useEffect(() => {
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
                const sectionObject = {
                    "sectionname" : part.partname + ":",
                    "pricerange" : [part.orders[0].price, part.orders[part.orders.length - 1].price],
                    "fulldata" : part.orders,
                    "dropdown" : true,
                    "extended": false
                }
    
                if (part.partname === "Set") {
                    sectionObject.sectionname = "Gained From Sold Set:"
                    setObject = sectionObject
                } else {
                    minTotalCost += sectionObject.pricerange[0]
                    maxTotalCost += sectionObject.pricerange[1]
    
                    displayArray.push(sectionObject)
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
            outgoingItem.parts = displayArray

            fullDataArray.push(outgoingItem)

            return null; // this does nothing, it's just to get rid of the warning
        })
        return fullDataArray
    }

    const sortByProfit = function(incomingArray) {
        
        const sortedArray = incomingArray.sort((a, b) => {
            return b.parts[6].pricerange[0] - a.parts[6].pricerange[0];
        });

        return sortedArray
    }

    const renderSection = function(itemIndex, partIndex) {
        const tempItemsData = [...itemsData]
        tempItemsData[itemIndex].parts[partIndex].extended = !tempItemsData[itemIndex].parts[partIndex].extended
        setItemsData(tempItemsData)
    }

    const handleFocus = function(event) {
        return event.target.select()
    }

    const renderExtendedData = function(section, item, partIndex) {
        return (
            <>
                {
                    section.fulldata.map(function(order) {
                        // console.log(item.parts)
                        if (partIndex <= 3){
                            return (
                                // <p className="extended-line" key={order.orderid}>/w {order.seller} Hi! I want to buy: {item.itemname} Prime {item.parts[partIndex].sectionname} for {order.price} platinum. (warframe.market)</p>
                                <input className="extended-line" key={order.orderid} onFocus={handleFocus} readOnly value={`/w ${order.seller} Hi! I want to buy: ${item.itemname} Prime ${item.parts[partIndex].sectionname} for ${order.price} platinum. (warframe.market)`}/>
                            
                            
                                )
                        } else {
                            return (
                                <input className="extended-line" key={order.orderid} readOnly value={`${order.seller} is selling ${item.itemname} Prime Set for ${order.price} platinum`} />
                            )
                        }
                        
                    })
                }
            </>
        )
    }

    const renderData = function() {
        return (
            <div className="home">
                {
                    itemsData === defaultItemsData ? 
                    <p>Loading...</p>
                        :
                    // console.log(itemsData),
                    itemsData.map(function(item, itemIndex) {
                        return (
                            <div className="item" key={item.itemid}>
                                <div className="leftbox">
                                    <p className="item-name">{item.itemname}</p>
                                    <div className="image-container">
                                        <img className="item-image" src={item.imageurl} alt={item.itemname} />
                                    </div>
                                </div> 

                                <div className="rightbox">
                                    {
                                        item.parts.map(function(section, partIndex) {
                                            return (
                                                <div className="rightbox-container" key={section.sectionname} >
                                                    <div className="rightbox-section">
                                                        <p className="rightbox-section-1">{section.sectionname}</p>
                                                        <p className="rightbox-section-2">[{section.pricerange[0]} - {section.pricerange[1]}]</p>
                                                        {
                                                            section.dropdown === true ? <p className="rightbox-section-3" onClick={() => renderSection(itemIndex, partIndex)}> {section.extended === true ? "▼" : "▲"} </p> : <p className="rightbox-section-4"></p>
                                                        }
                                                    </div>

                                                    <div className="rightbox-extended">
                                                        {
                                                            section.dropdown === true ? section.extended === true ? renderExtendedData(section, item, partIndex) : "" : ""
                                                        }
                                                    </div>
                                                </div>
                                                
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                    
                }
            </div>
        )
    }

    return (
        <div className="home">
            <button className="refresh-button" onClick={fetchData}>Refresh</button>
            {/* render items */}
            {
                renderData()
            }  
        </div>
    )
}

export default Items;