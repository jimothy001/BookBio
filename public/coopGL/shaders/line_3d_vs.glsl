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
	vec3 vz=vec3(uPVMatrix4[0][3], uPVMatrix4[1][3], uPVMatrix4[2][3]);
	vec3 vx=uP1-uP0;
	vec3 vy=normalize(cross(vx,vz)); 

	vec3 pp=uP0+vx*aPosition.x+vy*aPosition.y*mix(uWidth.x, uWidth.y, aPosition.x);//(w.x*(1.0-aPosition.x)+w.y*aPosition.x);

	gl_Position = uPVMatrix4*uMMatrix4*vec4(pp,1.0);
}