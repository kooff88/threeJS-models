import { Config } from '../const'

export const getSeach = (search) => {
    const obj = {}
    search.substring(1).split('&').forEach((item, index) => {
        const res = item.split('=')
        obj[res[0]] = res[1]
    })
    
    return obj
}

//数据可能是图片，替换href
export const filterHref = (href) => {
    const res = href.match(/#\w+#/)
    while ( href.match(/#\w+#/) ) {
        href = href.replace(res[0], Config['server'][res[0].split('#')[1]])
    }

    return href
}
