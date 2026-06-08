import { useEffect, useState } from "react";
import Payment from './Payment'
const Address = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        houseNo: "",
        address: "",
        pincode: "",
        city: "",
        nationality: ""

    });

    const [saved, setSaved] = useState(false);
    const [payment, setPayment] = useState("");
    // Load data from localStorage
    useEffect(() => {
        const storedAddress = localStorage.getItem("addressData");

        if (storedAddress) {
            const parsedData =
                JSON.parse(storedAddress);

            setFormData(parsedData);

            setPayment(parsedData.payment);

            setSaved(true);
        }
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const finalData = {
            ...formData,
            payment,
        };

        // Save to localStorage
        localStorage.setItem(
            "addressData",
            JSON.stringify(finalData)
        );

        setSaved(true);
    };

    const handleEdit = () => {
        setSaved(false);
    };

    return (
        <>
            {!saved ? (
                <form onSubmit={handleSubmit} className="AddForm flex OrderP ">
                    <label htmlFor="fullName">Full Name :</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                    />

                    <label htmlFor="houseNo">House No :</label>
                    <input
                        type="text"
                        id="houseNo"
                        name="houseNo"
                        value={formData.houseNo}
                        onChange={handleChange}
                        placeholder="House No"
                    />

                    <label htmlFor="address">Address :</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address"
                    />

                    <label htmlFor="pincode">Pincode :</label>
                    <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="Pincode"
                    />

                    <label htmlFor="city">City :</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                    />

                    <label htmlFor="nationality">Nationality :</label>
                    <input
                        type="text"
                        id="nationality"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        placeholder="Nationality"
                    />

                    <Payment
                        payment={payment}
                        setPayment={setPayment}
                    />
                    <button type="submit" className="Editbutton">
                        Save Address
                    </button>
                </form>
            ) : (
                <div>
                    <h2 className="Orderh">Details to be reach</h2>
                    <div className="OrderP Orderdiv">
                        <p>
                            <strong>Name:</strong> {formData.fullName}
                        </p>

                        <p>
                            <strong>Address:</strong>{" "}
                            {formData.houseNo}, {formData.address}
                        </p>

                        <p>
                            <strong>City:</strong> {formData.city}
                        </p>

                        <p>
                            <strong>Pincode:</strong> {formData.pincode}
                        </p>

                        <p>
                            <strong>Nationality:</strong>{" "}
                            {formData.nationality}
                        </p>

                        <p>
                            <strong>Payment:</strong>{" "}
                            {payment}
                        </p>
                    </div>
                    <button onClick={handleEdit} className="Editbutton">
                        Edit Address
                    </button>
                </div>
            )}
        </>
    );
};

export default Address;