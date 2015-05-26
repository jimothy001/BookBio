/*
* Copyright (c) 2012 Panagiotis Michalatos [www.sawapan.eu]
*
* This software is provided 'as-is', without any express or implied
* warranty. In no event will the authors be held liable for any damages
* arising from the use of this software.
*
* Permission is granted to anyone to use this software for any purpose,
* including commercial applications, and to alter it and redistribute it
* freely, subject to the following restrictions:
*
*    1. The origin of this software must not be misrepresented; you must not
*    claim that you wrote the original software. If you use this software
*    in a product, an acknowledgment in the product documentation would be
*    appreciated but is not required.
*
*    2. Altered source versions must be plainly marked as such, and must not
*    be misrepresented as being the original software.
*
*    3. This notice may not be removed or altered from any source
*    distribution.
*/


uniform mat4 uPVMatrix4;
uniform mat4 uMMatrix4;
uniform mat4 uVMatrix4;

uniform vec4 uColor;
uniform vec3 uP0;
uniform vec3 uP1;

uniform vec3 uViewPort;

uniform vec2 uWidth;
uniform float uExtension;

attribute vec2 aPosition;


void main() {
    vec4 pp0=uPVMatrix4*uMMatrix4*vec4(uP0,1.0);
	vec4 pp1=uPVMatrix4*uMMatrix4*vec4(uP1,1.0);
            
	vec4 dy=normalize(vec4(-(pp1.y/pp1.w-pp0.y/pp0.w), (pp1.x/pp1.w-pp0.x/pp0.w), 0.0, 0.0))*(uWidth.x*(1.0-aPosition.x)+uWidth.y*aPosition.x);
	dy.x/=uViewPort.x;
	dy.y/=uViewPort.y;
	
	vec4 ps= mix(pp0, pp1, aPosition.x);
	ps+=dy*aPosition.y*ps.w;
    gl_Position = ps;
}