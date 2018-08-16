let N = 1000;
function setup () {
    createCanvas (windowWidth, windowHeight);
    let f = figure (randomPoints(N));
    let n = f.length;
    f = f.map (function (p) { return {x : (p.x * width/N), y : (p.y * height/N)}});
    for(let i = 0; i < f.length; i++) {
        line(f[i].x, f[i].y, f[(i+1)% n].x, f[(i+1)%n].y);
    }
}

// let f, n, x = 0;
// function setup() {
//     createCanvas(windowHeight, windowHeight);
//     setInterval(func, 500);
// }
// function func() {
//     background(255);
//     push();
//     translate(width/2, height/2);
//     rotate(x);

//     f = figure(randomPoints(N));
//     n = f.length;
//     f = f.map (function (p) { return {x : map(p.x,0, N, 0, width) - width/2, y : map(p.y, 0, N, 0, height) - height/2}});
//     for(let i = 0; i < f.length; i++) {
//         line(f[i].x, f[i].y, f[(i+1)% n].x, f[(i+1)%n].y);
//     }
//     pop();
//     x += 10;
// }

function randomPoints (n,k = N) {
    let P = [];
    for (let i = 0; i < n; i++) {
        P.push ({x : Math.floor(k*Math.random()), y : Math.floor(k*Math.random())});
    }
    return P;
}

function centroid (points) {
    let cx = 0, cy = 0;
    let n = points.length;
    for (let i = 0 ; i < n; i++) {
        cx += points[i].x;
        cy += points[i].y;
    }
    return {x :cx/n, y : cy/n};
}

function figure (points) {
    return minDistArr(points, centroid(points));
}

function minDistArr (a, compPoint) {
    let n = a.length;
    if (n == 0) {
        return a;
    }
    else {
        let m = dist (a[0].x, a[0].y, compPoint.x, compPoint.y);
        let k = 0;
        let restArr = [];
        for (let i = 1; i < n ; i++) {
            let d = dist (a[i].x, a[i].y, compPoint.x, compPoint.y);      
            if (d < m) {
                m = d;
                restArr.push (a[k]);
                k = i;
            }
            else {
                restArr.push (a[i]);
            }
        }
        return [a[k]].concat(minDistArr(restArr, a[k]));
    }
}

function similarity_coeff (f1, f2) {
    let r = [];
    let n = f1.length 
    for(let i = 0; i < n - 1; i++) {
        let d1 = dist(f1[i].x, f1[i].y, f1[i+1].x, f1[i+1].y), d2 = dist(f2[i].x, f2[i].y, f2[i+1].x, f2[i+1].y);
        if (d2 != 0) {
            r.push (d1/d2);
        }
    }
    let d1 = dist(f1[n-1].x, f1[n-1].y, f1[0].x, f1[0].y), d2 = dist(f2[n-1].x, f2[n-1].y, f2[0].x, f2[0].y);
    if (d2 != 0) {
        r.push (d1/d2);
    }
    return Math.exp(- (stddev (r) + 1));
    // return r
}

function stddev (a) {
    let s1 = 0, s2 = 0, n = a.length;
    for(let i = 0; i < n; i++) {
        s1 += a[i];
        s2 += Math.pow(a[i],2);
    }
    return (Math.sqrt(s2/n - Math.pow(s1/n,2)));
}


// function xy2p (X, Y) {
//     let P = [];
//     for(let i = 0; i < X.length ; i++) {
//         P.push ({x : X[i], y : Y[i]});
//     }
//     return P;
// }

// function randomArray (n) {
//     let a = [];
//     for(let i = 0; i < n ; i++) {
//         a.push (floor(random(0, 100)));
//     }
//     return a;
// }