import test from 'ava';
import React from 'react';
import Rx from 'rxjs';
import { mount } from 'enzyme';
import connect from '../src/rx/connect';

import jsdom from 'jsdom';
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

const MyComponent = (props) => <div className="myDiv">{ props.value ? props.value : '' }</div>; //eslint-disable-line

test('creates state', t => {
  const state$ = new Rx.Subject();
  const WrappedComponent = connect(state$)(MyComponent);
  const renderedComponent = mount(<WrappedComponent />);
  t.is(renderedComponent.text(), '');
  const nextState = { value: 'myValue' };
  state$.next(nextState);
  t.is(renderedComponent.text(), nextState.value);
});

test('creates state with selector', t => {
  const state$ = new Rx.Subject();
  const selector = state => ({ value: (state.value || 0) * 2 });
  const WrappedComponent = connect(state$, selector)(MyComponent);
  const renderedComponent = mount(<WrappedComponent />);
  t.is(renderedComponent.text(), '');
  const nextState = { value: 10 };
  state$.next(nextState);
  t.is(renderedComponent.text(), (nextState.value * 2).toString());
  const nextState2 = { value: 12 };
  state$.next(nextState2);
  t.is(renderedComponent.text(), (nextState2.value * 2).toString());
});
