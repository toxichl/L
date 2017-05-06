import HTMLParser from './html-parser';
import TextParser from './text-parser';
import {bind} from '../util';
import RE from './RE';
import {
    makeAttrsMap,
    processIfConditions,
    getAndRmAttr,
    warn,
    getModfilerMapByAttrName,
    addProp,
    addAttr,
    addHandler,
    findPrevElement,
    camelize
} from './utils';

export default class HtmlKeeper {

    constructor(template, vm) {

        this.options = vm.$options
        this.stack = []
        // Root
        this.rootElement = null
        this.currentParent = null

        HtmlKeeper.parse(template, {
            start: bind(this.startHandle, this),
            end: bind(this.endHandle, this),
            chars: bind(this.charsHandle, this),
            comment: bind(this.commentHandle, this)
        })

    }

    static parse = HTMLParser

    /**
     * Start-tag hook
     * @param tag
     * @param attrs
     * @param unary
     */
    startHandle(tag, attrs, unary) {

        const element = {
            type: 1,
            tag,
            attrsList: attrs,
            attrsMap: makeAttrsMap(attrs),
            parent: this.currentParent || null,
            children: []
            // if
            // elseif
            // else
            // slotScope
            // forbidden
        }

        HtmlKeeper.directiveFor(element)
        HtmlKeeper.directiveIf(element)
        HtmlKeeper.directiveKey(element)
        HtmlKeeper.directiveAttrs(element)

        if (!this.rootElement) {
            this.rootElement = element
        }

        // currentParent records the lastest tag-closed element
        if (this.currentParent && !element.forbidden) {

            if (element.elseif || element.else) {

                const _prev = findPrevElement(this.currentParent.children)

                if (_prev && _prev.if) {

                    if (!_prev.ifConditions) {
                        _prev.ifConditions = [];
                    }

                    _prev.ifConditions.push({
                        exp: element.elseif,
                        block: element
                    });

                } else {

                    warn(
                        `v-${element.elseif ? ('else-if="' + element.elseif + '"') : 'else'} ` +
                        `used on element <${element.tag}> without corresponding v-if.`
                    )

                }

            } else if (element.slotScope) { // scoped slot

            } else {
                this.currentParent.children.push(element)
                element.parent = this.currentParent
            }
        }

        if (!unary) {
            this.currentParent = element
            this.stack.push(element)
        }
    }

    /**
     * End-tag hook
     * @param tag
     */
    endHandle(tag) {

        const element = this.stack[this.stack.length - 1]
        const lastNode = element.children[element.children.length - 1]

        if (lastNode && lastNode.type === 3 && lastNode.text === ' ') {
            element.children.pop()
        }

        // pop stack
        this.stack.length -= 1
        this.currentParent = this.stack[this.stack.length - 1]
    }

    /**
     * chars-tag hook
     * @param tag
     */
    charsHandle(text) {
        if (!text.trim()) {
            text = ' '
        }

        let expression = TextParser(text, this.options.delimiters)
        if (expression) {
            this.currentParent.children.push({
                type: 2,
                expression,
                text
            })
        } else {
            this.currentParent.children.push({
                type: 3,
                text
            })
        }

    }

    /**
     * Comment-tag hook
     * @param text
     */
    commentHandle(text) {

    }

    /**
     * Process 'v-for'
     * @param el
     */
    static directiveFor(el) {

        // v-for="(item,index) in items"
        let exp = getAndRmAttr(el, 'v-for')

        if (exp) {

            const matchFor = exp.match(RE.forAlias)

            if (!matchFor) {
                warn(`Invalid v-for expression: ${exp}`)
                return
            }

            // item
            el.for = matchFor[2].trim()

            // (item,index)
            const alias = matchFor[1].trim()
            const matchForIterator = alias.match(RE.forIterator)

            if (matchForIterator) {
                // item
                el.alias = matchForIterator[1].trim()
                // index
                el.iterator1 = matchForIterator[2].trim()
                if (matchForIterator[3]) {
                    el.iterator2 = matchForIterator[3].trim()
                }

            } else {
                el.alias = alias
            }
        }
    }

    /**
     * Process 'v-if'
     * @param el
     */
    static directiveIf(el) {

        const ifAttrValue = getAndRmAttr(el, 'v-if')

        if (ifAttrValue) {

            el.if = ifAttrValue

            if (!el.ifConditions) {
                el.ifConditions = [];
            }

            el.ifConditions.push({
                exp: ifAttrValue,
                block: el
            });

        } else {

            if (getAndRmAttr(el, 'v-else') != null) {
                el.else = true
            }

            const elseifAttrValue = getAndRmAttr(el, 'v-else-if')

            if (elseifAttrValue) {
                el.elseif = elseifAttrValue
            }

        }
    }

    static directiveKey(el) {
        // TODO key 优化处理
    }

    static directiveAttrs(el) {

        const list = el.attrsList;

        let name, rawName, value, modifierMap, isProp;

        for (let i = 0, l = list.length; i < l; i++) {

            name = rawName = list[i].name

            value = list[i].value

            // Start with @ / : /'v-'
            if (RE.directive.test(name)) {

                // v-bind:data.sync -> {sync: true}
                modifierMap = getModfilerMapByAttrName(name)

                if (modifierMap) {
                    // v-bind:data.sync -> v-bind:data
                    name = name.replace(RE.modefier, '')
                }

                if (RE.bind.test(name)) { // v-bind

                    // data
                    name = name.replace(RE.bind, '')

                    if (modifierMap) {

                        if (modifierMap.prop) {
                            isProp = true
                            console.log(name)

                            console.log(camelize)

                            name = camelize(name)
                            console.log(name)
                            if (name === 'innerHtml') name = 'innerHTML'
                        }

                        if (modifierMap.camel) {
                            name = camelize(name)
                        }
                    }

                    if (isProp) {
                        addProp(el, name, value)

                    } else {
                        addAttr(el, name, value)
                    }

                } else if (RE.on.test(name)) { // v-on
                    name = name.replace(RE.on, '')
                    addHandler(el, name, value, modifierMap)

                } else { // normal directives

                }
            } else {
                addAttr(el, name, JSON.stringify(value))
            }
        }
    }

}