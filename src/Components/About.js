
import '../styles/About.css';

import scriptImage from "../assets/scriptImage2.png"
import serverImage from "../assets/serverImage2.png"
import desktopImage from "../assets/desktopImage2.png"
import arrowIcon2 from "../assets/arrowIcon2.png"


const content = [
    {
        "imagelink" : scriptImage,
        "text" : "A Python script on a remote server scrapes Warframe.market for price data at a rate of 1800 pages per hour",
        "github" : "https://github.com/Tyler-Jacobson/WarframePDA-Script",
        "arrow" : true
    },
    {
        "imagelink" : serverImage,
        "text" : "That data is then sent up to a purpose built Java Spring Boot API, where it's stored in a PostgreSQL databse",
        "github" : "https://github.com/Tyler-Jacobson/WarframePDA-Backend",
        "arrow" : true
    },
    {
        "imagelink" : desktopImage,
        "text" : "From there, the data is dispensed to the ReactJS front-end application, where it's available for anyone to view",
        "github" : "https://github.com/Tyler-Jacobson/WarframePDA-Frontend",
        "arrow" : false
    }
]

const About = function() {
    return (
        <div className="about">
            <h1>How It Works</h1>
            <div className="content-container">
                {
                    content.map(function(contentSection) {
                        return (
                            <div className="content-block">
                                <div className="content-text">
                                    <p>{contentSection.text}</p>
                                    <a href={contentSection.github} target="_blank" rel="noreferrer">Github Repository</a>
                                </div>
                                <div className="content-images">
                                    <img className="image" src={contentSection.imagelink} alt="computer server icon" />
                                    {
                                        contentSection.arrow === true ? <img className="arrow" src={arrowIcon2} alt="arrow icon"/> : ""
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default About;