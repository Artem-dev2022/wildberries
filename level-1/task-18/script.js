// Подсчитать максимальный объем данных, 
// который можно записать в localStorage вашего браузера.

localStorage.clear()

var i = 0; // используем var чтобы изменять i из цикла ниже, т.к. у var функциональная зона видимости
try { // идея в том чтобы методом подбора длины строки нащупать лимит localStorage
    // средний объем localStorage 5 MB, возьмем с запасом и проверим на объем до 10 MB
    for (i = 250; i <= 10000; i += 250) { // 10 MB = 10000 KB
        localStorage.setItem('str', new Array((i * 1024) + 1).join('a')); // данная конструкция вернет строку длиной i * 1024 состоящую из "a"
        // по достижению лимита консоль выдаст:  Setting the value of 'str' exceeded the quota.
    }
} catch {
    console.log('максимальный объем данных', i - 250)
}

// подбираем строки длиной кратно 1024 т.к. в 1кб 1024 байт, а вес 1 символа - 1 байт
// в Crome объем localStorage составил 5MB