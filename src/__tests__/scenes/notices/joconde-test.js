import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Row, Col, Container } from 'reactstrap';
import Joconde from '../../../scenes/notice/joconde';

describe('Joconde suite', () => {
  it('should render work with a notice', () => {
    Joconde.prototype.load = jest.fn(function(_ref) {
      this.setState({ loading: false, notice: {TICO: 'the TICO value', IMG: []} });
    });
    let wrapper = shallow(<Joconde match={{params: {ref: "lorem"}, isExact: true, path: "", url: ""}} />);
    expect(wrapper.text()).contains('the TICO value');
  });
});
