export const createProductResponseData: any = {
  status: 'success',
  message: 'Product created successfully',
  data: null,
};

export const createProductData: any = {
  name: 'Bag',
  description: 'A sample bag',
  price: '10000.00',
  image_url: 'http://exampe_image.jpg',
  category_id: '65676a183b28e47e44a862a5',
  user_id: '65676a183b28e47e44a862a4',
};

export const updateProductData: any = {
  name: 'Toys',
};

export const productRepositoryMock: any = {
  status: 'success',
  message: 'Product retrieved successfully.',
  data: {
    id: '65676a183b28e47e44a862a7',
    name: 'Bag',
    description: 'A sample bag',
    price: '10000.00',
    image_url: 'http://exampe_image.jpg',
    category_id: '65676a183b28e47e44a862a5',
    user_id: '65676a183b28e47e44a862a4',
    created_at: '2023-02-21T21:53:43.371Z',
    updated_at: '2023-02-21T21:53:43.371Z',
  },
};

export const getAllProductResponseMock: any = {
  status: 'success',
  message: 'All products retrieved successfully.',
  data: {
    products: [
      {
        id: '65676a183b28e47e44a862a7',
        name: 'Bag',
        description: 'A sample bag',
        price: '10000.00',
        image_url: 'http://exampe_image.jpg',
        category_id: '65676a183b28e47e44a862a5',
        user_id: '65676a183b28e47e44a862a4',
        created_at: '2023-02-21T21:53:43.371Z',
        updated_at: '2023-02-21T21:53:43.371Z',
      },
      {
        id: '65676a183b28e47e44a862a8',
        name: 'Chair',
        description: 'A sample chair',
        price: '20000.00',
        image_url: 'http://exampe_image.jpg',
        category_id: '65676a183b28e47e44a862a5',
        user_id: '65676a183b28e47e44a862a4',
        created_at: '2023-02-21T21:53:43.371Z',
        updated_at: '2023-02-21T21:53:43.371Z',
      },
    ],
  },
};
