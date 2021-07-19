import React, { useEffect } from "react";
import LoadingBox from "../components/LoadingBox";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../components/MessageBox";
import { listMyOrdersActions } from "../redux/actions/orderActions";
//listMyOrdersActions
function OrderHistory(props) {
  const orderMinelist = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMinelist;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listMyOrdersActions());
  }, [dispatch]);

  return (
    <div>
      <h1> Order History </h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => [
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>
                  {order.isPaid ? order.paidAt.substring(0, 10) : "Not Paid"}
                </td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : "Not Delivered"}
                </td>
                <td>
                  <button
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                    type="button"
                    className="small"
                  >
                    Details
                  </button>
                </td>
              </tr>,
            ])}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderHistory;
