export const createCategoryResponseData: any = {
  status: 'success',
  message: 'Category created successfully',
  data: null,
};

export const removeCategoryResponseData: any = {
  status: 'success',
  message: 'Category deleted successfully',
  data: null,
};

export const createCategoryData: any = {
  category_name: 'Phone and accessories',
};

export const updateCategoryData: any = {
  category_name: 'Toys',
};

export const categoryRepositoryMock: any = {
  status: 'success',
  message: 'Category retrieved successfully.',
  data: {
    id: '65676a183b28e47e44a862a7',
    category_name: 'string',
    created_at: '2023-02-21T21:53:43.371Z',
    updated_at: '2023-02-21T21:53:43.371Z',
  },
};

export const getAllCategoryResponseMock: any = {
  status: 'success',
  message: 'All categories retrieved successfully.',
  data: {
    categories: [
      {
        id: '65676a183b28e47e44a862a7',
        category_name: 'string',
        created_at: '2023-02-21T21:53:43.371Z',
        updated_at: '2023-02-21T21:53:43.371Z',
      },
      {
        id: '65676a183b28e47e44a862a9',
        category_name: 'string',
        created_at: '2023-02-21T21:53:43.371Z',
        updated_at: '2023-02-21T21:53:43.371Z',
      },
    ],
  },
};
