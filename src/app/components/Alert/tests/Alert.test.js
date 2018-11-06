import React from 'react';
import { shallow } from 'enzyme';
import Alert from '../Alert';

const wrap = (props = {}) => shallow(<Alert {...props} />);

export const renders = describe('Testing component rendering.', () => {
  it('Renders component.', () => {
    wrap();
  });

  it('Renders component with "visible" state set to "true" by the default.', () => {
    const wrapper = wrap();
    expect(wrapper.state().visible).toBe(true);
  });

  it('Renders a "div" element.', () => {
    const wrapper = wrap();
    expect(wrapper.get(0).type).toBe('div');
  });

  it('Renders component with "type" set to "info" by the default.', () => {
    const wrapper = wrap();
    expect(wrapper.props().type).toEqual('info');
  });
});

export const events = describe('Testing component event handlers.', () => {
  it('Closing component triggeres "onClose" callback function.', () => {
    const onClose = jest.fn();
    const wrapper = wrap({ onClose });
    wrapper.instance().close();
    expect(onClose).toHaveBeenCalled();
  });

  it('Closed component returns null.', () => {
    const wrapper = wrap();
    wrapper.instance().close();
    expect(wrapper.get(0)).toBe(null);
  });
});
