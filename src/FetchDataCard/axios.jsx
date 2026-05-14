import axios from "axios";
import { useEffect, useState } from "react";
import GetDetails from './current'
import Card from "./Card";
import Details from "../Pages/Details/Details";
import Filter from '../filter/Filter'
import Spin from '../Pages/Details/spinner'

function Axioss() {
    const [load , setLoad]=useState(false)
    const [fetcData, setFetchData] = useState([])
    const fetchApi = async () => {
        try {
            setLoad(true)
            let data = await GetDetails()

            setFetchData(data.data.products)
            console.log(data.data.products);

        } catch (error) {
            console.log(error);

        }finally{
            setLoad(false)
        }
    }

    useEffect(() => {
        fetchApi()
    }, [])


    const sendCategory = fetcData.reduce((acc, item) => {
        const cat = item.category;
        if (acc[cat]) {
            acc[cat].count += 1;
            acc[cat].id.push(item)
        } else {
            acc[cat] = {
                count: 1,
                image: item.thumbnail,
                id: [item]
            }
        }
        return acc;
    }, {});

    const [filterItem, setFilterItem] = useState([])
    const [TrueFalse,setTrue]=useState(false)

    return (

        <>
        {load && <Spin/>}
            <Filter
                data={sendCategory}
                setFilterItem={setFilterItem}
                setTrue={setTrue}
            />

            <div className="cardCon">

                { 
                    (filterItem.length ? filterItem : fetcData).map((item) => {

                        return (
                             <Card
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                img={item.images}
                                price={item.price}
                                discount={item.discountPercentage}
                                rating={item.rating}
                                reviews={item.reviews}
                                stock={item.availabilityStatus}
                            />
                        )

                    })
                }

            </div>



        </>
    )
}
export default Axioss;