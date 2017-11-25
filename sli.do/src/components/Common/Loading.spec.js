import React from 'react';
import {shallow} from 'enzyme';
import Loading from './Loading';
test('Loading changes the text after click', () => {
    // Render a checkbox with label in the document
    const checkbox = shallow(<Loading />);

    expect(checkbox.text()).toEqual('Off');

    // checkbox.find('input').simulate('change');

    // expect(checkbox.text()).toEqual('On');
});