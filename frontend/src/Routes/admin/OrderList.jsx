import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import {
  deleteOrderAction,
  listOrdersAction,
} from "../../redux/actions/orderActions";
import CONSTANTS from "../../redux/constants/allConstance";

function OrderList(props) {
  const dispatch = useDispatch();
  const ordersList = useSelector((state) => state.ordersList);

  const { loading, orders, error } = ordersList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;
  useEffect(() => {
    dispatch({ type: CONSTANTS.order.ORDER_DELETE_RESET });
    dispatch(listOrdersAction());
  }, [dispatch, successDelete]);

  const deleteHandler = (order) => {
    // to do
    if (window.confirm("Are you sure you want to delete this order?")) {
      dispatch(deleteOrderAction(order._id));
    }
  };
  return (
    <div>
      <h1> Orders </h1>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
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
                <td>{order.user.name}</td>
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
                  <button
                    onClick={() => deleteHandler(order)}
                    type="button"
                    className="small"
                  >
                    Delete
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

export default OrderList;
