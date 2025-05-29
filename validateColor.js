function getColorStatus(color) {

    let templates = [
        /^rgb\((((2[0-4]\d)|(2[0-5][0-5])|(1\d\d)|([1-9]?\d))|((100%)|([1-9]?\d%)))\s*,\s*(((2[0-4]\d)|(2[0-5][0-5])|(1\d\d)|([1-9]?\d))|((100%)|([1-9]?\d%)))\s*,\s*(((2[0-4]\d)|(2[0-5][0-5])|(1\d\d)|([1-9]?\d))|((100%)|([1-9]?\d%)))\)$/, 
        /^(#[\dA-Fa-f]{3}|#[\dA-Fa-f]{6})$/,
        /^hsl\(((360)|(3[0-5]\d)|(2\d\d)|(1\d\d)|([1-9]?\d))\s*,\s*((100%)|([1-9]?\d%))\s*,\s*((100%)|([1-9]?\d%))\)$/
    ];

    let status = new Array(templates.length);

    for (let i = 0; i < templates.length; ++i) {

        if (color.match(templates[i]) != null) status[i] = 1;
    }

    return status;
}