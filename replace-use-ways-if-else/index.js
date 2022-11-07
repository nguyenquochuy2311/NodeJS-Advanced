const user = {
    name: "Huy",
    age: 20,
    blog: "google.com"
}

const isOldEnough = user => {
    const AGE_REQUIREMENT = 30;
    return user?.age ?? 0 > AGE_REQUIREMENT
    // return user?.age ?? 0 > 30
}

console.log(isOldEnough(user));

// ---------------

// SOLID
// const validateCreate = (create, isRobo) => {
//     if(isRobo) {
//         // todo...
//     } else {
//         // todo...
//     }
// }


// ----------------
if(user.name === "Huy" && user.age > 30 && user.blog === "facebook.com") {
    // todo...
}
// change to
const isOK = user.name === "Huy" && user.age > 30 && user.blog === "facebook.com";
if(isOK) {
    // todo...
}
//change to
const isOK_v2 = user => {
    return (
        user.name === "Huy" &&
        user.age > 30 &&
        user.blog === "facebook.com"
    )
}

if(isOK_v2(user)) {
    // todo...
}

// -----------------
// {
//     '100': 'Continue',
//     '101': 'Switching Protocols',
//     '102': 'Processing',
//     '103': 'Early Hints',
//     '200': 'OK',
//     '201': 'Created',
//     '202': 'Accepted',
//     '203': 'Non-Authoritative Information',
//     '204': 'No Content',
//     '205': 'Reset Content',
//     '206': 'Partial Content',
//     '207': 'Multi-Status',
//     '208': 'Already Reported',
//     '226': 'IM Used',
//     '300': 'Multiple Choices',
//     '301': 'Moved Permanently',
//     '302': 'Found',
//     '303': 'See Other',
//     '304': 'Not Modified',
//     '305': 'Use Proxy',
//     '307': 'Temporary Redirect',
//     '308': 'Permanent Redirect',
//     '400': 'Bad Request',
//     '401': 'Unauthorized',
//     '402': 'Payment Required',
//     '403': 'Forbidden',
//     '404': 'Not Found',
//     '405': 'Method Not Allowed',
//     '406': 'Not Acceptable',
//     '407': 'Proxy Authentication Required',
//     '408': 'Request Timeout',
//     '409': 'Conflict',
//     '410': 'Gone',
//     '411': 'Length Required',
//     '412': 'Precondition Failed',
//     '413': 'Payload Too Large',
//     '414': 'URI Too Long',
//     '415': 'Unsupported Media Type',
//     '416': 'Range Not Satisfiable',
//     '417': 'Expectation Failed',
//     '418': "I'm a Teapot",
//     '421': 'Misdirected Request',
//     '422': 'Unprocessable Entity',
//     '423': 'Locked',
//     '424': 'Failed Dependency',
//     '425': 'Too Early',
//     '426': 'Upgrade Required',
//     '428': 'Precondition Required',
//     '429': 'Too Many Requests',
//     '431': 'Request Header Fields Too Large',
//     '451': 'Unavailable For Legal Reasons',
//     '500': 'Internal Server Error',
//     '501': 'Not Implemented',
//     '502': 'Bad Gateway',
//     '503': 'Service Unavailable',
//     '504': 'Gateway Timeout',
//     '505': 'HTTP Version Not Supported',
//     '506': 'Variant Also Negotiates',
//     '507': 'Insufficient Storage',
//     '508': 'Loop Detected',
//     '509': 'Bandwidth Limit Exceeded',
//     '510': 'Not Extended',
//     '511': 'Network Authentication Required'
//   }

const reasonPharaseCode = code => {
    switch (code) {
        case 100:
            console.log("Continue");
            break;
        case 200:
            console.log("OK");
            break;
        //...
        default: 
            console.log("No Code");
            break;
    }
}

reasonPharaseCode(100);

// change to search by Object
const reasonPharaseCode_v2 = {
    '100': 'Continue',
    '101': 'Switching Protocols',
    '102': 'Processing',
    '103': 'Early Hints',
    '200': 'OK',
    '201': 'Created',
    '202': 'Accepted',
    '203': 'Non-Authoritative Information',
    '204': 'No Content',
    '205': 'Reset Content',
    '206': 'Partial Content',
    '207': 'Multi-Status',
    '208': 'Already Reported',
    '226': 'IM Used',
    '300': 'Multiple Choices',
    '301': 'Moved Permanently',
    '302': 'Found',
    '303': 'See Other',
    '304': 'Not Modified',
    '305': 'Use Proxy',
    '307': 'Temporary Redirect',
    '308': 'Permanent Redirect',
    '400': 'Bad Request',
    '401': 'Unauthorized',
    '402': 'Payment Required',
    '403': 'Forbidden',
    '404': 'Not Found',
    '405': 'Method Not Allowed',
    '406': 'Not Acceptable',
    '407': 'Proxy Authentication Required',
    '408': 'Request Timeout',
    '409': 'Conflict',
    '410': 'Gone',
    '411': 'Length Required',
    '412': 'Precondition Failed',
    '413': 'Payload Too Large',
    '414': 'URI Too Long',
    '415': 'Unsupported Media Type',
    '416': 'Range Not Satisfiable',
    '417': 'Expectation Failed',
    '418': "I'm a Teapot",
    '421': 'Misdirected Request',
    '422': 'Unprocessable Entity',
    '423': 'Locked',
    '424': 'Failed Dependency',
    '425': 'Too Early',
    '426': 'Upgrade Required',
    '428': 'Precondition Required',
    '429': 'Too Many Requests',
    '431': 'Request Header Fields Too Large',
    '451': 'Unavailable For Legal Reasons',
    '500': 'Internal Server Error',
    '501': 'Not Implemented',
    '502': 'Bad Gateway',
    '503': 'Service Unavailable',
    '504': 'Gateway Timeout',
    '505': 'HTTP Version Not Supported',
    '506': 'Variant Also Negotiates',
    '507': 'Insufficient Storage',
    '508': 'Loop Detected',
    '509': 'Bandwidth Limit Exceeded',
    '510': 'Not Extended',
    '511': 'Network Authentication Required',
    'default': 'No Code'
}

const returnReasonPhraseCode = code => {
    console.log(reasonPharaseCode_v2[code] || reasonPharaseCode_v2['default']);
}

// change to search by Map
returnReasonPhraseCode(401);

const reasonPhraseCode_v2 = new Map([
    ['100', 'Continue'],
    ['404', 'Not Found'],
    ['default', 'No Code']
]);

// const testMap = new Map();
// testMap.set('200', 'OK');
// testMap.set('404', 'Not Found');
// console.log(testMap);
// console.log(testMap.get('200'));

const returnReasonPhraseCode_v2 = code => {
    console.log(reasonPhraseCode_v2.get(code) || reasonPhraseCode_v2.get('default'));
}

returnReasonPhraseCode_v2('');