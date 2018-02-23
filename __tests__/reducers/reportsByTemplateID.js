import * as types from '../../src/redux/actions/reportsByTemplateID';
import reportsReducer from '../../src/redux/reducers/reportsByTemplateID';

const exampleState = {
    2 : [{
        templateID: 2,
        userID: 1,
        orderNo: 15,
        title: 'Example',
        dateCreated: '2018-04-01',
        dateAccepted: null,
        answers: []
    }]
};

describe('reports reducer', () => {
    it('should return the initial state', () => {
        expect(reportsReducer(undefined, {})).toEqual({});
    });

    it('should handle STORE_REPORTS_BY_TEMPLATE_ID', () => {
        expect(
            reportsReducer({},
                {
                    type: types.STORE_REPORTS_BY_TEMPLATE_ID,
                    reportsByTempID: [
                        [{
                            templateID: 2,
                            userID: 1,
                            orderNo: 15,
                            title: 'Example',
                            dateCreated: '2018-04-01',
                            dateAccepted: null,
                            answers: []
                        }]
                    ]
                }
            )
        ).toEqual(exampleState);
    });

    it('should handle EMPTY_REPORTS', () => {
        expect(reportsReducer(exampleState,
            {
                type: types.EMPTY_REPORTS
            }
        )).toEqual({});
    });

});