export function secoundsToHms(d) {
    d = Number(d) / 1000
    const h = Math.floor(d / 3600)
    const m = Math.floor(d % 3600 / 60)
    const s = Math.floor(d % 3600 % 60)
    return {h, m ,s}
}

export function start(start){
    const arrStart = []
    for(let i = 0; i < start; i++){
        arrStart.push(<i class="fa-solid fa-star"></i>)
    }
    for(let j = 5; j > start; j--){
        arrStart.push(<i class="fa-regular fa-star"></i>)
    }
    return arrStart
}

export function formatNumber(number){
    return new Intl.NumberFormat('vi-VN').format(number);
}