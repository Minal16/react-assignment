import test from 'ava';
import React from 'react';
import Rx from 'rxjs';
import { mount } from 'enzyme';
import connectWithState from '../src/rx/connectWithState';
import Provider from '../src/rx/Provider';

import jsdom from 'jsdom';
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

const MyComponent = (props) => <div className="myDiv">{ props.value }</div>; //eslint-disable-line

test('creates state', t => {
  const state$ = new Rx.Subject();
  const WrappedComponent = connectWithState()(MyComponent);
  const renderedComponent = mount(<Provider state$={ state$ }><WrappedComponent /></Provider>);
  t.is(renderedComponent.find('.myDiv').text(), '');
  const nextState = { value: 'myValue' };
  state$.next(nextState);
  t.is(renderedComponent.find('.myDiv').text(), nextState.value);
});
