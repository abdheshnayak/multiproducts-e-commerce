const Payment = ({ payment, setPayment }) => {
  return (
    <div className="Payment ">
      <h2 className="OrderP PayP">Payment Method</h2>

      <select
        value={payment}
        onChange={(e) =>
          setPayment(e``.target.value)
        }
      >
        <option value="">
          Select Payment
        </option>

        <option value="cod">
          Cash on Delivery
        </option>

        <option value="upi">
          UPI
        </option>

        <option value="card">
          Card
        </option>
      </select>
    </div>
  );
};

export default Payment;