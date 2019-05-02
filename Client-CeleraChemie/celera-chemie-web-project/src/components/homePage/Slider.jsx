import React, { Component } from "react";
import "./Home.css"

let interval;

class Slider extends Component {
    constructor(props) {
        super(props)

        this.state = {
            imgSrc: "https://am3pap003files.storage.live.com/y4pfR_xd2n5VukSLSfP_2IJdx1eOPqxGnxMgVAFs7wLRtrff7NlGb4N-D5-HGwSKDaEEPizdEbtnmFh7nonKg94W5bXjeIDZ-nSsx2SOJltKfMLsHw4VcYEtubYrcdUXB68QeXDnkYY9G5sPnhhsdRUl1GMaGbmYITUjK5ESRUEqYm_9YWoiCyhoNQhkVtxIJvc/69.jpg?psid=1&width=1266&height=366",
            interval: null
        }
    }

    componentDidMount() {
        let images = this.props.data;
        let index = 0;
        interval = setInterval(() => {
            this.setState({
                imgSrc: images[index].src
            })
            if (index < images.length - 1) {
                index++;
            } else {
                index = 0;
            }
        }, 5000)
    }

    componentWillUnmount() {
        clearInterval(interval)
    }


    render() {
        return (
            <section className="banner-image">
                <img  src={this.state.imgSrc} alt="banner pic"></img>
            </section>
        )
    }

}

export default Slider;