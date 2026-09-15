import { useEffect, useRef } from 'react';

export type WebGLSceneVariant = 'hero' | 'services' | 'portfolio' | 'influencer' | 'social' | 'packages' | 'contact';

interface Props {
  variant?: WebGLSceneVariant;
  className?: string;
}

const palettes: Record<WebGLSceneVariant, [number, number, number, number, number, number]> = {
  hero: [1.0, 0.24, 0.55, 0.55, 0.36, 0.96],
  services: [1.0, 0.36, 0.36, 1.0, 0.24, 0.55],
  portfolio: [0.55, 0.36, 0.96, 1.0, 0.24, 0.55],
  influencer: [1.0, 0.24, 0.55, 1.0, 0.46, 0.34],
  social: [0.43, 0.36, 0.98, 1.0, 0.24, 0.55],
  packages: [1.0, 0.36, 0.36, 0.55, 0.36, 0.96],
  contact: [1.0, 0.24, 0.55, 0.14, 0.83, 0.40],
};

const vertexShader = `
attribute vec2 a_position;
void main(){
  gl_Position = vec4(a_position,0.0,1.0);
}
`;

const fragmentShader = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_colorA;
uniform vec3 u_colorB;

#define MAX_STEPS 58
#define MAX_DIST 24.0
#define SURF_DIST 0.0025

mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
float sdRoundBox(vec3 p, vec3 b, float r){
  vec3 q=abs(p)-b+r;
  return length(max(q,0.0))+min(max(q.x,max(q.y,q.z)),0.0)-r;
}
float sdBox(vec3 p, vec3 b){vec3 q=abs(p)-b;return length(max(q,0.0))+min(max(q.x,max(q.y,q.z)),0.0);}
float sdTorus(vec3 p, vec2 t){vec2 q=vec2(length(p.xz)-t.x,p.y);return length(q)-t.y;}

vec2 opU(vec2 a, vec2 b){return a.x<b.x?a:b;}

vec2 scene(vec3 p){
  float t=u_time;
  vec2 hit=vec2(999.0,0.0);

  vec3 phone=p;
  phone.y-=0.03*sin(t*0.8);
  phone.yz*=rot(-0.06+u_mouse.y*0.14+0.03*sin(t*.32));
  phone.xz*=rot(0.13*sin(t*.42)+u_mouse.x*0.24);
  phone.xy*=rot(0.025*sin(t*.35));
  hit=opU(hit,vec2(sdRoundBox(phone,vec3(1.08,2.18,0.16),0.19),1.0));

  vec3 screen=phone-vec3(0.0,0.0,0.175);
  hit=opU(hit,vec2(sdRoundBox(screen,vec3(0.96,2.04,0.018),0.15),2.0));

  vec3 c1=p-vec3(-2.05,1.22,-0.36);
  c1.xz*=rot(-0.42+0.08*sin(t*.55)); c1.xy*=rot(-0.14+0.05*sin(t*.7));
  hit=opU(hit,vec2(sdRoundBox(c1,vec3(.72,1.08,.055),.11),3.0));

  vec3 c2=p-vec3(2.1,0.9,-0.62);
  c2.xz*=rot(0.42+0.09*cos(t*.52)); c2.xy*=rot(0.12+0.04*cos(t*.7));
  hit=opU(hit,vec2(sdRoundBox(c2,vec3(.68,1.0,.05),.1),4.0));

  vec3 c3=p-vec3(-1.75,-1.75,-0.75);
  c3.xz*=rot(-0.35+0.06*cos(t*.5)); c3.xy*=rot(0.12+0.05*sin(t*.8));
  hit=opU(hit,vec2(sdRoundBox(c3,vec3(.6,.82,.045),.09),4.0));

  vec3 c4=p-vec3(1.85,-1.72,-0.48);
  c4.xz*=rot(0.36+0.07*sin(t*.48)); c4.xy*=rot(-0.1+0.05*cos(t*.76));
  hit=opU(hit,vec2(sdRoundBox(c4,vec3(.63,.9,.045),.1),3.0));

  vec3 ringP=p;
  ringP.yz*=rot(1.08);
  ringP.xz*=rot(0.18+t*.045);
  hit=opU(hit,vec2(sdTorus(ringP,vec2(3.1,.025)),5.0));
  return hit;
}

vec3 normalAt(vec3 p){
  vec2 e=vec2(.002,0.0);
  float d=scene(p).x;
  return normalize(vec3(
    d-scene(p-e.xyy).x,
    d-scene(p-e.yxy).x,
    d-scene(p-e.yyx).x
  ));
}

vec3 screenColor(vec3 p){
  float wave=.5+.5*sin(p.y*2.8+u_time*1.3);
  float scan=.5+.5*sin((p.y+u_time*.45)*48.0);
  float grid=(smoothstep(.96,1.0,abs(sin(p.x*8.0)))+smoothstep(.96,1.0,abs(sin(p.y*8.0))))*.12;
  vec3 grad=mix(u_colorA,u_colorB,clamp(.5+p.y*.22+.16*sin(u_time*.7),0.0,1.0));
  return grad*(.72+.28*wave)+vec3(scan*.035+grid);
}

void main(){
  vec2 frag=gl_FragCoord.xy;
  vec2 uv=(frag-.5*u_resolution.xy)/u_resolution.y;
  uv.x*=1.02;

  vec3 ro=vec3(0.0,0.0,7.4);
  ro.x+=u_mouse.x*.18;
  ro.y+=u_mouse.y*.12;
  vec3 rd=normalize(vec3(uv.x,uv.y,-1.6));

  float dist=0.0;
  float mat=0.0;
  vec3 p=ro;
  for(int i=0;i<MAX_STEPS;i++){
    p=ro+rd*dist;
    vec2 h=scene(p);
    dist+=h.x;
    mat=h.y;
    if(h.x<SURF_DIST||dist>MAX_DIST)break;
  }

  vec3 bg=vec3(0.0);
  float vign=1.0-smoothstep(.2,1.15,length(uv));
  float glowA=.06/(.15+length(uv-vec2(-.28,.18)));
  float glowB=.05/(.14+length(uv-vec2(.31,-.18)));
  bg+=u_colorA*glowA*.13+u_colorB*glowB*.12;
  float stars=step(.994,fract(sin(dot(floor((uv+2.0)*85.0),vec2(12.9898,78.233)))*43758.5453));
  bg+=vec3(stars*.22*vign);

  if(dist>MAX_DIST){
    gl_FragColor=vec4(bg,0.82);
    return;
  }

  vec3 n=normalAt(p);
  vec3 light1=normalize(vec3(-3.0,4.0,5.0)-p);
  vec3 light2=normalize(vec3(4.0,-2.0,3.0)-p);
  float d1=max(dot(n,light1),0.0);
  float d2=max(dot(n,light2),0.0);
  vec3 viewDir=normalize(ro-p);
  vec3 halfDir=normalize(light1+viewDir);
  float spec=pow(max(dot(n,halfDir),0.0),42.0);
  float fres=pow(1.0-max(dot(n,viewDir),0.0),2.2);

  vec3 col;
  if(mat<1.5){
    col=vec3(.045,.055,.085)*(0.55+d1*.55+d2*.25)+u_colorB*fres*.34+vec3(spec*.7);
  }else if(mat<2.5){
    col=screenColor(p);
    col+=vec3(spec*.16);
  }else if(mat<3.5){
    col=mix(u_colorA,vec3(.12,.08,.18),.38)*(0.7+d1*.45)+u_colorB*fres*.22;
  }else if(mat<4.5){
    col=mix(u_colorB,vec3(.08,.09,.16),.35)*(0.72+d2*.42)+u_colorA*fres*.2;
  }else{
    col=mix(u_colorA,u_colorB,.5)*2.0;
  }

  float fog=smoothstep(4.0,13.0,dist);
  col=mix(col,bg,fog*.5);
  col=col/(col+vec3(1.0));
  col=pow(col,vec3(.84));
  gl_FragColor=vec4(col,0.96);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('Reel2Reach WebGL shader error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function WebGLArtScene({ variant = 'hero', className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
      premultipliedAlpha: false,
    });
    if (!gl) return;

    const vs = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('Reel2Reach WebGL link error:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resLoc = gl.getUniformLocation(program, 'u_resolution');
    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const mouseLoc = gl.getUniformLocation(program, 'u_mouse');
    const colorALoc = gl.getUniformLocation(program, 'u_colorA');
    const colorBLoc = gl.getUniformLocation(program, 'u_colorB');
    const palette = palettes[variant];
    gl.uniform3f(colorALoc, palette[0], palette[1], palette[2]);
    gl.uniform3f(colorBLoc, palette[3], palette[4], palette[5]);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const targetMouse = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };
    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouse.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetMouse.y = -(((event.clientY - rect.top) / rect.height - 0.5) * 2);
    };
    if (!coarse) canvas.addEventListener('pointermove', onPointerMove);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.0 : 1.45);
      const width = Math.max(1, Math.floor(rect.width * dpr));
      const height = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const start = performance.now();
    let raf = 0;
    const render = (now: number) => {
      resize();
      mouse.x += (targetMouse.x - mouse.x) * 0.045;
      mouse.y += (targetMouse.y - mouse.y) * 0.045;
      gl.useProgram(program);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, reduceMotion ? 0.0 : (now - start) / 1000);
      gl.uniform2f(mouseLoc, reduceMotion ? 0 : mouse.x, reduceMotion ? 0 : mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (!coarse) canvas.removeEventListener('pointermove', onPointerMove);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className={`webgl-art-scene block h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
