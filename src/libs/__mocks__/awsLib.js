const plans = {
    '1': {
        id: '1',
        name: 'test',
        exercises: []
    }
};


export function invokeApig({
                               path,
                               method = "GET",
                               headers = {},
                               queryParams = {},
                               body
                           }) {
    return new Promise((resolve, reject) => {
        resolve(plans['1']);
    });
}
