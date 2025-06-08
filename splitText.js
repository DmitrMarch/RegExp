function splitText(text) {

    const regex = /(?<sentence>[А-ЯA-Z][\s\S]*?(?:[.!?](?=\s+[А-ЯA-Z]|$)))/gud;

    return [...text.matchAll(regex)];
}