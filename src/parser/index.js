import TextParser from './text-parser'
import codeGen from './codegen'
import HtmlKeeper from './html-keeper'

const cache = {}

/**
 * Compile template in the view-model
 * @param template
 * @param vm
 * @returns {*}
 */
export function getRender(template, vm) {

    const HTMLParser = new HtmlKeeper(template, vm)
    console.log(HTMLParser)
    return (cache[template] = codeGen(HTMLParser.rootElement))

}
