import React, {useContext} from 'react';

const Home = () => {

    const {token} = useContext()

    return token ? (
        <div>
            <h1>Home Page</h1>
        </div>
    ):(
        <>
            <
        </>
    );
};

export default Home;