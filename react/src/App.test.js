import App from './App';

import React from 'react';
import {Provider} from 'react-redux'
import { mount, configure } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

const mockStore = configureMockStore([thunk]);

describe('App', () => {
  it('Enzyme Test is book loaded by mock',  () => {
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

