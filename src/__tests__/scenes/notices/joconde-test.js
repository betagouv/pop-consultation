import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Row, Col, Container } from 'reactstrap';
import Joconde from '../../../scenes/notice/joconde';

describe('Joconde suite', () => {
  it('should render work with a notice', () => {
    let wrapper = shallow(<Joconde match={{params: {ref: "lorem"}, isExact: true, path: "", url: ""}} />);
    /*
    wrapper.instance().load = jest.fn(function(ref) {
      this.setState({ loading: false, notice: {TICO: 'the TICO value'} });
    });
    wrapper.setProps({match: {params: {ref: "lol"}}, images: [] });
    wrapper.update();
    expect(wrapper.html()).toBe('dsjdsdjs')
    */
  });
});
