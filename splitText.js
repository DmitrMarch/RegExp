function splitText(text) {

    const regex = /(?<sentence>[^.!?]*?[А-ЯA-Z][^.!?]*?[.!?])(?:\s+|$)/gud;

    return [...text.matchAll(regex)];
}