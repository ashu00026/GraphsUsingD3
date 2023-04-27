import React, {useState,useEffect} from 'react';

function Sidebar(props){

    const [allRegions,setAllRegions] = useState([]);

    async function getAllRegions(){
        try{
            const parameters={
                method: "GET",
                headers:{
                    Connection: 'keep-alive',
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            }
            const res=await fetch('/home/getAllRegions', parameters);

            const data=await res.json();
            setAllRegions(data.allRegions);

            // if(res.status!==200){
            //     throw new Error(res.error);
            // }
        }
        catch(error){
            console.log("error in fetching regions "+error); 
        }
    }

    const [region, setRegion] = useState(allRegions[0]);

    const [regionDataState,setRegionDataState] = useState({});

    useEffect(()=>{
        getAllRegions();
        // console.log("use effect to set region window is called");
        if(Object.keys(regionDataState).length>0){
            // console.log("changed state, so document.window called for region");
            window.myJavascriptFileRegion.processData(regionDataState);
        }
    },[regionDataState]);

    function handleChange(event){
        const regionSelected=event.target.value;
        setRegion(regionSelected);
        props.addRegion(regionSelected);
    };

    async function handleSubmit(event){
        event.preventDefault();
        // console.log(region);

        const parameters={
            method: "POST",
            headers: {
                Connection: 'keep-alive',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({region})
        }

        const res=await fetch("/home/filterByRegion",parameters);
        const data=await res.json();
        if(res.status===404 || !data) console.log("Invalid Region Name");
        else{
            // const regionData=data.regionData;
            const {finalCountryRelevaces, finalCountryLiklihoods, finalCountryIntensities, theCountries, theSectors} = data;
            
            // console.log("->"+finalCountryRelevaces);
            // console.log("->"+finalCountryLiklihoods);
            // console.log("->"+finalCountryIntensities);
            // console.log("->"+theCountries);
            // console.log("->"+theSectors);

            props.addSector(theSectors);

            setRegionDataState({finalCountryRelevaces, finalCountryLiklihoods, finalCountryIntensities, theCountries, theSectors});

            // useEffect(()=>{
            //     window.myJavascriptFile.processData({theCountries,theSectors,finalCountryIntensities});
            // },[]) // cant call useEffeect inside a function

            // let sectorsReceivedObj=data.sectors;
            // let sectorsReceivedArr = Object.values(sectorsReceivedObj);
        }
    }

    return(
        <>
            <div className="sidebar">
                {/* <h3>Sidebar</h3> */}
                <label htmlFor="region">Choose a Region below</label>
                <select name="region" value={region} onChange={handleChange} className="btn btn-secondary dropdown-toggle">
                    {
                        allRegions.map(reg => ( <option key={reg} value={reg}> {reg} </option>))
                    }
                </select>

                <form method="POST">
                    <button type="submit" name="regionSubmit" id="region-submit" onClick={handleSubmit}>Submit</button>
                </form>
                {/* {sectors.map(vals => <p key={vals}>{vals}</p> )} */}
                {/* {allRegions.map(vals => <p key={vals}>{vals}</p>)} */}
            </div>
        </>
    );
}

export default Sidebar;