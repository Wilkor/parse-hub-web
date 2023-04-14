const regex_bold = new RegExp(/\*(\**[^*\n]+\**)\*/, 'g');
const regex_italic = new RegExp(/_(_*[^_\n]+_*)_/, 'g');
const regex_strikethrough = new RegExp(/~(~*[^~\n]+~*)~/, 'g');
const regex_linebreak = new RegExp(/\\n|\n|\r/, 'g');

const markdownToHtml = (str) => {
    if (!str) {
        return '';
    }

    return str
        .replace(regex_strikethrough, '<del>$1</del>')
        .replace(regex_italic, '<em>$1</em>')
        .replace(regex_bold, '<strong>$1</strong>')
        .replace(regex_linebreak, '<br>');
};

const textReplace = (str, markdown, value) => {
    if (!str || !markdown || !value) {
        return str;
    }

    return str.replace(markdown, value);
};

export { markdownToHtml, textReplace };
