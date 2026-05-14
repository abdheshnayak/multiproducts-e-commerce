import { useState } from 'react';
import './Filter.css'
const Filter = ({ data, setFilterItem, setTrue }) => {

    const handleClick = (product) => {
        setFilterItem(product)
        setTrue(true)
    }

    return (
        <>
            <div className='filter_class'>


                {Object.entries(data).map(([cat, value], index) => {
                    return (

                        <div className=''
                            key={index}
                            onClick={() => handleClick(value.id)} >

                            <div className='filimgdiv'>
                                <img src={value.image} alt={cat} className='filimg' />

                            </div>
                            <p>{cat}</p>

                        </div>

                    )

                })}
                <div
                className='catFil '
                    onClick={() => setFilterItem([])}
                >
                   <p> All Product</p>

                </div>
            </div>
        </>
    )
}
export default Filter;