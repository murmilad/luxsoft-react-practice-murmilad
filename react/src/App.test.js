import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Books from './components/Books/Books'
import App from './App';

import React from 'react';
import {Provider} from 'react-redux'
import { mount, shallow, configure } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

const mockStore = configureMockStore([thunk]);

describe('App', () => {
  it('should render a startup component if startup is not complete',  () => {
    const store = mockStore({
      startup: { complete: false },
      selections: {
        data: []
       },
       books: [
        {"title":"Java","author":"Javist","_id":"1EcN2dBFThBvHujn"}
       ],
    });
    const wrapper =  mount(
      <Provider store={store}>
        <App />
      </Provider>
    )
    expect(wrapper.exists('[data-testid="delete-button"]')).toEqual(true);
  })
})

test('renders learn react link', () => {


  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


const server = setupServer(
  rest.get('/books', (_req, res, ctx) => {
    return res(ctx.json([{"title":"Java","author":"Javist","_id":"1EcN2dBFThBvHujn"}]))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays Books', async () => {
  render(<Books />)

    expect(screen.getByRole('delete-book-button'))
})

test('handles server Error', async () => {
  server.use(
    rest.get('/greeting', (_req, res, ctx) => {
      return res(ctx.status(500))
    }),
  )

  render(<Books />)

  expect(screen.getByRole('error-message'))
})
