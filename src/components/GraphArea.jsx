import React from 'react';

function GraphArea(){
    return(
        <div className="graph-area">
            
            <h5 className="alert alert-danger text-center">Intensities are represented in red<span className="badge bg-secondary"></span></h5>
            <h5 className="alert alert-primary text-center">Relevances are represented in blue<span className="badge bg-secondary"></span></h5>
            <h5 className="alert alert-success text-center">Likelihoods are represented in Green<span className="badge bg-secondary"></span></h5>
            <div id="chart"></div>
        </div>
    );
}

export default GraphArea;