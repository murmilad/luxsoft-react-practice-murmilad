import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {fireEvent, waitFor, screen} from '@testing-library/react'
import {render} from '../../testUtils'
import BookInSelection from './BookInSelection'



test('displays Book in Selection', async () =>  {
    const {container } =  render(<BookInSelection selectionId='testSelection' bookId='testBook' key='testKey'/>)

    await expect(container.querySelector(".selection_list_item").innerHTML).toMatch("Java test")
})


const server = setupServer(
  rest.get('/books', (_req, res, ctx) => {
    return res(ctx.json([{"title":"Java test","author":"Javist","_id":"testBook"}]))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('handles server Error', async () => {
  server.use(
    rest.get('/greeting', (_req, res, ctx) => {
      return res(ctx.status(500))
    }),
  )

  render(<Books books={[{"title":"Java test","author":"Javist","_id":"testId"}]}/>)

  expect(screen.getByRole('error-message'))
})
