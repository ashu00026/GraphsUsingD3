import React, {useState,useEffect} from 'react';

function ButtonsArea(props){
    const [sectorDataState,setSectorDataState] = useState({});

    useEffect(()=>{
        // console.log("use effect to set sector window is called");
        if(Object.keys(sectorDataState).length>0){
            // console.log("changed state, so document.window called for sector");
            window.myJavascriptFileSector.processData(sectorDataState);
        }
    },[sectorDataState]);


    let sectorList=props.sectorList;
    let region=props.regionSelected;

    async function handleClick(event){
        event.preventDefault();
        const sector=event.target.innerHTML;
        // console.log("i ll send : "+region+sector);
        const param = {region, sector};

        const exit={
            method: "POST",
            headers: {
                Connection: 'keep-alive',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(param)
        }

//         const parameters = {region, sector};
// fetch('url', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify(data),
// })
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error(error));

        const res=await fetch("/home/filterBySector",exit);
        const data=await res.json();
        if(res.status===404 || !data) console.log("Invalid Sector Name");
        else{
            // const sectorData=data.sectorData;
            // console.log("data",data);
            const {countries, topics, finalIntensities, finalLikelihoods, finalRelevances} = data;
            
            // console.log("sector ->"+countries);
            // console.log("sector ->"+finalLikelihoods);
            // console.log("sector ->"+finalRelevances);
            // console.log("sector ->"+finalIntensities);
            // console.log("sector ->"+topics);

            setSectorDataState({countries, topics, finalIntensities, finalLikelihoods, finalRelevances});
        }
    }

    return(
        <div className="btn btn-primary btn-lg ">
            {/* <h3>Buttons</h3> */}
            <form method="POST">
                {sectorList.map(x=><button type='submit'key={x}onClick={handleClick}>{x}</button>)}
            </form>
        </div>
    );
}

export default ButtonsArea;