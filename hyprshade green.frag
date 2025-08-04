#version 300 es
precision highp float;

in vec2 v_texcoord;
out vec4 FragColor;
uniform sampler2D tex;

const vec3 VIB_RGB_BALANCE = vec3(1.0, 1.0, 1.0);
const float VIB_VIBRANCE = 0.15;
const vec3 VIB_coeffVibrance = VIB_RGB_BALANCE * -VIB_VIBRANCE;

void main() {
  vec4 pixColor = texture2D(tex, v_texcoord);

  // calculate the perceived brightness (https://www.101computing.net/colour-luminance-and-contrast-ratio/)
  vec4 luminance = pixColor * vec4(0.2126, 0.7152, 0.0722, 1.0);
  float mono = luminance[0] + luminance[1] + luminance[2];

  // red
  pixColor[0] = mono - 1.0;
  // green
  pixColor[1] = mono;
  // blue
  pixColor[2] = mono - 1.0;

  FragColor = pixColor;
}
