export function randomNumbers(from, to, length) {
    const numbers = [0];
    for (let i = 1; i < length; i++) {
        numbers.push(Math.ceil(Math.random() * (from - to) + to));
    }
    return numbers;
}


export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export function formatDecimal(value) {
    // Asegurarse de que el valor es un número antes de formatearlo
    if (typeof value !== 'number') {
        value = parseFloat(value);
    }
    if (isNaN(value)) {
        return value;  // O retornar un string vacío o cero si prefieres manejar así los NaN
    }
    return value.toLocaleString('de-DE');
}

