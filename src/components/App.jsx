import React,{useState} from 'react';
import Header from "./Header";
import Sidebar from './Sidebar';
import ButtonsArea from './ButtonsArea';
import GraphArea from './GraphArea';
import Footer from "./Footer";

function App(){
    const [allSectors,setAllSectors]=useState([]);
    const [regionSelected, setRegionSelected]=useState([]);

    function handleState(sectorList){
        // console.log("storing sector list in App component");
        setAllSectors(sectorList);
    }
    function handleRegion(region){
        // console.log("storing region selected in App component");
        setRegionSelected(region);
    }
    return(
        <div className="main">
            <Header/>

            <GraphArea/>
            
            <ButtonsArea
            sectorList={allSectors}
            regionSelected={regionSelected}
            />
            
            <Sidebar
            addSector={handleState}
            addRegion={handleRegion}
            />

            <Footer/>
        </div>
    );
}

export default App;