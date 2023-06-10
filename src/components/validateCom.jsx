import React, { useEffect, useState } from "react";

const ValidateComp = (props) => {
  const [status, setStatus] = useState(null);
  const resultLast = props.result;

  useEffect(() => {
    const checkValidate = () => {
      if (resultLast.length !== 0) {
       

        fetch('https://switch-yam-equator.azurewebsites.net/api/validation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-chmura-cors': '3d088e34-eda0-4f33-a114-b7345c5c5fa9'
          },
          body: JSON.stringify(resultLast)
        })
          .then(response => {
            setStatus(response.status);
          })
          .catch(error => {
            console.log('Error:', error);
            setStatus(null); // Reset the status if an error occurs
          });
      }
    };

    checkValidate();
  }, [resultLast]);

  return (
    <>
      {status !== null && (
        <div className="bg-primary">
          Response Status: {status}
        </div>
      )}
    </>
  );
};

export default ValidateComp;
