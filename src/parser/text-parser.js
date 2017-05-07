import { cacheContainer } from '../util';
import RE from './RE';


const buildRegex = cacheContainer(delimiters => {
    const open = delimiters[0].replace(RE.regexEscape, '\\$&');
    const close = delimiters[1].replace(RE.regexEscape, '\\$&');
    return new RegExp(open + '((?:.|\\n)+?)' + close, 'g');
})

console.log(buildRegex)

/**
 * Parse ordinary text or mustache text
 * @param text
 * @param delimiters
 * @returns {string}
 * @constructor
 */
export default function TextParser(text, delimiters) {
    const tagRE = delimiters ? buildRegex(delimiters) : RE.mustacheTag;
    if (!tagRE.test(text)) {
        return
    }
    const tokens = []
    let lastIndex = tagRE.lastIndex = 0
    let match, index
    while ((match = tagRE.exec(text))) {
        index = match.index
        // push text token
        if (index > lastIndex) {
            tokens.push(JSON.stringify(text.slice(lastIndex, index)))
        }
        // tag token
        const exp = match[1].trim()
        tokens.push(`_s(${exp})`)
        lastIndex = index + match[0].length
    }
    if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)))
    }
    return tokens.join('+')
}
