import React from 'react';
import {shallow, mount} from 'enzyme';

import AddForm from './add-form';

describe('<AddForm />', () => {
    it('Renders without crashing', () => {
        // renders just one component, not its children
        shallow(<AddForm />);
    });

    it('Renders the add button initially', () => {
        const wrapper = shallow(<AddForm />);
        expect(wrapper.hasClass('add-button')).toEqual(true);
    });

    it('Should render the add form when editing', () => {
        const wrapper = shallow(<AddForm />);
        // let's us access instance methods on the component
        // setEditing updates the state of the component 
        wrapper.instance().setEditing(true);
        // update rerenders the component since Enzyme doesn't do it automatically
        wrapper.update();
        expect(wrapper.hasClass('add-form')).toEqual(true);
    });

    it('Should switch to editing when the add button is clicked', () => {
        const wrapper = shallow(<AddForm />);
        // simulate is used to simulate DOM events. it ensures that your components respond correclty to user interactions
        wrapper.simulate('click');
        expect(wrapper.state('editing')).toEqual(true);
        // Enzyme automatically checks for updates after simulating an event, so no need to call .update() here
    });

    it('Should fire the onAdd callback when the form is submitted', () => {
        // jest.fn makes a spy, which is a small funcitont hat keeps a record of each time they have been called. Useful for testing callback functions. This one is used to make sure that the component's onAdd callback is called correclty when the form is submitted.
        const callback = jest.fn();
        // mount  is for full DOM rendering, the entire component including its children are rendered into an in-memory DOM
        const wrapper = mount(<AddForm onAdd={callback} />);
        const value = 'Foobar';
        wrapper.instance().setEditing(true);
        wrapper.update();
        wrapper.find('input[type="text"]').instance().value = value;
        wrapper.simulate('submit');
        expect(callback).toHaveBeenCalledWith(value);
    });

    it('Should not fire onAdd if the input is empty', () => {
        const callback = jest.fn();
        const wrapper = mount(<AddForm onAdd={callback} />);
        wrapper.instance().setEditing(true);
        wrapper.simulate('submit');
        expect(callback).not.toHaveBeenCalled();
    });
});
