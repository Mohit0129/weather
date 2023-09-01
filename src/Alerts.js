import React from "react";

function Alerts({ alertsData }){
    return (
        <div>
            <center>
                <h3>Weather Alerts</h3>
                {alertsData.map((alert, index) => (
                    <div key={index}>
                        <p>Alert: {alert.event}</p>
                        <p>Description: {alert.description}</p>
                    </div>
                ))}
            </center>
        </div>
    );
};

export default Alerts;
