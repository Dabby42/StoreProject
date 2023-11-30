export const getAllOrdersResponseMock: any = {
  status: 'success',
  message: 'Orders retrieved successfully',
  data: {
    orders: [
      {
        id: 1,
        user_id: 1,
        product_id: 12345,
        order_id: 'F1234567',
        category_id: 'phones',
        total_amount: 35000.0,
        updated_at: new Date(),
        created_at: new Date(),
      },
    ],
    current_page: 1,
    pages: 0,
    count: 0,
  },
};

export const createOrdersMock = {
  status: 'success',
  message: 'Order created successfully',
  data: null,
};

export const createOrderData = {
  user_id: 1,
  product_id: 12345,
  order_id: 'F1234567',
  category_id: 'phones',
  total_amount: 35000.0,
};

export const getOrderResponseMock = {
  status: 'success',
  message: 'Order retrieved successfully',
  data: {
    id: 1,
    user_id: 2,
    product_id: 14567,
    order_id: 'F1234567889',
    category_id: 'Computers',
    total_amount: 120000,
    updated_at: new Date(),
    created_at: new Date(),
  },
};
