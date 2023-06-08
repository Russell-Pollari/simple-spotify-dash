function token(state = {}, action) {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                token: action.token
            };
        default:
            return state;
    }
}

export default token;