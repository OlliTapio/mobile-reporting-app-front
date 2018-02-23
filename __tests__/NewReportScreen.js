import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'isomorphic-fetch';
import { shallow } from 'enzyme';
import { ActivityIndicator } from 'react-native';

import { NewReportScreen } from '../src/screens/NewReportScreen';
import { url } from '../src/screens/urlsetting';

configure({ adapter: new Adapter() });

it('renders correctly', () => {
    const tree = renderer.create(
        <NewReportScreen />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('fetch finds data from the server', () => {
    const data = fetch(url + '/users/1/forms');
    const userData = fetch(url + '/users/1');

    expect(userData).not.toBe(null);
    expect(data).not.toBe(null);
});

describe('<NewReportScreen />', () => {

    const wrapper = renderer.create(<NewReportScreen/>);   // render React components to pure JavaScript objects
    const inst = wrapper.getInstance();

    describe('handleBack()', () => {
        it('should return true if this.state.isSaved = true', () => {
            inst.setState=({ isSaved: true });
            expect(inst.handleBack()).toBe(true);
        });
    });

    describe('isLoading', () => {

        const newReportScreen = shallow(<NewReportScreen />);

        it('should render an <ActivityIndicator /> if true', () => {
            newReportScreen.setState({ isLoading: true });
            expect(newReportScreen.find(ActivityIndicator).length).toBe(1);
        });

        it('should not render an <ActivityIndicator /> if false', () => {
            newReportScreen.setState({ isLoading: false, dataFieldsByID: [] });
            expect(newReportScreen.find(ActivityIndicator).length).toBe(0);
        });
    });
});