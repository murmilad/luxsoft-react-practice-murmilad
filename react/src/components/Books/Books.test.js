import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Books from './Books'


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
