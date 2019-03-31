import React from 'react';

const NoProducts = (props) => {
    let img =
      "https://celera-chemie.com/test/wp-content/uploads/2019/02/brands4.jpg";
    return (
      <div
        className="brands-logos"
        style={{ backgroundImage: `url(${img})` }}
      >
        <h1>Products & Suppliers</h1>
        <h6>
          Chemicals & Standards
          <br />
          Life Science <br />
          Filtration & Consumables <br />
          Vials & Glasware <br />
          Equipment & Instruments
        </h6>
      </div>
    );
}
 
export default NoProducts;