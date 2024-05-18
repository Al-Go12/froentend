import React from 'react';
import './Loader.css';

const Loader = () => {
    return (


        <div
            className="z-10 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center "
            id="wrapper"
        >
            <div className="loader">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </div>
    );
};

export default Loader;
