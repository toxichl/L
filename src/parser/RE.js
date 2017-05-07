const RE = {
    // match begin with 'x-' '@' ':'
    directive: /^v-|^@|^:/,

    // for alias
    forAlias: /(.*?)\s+(?:in|of)\s+(.*)/,

    // for iterators
    forIterator: /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/,

    // match directive 'x-on':
    on: /^@|^v-on:/,

    // match directive 'x-bind':
    bind: /^:|^v-bind:/,

    // modifier
    modefier: /\.[^.]+/g,

    functionExp: /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/,

    simplePath: /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/,

    mustacheTag: /\{\{((?:.|\n)+?)\}\}/g,

    regexEscape: /[-.*+?^${}()|[\]/\\]/g


}

export {RE as default}













