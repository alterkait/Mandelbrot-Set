const canvas = document.getElementById('mandelbrot-canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const maxIterations = 1000;

let xMin = -2;
let xMax = 2;
let yMin = -2;
let yMax = 2;

function mandelbrot(cRe, cIm) {
    let zRe = 0;
    let zIm = 0;
    let n = 0;

    while (n < maxIterations && zRe * zRe + zIm * zIm <= 4) {
        let zReTmp = zRe * zRe - zIm * zIm + cRe;
        zIm = 2 * zRe * zIm + cIm;
        zRe = zReTmp;
        n++;
    }

    return n;
}

function drawMandelbrot() {
    const xStep = (xMax - xMin) / width;
    const yStep = (yMax - yMin) / height;

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const cRe = xMin + x * xStep;
            const cIm = yMin + y * yStep;
            const color = mandelbrot(cRe, cIm);

            ctx.fillStyle = `hsl(${color * 2}, 100%, ${color < maxIterations ? 50 : 0}%)`;
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

canvas.addEventListener('click', (event) => {
    const mouseX = event.clientX - canvas.offsetLeft;
    const mouseY = event.clientY - canvas.offsetTop;

    const xCenter = xMin + mouseX * (xMax - xMin) / width;
    const yCenter = yMin + mouseY * (yMax - yMin) / height;

    const xRange = xMax - xMin;
    const yRange = yMax - yMin;

    xMin = xCenter - xRange / 4;
    xMax = xCenter + xRange / 4;
    yMin = yCenter - yRange / 4;
    yMax = yCenter + yRange / 4;

    drawMandelbrot();
});

drawMandelbrot();
