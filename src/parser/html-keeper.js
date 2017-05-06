import HTMLParser from './html-parser';
import TextParser from './text-parser';
import {bind, camelize} from '../util';
import RE from './RE';
import {
    makeAttrsMap,
    addIfAttsInElement,
    getAndRmAttr,
    warn,
    getModfilerMapByAttrName,
    addProp,
    addAttr,
    addHandler,
    findPrevElement
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
     * Set the first parsed element as root
     * @param element
     */
    checkoutRootElement(element) {
        if (!this.rootElement) {
            this.rootElement = element
        }
        return this;
    }

    /**
     * Handle child element under parsing
     * @param element
     */
    handleChildElement(element) {
        // currentParent records the lastest tag-closed element
        if (this.currentParent && !element.forbidden) {

            if (element.elseif || element.else) {

                // Find previous siblings elemnt
                const _prev = findPrevElement(this.currentParent.children)

                if (_prev && _prev.if) {
                    addIfAttsInElement(_prev, {
                        exp: element.elseif,
                        block: element
                    })

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
    }

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
            children: [],
            if: null,
            elseif: null,
            else: null,
            slotScope: null,
            forbidden: null,
            ifConditions: null,

        }

        // Core Diectives
        HtmlKeeper.directiveFor(element)
                  .directiveIf(element)
                  .directiveKey(element)
                  .directiveAttrs(element)

        // Handle Root Element & Child Element
        this.checkoutRootElement(element)
            .handleChildElement(element)

        // Change CurrentParent
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

        // Render finished
        if(this.stack.length === 0) {
            delete this.stack
            delete this.currentParent
        }
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

        return this;
    }

    /**
     * Process 'v-if'
     * @param el
     */
    static directiveIf(element) {

        const ifAttrValue = getAndRmAttr(element, 'v-if')

        if (ifAttrValue) {

            element.if = ifAttrValue

            addIfAttsInElement(element, {
                exp: ifAttrValue,
                block: element
            })

        } else {

            if (getAndRmAttr(element, 'v-else') != null) {
                element.else = true
            }

            const elseifAttrValue = getAndRmAttr(element, 'v-else-if')

            if (elseifAttrValue) {
                element.elseif = elseifAttrValue
            }

        }

        return this;
    }

    static directiveKey(el) {
        // TODO key 优化处理
        return this;
    }

    static directiveAttrs(element) {

        const attrsList = element.attrsList;

        let name, rawName, value, modifierMap;

        for (let i = 0, l = attrsList.length; i < l; i++)                {

            name = rawName = attrsList[i].name

            value = attrsList[i].value

            // Start with @ / : /'v-'
            if (RE.directive.test(name)) {

                // v-bind:data.sync --> {sync: true}
                // :src -> null
                modifierMap = getModfilerMapByAttrName(name)

                if (modifierMap) {
                    // v-bind:data.sync --> v-bind:data
                    name = name.replace(RE.modefier, '')
                }

                // 'v-bind' - directive
                if (RE.bind.test(name)) {
                    HtmlKeeper.directiveBind(element, name, value, modifierMap);

                // 'v-on' - directive
                } else if (RE.on.test(name)) {
                    HtmlKeeper.directiveOn(element, name, value, modifierMap);

                } else { // normal directives

                }

            } else {
                addAttr(element, name, JSON.stringify(value))
            }
        }

        return this;
    }

    /**
     * Handle 'v-bind'
     * @param element
     * @param name
     * @param value
     * @param modifierMap
     */
    static directiveBind(element, name, value, modifierMap) {

        let isProp;
        // v-bind:data --> data
        // v-bind:src -> src
        // :src -> src
        name = name.replace(RE.bind, '')

        if (modifierMap) {

            // .prop
            if (modifierMap.prop) {
                isProp = true
                name = camelize(name)
                console.log(name)
                if (name === 'innerHtml') name = 'innerHTML'
            }

            // .camel
            if (modifierMap.camel) {
                name = camelize(name)
            }
        }

        if (isProp) {
            addProp(element, name, value)

        } else {
            addAttr(element, name, value)
        }
    }

    /**
     * Handle 'v-on'
     * @param element
     * @param name
     * @param value
     * @param modifierMap
     */
    static directiveOn(element, name, value, modifierMap) {
        name = name.replace(RE.on, '')
        addHandler(element, name, value, modifierMap)
    }
}