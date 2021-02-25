import '../styles/Home.css';



const contentArray = [
    {
        header: "How it works:",
        body: "Items bought and sold through Warframe.market can potentially turn a profit for the savvy trader. This can be done by buying individual components of an item, and then selling the item as a full set, netting a profit in the process.",
        side: "left"
    },
    {
        header: "The Risks:",
        body: "This doesn't come without downsides, however. Many of the items available for trade are simply unprofitable, others can be quite risky to trade, and it can take a significant amount of time for even a skilled trader to sort through the minefield of potentially bad investments.",
        side: "right"
    },
    {
        header: "The Solution:",
        body: "WarframePDA. A constantly updated list of items, analysed to determine maximum profitablility, displayed right here for your viewing convenience.",
        side: "left"
    },
]


const Home = function() {
    return (
        <div className="page">
            <div className="content-box-container">
                <div className="center content-box">
                    <h1>Welcome to WarframePDA</h1>
                    <h3>A tool for Warframe players, built to assist with the trading of ingame assets, and exchange of digital currency</h3>
                </div>
                {
                    contentArray.map(function(content) {
                        return (
                        <div className={content.side + " content-spacer"}>
                            <div className="content-box">
                                <h2>{content.header}</h2>
                                <h3>{content.body}</h3>
                            </div>
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;