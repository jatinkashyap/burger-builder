import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';


describe('auth reducer',() => {
    it('testing initial state',() => {
        expect(reducer(undefined,{})).toEqual({
            token : null,
            userId : null,
            error : null,
            loading : false
        });
    })

    it('testing auth success',() => {
        expect(reducer(
            {
                token : null,
                userId : null,
                error : null,
                loading : false
            },{
                type : actionTypes.AUTH_SUCCESS,
                token : 'my-token',
                userId : 'my-userId'
            }))
            .toEqual({
            token : 'my-token',
            userId : 'my-userId',
            error : null,
            loading : false
        });
    })

});