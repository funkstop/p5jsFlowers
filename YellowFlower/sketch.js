let v = [];
let rows = 60; cols = 180;

function setup() 
{
  createCanvas(700,700, WEBGL);
  angleMode(DEGREES);
  
  //stroke (71,26,92)
  noStroke();
  strokeWeight(4);
}

function draw() {
  colorMode(RGB);
  background(130,110,210);
  colorMode(HSB, 360,100,100);

 // frameRate(10);
  orbitControl(4,4);
  rotateX(60);
  let strokeh=71;
  let strokes=26;
  let strokeb=92;
  //translate(width/2,height/2);
  //beginShape(POINTS);
  for (theta = 0; theta < rows; theta +=1) {
    v.push([]);
    for (let phi = 0; phi < cols; phi += 1) {
      let r = (70 * pow(abs(sin(5/2*phi*360/cols)),1) +225) * theta/rows;
      let x = r * cos(phi*360/cols);
      let y = r * sin(phi*360/cols);
      let bumpiness = 2*pow(r/100,2)*sin(phi*6);
      let z = vShape(300,r/100,.8, 0.15,1.5) - 200 + bumps(2.5,r/100,12,phi*360/cols);
       
      let pos = createVector(x,y,z);
      v[theta].push(pos);
    }
  }
  for (let theta = 0; theta < v.length; theta++) {
    for (let phi = 0; phi < v[theta].length; phi++) {
      fill(30,100-theta*1.8,200);
      if (theta < v.length-1 && phi < v[theta].length -1) {
        beginShape();
    //    strokeh=random(255);
    //    strokes=random(255);
    //    strokeb=random(255);
    //    stroke(strokeh,strokes,strokeb);
        vertex(v[theta][phi].x,v[theta][phi].y,v[theta][phi].z)
        vertex(v[theta+1][phi].x,v[theta+1][phi].y,v[theta+1][phi].z)
        vertex(v[theta+1][phi+1].x,v[theta+1][phi+1].y,v[theta+1][phi+1].z)
        vertex(v[theta][phi+1].x,v[theta][phi+1].y,v[theta][phi+1].z)

        endShape(CLOSE);
      } else if (theta < v.length-1 && phi == v[theta].length -1) {
        beginShape();
        vertex(v[theta][phi].x,v[theta][phi].y,v[theta][phi].z)
        vertex(v[theta+1][phi].x,v[theta+1][phi].y,v[theta+1][phi].z)
        vertex(v[theta+1][0].x,v[theta+1][0].y,v[theta+1][0].z)
        vertex(v[theta][0].x,v[theta][0].y,v[theta][0].z)

        endShape(CLOSE);
      }
    }
  }
  v=[];
 // endShape(); 
}

function vShape (A,r,a,b,c) {
  return A*pow(Math.E, -b * pow(abs(r),c)) *pow(abs(r),a);
}

function bumps(A,r,f,angle) {
  return 1+A*(pow(r,2)*sin(f*angle));
}