import React, { Component } from "react";
import SwiftSlider from "react-swift-slider";

import "../homePage/Home.css";
import logo from "../../Resources/images/Celera-logo.png";

class HomePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.setState({
      data: [
        {
          id: "1",
          src:
            "https://am3pap003files.storage.live.com/y4pfR_xd2n5VukSLSfP_2IJdx1eOPqxGnxMgVAFs7wLRtrff7NlGb4N-D5-HGwSKDaEEPizdEbtnmFh7nonKg94W5bXjeIDZ-nSsx2SOJltKfMLsHw4VcYEtubYrcdUXB68QeXDnkYY9G5sPnhhsdRUl1GMaGbmYITUjK5ESRUEqYm_9YWoiCyhoNQhkVtxIJvc/69.jpg?psid=1&width=1266&height=366"
        },
        {
          id: "2",
          src:
            "https://am3pap003files.storage.live.com/y4pRbEuEgePKHryXuGW_zMmLMwu1iK0gDqG2iM6FMaFXI1PwXgNgsPK3P2YjgdlbV_Up1c0pTyUPQKXtTvufCTN6yidsUmTwohFE0mAZ9hqc8-kHvFgO1KvwBVTtdUCpvIhMHxM-baqmsT6fYVlPsBkDiu-pr0tOl5Z5Emr5D8m2FBlbc_iPmBkUtsdcIXJc-R5/70.jpg?psid=1&width=1266&height=366"
        },
        {
          id: "3",
          src:
            "https://am3pap003files.storage.live.com/y4pyr58P_Y5BaHoJ7W0my6VjVqAkIjxyvvg5SnMhsj1_QwH5ASdFkbMSoT1ziQvQSoWSlabj9XAe9uddQahYl48Qz83EpLXH-4DIK55jt0KuwrmFXGetQVHP5iY_0lBrCni8HWNYuxI_1pGntYu3_BNsMl3ZkZ1TiT08CnKzXcbXFxZA7bQjiC2acY1r2UaEhR5/Vacuubrand.jpg?psid=1&width=958&height=780"
        },
        {
          id: "4",
          src:
            "https://am3pap003files.storage.live.com/y4pZ5DfZ7ths7y0j1G28rScdEm5Be_Xin-MDFLvVjPdsXX3mNboCBsqSblGHx8Z6gMVW9MHs7fDrTs2e5OjAISvWi-4AM1iHWDu7rxM_hWuoL2zYSMZHYI4SptPkmwJT6W5DYGHDEB5pcNvAGxew_AUcJ1ZyhN3YvReWy06TrXWrtACFPvfVTbfY6fSG_oW6uTB/56.jpg?psid=1&width=1266&height=366"
        },
        {
          id: "5",
          src:
            "https://am3pap003files.storage.live.com/y4p7uahmjEK7ifWH8dR7kcrOqhYVQscNZMVszOainMmlxizqA37rPhhtdG0wOlAquGCpmsEIfuVRIo78MT8FmlTdNCQ2ynmXMf0Zi0hbhvIP4eGQFyPmxAJ82G7id99fql873q-YUNwFy1QIlO83CGdXLC9WWOxS8AstKfRPNYwYikot3clflay8spTijYdpSBh/72.jpg?psid=1&width=1266&height=366"
        },
        {
          id: "6",
          src:
            "https://am3pap003files.storage.live.com/y4pD_vCTRa505EGjaNCJviFLhtB2KWjp3io7MI6BH3yNXUXGnXereXDnNntqm0ooxC_3WiFy7LYgVsYundmSm_k1aAvsqOX26qoGfN3-qRgiT990vX7SL4lx836On2QxIjVKIvXGwauPYP_W6nMZBgOBauS_UxJI8dAEMcKE6nXJ_wrbDO5VXdQl4sfjvbwv6Ma?psid=2&width=1536&height=768"
        },
        {
          id: "7",
          src:
            "https://am3pap003files.storage.live.com/y4pvh6g6-9tGCPrqoA4_CXGPXjgp48O2ltUjjp6c0D-UrhZCh8y6yw-MgKniAqWsC-UTB3i_XYHtPyzQ08z1YgdmV-_Ukp7EW6lZ6dUQn6VMYkLCGbmOozFA4Xc_BckEGd_FbFTUOeaaGnj6Ctv-9kw2udzokiBR1LCJ1HNDPtWUAgmQphApS3aHzXTxcb4nmMl/68.jpg?psid=1&width=1266&height=366"
        }
      ],
      mountedHome: true
    });
  }

  componentWillUnmount() {
    this.setState({
      data: [],
      mountedHome: false
    })
  }

  render() {
    return (
      <section className="banner-image">
        {
          this.state.mountedHome ? <SwiftSlider data={this.state.data} showDots={false} /> : null
        }
        <div className="commercial-text-box">
          <br />
          <img src={logo} alt="Celera-Chemie" />
          <h6>
            Your trusted parthner for laboratory chemicals, consumables,
            instruments, glassware and filters
            <br />
          </h6>
        </div>
      </section>
    );
  }
};

export default HomePage;
