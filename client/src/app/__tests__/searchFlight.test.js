import SearchFlight from '../components/searchFlight';
import React from 'react';
import {mount,shallow} from 'enzyme';

describe('Search Component Validation',()=>{
    var wrapper;

    beforeEach(()=>{
         wrapper= shallow(<SearchFlight/>)
    });

    describe('Layout Test',()=>{
        it('Should have three Text fields - Origin, destination and Passengers',()=>{
            expect(wrapper.find('AutoComplete')).toHaveLength(2);
        });
        it('Should have two date pickers - Depart and Return',()=>{
            expect(wrapper.find('DatePicker')).toHaveLength(2);
        });
        it('Should have one TextField - Passengers',()=>{
            expect(wrapper.find('TextField')).toHaveLength(1);
        })
    })

});








