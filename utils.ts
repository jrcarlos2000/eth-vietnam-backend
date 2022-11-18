function getTimestamp() {
    return Math.floor((+ new Date())/1000)
}

async function awaitAndFilter(requests: any[]) {
    let result = (await Promise.allSettled(requests))
        .filter(res => res.status === 'fulfilled')
        .map((res:any) => res.value)
    return result
}

function mergeListIntoDictionary(list: any[]): any {
    const container:any = {}
    for(let item of list) {
        const keys: string[] = Object.keys(item)
        if (keys.length !== 1) {
            console.log(`${JSON.stringify(item)} cannot be merged as one or more elements contain more than 1 keys.`);
            continue
        }
        const key: string = keys[0]
        container[key] = item[key]
    }
    return container
}

export {
    getTimestamp,
    awaitAndFilter,
    mergeListIntoDictionary
}