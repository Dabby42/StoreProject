/*
mock implementation...
*/
export const loginUserSuccessMockData: any = {
  status: 'success',
  message: 'Login Success',
  data: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJvbGFtaWRlLmFib3llamlAa29uZ2EuY29tIiwicm9sZSI6MywiaWF0IjoxNjc5MzE3NjQxLCJleHAiOjE2NzkzMjEyNDF9.r1TWM0hTbkhxG8OHHOkTV_3N9eNeMQkskRx2PbMvt2s',
    user: {
      id: '65676a183b28e47e44a862a7',
      first_name: 'Dabere',
      last_name: 'Nwafor',
      email: 'nwafordabere@gmail.com',
      username: 'dabby',
      address: '3B Cocoa Road',
      state: 1,
      country: 'Nigeria',
      phone_number: '08000000000',
      created_at: '2023-03-06T14:34:22.000Z',
      updated_at: '2023-03-06T14:37:08.000Z',
    },
  },
};

export const loginUserFailureMockData = {
  statusCode: 401,
  message: 'Invalid email or password',
  error: 'Unauthorized',
};

export const userRepositoryMock: any = {
  id: '65676a183b28e47e44a862a7',
  first_name: 'Dabere',
  last_name: 'Nwafor',
  email: 'nwafordabere@gmail.com',
  username: 'dabby',
  address: '3B Cocoa Road',
  state: 1,
  country: 'Nigeria',
  phone_number: '08000000000',
  password: '$2a$10$s.1AXYLRgHqwUZPt3p1w6.TJJ7VmfHGvvUwe8BTBXIE7ZQyzfiwCW',
  created_at: '2023-03-06T14:34:22.000Z',
  updated_at: '2023-03-06T14:37:08.000Z',
};

export const userDataMock: any = {
  first_name: 'Dabere',
  last_name: 'Nwafor',
  email: 'nwafordabere@gmail.com',
  username: 'dabby',
  address: '3B Cocoa Road',
  country: 'Nigeria',
  phone_number: '08000000000',
  state: 1,
  password: 'password123',
};

export const registerUserSuccessMock: any = {
  status: 'success',
  message: 'Account created successfully',
  data: null,
};

export const changeUserPasswordSuccessMock: any = {
  status: 'success',
  message: 'Password updated successfully',
  data: null,
};

export const noUserMock = null;
