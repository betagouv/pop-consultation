import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Loader from '../../components/loader/index';

describe('Loader suite', () => {
  
  it('should render without throwing an error', () => {
    expect(shallow(<Loader />).contains(<div id="loader"/>)).toBe(true);
  });

  it('should be selectable by class "loader-container"', () => {
    expect(shallow(<Loader />).is('.loader-container')).toBe(true);
  });

  it('should mount in a full DOM', () => {
    expect(mount(<Loader />).find('.loader-container').length).toBe(1);
  });

  it('should render to static HTML', () => {
    expect(render(<Loader />).text()).toEqual('');
  });
});
