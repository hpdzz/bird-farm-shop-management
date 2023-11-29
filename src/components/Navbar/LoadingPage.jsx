import React from 'react';
import loadingImage from '../../assets/images/loadingImage.png'; // adjust the path as needed
import BarLoader from 'react-spinners/BarLoader';
export default function LoadingPage() {
  return (
    <div  >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '92vh'
        }}
      >
        <img src={loadingImage} alt="Loading" height={550} width={550} />
        <div style={{ justifyContent: 'center', alignItems: 'center' }}>
          <h1 style={{
            height: '50px',
            fontSize: '50px',
            textAlign: 'center',
            margin: '40px'
          }}>Loading...</h1>
          <BarLoader color="#36d7b7" height={5} width={520} />
        </div>

      </div>
    </div>
  );
}
