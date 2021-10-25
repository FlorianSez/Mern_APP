import React from 'react'
import { useSelector } from 'react-redux';
import NavLeft from '../components/LeftNav'

const Home = () => {
    const userData = useSelector((state) => state.userReducer);
    return (
        <div>
            {!userData.accept ? (
                <h1>L'admin ne vous a pas accepté</h1>
            ): (
                <>
                <NavLeft />
                <p>Hello depuis Home page</p>
                </>
            )}
        </div>
    )
}

export default Home

