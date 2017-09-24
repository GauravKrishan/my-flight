import HeaderComponent from '../components/common/header.component';
import React from 'react';
import {mount} from 'enzyme'

test('Validate heading', ()=>{
    const wrapper=mount(
    <HeaderComponent/>
    )
    const heading = wrapper.find('span');
    expect(heading.text()).toContain('BookMyFlight');
})
